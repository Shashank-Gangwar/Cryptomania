import { Link } from "react-router-dom";
import { CryptoState, numberWithCommas } from "../../store/CryptoContext";
import style from "./HomeNews.module.css";

const CryptoGainer = () => {
  const { coinsListData, symbol, setPage } = CryptoState();
  const gainer = coinsListData.map((a) => ({ ...a }));
  gainer?.sort(
    (a, b) =>
      parseFloat(b.price_change_percentage_24h) -
      parseFloat(a.price_change_percentage_24h)
  );

  return (
    <div className="container ">
      <div className="rankingSection">
        <hr />
        <h2>Crypto Gainer {">"}</h2>
      </div>
      <div className="list-group mx-3 mb-2 listItem opacity-50">
        <div className="d-flex gap-2 w-100 justify-content-between ">
          <div className="ms-5">Symbol</div>
          <div className="d-flex justify-content-between align-items-center flex-row-reverse coinStats me-2 ">
            <div className="me-4">Gain(24h)</div>
            <div className="d-none d-md-block ms-4">Price</div>
          </div>
        </div>
      </div>
      {gainer.slice(0, 5).map((coin, index) => (
        <div
          key={index}
          className={`list-group listItem mb-1 mx-3 ${style.gainerList}`}
          onClick={() => setPage("")}
        >
          <Link
            to={`/coin/${coin?.id}`}
            className="list-group-item list-group-item-action d-flex gap-3 py-3 coinlist"
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
                  className="btn btn-light py-0 px-1 mb-0 mt-1 coinsymbol border-0"
                  disabled
                >
                  {coin?.symbol}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center flex-row-reverse coinStats ">
                <div>
                  <button className="btn btn-success text-nowrap mb-0">
                    {coin.price_change_percentage_24h > 0 && "+"}
                    {coin?.price_change_percentage_24h?.toFixed(3)}%
                  </button>
                </div>

                <div className="d-none d-md-flex  justify-content-start text-nowrap me-4 pe-5">
                  {symbol}
                  {numberWithCommas(coin?.current_price)}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CryptoGainer;
