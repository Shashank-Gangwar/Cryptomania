const HeroLogin = () => {
  return (
    <div
      className="heroLogin d-none d-lg-flex justify-content-center align-items-center text-light "
      style={{ width: "100%", height: "100vh" }}
    >
      <div className="px-3 text-center" style={{ width: "100%" }}>
        <h1 className="fw-bold" style={{ fontFamily: "cursive" }}>
          Welcome !
        </h1>
        <p className="fs-4 mt-4">
          Don't Save Money! Invest It and Make More....
        </p>

        <div className="d-flex justify-content-evenly mt-5 text-light ">
          {1 > 0 ? (
            <></>
          ) : (
            coinList.map((coin) => {
              <div className="d-flex align-items-center rounded-pill bg-black bg-opacity-25 px-2 ">
                <img src={coin.image} alt={coin.name} height="40" width="40" />
                <div className="mx-2">
                  <p className="my-1">{coin.name}</p>
                  <p className="my-1 text-success">₹{coin.current_price}</p>
                </div>
              </div>;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroLogin;
