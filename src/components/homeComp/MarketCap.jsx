import { Link } from "react-router-dom";
import TrendingCoins from "./TrendingCoins";

const MarketCap = () => {
  return (
    <>
      <div className="rankingSection">
        <h2>Crypto Market Cap Ranking {">"}</h2>
      </div>
      <div className="cryptoList ">
        <div className="list-group mx-3 mb-2 listItem opacity-50">
          <div className="d-flex gap-2 w-100 justify-content-between">
            <div className="ms-5">Symbol</div>
            <div className="d-flex justify-content-between align-items-center flex-row-reverse coinStats me-2">
              <div className="d-none d-md-block me-2">Market Cap</div>
              <div>Price & CHG</div>
            </div>
          </div>
        </div>
        <TrendingCoins />
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
