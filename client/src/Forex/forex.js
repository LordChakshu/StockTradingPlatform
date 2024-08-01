import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";

const Forex = () => {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };
  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  return (
    <div className="forex-container">
      <div className="forex-header">
        <span className="forex-header-text">
          Foreign Currency Exchange Calculator
        </span>
      </div>
      <div className="exchange-conatiner">
        <div className="currency-input">
          <FormControl fullWidth>
            <InputLabel id="currency-placeholder">From Currency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="from-currency"
              label="Currency"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
            >
              <MenuItem value="USD">USD - United States Dollar</MenuItem>
              <MenuItem value="EUR">EUR - Euro</MenuItem>
              <MenuItem value="JPY">JPY - Japanese Yen</MenuItem>
            </Select>
          </FormControl>
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="currency-input">
          <FormControl fullWidth>
            <InputLabel id="currency-placeholder">To Currency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="from-currency"
              label="Currency"
              value={toCurrency}
              onChange={handleToCurrencyChange}
            >
              <MenuItem value="USD">USD - United States Dollar</MenuItem>
              <MenuItem value="EUR">EUR - Euro</MenuItem>
              <MenuItem value="JPY">JPY - Japanese Yen</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Forex;
