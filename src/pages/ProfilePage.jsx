import { useEffect, useRef, useState } from "react";
import { CryptoState, numberWithCommas } from "../store/CryptoContext";
import { MdDeleteOutline } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const [buttonActive, setButtonActive] = useState("whishList");
  const [profilePic, setProfilePic] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [deleting, setdeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const nameRef = useRef("");
  const emailRef = useRef("");

  const { setPage, symbol, user, setUser, loggedIn, coinsListData } =
    CryptoState();

  useEffect(() => {
    if (loggedIn) setPage("profile");
  }, []);

  const wishlist = user.wishlist?.map((coin) => {
    return coinsListData.find((item) => {
      return item.id == coin;
    });
  });

  const handleProfilePic = (e) => {
    e.target.files[0] && setProfilePic(e.target.files[0]);
    //console.log(e.target.files);
  };

  const handleChanges = async (e) => {
    e.preventDefault();

    let updatedUserName = nameRef.current.value;
    let updatedEmail = emailRef.current.value;

    if (updatedUserName !== "" && updatedUserName.length < 4) {
      setErrorMsg("UserName should be atleast four characters");
      return;
    }

    if (
      updatedEmail !== "" &&
      !(updatedEmail.includes(".com") && updatedEmail.includes("@"))
    ) {
      setErrorMsg("Invalid Email Type!");
      return;
    }

    if (updatedEmail === user.email) {
      if (updatedUserName === "") {
        return;
      }
      updatedEmail = "";
    }

    setLoading(true);
    setErrorMsg("");
    //console.log("loading");

    if (updatedEmail !== "" || updatedUserName !== "") {
      await axios
        .post(
          "http://localhost:8000/api/v1/users/updateAccountDetails",
          {
            userName: updatedUserName === "" ? user.userName : updatedUserName,
            email: updatedEmail,
          },
          {
            withCredentials: true,
          }
        )
        .then(function (response) {
          //console.log("response \n", response);
          setUser(response.data.data);
          //console.log(response.data.data);
          return;
        })
        .catch((error) => {
          //console.log(error);
          setLoading(false);
          return;
        });
    }

    //console.log("updated user");
    //console.log(profilePic);

    if (profilePic !== "") {
      //console.log("avatar api call");

      await axios
        .post(
          profilePic === "profilePicture.png"
            ? "http://localhost:8000/api/v1/users/deleteAvatar"
            : "http://localhost:8000/api/v1/users/updateAvatar",
          {
            avatar: profilePic,
          },

          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(function (response) {
          //console.log("response \n", response);

          setUser(response.data.data);
          setLoading(false);
          //console.log(response.data.data);
        })
        .catch((error) => {
          //console.log(error);
          setLoading(false);
        });
    }
    setLoading(false);
  };

  const handleDeleteCoin = async (coin) => {
    setdeleting(true);
    if (!coin) return;

    await axios
      .post(
        "http://localhost:8000/api/v1/users/updateWishlist",
        {
          coin: coin,
          action: "delete",
        },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        //console.log("response \n", response);

        setUser(response.data.data);
        setdeleting(false);
        //console.log(response.data.data);
      })
      .catch((error) => {
        //console.log(error);
        setdeleting(false);
      });
  };

  return loggedIn ? (
    <>
      <div
        id="loader"
        className={`w-100 h-100 bg-light bg-opacity-75 position-absolute z-3 ${
          loading
            ? "d-flex justify-content-center align-items-center"
            : "d-none"
        }`}
      >
        <Loader />
      </div>

      <div className="singleCoinPage" style={{ minHeight: "90vh" }}>
        <div className="col-lg-8 mx-4 py-4 coinTopDetail ">
          {/* for large screen */}
          <div className="position-relative me-4 d-none d-md-flex align-items-center">
            <img
              src={user.avatar ? user.avatar : "profilePicture.png"}
              alt="profile"
              height="200"
              width="200"
              className="flex-shrink-0 my-0 position-relative flipCoin me-5 rounded-circle"
            />
            <div>
              <h2 className="fs-1 text-capitalize">
                {user.userName ? user.userName : "UserName"}
              </h2>

              <p>
                <LuCalendarDays /> Joined :{" "}
                {user.createdAt?.slice(11, 16) +
                  " , " +
                  user.createdAt?.slice(0, 10)}
              </p>
            </div>
          </div>

          {/* for small screen */}
          <div className="position-relative  d-md-none d-flex flex-column me-3">
            <div className="d-flex align-items-center">
              <img
                src={user.avatar ? user.avatar : "profilePicture.png"}
                alt="profile"
                height="80"
                width="80"
                className="flex-shrink-1 my-0 position-relative flipCoin me-3 rounded-circle"
              />

              <h2 className="fs-3 text-capitalize">
                {user.userName ? user.userName : "UserName"}
              </h2>
            </div>
            <div className="ms-2 mt-2">
              <small className="d-flex align-items-center">
                <span className="pb-1 me-1">
                  <LuCalendarDays />
                </span>
                Joined :{" "}
                {user.createdAt?.slice(11, 16) +
                  " , " +
                  user.createdAt?.slice(0, 10)}
              </small>
            </div>
          </div>
        </div>
        <div className="d-flex mt-0 border-bottom mb-3 ps-3">
          <div>
            <span
              className={`btn btn-outline-secondary border-0 mx-1 px-auto  rounded-0 ${
                buttonActive === "whishList" && "active"
              }`}
              onClick={() => setButtonActive("whishList")}
            >
              WhishList
            </span>
          </div>
          <div>
            <span
              className={`btn btn-outline-secondary border-0 mx-1 px-auto rounded-0 ${
                buttonActive === "settings" && "active"
              }`}
              onClick={() => setButtonActive("settings")}
            >
              Settings
            </span>
          </div>
        </div>

        {/*wishlist and setting*/}

        <div className="mb-4 position-relative">
          <div
            className={`${
              !deleting && "d-none"
            } w-100 h-100 pt-5 bg-light bg-opacity-75 z-3 position-absolute `}
          >
            <Loader />
          </div>
          {buttonActive === "whishList" ? (
            user.wishlist.length !== 0 ? (
              wishlist.map((coin, index) => {
                return (
                  <div className="d-flex" key={index}>
                    <Link
                      to={`/coin/${coin?.id}`}
                      className="list-group mx-3 my-2 w-100"
                    >
                      <div className="list-group-item list-group-item-action d-flex gap-3 py-2">
                        <img
                          src={coin?.image}
                          alt="twbs"
                          width="40"
                          height="40"
                          className="rounded-circle flex-shrink-0"
                        />
                        <div className="d-flex gap-2 w-100 justify-content-between align-items-center pe-4">
                          <div>
                            <h6 className="mb-0">{coin?.name}</h6>
                            <p className="mb-0 opacity-75 text-uppercase">
                              {coin?.symbol}
                            </p>
                          </div>
                          <small className=" text-nowrap">
                            {symbol}
                            {numberWithCommas(coin?.current_price)}
                          </small>
                          <small
                            className={`text-nowrap d-none d-md-inline ${
                              coin?.price_change_percentage_24h < 0
                                ? "text-danger"
                                : "text-success"
                            }`}
                          >
                            {coin?.price_change_percentage_24h > 0 && "+"}
                            {coin?.price_change_percentage_24h}
                          </small>
                        </div>
                      </div>
                    </Link>
                    <span
                      className="btn  btn-outline-danger border-0 fs-2 px-2 mt-2 h-50 me-4"
                      onClick={() => handleDeleteCoin(coin?.id)}
                    >
                      <MdDeleteOutline />
                    </span>
                  </div>
                );
              })
            ) : (
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "30vh" }}
              >
                No Coin in WhishList
                <Link
                  to="/coinsList"
                  onClick={() => setPage("coins")}
                  className="btn btn-warning mt-2"
                >
                  Add Coins
                </Link>
              </div>
            )
          ) : (
            /* Settings */
            <div className="mx-4 d-flex flex-column align-items-center ">
              <form
                onSubmit={handleChanges}
                className="border rounded-3 p-3 mb-3"
                style={{ maxWidth: "900px", width: "90vmin" }}
              >
                <div className="d-block d-sm-flex align-items-center">
                  <label className=" col-3 mb-2" htmlFor="floatingInputname">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="floatingInputname"
                    placeholder={user.userName}
                    ref={nameRef}
                  />
                </div>

                <div className="d-block d-sm-flex align-items-center">
                  <label htmlFor="floatingInputmail" className="col-3 mb-2 ">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control mb-2"
                    id="floatingInputmail"
                    placeholder={user.email}
                    ref={emailRef}
                  />
                </div>

                {/* upload Photo */}
                <div className="my-5 d-flex">
                  <img
                    src={
                      profilePic !== "profilePicture.png" && profilePic !== ""
                        ? URL.createObjectURL(profilePic)
                        : user.avatar && profilePic === ""
                        ? user.avatar
                        : "profilePicture.png"
                    }
                    alt="img"
                    width="50"
                    height="50"
                    id="profile-pic"
                    style={{ margin: "0 10vmin 0 3vmin" }}
                  />

                  <div className="d-flex">
                    <label
                      htmlFor="input-file1"
                      className="btn text-primary border-0 ms-3 px-1"
                    >
                      Upload Photo
                    </label>

                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      id="input-file1"
                      className="d-none"
                      onChange={handleProfilePic}
                    />
                    <span
                      className="btn text-primary border-0 ms-1 px-1 "
                      onClick={() => {
                        setProfilePic("profilePicture.png");
                      }}
                    >
                      Remove Photo
                    </span>
                  </div>
                </div>

                {/* Error msg */}
                <small
                  className={`text-danger mt-2 ${errorMsg === "" && "d-none"}`}
                >
                  {errorMsg}
                </small>

                {/* Apply Changes Button */}
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary py-2 mt-2" type="submit">
                    Apply Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    <div className="w-100 h-100 bg-light  position-absolute z-3 d-flex justify-content-center align-items-center ">
      {" "}
      Unauthorized Access!{" "}
      <Link
        to="/"
        onClick={() => {
          setPage("home");
        }}
        className="text-primary ms-1"
      >
        go back
      </Link>
    </div>
  );
};

export default ProfilePage;
