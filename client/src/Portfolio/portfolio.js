import { useContext, useEffect, useState } from "react";
import "./portfolio.css";
import { cryptoContext } from "../Crypto/cryptoContext";
import { stockContext } from "../Stock-List/stockContext";

const Portfolio = () => {
  const { buyCryptoList, cryptoData, setBuyCryptoList } =
    useContext(cryptoContext);
  const { stockBuyList, topSPStocks, setStockBuyList } =
    useContext(stockContext);

  const [sellCryptoQuantity, setSellCryptoQuantity] = useState({});
  const [sellStockQuantity, setSellStockQuantity] = useState({});

  let totalStockAmount = 0;
  let totalStockQuantity = 0;
  let totalStockEstimation = 0;

  let totalCryptoAmount = 0;
  let totalCryptoQuantity = 0;
  let totalCryptoEstimation = 0;
  useEffect(() => {
    console.log("Updated buyCryptoList after sell:", buyCryptoList);
  }, [buyCryptoList, stockBuyList]);

  const handleSellCryptoQuantity = (event, uniqueCryptoKey) => {
    setSellCryptoQuantity({
      [uniqueCryptoKey]: event.target.value,
    });
  };
  const handleSellStockQuantity = (event, uniqueStockKey) => {
    setSellStockQuantity({
      [uniqueStockKey]: event.target.value,
    });
  };

  const handleSellCrypto = (uniqueCryptoKey, cryptoSymbol, cryptoPrice) => {
    const sellQuantity = parseFloat(sellCryptoQuantity[uniqueCryptoKey]);
    console.log("crypto quantity to sell", sellQuantity);
    if (!sellQuantity || sellQuantity <= 0) {
      console.log("Invalid sell quantity");
      return;
    }

    setBuyCryptoList((prevList) => {
      const updatedList = prevList
        .map((crypto) => {
          if (crypto.uniqueKey === uniqueCryptoKey) {
            const newQuantity = parseFloat(crypto.quantity) - sellQuantity;

            if (newQuantity > 0) {
              return { ...crypto, quantity: newQuantity };
            } else {
              return null;
            }
          }
          return crypto;
        })
        .filter(Boolean);

      // Update localStorage
      localStorage.setItem("buyCryptoList", JSON.stringify(updatedList));

      console.log("Updated buyCryptoList after sell:", updatedList);

      return updatedList;
    });
  };

  const handleSellStock = (uniqueStockKey, stockSymbol, stockPrice) => {
    const sellQuantity = parseFloat(sellStockQuantity[uniqueStockKey]);
    console.log("Stock quantity to sell", sellQuantity);

    if (!sellQuantity || sellQuantity <= 0) {
      console.log("Invalid sell quantity");
      return;
    }

    setStockBuyList((prevList) => {
      const updatedList = prevList.map((stock) => {
        if (stock.uniqueKey === uniqueStockKey) {
          const newQuantity = parseFloat(stock.quantity) - sellQuantity;

          if (newQuantity > 0) {
            return { ...stock, quantity: newQuantity };
          }else {
            return null;
          }

        }
        return stock;
      })
      .filter(Boolean);

      localStorage.setItem("stockBuyList", JSON.stringify(updatedList));

      console.log("Updated stockBuyList after sell:", updatedList);
      return updatedList;
    });
  };

  return (
    <div>
      <div className="crypto-portfolio-container">
        <h2>Crypto Portfolio</h2>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
              <th>Price Bought</th>
              <th>Current Price</th>
              <th>P/L Estimation</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {buyCryptoList.map((crypto, index) => {
              const uniqueCryptoKey = `${crypto.symbol}-${crypto.price}`;
              const matchingCrypto = cryptoData.find(
                (data) => data.symbol === crypto.symbol
              );
              const currentPrice = parseFloat(matchingCrypto?.lastPrice || 0);
              const purchasePrice = parseFloat(crypto.price || 0);
              const quantityBought = parseFloat(crypto.quantity || 0);

              const estimation =
                (currentPrice - purchasePrice) * quantityBought;

              totalCryptoAmount = totalCryptoAmount + purchasePrice;
              totalCryptoQuantity = totalCryptoQuantity + quantityBought;
              totalCryptoEstimation = totalCryptoEstimation + estimation;

              return (
                <tr
                  key={uniqueCryptoKey}
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
                  <td>{currentPrice} BTC</td>
                  <td>
                    {estimation}
                    BTC
                  </td>
                  <td>
                    <input
                      type="Number"
                      placeholder="Add Qty"
                      value={sellCryptoQuantity[uniqueCryptoKey] || ""}
                      onChange={(e) =>
                        handleSellCryptoQuantity(e, uniqueCryptoKey)
                      }
                    />
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleSellCrypto(
                          uniqueCryptoKey,
                          crypto.symbol,
                          crypto.price
                        )
                      }
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>{totalCryptoQuantity}</strong>
              </td>
              <td>
                <strong>{totalCryptoAmount}</strong>
              </td>
              <td>
                <strong></strong>
              </td>
              <td>
                <strong>{totalCryptoEstimation}</strong>
              </td>
            </tr>
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
              <th>Current Price</th>
              <th>P/L Estimation</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stockBuyList.map((stock, index) => {
              const uniqueStockKey = `${stock.symbol}-${stock.price}`;
              let matchingStock = topSPStocks.find(
                (data) => data.symbol === stock.symbol
              );

              const currentPrice = matchingStock
                ? parseFloat(matchingStock.c)
                : 0;
              const purchasePrice = parseFloat(stock.price || 0);
              const quantityBought = parseFloat(stock.quantity || 0);
              const estimation =
                (currentPrice - purchasePrice) * quantityBought;

              totalStockAmount = stock.price + totalStockAmount;
              totalStockQuantity = quantityBought + totalStockQuantity;
              totalStockEstimation = totalStockEstimation + estimation;

              return (
                <tr
                  key={uniqueStockKey}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#e6f7ff",
                  }}
                >
                  <td style={{ color: stock.dp < 0 ? "red" : "green" }}>
                    {stock.symbol}
                  </td>
                  <td>{stock.quantity}</td>
                  <td>{stock.price}$</td>
                  <td>{currentPrice}</td>
                  <td>{estimation}$</td>
                  <td>
                    <input
                      type="Number"
                      placeholder="Add Qty"
                      value={sellStockQuantity[uniqueStockKey] || ""}
                      onChange={(e) => {
                        handleSellStockQuantity(e, uniqueStockKey);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      type="submit"
                      onClick={() =>
                        handleSellStock(
                          uniqueStockKey,
                          stock.symbol,
                          stock.price
                        )
                      }
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>{totalStockQuantity}</strong>
              </td>
              <td>
                <strong>{totalStockAmount}$</strong>
              </td>
              <td></td>
              <td>
                <strong>{totalStockEstimation}$</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portfolio;
