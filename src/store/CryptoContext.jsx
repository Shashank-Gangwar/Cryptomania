import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [trending, setTrending] = useState([0]);
  const [coinsListData, setCoinsListData] = useState([0]);
  const [page, setPage] = useState("");
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        coinsListData,
        setCoinsListData,
        trending,
        setTrending,
        setPage,
        page,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export const CryptoState = () => {
  return useContext(Crypto);
};

export function numberWithCommas(x) {
  if (Number.isInteger(x)) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else if (Number(x)) {
    {
      const arr = x.toString().split(".");
      return (
        arr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        "." +
        arr[1].toString()
      );
    }
  } else {
    return x;
  }
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
