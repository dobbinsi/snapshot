import React, { useState, useEffect } from "react";

const BigNumbers = () => {
  return (
    <div className="triple">
      <div className="big-numbers">
        <h1>8,636</h1>
        <h4>Active Spaces</h4>
      </div>
      <div className="big-numbers">
        <h1>12,636</h1>
        <h4>Total Proposals</h4>
      </div>
      <div className="big-numbers">
        <h1>68,636</h1>
        <h4>Unique Voters</h4>
      </div>
    </div>
  );
};

export default BigNumbers;
