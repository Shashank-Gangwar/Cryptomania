import { Link } from "react-router-dom";
import { CryptoState } from "../store/CryptoContext";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const { currency, setCurrency } = CryptoState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <header className="d-flex flex-wrap justify-content-between py-3 bg-black fixed-top">
      <div>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 ">
          <span className="ms-3 fs-4 text-white">CryptoMania</span>
        </a>
      </div>
      <div>
        <ul className="nav d-none d-sm-flex ">
          <li className="nav-item">
            <Link to="/" className="nav-link text-white">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/coinsList" href="#" className="nav-link text-white">
              Coins
            </Link>
          </li>
          <li className="nav-item me-4">
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
      <div className="d-block d-sm-none">
        <span
          className="text-white me-4 "
          onClick={handleShow}
          style={{ cursor: "pointer", fontSize: "2rem" }}
        >
          <IoMenu />
        </span>

        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          scroll="true"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Link
              to="/"
              className="btn btn-light d-block mb-2"
              onClick={() => setShow(false)}
            >
              Home
            </Link>
            <Link
              to="/coinsList"
              href="#"
              className="btn 
                btn-light d-block mb-2"
              onClick={() => setShow(false)}
            >
              Coins
            </Link>
            <select
              className="form-select selectCurrency bg-light d-block"
              value={currency}
              onChange={(event) => {
                setCurrency(event.target.value),
                  console.log(event.target.value);
                setShow(false);
              }}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </header>
  );
};

export default NavBar;
