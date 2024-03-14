import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HistoricalChart, SingleCoin } from "../config/api";
import { CryptoState, numberWithCommas } from "../store/CryptoContext";
import CoinChart from "../components/CoinChart";
import CoinDetails from "../components/CoinDetails";

const SingleCoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState([]);
  const [fetching, setFetching] = useState(false);
  const { currency, symbol } = CryptoState();

  const profit = coin?.market_data?.price_change_percentage_24h > 0;

  const fetchCoin = async () => {
    setFetching(true);
    console.log(id);
    const { data } = await axios.get(SingleCoin(id));
    console.log(data);

    setCoin(data);
    setFetching(false);
  };

  useEffect(() => {
    fetchCoin();
  }, [currency]);
  return fetching ? (
    <div className="mySpinner">
      <div class="spinner-border text-dark">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="singleCoinPage">
      <div className="col-lg-8 mx-4  py-5 coinTopDetail ">
        <div className="position-relative coinImg me-4 d-none d-md-block">
          <img
            src={coin?.image?.large}
            alt="twbs"
            height="150"
            width="150"
            className="flex-shrink-0 my-0 position-relative "
          />
          <span className="position-absolute top-100 start-50   translate-middle badge  bg-dark fs-6 px-2 py-1">
            #{coin?.market_cap_rank}
          </span>
        </div>
        <div className=" d-flex flex-column justify-content-center">
          <div className="d-flex">
            <div className="position-relative  d-md-none me-3">
              <img
                src={coin?.image?.large}
                alt="twbs"
                height="80"
                width="80"
                className="flex-shrink-0 my-0 position-relative "
              />
              <span className="position-absolute top-100 start-50   translate-middle badge  bg-dark fs-7 px-1 py-1">
                #{coin?.market_cap_rank}
              </span>
            </div>
            <div>
              <h1 className="">{coin?.name}</h1>
              <div className="d-flex">
                <span
                  href="#"
                  className="btn btn-outline-secondary d-none d-md-block"
                >
                  {coin?.symbol?.toUpperCase()}
                  {currency} ● Coingecko
                </span>

                <span href="#" className="btn btn-outline-secondary d-md-none">
                  {coin?.symbol?.toUpperCase()}
                  {currency}
                </span>
                <span className="ms-2 btn btn-outline-success ">⬤</span>
              </div>
            </div>
          </div>

          <div className="d-lg-flex ms-2 ms-md-0">
            <div>
              <h1 className=" my-0 mt-3 ">
                {numberWithCommas(
                  coin?.market_data?.current_price[currency.toLowerCase()]
                )}
                <span className="fs-6">{currency}</span>
              </h1>
              <span className="fs-6 text-secondary ">
                As of today at {new Date(coin?.last_updated).getHours()}:
                {new Date(coin?.last_updated).getMinutes()} UTC+5.30
              </span>
            </div>
            <div className=" d-flex align-items-center ms-lg-3 pb-3 fs-5 mt-2 mt-xs-4 ">
              <span
                className="me-3 fw-bold"
                style={{ color: profit > 0 ? "#089981" : "red" }}
              >
                {profit && "+"}
                {coin?.market_data?.price_change_24h_in_currency[
                  currency.toLowerCase()
                ].toFixed(2)}
              </span>
              <span
                className="fw-bold"
                style={{ color: profit > 0 ? "#089981" : "red" }}
              >
                {profit && "+"}
                {coin?.market_data?.price_change_percentage_24h?.toFixed(
                  2
                )}%{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr className="col-12 mt-0" />
      <CoinChart id={id} coin={coin} />
      <CoinDetails coin={coin} />
    </div>
  );
};

export default SingleCoinPage;
