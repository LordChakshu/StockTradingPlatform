import { createContext, useEffect, useState } from "react";


const API_KEY = "cqhu6m9r01qgbqu602hgcqhu6m9r01qgbqu602i0";

export const stockContext=createContext(); 

export const StockProvider=({children})=>{

    const [stockData,setStockData]=useState([]);
    const [tickerData, setTickerData] = useState([]);

    useEffect(() => {
        const getStockData = async (symbol) => {
          try {
            const response = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
            );
            const data = await response.json();
            return { symbol, ...data };
          } catch (err) {
            console.error(err);
          }
        };
    
        const getTickerList = async () => {
          try {
            const response = await fetch(
              `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_KEY}`
            );
            const data = await response.json();
            setTickerData(data);
    
            if (response.ok) {
              const ticker = data.slice(0, 30).map((item) => item.symbol);
              const stockPromises = ticker.map((item) => getStockData(item));
              const stockDataArray = await Promise.all(stockPromises);
              setStockData(stockDataArray);
            }
          } catch (err) {
            console.error(err);
          }
        };
    
        getTickerList();
      }, []);

    return (
        <stockContext.Provider value={{stockData,setStockData, tickerData, setTickerData}} >
            {children}
        </stockContext.Provider>
    );


}