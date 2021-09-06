import axios from "axios";

const api = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyClrxjbOMVrcbolmsWmzmqXaUg5pIc2N44",
    regionCode: "kr",
  },
});

export const youtubeApi = {
  search: (keyword) => {
    return api.get("search", {
      params: {
        q: keyword,
        maxResults: 24,
        part: "snippet",
      },
    });
  },
  mostPopular: () =>
    api.get("videos", {
      params: {
        chart: "mostPopular",
        maxResults: 24,
        part: "snippet",
      },
    }),

  videoTitle: (videoId) =>
    api.get("videos", {
      params: {
        part: "snippet",
        id: videoId,
      },
    }),

  videoCount: (videoId) =>
    api.get("videos", {
      params: {
        part: "statistics",
        id: videoId,
      },
    }),

  channelInfo: (channelId) =>
    api.get("channels", {
      params: {
        part: "snippet",
        id: channelId,
      },
    }),
};
