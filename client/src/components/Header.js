import snapjawn from "../logos/snapshot.svg";

const Header = () => {
  return (
    <div className="header-main">
      <div className="logo-main">
        <a href="https://snapshot.org/#/">
          {" "}
          <img
            src={snapjawn}
            className="snapshot-logo"
            alt="snapshot"
          />{" "}
        </a>
      </div>
      <div className="txt-main">
        <h1 className="header-bigtxt">snapshot analytics</h1>
      </div>
    </div>
  );
};

export default Header;
