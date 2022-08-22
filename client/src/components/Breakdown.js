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

const getQuery1 = (space) => {
  const query = {
    sql: `SELECT count(DISTINCT space_ID) AS Active_Spaces, count(DISTINCT proposal_id) AS total_proposals, count(DISTINCT proposal_author) AS proposal_authors, count(DISTINCT voter) AS unique_voters FROM ethereum.core.ez_snapshot WHERE space_id = '${space}'`,
    ttlMinutes: 10,
  };
  return query;
};

const getQuery2 = (space) => {
  const query = {
    sql: `select proposal_title, count(distinct(id)) as vote_count, row_number () over (order by vote_count desc) as count from ethereum.core.ez_snapshot where space_id = '${space}' group by 1 order by 2 desc limit 10`,
    ttlMinutes: 10,
  };
  return query;
};

const getQuery3 = (space) => {
  const query = {
    sql: `with base as (select voter, min(proposal_start_time) as first_tx from ethereum.core.ez_snapshot where space_id = '${space}' group by 1), base2 as (select voter, date_trunc('month', first_tx) as month, 1 as counts from base) select month, sum(counts) as numbering from base2 group by 1`,
    ttlMinutes: 10,
  };
  return query;
};

const getQuery4 = (space) => {
  const query = {
    sql: `SELECT voter, min(vote_timestamp) as first_vote, count(DISTINCT id) as total_votes from ethereum.core.ez_snapshot where space_id = '${space}' group by 1 order by 3 desc limit 10`,
    ttlMinutes: 10,
  };
  return query;
};

const Breakdown = () => {
  const [activeSpaces, setActiveSpaces] = useState([]);
  const [totalProps, setTotalProps] = useState([]);
  const [uniqueVoters, setUniqueVoters] = useState([]);
  const [propAuthors, setPropAuthors] = useState([]);
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
  const [topTen, setTopTen] = useState([]);

  const [search, setSearch] = useState("cake.eth");

  const handleChange = (e) => {
    setSearch(e.target.value);
    runSDKApi1(e.target.value);
    runSDKApi2(e.target.value);
    runSDKApi3(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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

  const runSDKApi1 = async (space) => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );
    const query = getQuery1(space);
    const result = flipside.query.run(query).then((records) => {
      setActiveSpaces(records.rows[0][0]);
      setTotalProps(records.rows[0][1]);
      setPropAuthors(records.rows[0][2]);
      setUniqueVoters(records.rows[0][3]);
    });
  };

  const runSDKApi2 = async (space) => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );
    const query = getQuery2(space);
    const result = flipside.query.run(query).then((records) => {
      setPropsMonthly(records.rows);
    });
  };

  const runSDKApi3 = async (space) => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );
    const query = getQuery3(space);
    const result = flipside.query.run(query).then((records) => {
      setVotesMonthly(records.rows);
    });
  };

  const runSDKApi4 = async (space) => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );
    const query = getQuery4(space);
    const result = flipside.query.run(query).then((records) => {
      console.log(records.rows);
      setTopTen(records.rows);
    });
  };

  return (
    <div className="breakdown">
      <div className="title-date">
        <h1>Breakdown: &nbsp;Individual Spaces</h1>
        <div className="breakdown-title">
          <h1>{search}</h1>
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-form">
              <input
                className="space-input"
                type="text"
                placeholder="Search Spaces by Name..."
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="triple">
        <div className="big-numbers">
          <h1>{totalProps.toLocaleString()}</h1>
          <h2>Total Proposals</h2>
        </div>
        <div className="big-numbers">
          <h1>{propAuthors.toLocaleString()}</h1>
          <h2>Proposal Authors</h2>
        </div>
        <div className="big-numbers">
          <h1>{uniqueVoters.toLocaleString()}</h1>
          <h2>Unique Voters</h2>
        </div>
        <div className="big-numbers">
          <h1>
            {(uniqueVoters / totalProps).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </h1>
          <h2>Average Turnout</h2>
        </div>
      </div>
      <div className="chart-area">
        <Bar options={propChartOptions} data={propChartData} />
      </div>
      <div className="chart-area">
        <Bar options={voteChartOptions} data={voteChartData} />
      </div>
      <div className="table-wrapper">
        <div className="table-scroll">
          <table className="table-main">
            <thead>
              <tr>
                <th className="first-column">Wallet Address</th>
                <th>First Vote</th>
                <th>Total Votes</th>
              </tr>
            </thead>
            <tbody>
              {topTen.map((voter, index) => (
                <tr>
                  <td>{voter[0]}</td>
                  <td className="validator-voters">{voter[1].slice(0, 10)}</td>
                  <td className="validator-shares">
                    {voter[2].toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Breakdown;
