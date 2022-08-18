import React, { useState, useEffect } from "react";
import { Flipside } from "@flipsidecrypto/sdk";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const BigNumbers = () => {
  const [activeSpaces, setActiveSpaces] = useState([]);
  const [totalProps, setTotalProps] = useState([]);
  const [uniqueVoters, setUniqueVoters] = useState([]);

  useEffect(() => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );

    const queryActiveSpaces = {
      sql: "SELECT count(DISTINCT space_ID) AS Active_Spaces FROM ethereum.core.ez_snapshot",
      ttlMinutes: 10,
    };

    const resultActiveSpaces = flipside.query
      .run(queryActiveSpaces)
      .then((records) => {
        setActiveSpaces(records.rows[0][0]);
      });
  }, []);

  useEffect(() => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );

    const queryTotalProps = {
      sql: "SELECT count(DISTINCT proposal_id) AS total_proposals FROM ethereum.core.ez_snapshot",
      ttlMinutes: 10,
    };

    const resultTotalProps = flipside.query
      .run(queryTotalProps)
      .then((records) => {
        setTotalProps(records.rows[0][0]);
      });
  }, []);

  useEffect(() => {
    const flipside = new Flipside(
      API_KEY,
      "https://node-api.flipsidecrypto.com"
    );

    const queryUniqueVoters = {
      sql: "SELECT count(DISTINCT voter) AS unique_voters FROM ethereum.core.ez_snapshot",
      ttlMinutes: 10,
    };

    const resultUniqueVoters = flipside.query
      .run(queryUniqueVoters)
      .then((records) => {
        setUniqueVoters(records.rows[0][0]);
      });
  }, []);

  return (
    <div className="triple">
      <div className="big-numbers">
        <h1>{activeSpaces.toLocaleString()}</h1>
        <h2>Active Spaces</h2>
      </div>
      <div className="big-numbers">
        <h1>{totalProps.toLocaleString()}</h1>
        <h2>Total Proposals</h2>
      </div>
      <div className="big-numbers">
        <h1>{uniqueVoters.toLocaleString()}</h1>
        <h2>Unique Voters</h2>
      </div>
    </div>
  );
};

export default BigNumbers;
