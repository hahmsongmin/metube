import React, { useEffect, useState } from "react";
import Loader from "./loader";
import { withRouter, Link } from "react-router-dom";
import { youtubeApi } from "../api";

const Detail = withRouter(({ location: { pathname }, mostPopular }) => {
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState();
  const [title, setTitle] = useState();
  const [count, setCount] = useState();
  const [channelId, setChannelId] = useState();
  const [publishedAt, setPublishedAt] = useState();

  const [channel, setChannel] = useState({
    channelTitle: null,
    channelDescription: null,
    thumbnails: null,
  });

  const videoTitle = async () => {
    try {
      const videoId = pathname.split("/")[1];
      const {
        data: { items },
      } = await youtubeApi.videoTitle(videoId);
      setTitle(items[0].snippet.localized.title);
      setTags(items[0].snippet.tags);
      setChannelId(items[0].snippet.channelId.split("-")[0]);
      const temp = items[0].snippet.publishedAt.split("T")[0];
      setPublishedAt(temp.replace(/-/g, "."));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const videoCount = async () => {
    const videoId = pathname.split("/")[1];
    try {
      const {
        data: { items },
      } = await youtubeApi.videoCount(videoId);
      const { viewCount } = items[0].statistics;
      setCount({
        viewCount: viewCount.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const channelInfo = async () => {
    try {
      const {
        data: { items },
      } = await youtubeApi.channelInfo(channelId);
      const channelTitle = items[0].snippet.title;
      const channelDescription = items[0].snippet.description;
      const thumbnails = items[0].snippet.thumbnails.default.url;
      setChannel({
        ...channel,
        channelTitle,
        channelDescription,
        thumbnails,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    videoTitle();
  }, [title]);

  useEffect(() => {
    videoCount();
  }, [count]);

  useEffect(() => {
    channelInfo();
  }, [channel]);

  return (
    <div className="detail-container">
      <div className="detail-video-play">
        <iframe
          title="contents"
          className="youtube"
          src={`https://www.youtube.com/embed${pathname}?autoplay=1`}
          allowFullScreen="true"
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
      {loading ? (
        <Loader />
      ) : (
        <div className="video-list">
          <div className="video-tags">
            {tags &&
              tags.map((tag, index) =>
                index < 12 ? <div>{`#${tag}`}</div> : null
              )}
          </div>
          <h2 className="video-title">{title}</h2>
          <div className="video-count">
            <div>{`조회수 ${count?.viewCount}회 · ${publishedAt}.`}</div>
          </div>
          <hr />
          <div className="video-channel">
            <div className="channel-img">
              {/* <img src={`${channel.thumbnails}`} /> */}
              {console.log(channel.thumbnails)}
            </div>
            <div className="channel-titleCount">
              <span>{channel.channelTitle}</span>
              <span>{channel.channelDescription}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default Detail;
