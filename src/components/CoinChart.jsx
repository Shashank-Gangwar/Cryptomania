import style from "./CoinChart.module.css";

const CoinChart = () => {
  return (
    <div className={style.coinChart}>
      <div class={style.chartTime}>
        <div>
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio1"
            autocomplete="off"
          />
          <label class="btn btn-light" for="btnradio1">
            <p className="fs-5 mb-0">Today</p>
            <p className=" mb-0">+2.13%</p>
          </label>
        </div>

        <div>
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio2"
            autocomplete="off"
          />
          <label class="btn btn-light" for="btnradio2">
            <p className="fs-5 mb-0">Week</p>
            <p className=" mb-0">+2.13%</p>
          </label>
        </div>
        <div>
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio3"
            autocomplete="off"
          />
          <label class="btn btn-light" for="btnradio3">
            <p className="fs-5 mb-0">1 Month</p>
            <p className=" mb-0">+2.13%</p>
          </label>
        </div>
        <div>
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio4"
            autocomplete="off"
          />
          <label class="btn btn-light" for="btnradio4">
            <p className="fs-5 mb-0">6 Month</p>
            <p className=" mb-0">+2.13%</p>
          </label>
        </div>
        <div>
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio5"
            autocomplete="off"
          />
          <label class="btn btn-light" for="btnradio5">
            <p className="fs-5 mb-0">1 Year</p>
            <p className=" mb-0">+2.13%</p>
          </label>
        </div>
        <div>
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio6"
            autocomplete="off"
          />
          <label class="btn btn-light" for="btnradio6">
            <p className="fs-5 mb-0">All Time</p>
            <p className=" mb-0">+2.13%</p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CoinChart;
