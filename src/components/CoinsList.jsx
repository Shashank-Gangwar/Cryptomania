import { Link } from "react-router-dom";
import {
  CryptoState,
  numberWithCommas,
  roundOff,
} from "../store/CryptoContext";

const CoinsList = ({ coins, from, to }) => {
  const { symbol, setPage } = CryptoState();
  return coins.slice(from, to).map((coin) => (
    <div
      key={coin.id}
      className="list-group listItem mb-1 mx-3"
      onClick={() => setPage("")}
    >
      <Link
        to={`/coin/${coin?.id}`}
        className="list-group-item list-group-item-action d-flex gap-3 py-3"
      >
        <img
          src={coin?.image}
          alt="twbs"
          width="35"
          height="35"
          className="rounded-circle flex-shrink-0 mt-2"
        />
        <div className="d-flex gap-2 w-100 justify-content-between">
          <div>
            <h6 className="mb-0">{coin?.name}</h6>
            <p
              className="btn btn-light py-0 px-0 mb-0 mt-1 opacity-75"
              disabled
            >
              {coin?.symbol.toUpperCase()}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-row-reverse coinStats">
            <div className="d-none d-md-block">
              <p className=" text-nowrap mb-0">
                {symbol}
                {roundOff(coin?.market_cap)}
              </p>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p className="text-nowrap mb-1">
                {symbol}
                {numberWithCommas(coin?.current_price)}
              </p>
              <p
                className="text-nowrap mb-0"
                style={{
                  color:
                    coin.price_change_percentage_24h > 0
                      ? "rgb(14, 203, 129)"
                      : "red",
                }}
              >
                {coin.price_change_percentage_24h > 0 && "+"}
                {coin?.price_change_percentage_24h?.toFixed(3)}%
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  ));
};

export default CoinsList;
