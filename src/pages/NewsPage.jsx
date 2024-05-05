import { Link } from "react-router-dom";
import { CryptoState } from "../store/CryptoContext";

import style from "../components/homeComp/HomeNews.module.css";
import Loader from "../components/Loader";
import { useEffect } from "react";

const NewsPage = () => {
  const { news, setPage } = CryptoState();
  useEffect(() => {
    setPage("news");
  }, []);
  return news.length !== 0 ? (
    <section>
      <div
        style={{
          marginTop: "72px",
          backgroundImage: `url(${"newsBackground.jpg"})`,
          backgroundPosition: "center",
          height: "30vh",
          backgroundSize: "cover",
        }}
      >
        <h1 className="w-100 h-100 justify-content-center text-white d-flex align-items-center bg-dark bg-opacity-75">
          Crypto Market News
        </h1>
      </div>

      <div className="album py-5 bg-body-tertiary">
        <div className="container d-block d-lg-none">
          {news.slice(0, 50).map((article, index) => {
            if (article.title === "[Removed]") return;
            const date = new Date();
            const articleDate = article.publishedAt;
            const published =
              date.getFullYear() != parseInt(articleDate.slice(0, 4))
                ? date.getFullYear - parseInt(articleDate.slice(0, 4)) + "y"
                : date.getMonth() + 1 !== parseInt(articleDate.slice(5, 7))
                ? date.getMonth() + 1 - parseInt(articleDate.slice(5, 7)) + "m"
                : date.getDate() !== parseInt(articleDate.slice(8, 10))
                ? date.getDate() - parseInt(articleDate.slice(8, 10)) + "d"
                : "Today";
            return (
              <Link
                key={index}
                to={article?.url}
                id={style.newsCard}
                className="list-group mt-2 "
              >
                <div
                  href="#"
                  className="list-group-item list-group-item-action d-flex gap-3 py-3"
                  aria-current="true"
                >
                  <img
                    src={
                      article?.urlToImage
                        ? article?.urlToImage
                        : "heroImage_potrait.jpg"
                    }
                    alt="img"
                    width="100"
                    height="80"
                    className=" flex-shrink-0 d-none d-md-flex"
                  />
                  <div className="d-flex gap-2 w-100 justify-content-between">
                    <div>
                      <h6 className="mb-0">{article?.title}</h6>
                      <p className="mb-0 opacity-75">
                        {article?.description?.slice(0, 150)}
                      </p>
                      <span className="text-warning">
                        Read Full article <span id={style.arrow}>→</span>
                      </span>
                    </div>

                    <small className="opacity-50 text-nowrap">
                      {published}
                    </small>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="container d-none d-lg-block">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {news.map((article, index) => {
              const date = new Date();
              const articleDate = article.publishedAt;
              const published =
                date.getFullYear() != parseInt(articleDate.slice(0, 4))
                  ? date.getFullYear - parseInt(articleDate.slice(0, 4)) + "y"
                  : date.getMonth() + 1 !== parseInt(articleDate.slice(5, 7))
                  ? date.getMonth() +
                    1 -
                    parseInt(articleDate.slice(5, 7)) +
                    "m"
                  : date.getDate() !== parseInt(articleDate.slice(8, 10))
                  ? date.getDate() - parseInt(articleDate.slice(8, 10)) + "d"
                  : "Today";
              return (
                <Link
                  className="col h-100"
                  key={index}
                  to={article?.url}
                  id={style.newsPageCard}
                >
                  <div className="card shadow-sm rounded-4 overflow-hidden">
                    <div
                      id={style.newsPageCardImg}
                      className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg "
                      style={{
                        backgroundImage: `url(${article.urlToImage})`,
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="d-flex flex-column h-100 px-5 pb-3 text-white text-shadow-1 bg-dark bg-opacity-50">
                        <h3 className="pt-3 border-black mb-3 display-7 lh-1 text-white">
                          {article.title?.length > 80
                            ? article.title.slice(0, 80) + "..."
                            : article.title}
                        </h3>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="card-text">
                        {article?.description?.slice(0, 150)}...
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="text-warning">
                          Read Full Article
                          <span className="arrow2">→</span>
                        </div>
                        <small className="text-body-secondary">
                          {published}
                        </small>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div
      className="d-flex
    justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Loader />
    </div>
  );
};

export default NewsPage;
