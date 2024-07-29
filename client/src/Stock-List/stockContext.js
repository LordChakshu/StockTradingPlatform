import { createContext, useState } from "react";

export const StockContext=createContext(); 

export const StockProvider=({children})=>{

    const [stockData,setStockData]=useState([]);

    return (
        <StockContext.Provider value={{stockData,setStockData}} >
            {children}
        </StockContext.Provider>
    );


}