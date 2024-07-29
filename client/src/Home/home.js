import { useContext } from "react";
import { StockContext } from "../Stock-List/stockContext";

const Home = () => {

  const {stockData}=useContext(StockContext);

  return (
    <div className="homepage-container">
      <div className="header">
        <h1>Stock Trading</h1>
      </div>
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
            {stockData.slice(0,10).map((stock, index) => (
              <tr key={index} style={{backgroundColor:index%2===0 ? "#f9f9f9" : "#e6f7ff"}}>
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
  );
};
export default Home;
