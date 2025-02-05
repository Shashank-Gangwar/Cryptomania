import React, { useRef, useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { Link } from "react-router-dom";
import { CryptoState } from "../../store/CryptoContext";

const NavbarMenu = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);

  const { currency, setCurrency, page, setPage, loggedIn, user, setLoggedIn } =
    CryptoState();

  const handleLogout = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        //console.log("response \n", response);
        setLoggedIn(false);
        setPage("home");
        //console.log("logged-out");
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const imgRef = useRef();
  const menuImgRef = useRef();
  const worldRef = useRef();
  const menuWorldRef = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== menuWorldRef.current && e.target !== worldRef.current) {
      setShowCurrency(false);
    }
    if (e.target !== menuImgRef.current && e.target !== imgRef.current) {
      setShowProfile(false);
    }
  });

  return (
    <div>
      <li className="nav-item ">
        <Link
          to="/"
          className={`nav-link ${
            page === "home" ? "text-primary" : "text-white"
          } rounded-3`}
          onClick={() => setPage("home")}
        >
          Home
        </Link>
      </li>
      <li className="nav-item ">
        <Link
          to="/coinsList"
          href="#"
          className={`nav-link ${
            page === "coins" ? "text-primary" : "text-white"
          } rounded-3 `}
          onClick={() => setPage("coins")}
        >
          Coins
        </Link>
      </li>
      <li className="nav-item ">
        {loggedIn ? (
          <></>
        ) : (
          <Link to="/login" className="nav-link text-white rounded-3">
            Login
          </Link>
        )}
      </li>

      <li className="nav-item ms-2 pt-2 ">
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          show={showCurrency}
          overlay={
            <Popover id="popover-basic">
              <Popover.Body ref={menuWorldRef}>
                <div
                  className={`btn  
                       d-block mb-1 ${
                         currency === "INR" ? "btn-primary" : "btn-light"
                       }`}
                  onClick={() => {
                    setCurrency("INR");
                    setShowCurrency(!showCurrency);
                  }}
                >
                  INR
                </div>
                <div
                  className={`btn  
                      d-block mb-1 ${
                        currency === "USD" ? "btn-primary" : "btn-light"
                      }`}
                  onClick={() => {
                    setCurrency("USD");
                    setShowCurrency(!showCurrency);
                  }}
                >
                  USD
                </div>
              </Popover.Body>
            </Popover>
          }
        >
          <div
            className="text-dark px-2 rounded-2 bg-white"
            ref={worldRef}
            onClick={() => setShowCurrency(!showCurrency)}
            style={{ cursor: "pointer" }}
          >
            {currency}
          </div>
        </OverlayTrigger>
      </li>
      <li className="nav-item ">
        {loggedIn ? (
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            show={showProfile}
            overlay={
              <Popover id="popover-basic">
                <Popover.Body ref={menuImgRef}>
                  <Link
                    to="/profile"
                    className="btn btn-light 
                       d-block mb-1"
                    onClick={() => setShowProfile(!showProfile)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/profile"
                    className="btn btn-light
                       d-block mb-1"
                    onClick={() => setShowProfile(!showProfile)}
                  >
                    WhishList
                  </Link>
                  <Link
                    to="/"
                    className="btn btn-outline-danger border-0
                       d-block mb-1"
                    onClick={() => {
                      setShowProfile(!showProfile);
                      setPage("home");
                      handleLogout();
                    }}
                  >
                    Logout
                  </Link>
                </Popover.Body>
              </Popover>
            }
          >
            <img
              src={user.avatar ? user.avatar : "profilePicture.png"}
              alt="mdo"
              width="32"
              height="32"
              ref={imgRef}
              className="rounded-circle ms-4 mt-1 "
              onClick={() => setShowProfile(!showProfile)}
              style={{ cursor: "pointer" }}
            />
          </OverlayTrigger>
        ) : (
          <></>
        )}
      </li>
    </div>
  );
};
// export default NavbarMenu();
