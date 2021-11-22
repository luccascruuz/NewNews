import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { IAuthor } from "../../Interfaces/States/AuthorsTypes";
import { INews } from "../../Interfaces/States/NewsTypes";
import Requests from "../../Services/Requests";

import styles from "./styles.module.scss";

interface IProps {
  news: INews;
}

export function Card({ news }: IProps) {
  const [author, setAuthor] = useState<IAuthor>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    authorId(news.authorId);
  }, []);

  async function authorId(id: string) {
    try {
      const response = (await Requests.author.getAuthorId(id)).data;

      setAuthor(response);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }

  return (
    <div className={styles.card}>
      {!loading && (
        <Link to={`${news.id}`}>
          <div className={styles.cardText}>
            <h1>{news.title}</h1>
            <div className={styles.cardInfo}>
              <p>Autor: {author?.name}</p>
              <p>{format(new Date(news.createdAt), "yyyy-MM-dd")}</p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
