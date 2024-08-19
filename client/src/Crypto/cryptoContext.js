import { createContext, useEffect, useState } from "react";

export const cryptoContext=createContext();

export const CryptoProvider=({children})=>{

    const [cryptoData,setCryptoData]=useState([]);

    const [quantity,setQuantity]=useState({});

    const handleQuantity = (event, cryptoSymbol) => {
      setQuantity({
        ...quantity,
        [cryptoSymbol]: event.target.value,
      });
    };

    useEffect(() => {
        const getCryptoData = async () => {
          try {
            const response = await fetch(
              "https://api4.binance.com/api/v3/ticker/24hr"
            );
            const data = await response.json();
            setCryptoData(data.slice(0,30));
          } catch (err) {
            console.log(err);
          }
        };
        getCryptoData();
      }, []);

    return(
        <cryptoContext.Provider value={{cryptoData,quantity,handleQuantity}}>
            {children}
        </cryptoContext.Provider>
    );
}