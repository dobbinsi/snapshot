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

const TrendsProp = () => {
  const [propsMonthly, setPropsMonthly] = useState([]);
  const [propsWeekly, setPropsWeekly] = useState([]);
  const [weekState, setWeekState] = useState(false);
  const [monthState, setMonthState] = useState(true);

  const propChartDates = propsMonthly.map((item) => {
    return item[0].slice(0, 7);
  });
  const propChartAmounts = propsMonthly.map((item) => {
    return item[1];
  });
  const propChartDates2 = propsWeekly.map((item) => {
    return item[0].slice(0, 10);
  });
  const propChartAmounts2 = propsWeekly.map((item) => {
    return item[1];
  });

  const weekHandler = () => {
    setMonthState(false);
    setWeekState(true);
  };

  const monthHandler = () => {
    setWeekState(false);
    setMonthState(true);
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

  const propChartOptions = {
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

  const propChartData = {
    labels: propChartDates,
    datasets: [
      {
        data: propChartAmounts,
        backgroundColor: "#ffab33",
        borderColor: ["#4b423f"],
        borderWidth: 0.75,
      },
    ],
  };

  const propChartData2 = {
    labels: propChartDates2,
    datasets: [
      {
        data: propChartAmounts2,
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

    const queryPropsMonthly = {
      sql: "SELECT date_trunc('month', proposal_start_time) as month, count(DISTINCT(proposal_id)) as proposal_count from ethereum.core.ez_snapshot GROUP BY month ORDER BY month",
      ttlMinutes: 10,
    };

    const resultPropsMonthly = flipside.query
      .run(queryPropsMonthly)
      .then((records) => {
        setPropsMonthly(records.rows);
      });
  }, []);

  useEffect(() => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );

    const queryPropsWeekly = {
      sql: "SELECT date_trunc('week', proposal_start_time) as week, count(DISTINCT(proposal_id)) as proposal_count from ethereum.core.ez_snapshot GROUP BY week ORDER BY week",
      ttlMinutes: 10,
    };

    const resultPropsWeekly = flipside.query
      .run(queryPropsWeekly)
      .then((records) => {
        setPropsWeekly(records.rows);
      });
  }, []);

  return (
    <div className="single-main">
      <div className="title-date">
        <div className="table-title">
          <h1>Trends: &nbsp;Unique Proposals</h1>
        </div>
        <div className="date-toggle">
          <button className="weekly" onClick={weekHandler}>
            Weekly
          </button>
          <button className="monthly" onClick={monthHandler}>
            Monthly
          </button>
        </div>
      </div>
      {weekState && (
        <div className="chart-area">
          <Bar options={propChartOptions} data={propChartData2} />
        </div>
      )}
      {monthState && (
        <div className="chart-area">
          <Bar options={propChartOptions} data={propChartData} />
        </div>
      )}
    </div>
  );
};

export default TrendsProp;