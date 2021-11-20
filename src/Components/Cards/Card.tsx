import { useEffect, useState } from "react";
import { IAuthor } from "../../Interfaces/States/AuthorsTypes";
import { INews } from "../../Interfaces/States/NewsTypes";
import Requests from "../../Services/Requests";

import styles from "./styles.module.scss";

export function Card() {
  const [news, setNews] = useState<INews>();
  const [author, setAuthor] = useState<IAuthor>();
  useEffect(() => {
    newsId("1");
  }, []);

  async function newsId(id: string) {
    const response = (await Requests.news.getNewsId(id)).data;

    authorId(response.authorId);
    setNews(response);
  }

  async function authorId(id: string) {
    const response = (await Requests.author.getAuthorId(id)).data;

    setAuthor(response);
  }

  return (
    <button
      onClick={() => {
        console.log("eeee");
      }}
      className={styles.card}
    >
      <h1>{news?.title}</h1>
      <div className={styles.cardInfo}>
        <p>Autor: {author?.name}</p>
        <p>20/11/2021</p>
      </div>
    </button>
  );
}
