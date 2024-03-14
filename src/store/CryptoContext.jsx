import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  const [coinsListData, setCoinsListData] = useState([]);
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{ currency, setCurrency, symbol, coinsListData, setCoinsListData }}
    >
      {children}
    </Crypto.Provider>
  );
};

export const CryptoState = () => {
  return useContext(Crypto);
};

export function numberWithCommas(x) {
  return Number.isInteger(x)
    ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : x;
}

export function roundOff(x) {
  var num = parseInt(x);
  if (Number.isInteger(num)) {
    if (num > 1000000000000) {
      return (
        num.toString().slice(0, -12) +
        "." +
        num.toString().slice(-12, -9) +
        " T"
      );
    } else if (num > 1000000000) {
      return (
        num.toString().slice(0, -9) + "." + num.toString().slice(-9, -6) + " B"
      );
    } else if (num > 1000000) {
      return (
        num.toString().slice(0, -6) + "." + num.toString().slice(-6, -3) + " M"
      );
    } else {
      return num;
    }
  }
  return "--";
}

export default CryptoContext;
