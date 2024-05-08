import React, { useEffect, useState } from "react";
import style from "./CoinChart.module.css";
import { HistoricalChart } from "../../config/api";
import axios from "axios";
import { CryptoState } from "../../store/CryptoContext";

import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const CoinChart = ({ id, coin }) => {
  const [historicData, setHistoricData] = useState({});
  const [days, setDays] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [wishlistLoader, setWishlistLoader] = useState(false);
  const { currency, user, setUser, loggedIn } = CryptoState();

  const percent = {
    1: coin?.market_data?.price_change_percentage_24h.toFixed(3),
    7: coin?.market_data?.price_change_percentage_7d.toFixed(3),
    30: coin?.market_data?.price_change_percentage_30d.toFixed(3),
    200: coin?.market_data?.price_change_percentage_200d.toFixed(3),
    365: coin?.market_data?.price_change_percentage_1y.toFixed(3),
  };

  const fetchHistoricData = async () => {
    setFetching(true);
    const { data } = await axios.get(
      HistoricalChart(id, currency.toLowerCase(), days)
    );

    setHistoricData(data.prices);
    setFetching(false);
  };
  useEffect(() => {
    //console.log(user.wishlist?.includes(id));
  }, []);

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  const handleWishlistButton = async () => {
    setWishlistLoader(true);
    await axios
      .post(
        "https://crytpomania-backend.onrender.com/api/v1/users/updateWishlist",
        {
          coin: id,
          action: user.wishlist?.includes(id) ? "delete" : "add",
        },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        //console.log("response \n", response);

        setUser(response.data.data);
        setWishlistLoader(false);
        // setdeleting(false);
        // //console.log(response.data.data);
      })
      .catch((error) => {
        //console.log(error);
        setWishlistLoader(false);
        // setdeleting(false);
      });
  };

  const getGradeint = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    // Create a linear gradient
    // The start gradient point is at x=20, y=0
    // The end gradient point is at x=220, y=0
    const gradient = ctx.createLinearGradient(0, 150, 0, 300);
    // Add three color stops
    gradient.addColorStop(0, percent[days] > 0 ? "#89DBCD" : "#FF8C8C");
    gradient.addColorStop(1, "white");
    return gradient;
  };

  return (
    <>
      <div className={` ${style.aboveClass} d-sm-flex flex-wrap`}>
        <div className=" d-flex  d-md-none border rounded-3 ">
          <span
            className="ps-2 pt-2 d-inline"
            style={{ color: percent[days] > 0 ? "#089981" : "red" }}
          >
            {percent[days] > 0 && "+"}
            {percent[days]}%
          </span>
          <select
            value={days}
            onChange={(event) => {
              setDays(Number(event.target.value));
            }}
            className="d-inline form-select border-white"
            style={{ width: "110px" }}
          >
            <option value="1">24 hr</option>
            <option value="7">7 Days</option>
            <option value="30">1 Month</option>
            <option value="200">6 Month</option>
            <option value="365">1 Year</option>
          </select>
        </div>

        {loggedIn ? (
          <div
            className="ms-auto btn btn-outline-light py-0 text-danger border-0"
            onDoubleClick={handleWishlistButton}
          >
            {wishlistLoader ? (
              <>
                <span
                  class="spinner-border spinner-border-sm "
                  aria-hidden="true"
                ></span>
                <span className="fs-5"> Loading...</span>
              </>
            ) : (
              <span className="text-danger fs-5 me-1 py-0">
                {user.wishlist?.includes(id) ? (
                  <RiHeartFill />
                ) : (
                  <RiHeartLine />
                )}{" "}
                Wishlist
              </span>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>

      {fetching ? (
        <div
          className="d-flex justify-content-center align-items-center w-100 my-5"
          style={{ height: "40vh" }}
        >
          <span class="spinner-border  "></span>
        </div>
      ) : (
        <div className={style.coinChart}>
          <Line
            id="canvas"
            data={{
              labels: Object.values(historicData).map((coin) => {
                let date = new Date(coin[0]);
                let time = `${date.getHours()}:${date.getMinutes()}`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  fill: true,
                  data: Object.values(historicData).map((coin) => {
                    return coin[1];
                  }),
                  label: ``,
                  borderColor: percent[days] > 0 ? "#089981" : "#FE4040",
                  backgroundColor: getGradeint,
                  yAxisID: "yaxisLabels",
                  xAxisID: "xaxisLabels",
                },
              ],
            }}
            options={{
              responsive: true,
              tension: 0,
              maintainAspectRatio: false,
              scales: {
                yaxisLabels: {
                  position: "right",
                  grid: { display: false },
                },
                xaxisLabels: {
                  grid: { display: false },
                  ticks: {
                    autoSkip: true,
                    autoSkipPadding: 10,
                    align: "start",
                    maxRotation: 0,
                    maxTicksLimit: 11,
                  },
                },
              },
              elements: {
                point: {
                  radius: 1,
                },
              },
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    boxWidth: 0,
                  },
                },
              },
            }}
          />
        </div>
      )}
      <div className=" d-none d-md-flex justify-content-around mt-4 ">
        <div
          onClick={() => setDays(1)}
          className={`btn ${days === 1 && "active"}  btn-light ${
            style.chartDate
          }`}
        >
          <span>Today</span>
          <span style={{ color: percent[1] > 0 ? "#089981" : "red" }}>
            {percent[1] > 0 && "+"}
            {percent[1]}%
          </span>
        </div>
        <div
          onClick={() => setDays(7)}
          className={`btn ${days === 7 && "active"}  btn-light ${
            style.chartDate
          }`}
        >
          <span>1 Week</span>
          <span style={{ color: percent[7] > 0 ? "#089981" : "red" }}>
            {percent[7] > 0 && "+"}
            {percent[7]}%
          </span>
        </div>
        <div
          onClick={() => setDays(30)}
          className={`btn ${days === 30 && "active"} btn-light ${
            style.chartDate
          }`}
        >
          <span>1 Month</span>
          <span style={{ color: percent[30] > 0 ? "#089981" : "red" }}>
            {percent[30] > 0 && "+"}
            {percent[30]}%
          </span>
        </div>
        <div
          onClick={() => setDays(200)}
          className={`btn ${days === 200 && "active"}  btn-light ${
            style.chartDate
          }`}
        >
          <span>6 Month</span>
          <span style={{ color: percent[200] > 0 ? "#089981" : "red" }}>
            {percent[200] > 0 && "+"}
            {percent[200]}%
          </span>
        </div>
        <div
          onClick={() => setDays(365)}
          className={`btn ${days === 365 && "active"}  btn-light ${
            style.chartDate
          }`}
        >
          <span>1 Year</span>
          <span style={{ color: percent[365] > 0 ? "#089981" : "red" }}>
            {percent[365] > 0 && "+"}
            {percent[365]}%
          </span>
        </div>
      </div>
    </>
  );
};

export default CoinChart;
