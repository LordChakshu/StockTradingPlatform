import { useContext} from "react";
import "./stocks.css";
import { stockContext } from "./stockContext";

const StockList = () => {
  const {
    // stockData,
    // setStockData,
    stockQuantity,
    handleStockQuantity,
    stockBuyList,
    handleBuyStock,
    // tickerData,
    // setTickerData,
    topSPStocks,
  } = useContext(stockContext);

  return (
    <div className="stock-list-container">
      <div className="stock-list-header">
        <strong>STOCKS LIST</strong>
      </div>
      <div className="column">
        <div className="sp-stocks">
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
                <th>Quantity</th>
                <th> </th>
                {/* <th>Volume</th> */}
              </tr>
            </thead>
            <tbody>
              {topSPStocks.map((stock, index) => (
                <tr
                  key={stock.symbol}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#e6f7ff",
                  }}
                >
                  <td style={{ color: stock.dp < 0 ? "red" : "green" }}>
                    {stock.symbol}
                  </td>
                  <td>{stock.c}$</td>
                  <td>{stock.d}</td>
                  <td style={{ color: stock.dp < 0 ? "red" : "green" }}>
                    {stock.dp}%
                  </td>
                  <td>{stock.o}</td>
                  <td>{stock.h}</td>
                  <td>{stock.l}</td>
                  <td>{stock.pc}</td>
                  <td>
                    <input
                      type="number"
                      placeholder="Enter Qty"
                      value={stockQuantity[stock.symbol] || ""}
                      onChange={(e) => handleStockQuantity(e, stock.symbol)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleBuyStock(stock.symbol, stock.c)}
                    >
                      Buy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockList;
