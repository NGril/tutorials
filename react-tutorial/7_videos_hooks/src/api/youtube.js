import axios from "axios";

const KEY = "AIzaSyAJvc6AwAp5q4DHLMWDtKvg5uiZHAm15jQ";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    type: "video",
    key: KEY,
  },
});
