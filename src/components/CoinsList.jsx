import { Link } from "react-router-dom";
import { CryptoState } from "../store/CryptoContext";

export function numberWithCommas(x) {
  return x;
}

const CoinsList = ({ coin }) => {
  const { symbol } = CryptoState();
  const profit = coin.price_change_percentage_24h > 0;
  return (
    <div className="list-group mx-3 listItem mb-1 ">
      <Link
        to="/"
        className="list-group-item list-group-item-action d-flex gap-3 py-3"
      >
        <img
          src={coin.image}
          alt="twbs"
          width="35"
          height="35"
          className="rounded-circle flex-shrink-0 mt-2"
        />
        <div className="d-flex gap-2 w-100 justify-content-between">
          <div>
            <h6 className="mb-0">{coin.name}</h6>
            <p
              className="btn btn-light py-0 px-0 mb-0 mt-1 opacity-75"
              disabled
            >
              {coin.symbol.toUpperCase()}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-row-reverse coinStats">
            <div className="d-none d-md-block">
              <p className=" text-nowrap mb-0">{symbol}3142.2M</p>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p className="text-nowrap mb-1">
                {symbol}
                {numberWithCommas(coin.current_price)}
              </p>
              <p
                className="text-nowrap mb-0"
                style={{ color: profit ? "rgb(14, 203, 129)" : "red" }}
              >
                {profit && "+"}
                {coin.price_change_percentage_24h.toFixed(3)}%
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CoinsList;
