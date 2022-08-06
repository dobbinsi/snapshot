import flipjawn from "../logos/flipside.png";

const Footer = () => {
  return (
    <div className="footer">
      <h3>
        Built by <a href="https://twitter.com/web3_analyst">Jess the Analyst</a>&nbsp;
        & &nbsp;<a href="https://twitter.com/dawbyinz">d0bby</a>
      </h3>
      <div className="logo-footer">
        <h2 className="footer-bigtxt">Powered by</h2>
        <a href="https://flipsidecrypto.xyz/">
          {" "}
          <img src={flipjawn} className="flipside-logo" alt="flipside" />{" "}
        </a>
      </div>
    </div>
  );
};

export default Footer;
