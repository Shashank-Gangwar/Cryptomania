import { useEffect } from "react";
import HeroSection from "../components/homeComp/HeroSection";
import MarketCap from "../components/homeComp/MarketCap";
import TrendingCoins from "../components/homeComp/TrendingCoins";
import { CryptoState } from "../store/CryptoContext";
import HomeNews from "../components/homeComp/HomeNews";

const Home = () => {
  const { setPage } = CryptoState();
  useEffect(() => {
    setPage("home");
  }, []);

  return (
    <>
      <HeroSection />
      <TrendingCoins />
      <HomeNews />
    </>
  );
};

export default Home;
