import CryptoGainer from "./CryptoGainer.jsx";
import CryptoLoser from "./CryptoLoser.jsx";
import MarketCap from "./MarketCap.jsx";

const TrendingCoins = () => {
  return (
    <>
      <MarketCap />
      <CryptoGainer />
      <CryptoLoser />
    </>
  );
};

export default TrendingCoins;
