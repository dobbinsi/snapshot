import React, { useState, useEffect } from "react";
import { Flipside } from "@flipsidecrypto/sdk";
import ScaleLoader from "react-spinners/ScaleLoader";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const LeaderboardSpaces = () => {
  const [sevenData, setSevenData] = useState([]);
  const [thirtyData, setThirtyData] = useState([]);
  const [ninetyData, setNinetyData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [sevenDataProps, setSevenDataProps] = useState([]);
  const [thirtyDataProps, setThirtyDataProps] = useState([]);
  const [ninetyDataProps, setNinetyDataProps] = useState([]);
  const [yearDataProps, setYearDataProps] = useState([]);
  const [sevenState, setSevenState] = useState(true);
  const [thirtyState, setThirtyState] = useState(false);
  const [ninetyState, setNinetyState] = useState(false);
  const [yearState, setYearState] = useState(false);
  const [voterSort, setVoterSort] = useState(true);
  const [propSort, setPropSort] = useState(false);
  const [loading, setLoading] = useState(true);

  const sevenHandler = () => {
    setNinetyState(false);
    setThirtyState(false);
    setYearState(false);
    setSevenState(true);
  };

  const thirtyHandler = () => {
    setSevenState(false);
    setNinetyState(false);
    setYearState(false);
    setThirtyState(true);
  };

  const ninetyHandler = () => {
    setSevenState(false);
    setThirtyState(false);
    setYearState(false);
    setNinetyState(true);
  };

  const yearHandler = () => {
    setSevenState(false);
    setThirtyState(false);
    setNinetyState(false);
    setYearState(true);
  };

  const propSortHandler = () => {
    setVoterSort(false);
    setPropSort(true);
  };

  const voterSortHandler = () => {
    setPropSort(false);
    setVoterSort(true);
  };

  useEffect(() => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );

    const querySeven = {
      sql: "SELECT space_id, count(DISTINCT proposal_id) AS proposals, count(DISTINCT voter) AS unique_voters FROM ethereum.core.ez_snapshot WHERE proposal_start_time >= CURRENT_DATE - 7 GROUP BY space_id ORDER BY unique_voters DESC LIMIT 10",
      ttlMinutes: 10,
    };

    const resultSeven = flipside.query.run(querySeven).then((records) => {
      setSevenData(records.rows);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );

    const queryThirty = {
      sql: "SELECT space_id, count(DISTINCT proposal_id) AS proposals, count(DISTINCT voter) AS unique_voters FROM ethereum.core.ez_snapshot WHERE proposal_start_time >= CURRENT_DATE - 30 GROUP BY space_id ORDER BY unique_voters DESC LIMIT 10",
      ttlMinutes: 10,
    };

    const resultThirty = flipside.query.run(queryThirty).then((records) => {
      setThirtyData(records.rows);
    });
  }, []);

  useEffect(() => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );

    const queryNinety = {
      sql: "SELECT space_id, count(DISTINCT proposal_id) AS proposals, count(DISTINCT voter) AS unique_voters FROM ethereum.core.ez_snapshot WHERE proposal_start_time >= CURRENT_DATE - 90 GROUP BY space_id ORDER BY unique_voters DESC LIMIT 10",
      ttlMinutes: 10,
    };

    const resultNinety = flipside.query.run(queryNinety).then((records) => {
      setNinetyData(records.rows);
    });
  }, []);

  useEffect(() => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );

    const queryYear = {
      sql: "SELECT space_id, count(DISTINCT proposal_id) AS proposals, count(DISTINCT voter) AS unique_voters FROM ethereum.core.ez_snapshot WHERE proposal_start_time >= CURRENT_DATE - 365 GROUP BY space_id ORDER BY unique_voters DESC LIMIT 10",
      ttlMinutes: 10,
    };

    const resultYear = flipside.query.run(queryYear).then((records) => {
      setYearData(records.rows);
    });
  }, []);

  useEffect(() => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );

    const querySevenProps = {
      sql: "SELECT space_id, count(DISTINCT proposal_id) AS proposals, count(DISTINCT voter) AS unique_voters FROM ethereum.core.ez_snapshot WHERE proposal_start_time >= CURRENT_DATE - 7 GROUP BY space_id ORDER BY proposals DESC LIMIT 10",
      ttlMinutes: 10,
    };

    const resultSevenProps = flipside.query
      .run(querySevenProps)
      .then((records) => {
        setSevenDataProps(records.rows);
      });
  }, []);

  useEffect(() => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );

    const queryThirtyProps = {
      sql: "SELECT space_id, count(DISTINCT proposal_id) AS proposals, count(DISTINCT voter) AS unique_voters FROM ethereum.core.ez_snapshot WHERE proposal_start_time >= CURRENT_DATE - 30 GROUP BY space_id ORDER BY proposals DESC LIMIT 10",
      ttlMinutes: 10,
    };

    const resultThirtyProps = flipside.query
      .run(queryThirtyProps)
      .then((records) => {
        setThirtyDataProps(records.rows);
      });
  }, []);

  useEffect(() => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );

    const queryNinetyProps = {
      sql: "SELECT space_id, count(DISTINCT proposal_id) AS proposals, count(DISTINCT voter) AS unique_voters FROM ethereum.core.ez_snapshot WHERE proposal_start_time >= CURRENT_DATE - 90 GROUP BY space_id ORDER BY proposals DESC LIMIT 10",
      ttlMinutes: 10,
    };

    const resultNinetyProps = flipside.query
      .run(queryNinetyProps)
      .then((records) => {
        setNinetyDataProps(records.rows);
      });
  }, []);

  useEffect(() => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );

    const queryYearProps = {
      sql: "SELECT space_id, count(DISTINCT proposal_id) AS proposals, count(DISTINCT voter) AS unique_voters FROM ethereum.core.ez_snapshot WHERE proposal_start_time >= CURRENT_DATE - 365 GROUP BY space_id ORDER BY proposals DESC LIMIT 10",
      ttlMinutes: 10,
    };

    const resultYearProps = flipside.query
      .run(queryYearProps)
      .then((records) => {
        setYearDataProps(records.rows);
      });
  }, []);

  return (
    <div className="single-main">
      {loading ? (
        <div className="loader">
          <ScaleLoader height={50} color={"#ffab33"} className="loader" />
        </div>
      ) : (
        <>
          <div className="title-date">
            <div className="table-title">
              <h1>Leaderboard: &nbsp;Most Active Spaces</h1>
            </div>
            <div className="date-toggle">
              <button className="sevenday" onClick={sevenHandler}>
                7d
              </button>
              <button className="thirtyday" onClick={thirtyHandler}>
                30d
              </button>
              <button className="ninetyday" onClick={ninetyHandler}>
                90d
              </button>
              <button className="yearday" onClick={yearHandler}>
                365d
              </button>
            </div>
          </div>
          {voterSort ? (
            <div className="table-wrapper">
              <div className="table-scroll">
                <table className="table-main">
                  <thead>
                    <tr>
                      <th className="first-column">Space ID</th>
                      <th className="sorter" onClick={propSortHandler}>
                        Proposals
                      </th>
                      <th className="sorter" onClick={voterSortHandler}>
                        Unique Voters
                      </th>
                    </tr>
                  </thead>
                  {sevenState && (
                    <tbody>
                      {sevenData.map((space, index) => (
                        <tr>
                          <td>{space[0]}</td>
                          <td className="validator-voters">
                            {space[1].toLocaleString()}
                          </td>
                          <td className="validator-shares">
                            {space[2].toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                  {thirtyState && (
                    <tbody>
                      {thirtyData.map((space, index) => (
                        <tr>
                          <td>{space[0]}</td>
                          <td className="validator-voters">
                            {space[1].toLocaleString()}
                          </td>
                          <td className="validator-shares">
                            {space[2].toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                  {ninetyState && (
                    <tbody>
                      {ninetyData.map((space, index) => (
                        <tr>
                          <td>{space[0]}</td>
                          <td className="validator-voters">
                            {space[1].toLocaleString()}
                          </td>
                          <td className="validator-shares">
                            {space[2].toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                  {yearState && (
                    <tbody>
                      {yearData.map((space, index) => (
                        <tr>
                          <td>{space[0]}</td>
                          <td className="validator-voters">
                            {space[1].toLocaleString()}
                          </td>
                          <td className="validator-shares">
                            {space[2].toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          ) : (
            <div className="table-wrapper">
              <div className="table-scroll">
                <table className="table-main">
                  <thead>
                    <tr>
                      <th className="first-column">Space ID</th>
                      <th className="sorter" onClick={propSortHandler}>
                        Proposals
                      </th>
                      <th className="sorter" onClick={voterSortHandler}>
                        Unique Voters
                      </th>
                    </tr>
                  </thead>
                  {sevenState && (
                    <tbody>
                      {sevenDataProps.map((space, index) => (
                        <tr>
                          <td>{space[0]}</td>
                          <td className="validator-voters">
                            {space[1].toLocaleString()}
                          </td>
                          <td className="validator-shares">
                            {space[2].toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                  {thirtyState && (
                    <tbody>
                      {thirtyDataProps.map((space, index) => (
                        <tr>
                          <td>{space[0]}</td>
                          <td className="validator-voters">
                            {space[1].toLocaleString()}
                          </td>
                          <td className="validator-shares">
                            {space[2].toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                  {ninetyState && (
                    <tbody>
                      {ninetyDataProps.map((space, index) => (
                        <tr>
                          <td>{space[0]}</td>
                          <td className="validator-voters">
                            {space[1].toLocaleString()}
                          </td>
                          <td className="validator-shares">
                            {space[2].toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                  {yearState && (
                    <tbody>
                      {yearDataProps.map((space, index) => (
                        <tr>
                          <td>{space[0]}</td>
                          <td className="validator-voters">
                            {space[1].toLocaleString()}
                          </td>
                          <td className="validator-shares">
                            {space[2].toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LeaderboardSpaces;
