import { Link } from "react-router-dom";
import { CryptoState } from "../store/CryptoContext";

const NavBar = () => {
  const { currency, setCurrency } = CryptoState();
  return (
    <header className="d-flex flex-wrap justify-content-between py-3 bg-black">
      <div>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 ">
          <span className="ms-3 fs-4 text-white">CryptoMania</span>
        </a>
      </div>
      <div>
        <ul className="nav ">
          <li className="nav-item">
            <Link to="/" className="nav-link text-white">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              Coins
            </a>
          </li>
          <li className="nav-item">
            <select
              className="form-select selectCurrency"
              value={currency}
              onChange={(event) => {
                setCurrency(event.target.value),
                  console.log(event.target.value);
              }}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
