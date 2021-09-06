import React from "react";
import { Link } from "react-router-dom";
import Loader from "./loader";

const Home = ({ mostPopular, loading }) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home-container">
          {mostPopular?.map((item) => (
            <Link to={`/${item.id}`} key={item.id} className="mostPopular">
              <div className="mostPopular-thumbnail">
                <img src={item.snippet.thumbnails.medium.url} />
              </div>
              <div className="mostPopular-description">
                <span>
                  {item.snippet.title && item.snippet.title.length > 23
                    ? `${item.snippet.title.substr(0, 23)}...`
                    : item.snippet.title}
                </span>
                <span>{item.snippet.channelTitle}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
