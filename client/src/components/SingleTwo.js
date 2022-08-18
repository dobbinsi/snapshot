import React, { useState, useEffect } from "react";

const SingleTwo = () => {
  const [popTableData, setPopTableData] = useState([]);

  return (
    <div className="single">
      <div className="title-date">
        <div className="table-title">
          <h1>Leaderboard: &nbsp;Most Active Governors</h1>
          <h3>
            vvv [Dropdown - Select Space from List Above & use as query param]
          </h3>
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
                <th className="first-column">Wallet Address</th>
                <th>Proposals</th>
                <th>% Passed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
              </tr>
              {/* {popTableData.map((validator, index) => (
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
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SingleTwo;
