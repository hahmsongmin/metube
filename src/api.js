import axios from "axios";

const api = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyClrxjbOMVrcbolmsWmzmqXaUg5pIc2N44",
    maxResults: 25,
    part: "snippet",
    hl: "ko",
  },
});

export const youtubeApi = {
  search: (keyword) => {
    return api.get("search", {
      params: {
        q: keyword,
      },
    });
  },
  mostPopular: () =>
    api.get("videos", {
      params: {
        chart: "mostPopular",
      },
    }),
};
