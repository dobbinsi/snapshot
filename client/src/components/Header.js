import snapjawn from "../logos/snapshot.svg";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="header-main">
      <div>
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
      </div>
      <div className="txt-main">
        <h1>snapshot analytics</h1>
      </div>
    </div>
  );
};

export default Header;
