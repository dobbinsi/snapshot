import "./App.css";
import BigNumbers from "./components/BigNumbers";
import LeaderboardSpaces from "./components/LeaderboardSpaces";
import LeaderboardUsers from "./components/LeaderboardUsers";
import TrendsProp from "./components/TrendsProp";
import TrendsVote from "./components/TrendsVote";
import Breakdown from "./components/Breakdown";
import React, { useState } from "react";
import snapjawn from "./logos/snapshot.svg";
import { motion } from "framer-motion";
import { Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Analytics from "@vercel/analytics";

const useStyles = makeStyles({
  root: {
    width: "50px",
    height: "24px",
    padding: "0px",
  },
  switchBase: {
    color: "#818181",
    padding: "1px",
    "&$checked": {
      "& + $track": {
        backgroundColor: "#ffab33",
      },
    },
  },
  thumb: {
    color: "white",
    width: "20px",
    height: "20px",
    margin: "1px",
  },
  track: {
    borderRadius: "20px",
    backgroundColor: "#818181",
    opacity: "1 !important",
    "&:after, &:before": {
      color: "white",
      fontSize: "11px",
      position: "absolute",
      top: "6px",
    },
    "&:after": {
      left: "8px",
    },
    "&:before": {
      right: "7px",
    },
  },
  checked: {
    color: "#23bf58 !important",
    transform: "translateX(26px) !important",
  },
});

function App() {
  const [allState, setAllState] = useState({
    checkedA: false,
  });
  const [oneState, setOneState] = useState(false);
  const classes = useStyles();

  const allHandler = (e) => {
    setAllState({ ...allState, [e.target.name]: e.target.checked });
    setOneState(!oneState);
  };

  return (
    <div className="wrapper">
      <div className="header-main">
        <div className="logo">
          <a href="https://snapshot.org/#/">
            {" "}
            <motion.img
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              src={snapjawn}
              className="snapshot-logo"
              alt="snapshot"
            />{" "}
          </a>
          <h1>Snapshot Analytics</h1>
        </div>
        <div className="txt-main">
          <FormControlLabel
            control={
              <Switch
                classes={{
                  root: classes.root,
                  switchBase: classes.switchBase,
                  thumb: classes.thumb,
                  track: classes.track,
                  checked: classes.checked,
                }}
                checked={allState.checkedA}
                onChange={allHandler}
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            }
            label="Search"
            labelPlacement="top"
          />
        </div>
      </div>
      {oneState ? (
        <Breakdown />
      ) : (
        <>
          <BigNumbers />
          <LeaderboardSpaces />
          <LeaderboardUsers />
          <TrendsProp />
          <TrendsVote />
        </>
      )}
      <Analytics />
    </div>
  );
}

export default App;
