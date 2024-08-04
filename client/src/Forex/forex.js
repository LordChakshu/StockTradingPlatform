import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import "./forex.css";

const API_ID = 172240700144958;

const Forex = () => {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [conversion, setConversion] = useState([]);

  const handleAmountChange = (event) => {
    setFromAmount(event.target.value);
  };

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleSubmit = () => {
    console.log(fromAmount, fromCurrency, toCurrency);
    if (fromCurrency && toCurrency && fromAmount) {
      getForexData();
    } else {
      alert("Please fill in all fields.");
    }
  };

  const currencyPairs = [
    "USD",
    "EUR",
    "JPY",
    "GBP",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "HKD",
    "NZD",
    "SEK",
    "SGD",
    "BCH",
    "CZK",
    "DKK",
    "DOT",
    "ETH",
    "FIL",
    "GRT",
    "HUF",
    "INR",
    "LTC",
    "MXN",
    "NOK",
    "PLN",
    "RUB",
    "SAR",
    "THB",
    "TRY",
    "TWD",
    "XAG",
    "XAU",
    "XBT",
    "ZAR",
  ];

  const menuItems = currencyPairs.map((item) => (
    <MenuItem value={item} key={item}>
      {item}
    </MenuItem>
  ));

  const getForexData = async () => {
    try {
      const response = await fetch(
        `https://api.forexfeed.net/convert/${API_ID}/${fromAmount}/${fromCurrency}/${toCurrency}`
      );
      // const data = await response.json();
      const textData = await response.text();

      const quoteStart = textData.indexOf("QUOTE START");
      const quoteEnd = textData.indexOf("QUOTE END");

      if (quoteStart !== -1 && quoteEnd !== -1) {
        const quoteData = textData
          .slice(quoteStart + 11, quoteEnd)
          .trim()
          .split(",");

        const conversionRate = quoteData[5];
        const conversionValue = quoteData[6];

        setConversion({
          CONVERSION_RATE: conversionRate,
          CONVERSION_VALUE: conversionValue,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="forex-container">
      <div className="forex-header">
        <span className="forex-header-text">
          Foreign Currency Exchange Calculator
        </span>
      </div>
      <div className="forex-main-content">
        <div className="exchange-container">
          <div className="currency-input">
            <input
              type="number"
              placeholder="Enter Amount"
              value={fromAmount}
              onChange={handleAmountChange}
            />
            <FormControl fullWidth>
              <InputLabel id="currency-placeholder">From Currency</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="from-currency"
                label="Currency"
                value={fromCurrency}
                onChange={handleFromCurrencyChange}
              >
                {menuItems}
              </Select>
            </FormControl>
          </div>
          <div className="currency-input">
            <div className="output">
              <span className="converted-value">
                After Value: {conversion.CONVERSION_VALUE}
              </span>
              {/* <span className="conversion-rate">
                Conversion Rate:{conversion.CONVERSION_RATE}{" "}
              </span> */}
            </div>
            <FormControl fullWidth>
              <InputLabel id="currency-placeholder">To Currency</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="from-currency"
                label="Currency"
                value={toCurrency}
                onChange={handleToCurrencyChange}
              >
                {menuItems}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="button-container">
          <button
            type="submit"
            onClick={handleSubmit}
            className="convert-button"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forex;
