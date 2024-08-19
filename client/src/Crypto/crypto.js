import { useContext } from "react";
import "./crypto.css";
import { cryptoContext } from "./cryptoContext";
const CryptoList = () => {
  const { cryptoData } = useContext(cryptoContext);

  return (
    <div className="crypto-container">
      <div className="crypto-header">Crypto Currency List</div>
      <div className="crypto-list-container">
        <table className="top-crypto-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Last Price</th>
              <th>Price Change</th>
              <th>Change %</th>
              <th>Volume</th>
              <th>Quantity</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#e6f7ff",
                }}
              >
                <td
                  style={{
                    color: crypto.priceChangePercent < 0 ? "red" : "green",
                  }}
                >
                  {crypto.symbol}
                </td>
                <td>{crypto.lastPrice} BTC</td>
                <td>{crypto.priceChange}</td>
                <td
                  style={{
                    color: crypto.priceChangePercent < 0 ? "red" : "green",
                  }}
                >
                  {crypto.priceChangePercent}%
                </td>
                <td>{crypto.volume}</td>
                <td>
                  <input type="number" placeholder="Enter Qty" />
                </td>
                <td>
                  <button>Buy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoList;
