import { CryptoState } from "../../store/CryptoContext";
import CoinsList from "../CoinsList";

const TrendingCoins = () => {
  const { coinsListData } = CryptoState();
  return coinsListData[0] == 0 ? (
    <div className="d-flex justify-content-center align-item-center my-5">
      <div className="spinner-border text-dark my-5">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    <CoinsList coins={coinsListData} from={0} to={9} />
  );
};

export default TrendingCoins;
