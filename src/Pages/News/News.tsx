import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Loader } from "semantic-ui-react";
import { IAuthor } from "../../Interfaces/States/AuthorsTypes";
import { INews } from "../../Interfaces/States/NewsTypes";
import Requests from "../../Services/Requests";
import styles from "./styles.module.scss";

export function News() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getNewsId(id);
    }
  }, [id]);

  const [news, setNews] = useState<INews>();
  const [author, setAuthor] = useState<IAuthor>();

  const [loading, setLoading] = useState(false);

  async function getNewsId(id: string) {
    try {
      const response = (await Requests.news.getNewsId(id)).data;

      if (response) {
        setNews(response);
        authorId(response.authorId);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }

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
    <div className={styles.containerNews}>
      {loading ? (
        <Loader active />
      ) : (
        <>
          <div className="position-buttons">
            <Button
              type="button"
              onClick={() => navigate("/")}
              disabled={loading}
            >
              Voltar
            </Button>

            <Button
              type="button"
              color="green"
              loading={loading}
              disabled={loading}
              onClick={() => navigate(`/newNews/${news?.id}`)}
            >
              Editar
            </Button>
          </div>
          <h1>{news?.title}</h1>
          {news?.createdAt ? (
            <div className={styles.infoNews}>
              <p>Autor: {author?.name}</p>
              <p>{format(new Date(news.createdAt), "yyyy-MM-dd")}</p>
            </div>
          ) : null}
          <p>{news?.text}</p>
        </>
      )}
    </div>
  );
}
