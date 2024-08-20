import { useContext, useEffect } from "react";
import "./portfolio.css";
import { cryptoContext } from "../Crypto/cryptoContext";

const Portfolio = () => {
  const { buyCryptoList, cryptoData } = useContext(cryptoContext);
  useEffect(()=>{
    
  },[buyCryptoList])
  return (
    <div className="portfolio-container">
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Price Bought</th>
            <th>Estimation</th>
          </tr>
        </thead>
        <tbody>
          {buyCryptoList.map((crypto, index) => (
            <tr
              key={crypto.symbol}
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
              <td>{crypto.quantity}</td>
              <td>{crypto.price} BTC</td>
              <td>
                {(() => {
                  const matchingCrypto = cryptoData.find(
                    (data) => data.symbol === crypto.symbol
                  );
                  const currentPrice = parseFloat(
                    matchingCrypto?.lastPrice || 0
                  );
                  const purchasePrice = parseFloat(crypto.price || 0);
                  const quantityBought = parseFloat(crypto.quantity || 0);

                  return (currentPrice - purchasePrice) * quantityBought;
                })()}{" "}
                BTC
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
