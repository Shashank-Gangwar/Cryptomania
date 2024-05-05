import {
  CryptoState,
  numberWithCommas,
  roundOff,
} from "../../store/CryptoContext";
import style from "./CoinDetails.module.css";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub, FaReddit } from "react-icons/fa";
import { useState } from "react";

const CoinDetails = ({ coin }) => {
  const { currency } = CryptoState();
  const [more, setMore] = useState(false);
  const volPerMarCap =
    coin?.market_data?.total_volume[currency.toLowerCase()] /
    coin?.market_data?.fully_diluted_valuation[currency.toLowerCase()];
  return (
    <div className={style.containerCoinDetails}>
      <div className="container px-0 py-5 px-3 px-md-0">
        <h1 className="pb-2 border-bottom">Key Stats</h1>

        <div
          className={`row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-0 py-2 ${style.keyStats}`}
        >
          <div>
            <h3>Market capitalization</h3>
            <p>
              {roundOff(coin?.market_data?.market_cap[currency.toLowerCase()])}
              <small>{currency}</small>
            </p>
          </div>
          <div className=" mb-2">
            <h3>Fully diluted market cap</h3>
            <p>
              {roundOff(
                coin?.market_data?.fully_diluted_valuation[
                  currency.toLowerCase()
                ]
              )}
              <small>{currency}</small>
            </p>
          </div>
          <div className=" mb-2">
            <h3>Total volume</h3>
            <p>
              {roundOff(
                coin?.market_data?.total_volume[currency.toLowerCase()]
              )}
              <small>{currency}</small>
            </p>
          </div>
          <div className=" mb-2">
            <h3>Volume / Market Cap</h3>
            <p>{volPerMarCap.toFixed(4)}</p>
          </div>
          <div className=" mb-2">
            <h3>24hr high</h3>
            <p>
              {numberWithCommas(
                coin?.market_data?.high_24h[currency.toLowerCase()]
              )}
              <small>{currency}</small>
            </p>
          </div>
          <div className="col  mb-2">
            <h3>Circulating supply</h3>
            <p>{roundOff(coin?.market_data?.circulating_supply)}</p>
          </div>
        </div>
      </div>

      {/* ------------about coin ------- */}

      <div className="container px-0 py-1 px-3 px-md-0">
        <h1 className="pb-2 border-bottom">About Bitcoin</h1>

        <div
          className={`row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4 py-2 ${style.about}`}
        >
          <div className="col ">
            <h3>Category</h3>
            <a className="text-black">Cryptocurrency</a>
          </div>
          <div className="col ">
            <h3>Website</h3>
            <a href={coin?.links?.homepage[0]}>
              {coin?.id}.org {<FiExternalLink />}
            </a>
          </div>
          <div className="col pe-default">
            <h3>Source Code</h3>
            <a href={coin?.links?.repos_url.github[0]}>
              <FaGithub /> Github
            </a>
          </div>
          <div className="col ">
            <h3>Explorers</h3>
            <a href={coin?.links?.blockchain_site[0]}>
              explore/coin.com {<FiExternalLink />}
            </a>
          </div>
          <div className="col ">
            <h3>White Paper </h3>
            <a href={coin?.links?.whitepaper}>
              {coin.id}.org {<FiExternalLink />}
            </a>
          </div>
          <div className="col ">
            <h3>Community</h3>
            <a href={coin?.links?.subreddit_url}>
              <FaReddit /> Reddit
            </a>
          </div>
        </div>
      </div>

      <div className="px-4 my-5 text-md-center">
        <p
          className={`${
            !coin?.description?.en && "d-none"
          } col-lg-8 mx-auto lead`}
        >
          {coin?.description?.en
            .replace(/(<([^>]+)>)/gi, "")
            .slice(0, more ? coin?.description?.en.length : 200)}{" "}
          <span
            onClick={() => setMore(!more)}
            className="text-primary"
            style={{ cursor: "pointer" }}
          >
            {!more ? "...read more" : " show less"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CoinDetails;
