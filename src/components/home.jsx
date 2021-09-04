import React from "react";
import Loader from "./loader";

const Home = ({ mostPopular, loading }) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home-container">
          {mostPopular.map((item) => (
            <div key={item.id} className="mostPopular">
              <a href="" className="mostPopular-thumbnail">
                <img src={item.snippet.thumbnails.medium.url} />
              </a>
              <div className="mostPopular-description">
                {item.snippet.channelTitle}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
