import { createContext, useEffect, useState } from "react";

const API_KEY = "cqhu6m9r01qgbqu602hgcqhu6m9r01qgbqu602i0";

export const stockContext = createContext();

export const StockProvider = ({ children }) => {
  // const [stockData, setStockData] = useState([]);
  // const [tickerData, setTickerData] = useState([]);
  const [topSPStocks, setTopSPStocks] = useState([]);
  const [stockQuantity, setStockQuantity] = useState({});
  const [stockBuyList, setStockBuyList] = useState([]);

  const topSPTickers = [
    "AAPL",
    "MSFT",
    "GOOGL",
    "GOOG",
    "AMZN",
    "NVDA",
    "BRK.B",
    "META",
    "TSLA",
    "UNH",
    "LLY",
    "JPM",
    "V",
    "XOM",
    "JNJ",
    "MA",
    "PG",
    "AVGO",
    "HD",
    "MRK",
    "PEP",
    "ORCL",
    "ABBV",
    "KO",
    "CVX",
    "COST",
    "MCD",
    "TMO",
    "WMT",
    "ACN",
  ];

  const handleStockQuantity = (event, stockSymbol) => {
    setStockQuantity({
      ...stockQuantity,
      [stockSymbol]: event.target.value,
    });
  };

  const handleBuyStock = (stockSymbol, stockPrice) => {
    const quantityToBuy = parseFloat(stockQuantity[stockSymbol]);

    console.log("Quantity to buy:", quantityToBuy);
    if (stockQuantity && quantityToBuy > 0) {
      const uniqueKey = `${stockSymbol}-${stockPrice}`;

      setStockBuyList((prevList) => {
        let updatedStockList = prevList.map((stock) => {
          if (stock.symbol === stockSymbol && stock.price === stockPrice) {
            return {
              ...stock,
              quantity: parseFloat(stock.quantity) + quantityToBuy,
            };
          }
          return stock;
        });

        const existingIndex = updatedStockList.findIndex(
          (stock) => stock.symbol === stockSymbol && stock.price === stockPrice
        );

        if (existingIndex === -1) {
          const newBuyStock = {
            uniqueKey,
            symbol: stockSymbol,
            price: stockPrice,
            quantity: quantityToBuy,
          };
          updatedStockList = [...updatedStockList, newBuyStock];
        }
        localStorage.setItem("stockBuyList", JSON.stringify(updatedStockList));

        return updatedStockList;
      });
    }
  };

  useEffect(() => {
    const savedStockBuyList = localStorage.getItem("stockBuyList");
    if (savedStockBuyList) {
      setStockBuyList(JSON.parse(savedStockBuyList));
    }
  }, []);

  useEffect(() => {
    console.log("Updated buyStockList:", stockBuyList);
  }, [stockBuyList]);

  useEffect(() => {
    //   const getStockData = async (symbol) => {
    //     try {
    //       const response = await fetch(
    //         `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
    //       );
    //       const data = await response.json();
    //       return { symbol, ...data };
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };

    //   const getTickerList = async () => {
    //     try {
    //       const response = await fetch(
    //         `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_KEY}`
    //       );
    //       const data = await response.json();
    //       setTickerData(data);

    //       if (response.ok) {
    //         const ticker = data.slice(0, 30).map((item) => item.symbol);
    //         const stockPromises = ticker.map((item) => getStockData(item));
    //         const stockDataArray = await Promise.all(stockPromises);
    //         setStockData(stockDataArray);
    //       }
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };
    const getTopSPStockData = async () => {
      try {
        const stockDataPromises = topSPTickers.map(async (symbol) => {
          const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
          );
          const data = await response.json();
          return { symbol, ...data };
        });

        const stockDataArray = await Promise.all(stockDataPromises);
        setTopSPStocks(stockDataArray);
      } catch (err) {
        console.error(err);
      }
    };

    // getTickerList();
    getTopSPStockData();
  }, []);

  return (
    <stockContext.Provider
      value={{
        // stockData,
        // setStockData,
        // tickerData,
        // setTickerData,
        topSPStocks,
        setTopSPStocks,
        stockQuantity,
        handleStockQuantity,
        stockBuyList,
        handleBuyStock,
        setStockBuyList,
      }}
    >
      {children}
    </stockContext.Provider>
  );
};
