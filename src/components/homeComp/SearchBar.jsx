import { useState } from "react";
import { CryptoState } from "../../store/CryptoContext";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const { coinsListData, symbol, setPage } = CryptoState();
  const searchData = (value) => {
    const results = coinsListData.filter((coin) => {
      return value && coin && coin.id.includes(value);
    });
    setItems(results);
  };

  const handleChange = (value) => {
    setInput(value);
    searchData(value);
  };

  return (
    <>
      <div className="position-relative">
        <input
          type="text"
          className="heroSearch "
          placeholder="Search Coin here"
          value={input}
          onChange={(e) => handleChange(e.target.value.toLowerCase())}
        />
        <div className="position-absolute top-100 start-50 translate-middle-x bg-light heroSearchResults">
          {items.map((coin) => (
            <Link
              key={coin?.id}
              onClick={() => setPage("")}
              to={`/coin/${coin.id}`}
              className="d-flex align-items-center justify-content-between resultItem"
            >
              <div className="d-flex align-items-center">
                <img
                  src={coin?.image}
                  alt=""
                  width="25"
                  height="25"
                  className="me-2"
                />
                <span>{coin?.name}</span>
              </div>
              <div className="d-sm-block d-none">
                {symbol}
                {coin?.current_price}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
