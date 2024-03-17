import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { CryptoState, numberWithCommas } from "../../store/CryptoContext";

const Carousel = () => {
  const { symbol, trending, setPage } = CryptoState();
  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      trending[0] !== 0 && (
        <Link
          to={`/coin/${coin.id}`}
          className="col-lg-4 carouselItem"
          onClick={() => setPage("")}
        >
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
      )
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
    trending[0] !== 0 && (
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
    )
  );
};

export default Carousel;
