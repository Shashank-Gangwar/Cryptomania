import { CryptoState } from "../../store/CryptoContext.jsx";
import { useEffect, useRef, useState } from "react";

import axios from "axios";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import OffCanvasNavbar from "./OffCanvasNavbar.jsx";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);

  const {
    currency,
    setCurrency,
    page,
    setPage,
    loggedIn,
    user,
    setUser,
    setLoggedIn,
  } = CryptoState();

  useEffect(() => {
    if (!loggedIn) {
      handleCheckLoginUser();
    }
  }, []);

  const handleCheckLoginUser = async () => {
    await axios
      .post(
        "https://crytpomania-backend.onrender.com/api/v1/users/checklogin",
        {},
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        setUser(response.data.data);
        setLoggedIn(true);
      })
      .catch((error) => {
        setLoggedIn(false);
      });
  };

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
        setUser({});
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
    <header className="d-flex flex-wrap justify-content-between py-3 px-lg-5 bg-black fixed-top">
      <div>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 ">
          <span className="ms-3 fs-4 text-white">CryptoMania</span>
        </a>
      </div>
      <div>
        <ul className="nav d-none d-sm-flex me-4 ">
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
              className={`nav-link ${
                page === "coins" ? "text-primary" : "text-white"
              } rounded-3 `}
              onClick={() => setPage("coins")}
            >
              Coins
            </Link>
          </li>
          <li className="nav-item ">
            <Link
              to="/cryptonews"
              className={`nav-link ${
                page === "news" ? "text-primary" : "text-white"
              } rounded-3 `}
              onClick={() => setPage("news")}
            >
              News
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
          <li
            className={`nav-item ${page === "profile" ? "d-none" : "d-block"}`}
          >
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
        </ul>
      </div>
      <div className="d-block d-sm-none">
        <OffCanvasNavbar />
      </div>
    </header>
  );
};

export default NavBar;
