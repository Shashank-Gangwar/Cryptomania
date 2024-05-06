import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroLogin from "../components/HeroLogin";
import { CryptoState } from "../store/CryptoContext";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import axios from "axios";
import Loader from "../components/Loader";

const LoginPage = () => {
  const { setLoggedIn, loggedIn, setUser } = CryptoState();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loggedIn && navigate("/");
  }, []);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!(email.includes(".com") && email.includes("@"))) {
      setErrorMsg("Invalid Email Type!");
      passwordRef.current.value = "";
      return;
    }

    if (password.length < 6) {
      setErrorMsg(
        "Invalid Password! Password should have at least 6 characters "
      );
      passwordRef.current.value = "";
      return;
    }

    setErrorMsg("");
    const loginDetails = { email: email, password: password };

    passwordRef.current.value = "";

    setLoading(true);
    await axios
      .post(
        "https://crytpomania-backend.onrender.com/api/v1/users/login",
        loginDetails,
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        // console.log("response \n", response);
        setLoading(false);
        setUser(response.data.data);
        navigate("/");
        setLoggedIn(true);
        // console.log(response.data);
      })
      .catch(function (error) {
        setLoading(false);
        error.response.status >= 400 &&
          error.response.status < 500 &&
          setErrorMsg(error.response.data.errorMessage);
        // console.log(error);
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
            {/* Form */}
            <form onSubmit={handleOnSubmit}>
              <h1 className="h3 mb-3 fw-normal">Log In</h1>

              <div className="form-floating">
                <input
                  type="email"
                  className="form-control mb-2"
                  id="floatingInput"
                  placeholder="name@example.com"
                  ref={emailRef}
                />
                <label htmlFor="floatingInput">
                  <MdOutlineMail /> Email address
                </label>
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  ref={passwordRef}
                />
                <label htmlFor="floatingPassword">
                  <RiLockPasswordLine /> Password
                </label>
              </div>
              <p className="error text-danger">{errorMsg}</p>
              <div className="form-check text-start my-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="remember-me"
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Remember me
                </label>
              </div>

              <button className="btn btn-primary w-100 py-2" type="submit">
                Log In
              </button>
            </form>

            <div className="d-flex justify-content-between mt-4 mb-3 ">
              <p className="text-body-secondary">© 2024-2030</p>
              <p>
                Don't have an Account?{" "}
                <Link to="/register" className="text-primary">
                  Sign up.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
