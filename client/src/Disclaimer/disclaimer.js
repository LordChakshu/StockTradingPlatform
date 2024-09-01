import React from "react";
import { Link } from "react-router-dom";
import './disclaimer.css'
function Disclaimer() {
  return (
    <div className="disclaimer">
      <h2>Welcome to the Stock Trading Practice Platform!</h2>
      <p>
        This is your space to practice buying and selling stocks, honing your
        investment strategies, and analyzing your techniques—all in a risk-free
        environment. Please note that while the data on this platform is
        frequently updated throughout the day, it does not include live data
        from the markets due to the absence of WebSocket APIs. As such, there
        may be slight delays or discrepancies compared to real-time market
        conditions.
      </p>
      <p>
        Use this platform to sharpen your skills and gain confidence before
        entering the real market with real money. Remember, this is a learning
        tool—results here may not perfectly mirror those in actual trading.
      </p>
      <p>Happy practicing, and invest wisely!</p>
      <p>
        <strong>Project created by <Link to="https://github.com/LordChakshu" target="_blank" style={{ color: "#0C66E4" }}>Chakshu Chaturvedi</Link>.</strong>
      </p>
      <span style={{textAlign:"center"}}>Visit : <Link to="/home" style={{ color: "#0C66E4" }}>Home</Link></span>
    </div>
  );
}

export default Disclaimer;
