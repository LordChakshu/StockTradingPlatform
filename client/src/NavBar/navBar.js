import "./navBar.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const NavBar = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  return (
    <div className="navbar-container">
      <div className="logo">
        <Link to="/home">StockTradingPlatform</Link>
      </div>
      <div className="menu-items">
        <div className="item">
          <Link to="/home">Home</Link>
        </div>
        <div className="item">
          <Link to="/stocks">Stocks</Link>
        </div>
        <div className="item">
          <Link to="/crypto">Crypto</Link>
        </div>
        <div className="item">
          <Link to="/forex">Forex</Link>
        </div>

        {isAuthenticated ? (
          <div className="item">
            <Link to="/portfolio">Portfolio</Link>
          </div>
        ) : (
          ""
        )}

        <div className="item">
          {!isAuthenticated ? (
            <span
              className="item"
              onClick={(e) => {
                loginWithRedirect();
              }}
            >
              Login
            </span>
          ) : (
            <span
              className="item"
              onClick={(e) => {
                logout();
              }}
            >
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
