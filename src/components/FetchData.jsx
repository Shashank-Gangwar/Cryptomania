import axios from "axios";
import { useEffect } from "react";
import { CoinList, TrendingCoinsFetch } from "../config/api";
import { CryptoState } from "../store/CryptoContext";

const FetchData = () => {
  const { currency, setCoinsListData, setTrending, setNews, coinsListData } =
    CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoinsFetch(currency));
      setTrending(data);
    } catch (error) {
      //console.log(error.message);
    }
  };

  const fetchCoins = async () => {
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoinsListData(data);
    } catch (error) {
      //console.log(error.message);
    }
  };
  useEffect(() => {
    fetchCoins();
    fetchTrendingCoins();
  }, [currency]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    console.log("calling");
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/getnews`)
      .then(function (response) {
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return;
};

export default FetchData;
