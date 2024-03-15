import AliceCarousel from "react-alice-carousel";
import { TrendingCoinsFetch } from "../../config/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CryptoState, numberWithCommas } from "../../store/CryptoContext";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoinsFetch(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link to={`/coin/${coin.id}`} className="col-lg-4 carouselItem">
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: "10px" }}
        />
        <p className="fw-normal text-white">
          {coin?.name}{" "}
          <span style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red" }}>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </p>
        <p className="text-white">
          {symbol}
          {numberWithCommas(coin?.current_price.toFixed(2))}
        </p>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    701: {
      items: 4,
    },
  };
  return (
    <div className=" myCarousel mt-4">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
      />
    </div>
  );
};

export default Carousel;
