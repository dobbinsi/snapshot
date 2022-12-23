import React, { useState, useEffect } from "react";
import { Flipside } from "@flipsidecrypto/sdk";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const DoubleDonut = () => {
  const [distSpaces, setDistSpaces] = useState([]);
  const [distVoters, setDistVoters] = useState([]);

  const distSpacesLevels = distSpaces.map((item) => {
    return item[0];
  });
  const distSpacesCount = distSpaces.map((item) => {
    return item[1];
  });
  const distVotersLevels = distVoters.map((item) => {
    return item[0];
  });
  const distVotersCount = distVoters.map((item) => {
    return item[1];
  });

  const distSpacesData = {
    labels: distSpacesLevels,
    datasets: [
      {
        label: "# of Spaces",
        data: distSpacesCount,
        backgroundColor: [
          "#ffab33",
          "#fdbb84",
          "#f1d1a6",
          "#fffdc2",
          "#fff7ec",
        ],
        borderColor: ["#4b423f"],
        borderWidth: 1.5,
      },
    ],
  };

  const distSpacesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          font: {
            size: 11,
            family: "'Roboto', sans-serif",
          },
          color: "#8b949e",
        },
      },
      title: {
        display: true,
        text: "Spaces by Total Proposals",
        font: {
          size: 18,
          family: "'Roboto', sans-serif",
          weight: "lighter",
        },
        color: "#8b949e",
      },
    },
  };

  const distVotersData = {
    labels: distVotersLevels,
    datasets: [
      {
        label: "# of Voters",
        data: distVotersCount,
        backgroundColor: [
          "#ffab33",
          "#fdbb84",
          "#f1d1a6",
          "#fffdc2",
          "#fff7ec",
        ],
        borderColor: ["#4b423f"],
        borderWidth: 1.5,
      },
    ],
  };

  const distVotersOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          font: {
            size: 11,
            family: "'Roboto', sans-serif",
          },
          color: "#8b949e",
        },
      },
      title: {
        display: true,
        text: "Voters by Total Votes",
        font: {
          size: 18,
          family: "'Roboto', sans-serif",
          weight: "lighter",
        },
        color: "#8b949e",
      },
    },
  };

  ChartJS.register(ArcElement, Title, Tooltip, Legend);

  useEffect(() => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );

    const queryDistSpaces = {
      sql: "with a as (select count(distinct ID) as tx, SPACE_ID from ethereum.core.ez_snapshot group by 2 order by 1 desc) select case when tx = 1 then '1 vote' when tx between 2 and 10 then '2-10 votes' when tx between 11 and 50 then '11-50 votes' when tx between 51 and 100 then '51-100 votes' when tx > 100 then '100+ votes' end as number_tx, count(distinct SPACE_ID) from a group by 1",
      ttlMinutes: 60,
    };

    const resultDistSpaces = flipside.query
      .run(queryDistSpaces)
      .then((records) => {
        setDistSpaces(records.rows);
      });
  }, []);

  useEffect(() => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );

    const queryDistVoters = {
      sql: "with a as (select count(distinct ID) as tx, SPACE_ID from ethereum.core.ez_snapshot group by 2 order by 1 desc) select case when tx = 1 then '1 vote' when tx between 2 and 10 then '2-10 votes' when tx between 11 and 50 then '11-50 votes' when tx between 51 and 100 then '51-100 votes' when tx > 100 then '100+ votes' end as number_tx, count(distinct SPACE_ID) from a group by 1",
      ttlMinutes: 60,
    };

    const resultDistVoters = flipside.query
      .run(queryDistVoters)
      .then((records) => {
        setDistVoters(records.rows);
      });
  }, []);

  return (
    <div className="breakdown">
      <div className="title-date">
        <div className="table-title">
          <h1>Trends: &nbsp;Snapshot Usage</h1>
        </div>
      </div>
      <div className="double">
        <div className="small-chart-area">
          <Doughnut options={distSpacesOptions} data={distSpacesData} />
        </div>
        <div className="small-chart-area">
          <Doughnut options={distVotersOptions} data={distVotersData} />
        </div>
      </div>
    </div>
  );
};

export default DoubleDonut;
