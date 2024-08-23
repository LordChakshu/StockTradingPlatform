import { useContext, useEffect } from "react";
import "./portfolio.css";
import { cryptoContext } from "../Crypto/cryptoContext";
import { stockContext } from "../Stock-List/stockContext";

const Portfolio = () => {
  const { buyCryptoList, cryptoData } = useContext(cryptoContext);
  const { stockBuyList,topSPStocks} = useContext(stockContext);
  useEffect(() => {}, [buyCryptoList,stockBuyList]);
  return (
    <>
      <div className="crypto-portfolio-container">
        <h2>Crypto Portfolio</h2>
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
                  })()}
                  BTC
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="stock-portfolio-container">
        <h2>Stock Portfolio</h2>
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
      {stockBuyList.map((stock, index) => {
         let matchingStock = topSPStocks.find(
          (data) => data.symbol === stock.symbol
        );

        const currentPrice = matchingStock ? parseFloat(matchingStock.c) : 0;
        const purchasePrice = parseFloat(stock.price || 0);
        const quantityBought = parseFloat(stock.quantity || 0);
        const estimation = (currentPrice - purchasePrice) * quantityBought;

        return (
          <tr
            key={stock.symbol}
            style={{
              backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#e6f7ff",
            }}
          >
            <td style={{ color: stock.dp < 0 ? "red" : "green" }}>
              {stock.symbol}
            </td>
            <td>{stock.quantity}</td>
            <td>{stock.price}$</td>
            <td>{estimation}$</td>
          </tr>
        );
      })}
    </tbody>
        </table>
      </div>
    </>
  );
};

export default Portfolio;
