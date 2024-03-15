import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CoinList } from "../../config/api";

import { CryptoState } from "../../store/CryptoContext";
import axios from "axios";
import TrendingCoins from "./TrendingCoins";

const MarketCap = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency, setCoinsListData } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setCoinsListData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  return (
    <>
      <div className="rankingSection">
        <h2>Crypto Market Cap Ranking {">"}</h2>
      </div>
      <div className="cryptoList ">
        <div className="list-group mx-3 mb-2 listItem opacity-50">
          <div className="d-flex gap-2 w-100 justify-content-between">
            <div className="ms-5">Symbol</div>
            <div className="d-flex justify-content-between align-items-center flex-row-reverse coinStats">
              <div className="d-none d-md-block me-2">Market Cap</div>
              <div>Price & CHG</div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center align-item-center my-5">
            <div className="spinner-border text-dark my-5">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          coins
            .slice(0, 10)
            .map((coin) => <TrendingCoins key={coin.id} coin={coin} />)
        )}
        <div className="my-3 d-flex justify-content-center">
          <Link to="/coinsList" className="btn btn-light">
            Explore all coins{" >"}
          </Link>
        </div>
      </div>
    </>
  );
};

export default MarketCap;
