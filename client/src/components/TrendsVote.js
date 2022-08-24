import React, { useState, useEffect } from "react";
import { Flipside } from "@flipsidecrypto/sdk";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const TrendsVote = () => {
  const [votesMonthly, setVotesMonthly] = useState([]);
  const [votesWeekly, setVotesWeekly] = useState([]);
  const [weekState, setWeekState] = useState(true);
  const [monthState, setMonthState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(false);

  const voteChartDates = votesMonthly.map((item) => {
    return item[0].slice(0, 7);
  });
  const voteChartAmounts = votesMonthly.map((item) => {
    return item[1];
  });
  const voteChartDates2 = votesWeekly.map((item) => {
    return item[0].slice(0, 10);
  });
  const voteChartAmounts2 = votesWeekly.map((item) => {
    return item[1];
  });

  const weekHandler = () => {
    setMonthState(false);
    setWeekState(true);
    setActive1(true);
    setActive2(false);
  };

  const monthHandler = () => {
    setWeekState(false);
    setMonthState(true);
    setActive2(true);
    setActive1(false);
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

  const voteChartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            family: "'Roboto', sans-serif",
          },
          color: "#8b949e",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: {
            family: "'Roboto', sans-serif",
          },
          color: "#8b949e",
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "",
      },
      title: {
        display: false,
        text: "Unique Proposals",
        font: {
          size: 18,
          family: "'Roboto', sans-serif",
          weight: "bold",
        },
        color: "#ffffff",
      },
    },
  };

  const voteChartData = {
    labels: voteChartDates,
    datasets: [
      {
        data: voteChartAmounts,
        backgroundColor: "#ffab33",
        borderColor: ["#4b423f"],
        borderWidth: 0.75,
      },
    ],
  };

  const voteChartData2 = {
    labels: voteChartDates2,
    datasets: [
      {
        data: voteChartAmounts2,
        backgroundColor: "#ffab33",
        borderColor: ["#4b423f"],
        borderWidth: 0.75,
      },
    ],
  };

  useEffect(() => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );

    const queryVotesMonthly = {
      sql: "SELECT date_trunc('month', proposal_start_time) as month, count(DISTINCT(voter)) as voter_count from ethereum.core.ez_snapshot GROUP BY month ORDER BY month",
      ttlMinutes: 10,
    };

    const resultVotesMonthly = flipside.query
      .run(queryVotesMonthly)
      .then((records) => {
        setVotesMonthly(records.rows);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );

    const queryVotesWeekly = {
      sql: "SELECT date_trunc('week', proposal_start_time) as week, count(DISTINCT(voter)) as voter_count from ethereum.core.ez_snapshot GROUP BY week ORDER BY week",
      ttlMinutes: 10,
    };

    const resultVotesWeekly = flipside.query
      .run(queryVotesWeekly)
      .then((records) => {
        setVotesWeekly(records.rows);
      });
  }, []);

  return (
    <div className="single-main">
      {loading ? (
        <div className="loader-blank"></div>
      ) : (
        <>
          <div className="title-date">
            <div className="table-title">
              <h1>Trends: &nbsp;Unique Voters</h1>
            </div>
            <div className="date-toggle">
              <button
                style={{ color: active1 ? "#418ade" : "#ffffff" }}
                onClick={weekHandler}
              >
                Weekly
              </button>
              <button
                style={{ color: active2 ? "#418ade" : "#ffffff" }}
                onClick={monthHandler}
              >
                Monthly
              </button>
            </div>
          </div>
          {weekState && (
            <div className="chart-area">
              <Bar options={voteChartOptions} data={voteChartData2} />
            </div>
          )}
          {monthState && (
            <div className="chart-area">
              <Bar options={voteChartOptions} data={voteChartData} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrendsVote;
