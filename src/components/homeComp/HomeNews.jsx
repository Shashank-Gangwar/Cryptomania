import { Link } from "react-router-dom";
import Loader from "../Loader.jsx";
import style from "./HomeNews.module.css";
import { CryptoState } from "../../store/CryptoContext.jsx";

const HomeNews = () => {
  const { news } = CryptoState();

  return news.length === 0 ? (
    <div className="m-5">
      <Loader></Loader>
    </div>
  ) : (
    <div className="container px-4 py-5">
      <hr />
      <h2 className="mb-4">Crypto News {">"}</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ">
        {news.slice(0, 6)?.map((article, index) => {
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
            <div className="col" key={index}>
              <Link
                to={article.url}
                id={style.newsCard}
                className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg "
                style={{
                  backgroundImage: `url(${article.urlToImage})`,
                  backgroundSize: "cover",
                }}
              >
                <div className="d-flex flex-column h-100 px-5 pb-3 text-white text-shadow-1 bg-dark bg-opacity-75">
                  <h3 className="pt-3 border-black mb-3 display-7 lh-1 text-white">
                    {article.title?.length > 80
                      ? article.title.slice(0, 80) + "..."
                      : article.title}
                  </h3>
                  <ul className="d-flex list-unstyled mt-auto">
                    <li className="me-auto text-warning">
                      Read Acticle <span id={style.arrow}>→</span>
                    </li>
                    <li className="d-flex align-items-center me-3">
                      <small>{published}</small>
                    </li>
                  </ul>
                </div>
              </Link>
            </div>
          );
        })}
        <div>
          <Link
            to={"/cryptonews"}
            className="btn btn-outline-primary border-0 "
          >
            Read More Articles {">"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeNews;
