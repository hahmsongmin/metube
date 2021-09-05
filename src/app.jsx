import "./app.css";
import React, { useEffect, useState } from "react";
import Routers from "./routers";
import { youtubeApi } from "./api";

function App() {
  const [mostPopular, setMostPopular] = useState();
  const [loading, setLoading] = useState(true);

  const getMostPopular = async () => {
    try {
      const {
        data: { items },
      } = await youtubeApi.mostPopular();
      setMostPopular(items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMostPopular();
  }, []);

  return <Routers mostPopular={mostPopular} loading={loading} />;
}

export default App;
