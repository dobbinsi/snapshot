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

const DoubleBar = () => {
  const [propsMonthly, setPropsMonthly] = useState([]);
  const [votesMonthly, setVotesMonthly] = useState([]);
  const propChartDates = propsMonthly.map((item) => {
    return item[0].slice(0, 7);
  });
  const propChartAmounts = propsMonthly.map((item) => {
    return item[1];
  });
  const voteChartDates = votesMonthly.map((item) => {
    return item[0].slice(0, 7);
  });
  const voteChartAmounts = votesMonthly.map((item) => {
    return item[1];
  });

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
        display: true,
        text: "Top 10 Proposals by Number of Voters",
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
        display: true,
        text: "New Voters by Month",
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

  useEffect(() => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );

    const queryPropsMonthly = {
      sql: "select proposal_title, count(distinct(id)) as vote_count, row_number () over (order by vote_count desc) as count from ethereum.core.ez_snapshot where space_id = 'cake.eth' group by 1 order by 2 desc limit 10",
      ttlMinutes: 60,
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

    const queryVotesMonthly = {
      sql: "with base as (select voter, min(proposal_start_time) as first_tx from ethereum.core.ez_snapshot where space_id = 'cake.eth' group by 1), base2 as (select voter, date_trunc('month', first_tx) as month, 1 as counts from base) select month, sum(counts) as numbering from base2 group by 1",
      ttlMinutes: 60,
    };

    const resultVotesMonthly = flipside.query
      .run(queryVotesMonthly)
      .then((records) => {
        setVotesMonthly(records.rows);
      });
  }, []);

  return (
    <div className="double">
      <div className="small-chart-area">
        <Bar options={propChartOptions} data={propChartData} />
      </div>
      <div className="small-chart-area">
        <Bar options={voteChartOptions} data={voteChartData} />
      </div>
    </div>
  );
};

export default DoubleBar;
