import React, { useEffect, useState } from "react";
import { youtubeApi } from "./api";
import "./app.css";
import Home from "./components/home";
import Nav from "./components/nav";

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

  return (
    <div className="main-container">
      <Nav />
      <Home mostPopular={mostPopular} loading={loading} />
    </div>
  );
}

export default App;
