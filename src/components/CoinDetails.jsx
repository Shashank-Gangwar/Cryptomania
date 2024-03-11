import { CryptoState } from "../store/CryptoContext";
import style from "./CoinDetails.module.css";

const CoinDetails = ({ coin }) => {
  const { currency, symbol } = CryptoState();
  const volPerMarCap =
    coin?.market_data?.total_volume[currency.toLowerCase()] /
    coin?.market_data?.fully_diluted_valuation[currency.toLowerCase()];
  return (
    <div className={style.containerCoinDetails}>
      <div class="container px-0 py-5 ">
        <h1 class="pb-2 border-bottom">Key Stats</h1>

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-0 py-2 ">
          <div className={style.detail}>
            <div>
              <h3 class="mb-2 fs-5">Market capitalization</h3>
              <p className="fs-4 fw-light">
                {coin?.market_data?.market_cap[currency.toLowerCase()]}{" "}
                {currency}
              </p>
            </div>
          </div>
          <div class=" mb-2">
            <div>
              <h3 class="mb-2 fs-5 ">Fully diluted market cap</h3>
              <p className="fs-4 fw-light">
                {
                  coin?.market_data?.fully_diluted_valuation[
                    currency.toLowerCase()
                  ]
                }{" "}
                {currency}
              </p>
            </div>
          </div>
          <div class=" mb-2">
            <div>
              <h3 class="mb-2 fs-5 ">Total volume</h3>
              <p className="fs-4 fw-light">
                {coin?.market_data?.total_volume[currency.toLowerCase()]}{" "}
                {currency}
              </p>
            </div>
          </div>
          <div class=" mb-2">
            <div>
              <h3 class="mb-2 fs-5 ">Volume / Market Cap</h3>
              <p className="fs-4 fw-light">{volPerMarCap.toFixed(4)}</p>
            </div>
          </div>
          <div class=" mb-2">
            <div>
              <h3 class="mb-2 fs-5 ">24hr high</h3>
              <p className="fs-4 fw-light">
                {coin?.market_data?.high_24h[currency.toLowerCase()]} {currency}
              </p>
            </div>
          </div>
          <div class="col  mb-2">
            <div>
              <h3 class="mb-2 fs-5 ">Circulating supply</h3>
              <p className="fs-4 fw-light">
                {coin?.market_data?.circulating_supply}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ------------about coin ------- */}

      <div class="container px-0 py-1 px-3 px-md-0">
        <h1 class="pb-2 border-bottom">About Bitcoin</h1>

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4 py-2 ">
          <div class="col ">
            <div>
              <h3 class="mb-2 fs-5 ">Category</h3>
              <a className="fs-4 fw-light">Cryptocurrency</a>
            </div>
          </div>
          <div class="col ">
            <div>
              <h3 class="mb-2 fs-5 ">Website</h3>
              <a
                className="fs-4 fw-light text-primary"
                href={coin?.links?.homepage[0]}
              >
                {coin.id}.org
              </a>
            </div>
          </div>
          <div class="col ">
            <div>
              <h3 class="mb-2 fs-5 ">Source Code</h3>
              <a
                className="fs-4 fw-light text-primary"
                href={coin?.links?.repos_url.github[0]}
              >
                Github
              </a>
            </div>
          </div>
          <div class="col ">
            <div>
              <h3 class="mb-2 fs-5 ">Explorers</h3>
              <a
                className="fs-4 fw-light text-primary"
                href={coin?.links?.blockchain_site[0]}
              >
                explore/coin.com
              </a>
            </div>
          </div>
          <div class="col ">
            <div>
              <h3 class="mb-2 fs-5 ">White Paper</h3>
              <a
                className="fs-4 fw-light text-primary"
                href={coin?.links?.whitepaper}
              >
                {coin.id}.org
              </a>
            </div>
          </div>
          <div class="col ">
            <div>
              <h3 class=" mb-2 fs-5 ">Community</h3>
              <a
                className="fs-4 fw-light text-primary"
                href={coin?.links?.subreddit_url}
              >
                Reddit
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 my-5 text-center">
        <p class=" col-lg-8 mx-auto lead">
          Bitcoin is the world's most traded cryptocurrency, and represents the
          largest piece of the crypto market pie. It was the first digital coin
          and as such, remains the most famous and widely-adopted cryptocurrency
          in the world. It's the original gangster in whose footsteps all other
          coins follow. The birth of Bitcoin was the genesis of an entirely new
          asset class, and a huge step away from traditional, centrally
          controlled money. Today, many advocates believe Bitcoin will
          facilitate the next stage for the global financial system, although
          this — of course — remains to be seen.
        </p>
      </div>
    </div>
  );
};

export default CoinDetails;
