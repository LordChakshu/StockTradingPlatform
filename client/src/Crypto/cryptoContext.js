import { createContext, useEffect, useState } from "react";

export const cryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState([]);

  const [quantity, setQuantity] = useState({});

  const [buyCryptoList, setBuyCryptoList] = useState([]);

  useEffect(() => {
    console.log("Updated buyCryptoList:", buyCryptoList);
  }, [buyCryptoList]);

  useEffect(() => {
    const savedBuyCryptoList = localStorage.getItem("buyCryptoList");
    if (savedBuyCryptoList) {
      setBuyCryptoList(JSON.parse(savedBuyCryptoList));
    }
  }, []);

  const handleBuyCrypto = (cryptoSymbol, cryptoPrice, cryptoVolume) => {
    const quantityToBuy = parseFloat(quantity[cryptoSymbol]);
  
    if (quantityToBuy > 0 && cryptoVolume > quantityToBuy) {
      setBuyCryptoList((prevList) => {
        let updatedList = prevList.map((crypto) => {
          if (crypto.symbol === cryptoSymbol && crypto.price === cryptoPrice) {
            return {
              ...crypto,
              quantity: parseFloat(crypto.quantity) + quantityToBuy,
            };
          }
          return crypto;
        });
  
        const existingIndex = updatedList.findIndex(
          (crypto) => crypto.symbol === cryptoSymbol && crypto.price === cryptoPrice
        );
  
        if (existingIndex === -1) {
          const newBuy = {
            symbol: cryptoSymbol,
            price: cryptoPrice,
            quantity: quantityToBuy,
          };
          updatedList = [...updatedList, newBuy];
        }
  
        // Save the updated list to localStorage
        localStorage.setItem("buyCryptoList", JSON.stringify(updatedList));
  
        console.log("Updated buyCryptoList:", updatedList);
  
        return updatedList;
      });
    } 
  };
    
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
        setCryptoData(data.slice(0, 30));
      } catch (err) {
        console.log(err);
      }
    };
    getCryptoData();
  }, []);

  return (
    <cryptoContext.Provider
      value={{
        cryptoData,
        quantity,
        handleQuantity,
        buyCryptoList,
        handleBuyCrypto,
      }}
    >
      {children}
    </cryptoContext.Provider>
  );
};
