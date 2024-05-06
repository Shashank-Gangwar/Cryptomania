import Offcanvas from "react-bootstrap/Offcanvas";
import { CryptoState } from "../../store/CryptoContext";
import { Link } from "react-router-dom";

//Icons..
import {
  IoMenu,
  IoPersonSharp,
  IoList,
  IoNewspaperOutline,
} from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { GiTwoCoins } from "react-icons/gi";
import { useState } from "react";
import axios from "axios";

const OffCanvasNavbar = () => {
  const [show, setShow] = useState(false);
  const { currency, setCurrency, page, setPage, loggedIn, setLoggedIn, user } =
    CryptoState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = async () => {
    await axios
      .post(
        "https://crytpomania-backend.onrender.com/api/v1/users/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        //console.log("response \n", response);
        setLoggedIn(false);
        //console.log("logged-out");
      })
      .catch((error) => {
        //console.log(error);
      });
  };
  return (
    <>
      <span
        className="text-white me-4 "
        onClick={handleShow}
        style={{ cursor: "pointer", fontSize: "2rem" }}
      >
        <IoMenu />
      </span>

      <Offcanvas show={show} onHide={handleClose} placement="end" scroll="true">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link
            to="/"
            className={`btn ${
              page === "home" ? "btn-primary" : "btn-light"
            } d-block mb-2`}
            onClick={() => {
              setShow(false);
              setPage("coins");
            }}
          >
            <span className="me-2 fs-5">
              <IoMdHome />
            </span>
            Home
          </Link>
          <Link
            to="/coinsList"
            className={`btn ${
              page === "coins" ? "btn-primary" : "btn-light"
            } d-block mb-2`}
            onClick={() => {
              setShow(false);
              setPage("coins");
            }}
          >
            <span className="me-2 fs-5">
              <GiTwoCoins />
            </span>
            Coins
          </Link>
          <Link
            to="/cryptonews"
            className={`btn ${
              page === "news" ? "btn-primary" : "btn-light"
            } d-block mb-2`}
            onClick={() => {
              setShow(false);
              setPage("news");
            }}
          >
            <span className="me-2 fs-5">
              <IoNewspaperOutline />
            </span>
            News
          </Link>
          <Link
            to={loggedIn ? "/profile" : "/login"}
            href="#"
            className={`btn ${
              page === "profile" ? "btn-primary" : "btn-light"
            } d-block mb-2`}
            onClick={() => {
              setShow(false);
              setPage("profile");
            }}
          >
            <span className="me-2 fs-5">
              <IoPersonSharp />
            </span>
            {loggedIn ? "Profile" : "Login"}
          </Link>
          {loggedIn ? (
            <Link
              to="/coinsList"
              href="#"
              className={`btn ${
                page === "profile" ? "btn-primary" : "btn-light"
              } d-block mb-2`}
              onClick={() => {
                setShow(false);
                setPage("coins");
              }}
            >
              <span className="me-2 fs-5">
                <IoList />
              </span>
              WhishList
            </Link>
          ) : (
            <></>
          )}

          <hr />

          <h5>Currency</h5>
          <select
            className="form-select selectCurrency bg-light d-block"
            value={currency}
            onChange={(event) => {
              setCurrency(event.target.value), //console.log(event.target.value);
                setShow(false);
            }}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
        </Offcanvas.Body>
        {loggedIn && (
          <div className="d-flex justify-content-between mx-2 my-2 align-items-center">
            <Link
              to="/"
              className={`btn btn-danger py-1 mb-1 mx-2`}
              onClick={() => {
                setShow(false);
                setPage("home");
                handleLogout();
              }}
            >
              LogOut
            </Link>
            <Link
              to="/profile"
              className={`btn d-block mb-2 mx-2 p-0`}
              onClick={() => {
                setShow(false);
                setPage("home");
              }}
            >
              <img
                src={user.avatar ? user.avatar : "profilePicture.png"}
                alt="Profile"
                height="40"
                width="40"
              />
            </Link>
          </div>
        )}
      </Offcanvas>
    </>
  );
};

export default OffCanvasNavbar;
