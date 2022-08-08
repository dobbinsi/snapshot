import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const Double = () => {
  const [participation, setParticipation] = useState([]);

  participation.sort(compareTwo);

  const partChartWallets = participation.map((item) => {
    return item["WALLET_COUNT"];
  });
  const partChartStatus = participation.map((item) => {
    return item["WALLET_CATEGORY"];
  });

  function compareTwo(a, b) {
    const nameA = a.WALLET_CATEGORY;
    const nameB = b.WALLET_CATEGORY;

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

  const partChartData = {
    labels: partChartStatus,
    datasets: [
      {
        label: "# of Spaces",
        data: partChartWallets,
        backgroundColor: ["#ffab33", "#eec551", "#fdf26f", "#feffa0"],
        borderColor: ["#4b423f"],
        borderWidth: 1.5,
      },
    ],
  };

  const partChartOptions1 = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          font: {
            size: 8,
            family: "'Roboto', sans-serif",
          },
          color: "#8b949e",
        },
      },
      title: {
        display: true,
        text: "Most Active by Category (7d)",
        font: {
          size: 18,
          family: "'Roboto', sans-serif",
          weight: "lighter",
        },
        color: "#8b949e",
      },
    },
  };

  const partChartOptions2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          font: {
            size: 8,
            family: "'Roboto', sans-serif",
          },
          color: "#8b949e",
        },
      },
      title: {
        display: true,
        text: "Most Active by Category (30d)",
        font: {
          size: 18,
          family: "'Roboto', sans-serif",
          weight: "lighter",
        },
        color: "#8b949e",
      },
    },
  };

  const partChartOptions3 = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          font: {
            size: 8,
            family: "'Roboto', sans-serif",
          },
          color: "#8b949e",
        },
      },
      title: {
        display: true,
        text: "Most Active by Category (90d)",
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
    axios
      .get(
        "https://node-api.flipsidecrypto.com/api/v2/queries/b27f6c71-4747-4a33-9923-eac54af3bf66/data/latest"
      )
      .then((res) => {
        setParticipation(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="double">
      <div className="small-chart-area">
        <Doughnut options={partChartOptions1} data={partChartData} />
      </div>
      <div className="small-chart-area">
        <Doughnut options={partChartOptions2} data={partChartData} />
      </div>
      <div className="small-chart-area">
        <Doughnut options={partChartOptions3} data={partChartData} />
        <div className="footnote"></div>
      </div>
    </div>
  );
};

export default Double;
