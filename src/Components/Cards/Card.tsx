import { useEffect, useState } from "react";
import { INews } from "../../Interfaces/States/NewsTypes";
import Requests from "../../Services/Requests";

import styles from "./styles.module.scss";

export function Card() {
  const [news, setNews] = useState<INews>();
  useEffect(() => {
    newsId("1");
  }, []);

  async function newsId(id: string) {
    const response = (await Requests.news.getNewsId(id)).data;
    setNews(response);
  }

  return (
    <button
      onClick={() => {
        console.log("eeee");
      }}
      className={styles.card}
    >
      <h1>{news?.title}</h1>
        <p>{news?.caption}</p>
    </button>
  );
}
