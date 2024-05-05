import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/navbarComponents/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import CryptoContext from "./store/CryptoContext";
import { useEffect } from "react";
import FetchData from "./components/FetchData";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <CryptoContext>
      {pathname === "/register" || pathname === "/login" ? (
        <Outlet />
      ) : (
        <>
          <FetchData />
          <NavBar />
          <Outlet />
          <Footer />
        </>
      )}
    </CryptoContext>
  );
}

export default App;
