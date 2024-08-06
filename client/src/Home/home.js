import { useContext} from "react";
import { stockContext } from "../Stock-List/stockContext";
import { cryptoContext } from "../Crypto/cryptoContext";
import './home.css'
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { stockData } = useContext(stockContext);
  const { cryptoData } = useContext(cryptoContext);

  const {user, isAuthenticated}=useAuth0();

  return (
    <div className="homepage-container">
      <div className="header">
        <h1>Stock Trading</h1>
        { isAuthenticated ? (<span className="welcome-text">Welcome, {user?.name}</span>) : "" }
      </div>
      <div className="main-content">
        <div className="left-content">
          <div className="top-stocks-container">
            <h2>Top 10 stocks</h2>
            <div className="top-stock-list">
              <table className="top-stocks-table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Current Price</th>
                    <th>Change</th>
                    <th>Change %</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Previous Close</th>
                  </tr>
                </thead>
                <tbody>
                  {stockData.slice(0, 10).map((stock, index) => (
                    <tr
                      key={index}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#f9f9f9" : "#e6f7ff",
                      }}
                    >
                      <td>{stock.symbol}</td>
                      <td>{stock.c}$</td>
                      <td>{stock.d}</td>
                      <td>{stock.dp}%</td>
                      <td>{stock.o}</td>
                      <td>{stock.h}</td>
                      <td>{stock.l}</td>
                      <td>{stock.pc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="right-content">
          <div className="top-crypto-container">
            <h2>Top 10 Crypto</h2>
            <div className="crypto-list-container">
              <table className="top-crypto-table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Last Price</th>
                    <th>Price Change</th>
                    <th>Change %</th>
                    <th>Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoData.slice(0, 10).map((crypto, index) => (
                    <tr
                      key={index}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#f9f9f9" : "#e6f7ff",
                      }}
                    >
                      <td>{crypto.symbol}</td>
                      <td>{crypto.lastPrice}$</td>
                      <td>{crypto.priceChange}</td>
                      <td>{crypto.priceChangePercent}%</td>
                      <td>{crypto.volume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
