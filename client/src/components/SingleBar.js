import React, { useState, useEffect } from "react";
import axios from "axios";
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

const SingleBar = () => {
  const [nftData, setNftData] = useState([]);
  const nftChartDates = nftData.map((item) => {
    return item["DAYS"];
  });
  const nftChartAmounts = nftData.map((item) => {
    return item["NET_NFT_MINTED"];
  });
  const normDates = nftChartDates.reverse();
  const normAmounts = nftChartAmounts.reverse();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

  const nftChartOptions = {
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
        text: "Unique Voters [Overlay Line Chart for Participation Rate Over Time]",
        font: {
          size: 18,
          family: "'Roboto', sans-serif",
          weight: "lighter",
        },
        color: "#8b949e",
      },
    },
  };

  const nftChartData = {
    labels: normDates,
    datasets: [
      {
        data: normAmounts,
        backgroundColor: "#fdf26f",
        borderColor: ["#4b423f"],
        borderWidth: 0.75,
      },
    ],
  };

  useEffect(() => {
    axios
      .get(
        "https://node-api.flipsidecrypto.com/api/v2/queries/8d970e8f-f638-4e2d-a7b1-3e38e16f76b3/data/latest"
      )
      .then((res) => {
        setNftData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="single-bar">
      <div className="title-date-bar">
        <h1 className="bar-title">
          Breakdown: Unique Voters & Average Participation Rate
        </h1>
        <h3 className="bar-title">vvv [Dropdown - Select Space from List Above & use as query param]</h3>
      </div>
      <div className="chart-area">
        <Bar options={nftChartOptions} data={nftChartData} />
      </div>
    </div>
  );
};

export default SingleBar;
