import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import CryptoContext from "./store/CryptoContext";

function App() {
  return (
    <CryptoContext>
      <NavBar />
      <Outlet />
      <Footer />
    </CryptoContext>
  );
}

export default App;
