import React, { useEffect, useState } from "react";
import Loader from "./loader";
import { withRouter, Link } from "react-router-dom";
import { youtubeApi } from "../api";

const Detail = withRouter(({ location: { pathname }, mostPopular }) => {
  const [title, setTitle] = useState();
  const [tags, setTags] = useState();
  const [loading, setLoading] = useState(true);

  const videoTitle = async () => {
    try {
      const videoId = pathname.split("/")[1];
      const {
        data: { items },
      } = await youtubeApi.videoTitle(videoId);
      setTitle(items[0].snippet.localized.title);
      setTags(items[0].snippet.tags);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const videoCount = () => {};

  useEffect(() => {
    videoTitle();
    videoCount();
  }, []);

  return (
    <div className="detail-container">
      <div className="detail-video-play">
        <iframe
          title="contents"
          className="youtube"
          src={`https://www.youtube.com/embed${pathname}?autoplay=1`}
          allowFullScreen=""
          frameBorder="false"
        ></iframe>
        <div className="detail-description-container">
          {mostPopular &&
            mostPopular?.map((item) => (
              <Link
                to={`/${item.id}`}
                key={item.id}
                className="detail-mostPopular"
              >
                <div className="detail-thumbnail">
                  <img src={item.snippet.thumbnails.medium.url} />
                </div>
                <div className="detail-description">
                  <span>{item.snippet.title}</span>
                  <span>{item.snippet.channelTitle}</span>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <div className="video-list">
        <h2 className="video-title">{title}</h2>
        <div className="video-tags">
          {tags &&
            tags.map((tag, index) =>
              index < 12 ? <div>{`#${tag}`}</div> : null
            )}
        </div>
      </div>
    </div>
  );
});

export default Detail;
