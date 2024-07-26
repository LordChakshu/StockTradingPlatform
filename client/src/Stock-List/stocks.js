import { useEffect, useState } from "react";
import './stocks.css'
const API_KEY = "cqhu6m9r01qgbqu602hgcqhu6m9r01qgbqu602i0";

const StockList = () => {
  const [stockData, setStockData] = useState([]);
  const [tickerData, setTickerData] = useState([]);

  useEffect(() => {
    getTickerList();
  }, []);

  const getStockData = async (symbol) => {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
      );

      const data = await response.json();
      return { symbol, ...data };
    } catch (err) {
      console.log(err);
    }
  };

  // const getTickerList=async()=>{
  //   try{
  //     const response=await fetch(`https://api.polygon.io/v3/reference/tickers?active=true&limit=100&apiKey=${API_KEY}`);
  //     const data=await response.json();
  //     setTickerData(data);
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  // }

  const getTickerList = async () => {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_KEY}`
      );
      const data = await response.json();
      setTickerData(data);

      if (response.ok) {
        const ticker = data.slice(0, 30).map((item) => item.symbol);
        console.log(ticker);
        const stockPromises = ticker.map((item) => getStockData(item));
        const stockDataArray = await Promise.all(stockPromises);
        setStockData(stockDataArray);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="stock-list-container">
      <div className="stock-list-header"><strong>STOCKS LIST</strong></div>
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
              {/* <th>Volume</th> */}
            </tr>
          </thead>
          <tbody>
            {stockData.map((stock, index) => (
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
  );
};

export default StockList;
