import React, { useState, useEffect } from "react";
import axios from "axios";

const SingleMain = () => {
  const [popTableData, setPopTableData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://node-api.flipsidecrypto.com/api/v2/queries/ce3506f4-267d-45a8-9df4-96f926bbf159/data/latest"
      )
      .then((res) => {
        setPopTableData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="single-main">
      <div className="title-date">
        <div className="table-title">
          <h1>Leaderboard: Most Active Spaces</h1>
        </div>
        <div className="date-toggle">
          <p>7d &nbsp; 30d &nbsp; 90d</p>
        </div>
      </div>
      <div className="table-wrapper">
        <div className="table-scroll">
          <table className="table-main">
            <thead>
              <tr>
                <th className="first-column">Space ID</th>
                <th>Proposals</th>
                <th>Unique Voters</th>
              </tr>
            </thead>
            <tbody>
              {popTableData.map((validator, index) => (
                <tr>
                  <td>{validator.VALIDATOR_NAMES}</td>
                  <td className="validator-voters">{validator.VOTERS}</td>
                  <td className="validator-shares">
                    {validator.TOTAL_DELEGATED_SHARES.toLocaleString(
                      undefined,
                      {
                        maximumFractionDigits: 0,
                      }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="title-date">
        <h1 className="gap">Breakdown: Most Active Spaces by Category</h1>
      </div>
    </div>
  );
};

export default SingleMain;
