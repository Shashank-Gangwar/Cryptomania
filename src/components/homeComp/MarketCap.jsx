import { CryptoState } from "../../store/CryptoContext";
import CoinsList from "../CoinsList";
import Loader from "../Loader";

const MarketCap = () => {
  const { coinsListData } = CryptoState();
  return coinsListData[0] == 0 ? (
    <div className="d-flex justify-content-center align-item-center my-5">
      <Loader />
    </div>
  ) : (
    <div className="container">
      <div className="rankingSection">
        <h2>Crypto Market Cap Ranking {">"}</h2>
      </div>

      <div className="list-group mx-3 mb-2 listItem opacity-50">
        <div className="d-flex gap-2 w-100 justify-content-between">
          <div className="ms-5">Symbol</div>
          <div className="d-flex justify-content-between align-items-center flex-row-reverse coinStats me-2">
            <div>Market Cap</div>
            <div className="d-none d-md-block me-2">Price & CHG</div>
          </div>
        </div>
      </div>

      <CoinsList coins={coinsListData} from={0} to={5} />
    </div>
  );
};

export default MarketCap;
