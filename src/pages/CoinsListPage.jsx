import { useEffect, useState } from "react";
import style from "../components/CoinsList.module.css";
import CoinsList from "../components/CoinsList";
import { CryptoState } from "../store/CryptoContext";

const CoinsListPage = () => {
  const { coinsListData, setPage } = CryptoState();
  const [load, setLoad] = useState(0);
  useEffect(() => {
    setPage("coins");
  }, []);
  // console.log(coinsListData[0]);
  // console.log(coinsListData);
  return (
    <>
      <div>
        <div
          className="mb-5"
          style={{
            marginTop: "72px",
            backgroundImage: `url(${"coinlist.jpeg"})`,
            backgroundPosition: "center",
            height: "30vh",
            backgroundSize: "cover",
          }}
        >
          <h1 className="w-100 h-100 justify-content-center text-white d-flex align-items-center bg-dark bg-opacity-75">
            Crypto Coins
          </h1>
        </div>

        <div className="container">
          <div className="list-group mx-3 mb-2 listItem opacity-50">
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div className="ms-5">Symbol</div>
              <div className="d-flex justify-content-between align-items-center flex-row-reverse coinStats">
                <div className="d-none d-md-block me-2">Market Cap</div>
                <div>Price & CHG</div>
              </div>
            </div>
          </div>
        </div>
        {coinsListData[0] == 0 ? (
          <div
            className={`d-flex justify-content-center align-item-center ${style.loading} `}
          >
            <div className="spinner-border text-dark my-5">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className={style.items}>
            <CoinsList coins={coinsListData} from={0} to={29} />
            {load === 1 && (
              <CoinsList coins={coinsListData} from={30} to={99} />
            )}
            <div className="d-flex justify-content-center">
              <span
                onClick={() => setLoad(1)}
                className={`btn btn-primary my-3 ${load === 1 && "d-none"}`}
              >
                Load More Coins
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CoinsListPage;
