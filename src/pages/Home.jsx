import { useEffect } from "react";
import HeroSection from "../components/homeComp/HeroSection";
import MarketCap from "../components/homeComp/MarketCap";
import { CryptoState } from "../store/CryptoContext";

const Home = () => {
  const { setPage } = CryptoState();
  useEffect(() => {
    setPage("home");
  }, []);
  return (
    <>
      <HeroSection />
      <MarketCap />
    </>
  );
};

export default Home;
