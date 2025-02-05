import HeroLogin from "../components/HeroLogin";
import {
  RiLockPasswordLine,
  RiLockPasswordFill,
  RiUser3Line,
} from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CryptoState } from "../store/CryptoContext";
import Loader from "../components/Loader";

const RegisterPage = () => {
  const { setLoggedIn, loggedIn, setUser } = CryptoState();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loggedIn && navigate("/");
  }, []);

  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const handleProfilePic = (e) => {
    e.target.files[0] && setProfilePic(e.target.files[0]);
    //console.log(e.target.files);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const userName = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (userName === "" || email === "") {
      setErrorMsg("All fields are required!");
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
      return;
    }

    if (!(email.includes(".com") && email.includes("@"))) {
      setErrorMsg("Invalid Email Type!");
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
      return;
    }

    if (password.length < 6) {
      setErrorMsg(
        "Invalid Password! Password should have at least 6 characters "
      );
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Confirm password should be same as password.");
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
      return;
    }

    setErrorMsg("");

    const loginDetails = {
      userName: userName,
      email: email,
      password: password,
      avatar: profilePic,
    };
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
    //console.log(loginDetails);
    setLoading(true);
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/register`,
        loginDetails,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        //console.log("response \n", response);
        setLoading(false);
        navigate("/");
        setUser(response.data.data);
        //console.log(response.data.data);
        setLoggedIn(true);
      })
      .catch((error) => {
        //console.log(error);
        setLoading(false);
      });
  };
  return (
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

      <div className="d-flex">
        <HeroLogin />
        <div
          className="d-flex align-items-center py-4 bg-body-tertiary"
          style={{ width: "100%", height: "100vh" }}
        >
          <div
            className="w-100 mx-5 
    "
          >
            <div className="mb-5 fs-1 text-center">
              Crypto<span className="text-light bg-dark ">Mania</span>
            </div>

            <form onSubmit={handleOnSubmit}>
              <h1 className="h3 mb-3 fw-normal">Sign Up</h1>

              <div className="form-floating">
                <input
                  type="text"
                  className="form-control mb-2"
                  id="floatingInputname"
                  placeholder="your name"
                  ref={nameRef}
                />
                <label htmlFor="floatingInputname">
                  <RiUser3Line /> Name
                </label>
              </div>

              <div className="form-floating">
                <input
                  type="email"
                  className="form-control mb-2"
                  id="floatingInputmail"
                  placeholder="name@example.com"
                  ref={emailRef}
                />
                <label htmlFor="floatingInputmail">
                  <MdOutlineMail /> Email address
                </label>
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  className="form-control mb-2"
                  id="floatingPassword"
                  placeholder="Password"
                  ref={passwordRef}
                />
                <label htmlFor="floatingPassword">
                  <RiLockPasswordLine /> Password
                </label>
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  className="form-control mb-2"
                  id="floatingInputConfirmPassword"
                  placeholder="confirm password"
                  ref={confirmPasswordRef}
                />
                <label htmlFor="floatingInputConfirmPassword">
                  <RiLockPasswordFill /> Confirm Password
                </label>
              </div>
              <div className="d-flex align-items-center ">
                <img
                  src={
                    profilePic === ""
                      ? "profilePicture.png"
                      : URL.createObjectURL(profilePic)
                  }
                  alt="img"
                  width="50"
                  height="50"
                  id="profile-pic"
                  className="rounded-circle"
                />

                <label
                  htmlFor="input-file"
                  className="btn btn-warning w-100 ms-3"
                >
                  Profile image
                </label>

                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  id="input-file"
                  className="d-none"
                  onChange={handleProfilePic}
                />
              </div>

              <p className="error text-danger">{errorMsg}</p>

              <button className="btn btn-primary w-100 py-2" type="submit">
                Sign up
              </button>
            </form>
            <div className="d-xs-block d-sm-flex justify-content-between mt-4 mb-3">
              <p className="text-body-secondary">© 2024-2030</p>
              <p>
                Already have an Account?{" "}
                <Link to="/login" className="text-primary">
                  LogIn.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
