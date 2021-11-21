import { useEffect, useState } from "react";
import { INews } from "../../Interfaces/States/NewsTypes";
import Requests from "../../Services/Requests";
import { Loader } from "semantic-ui-react";
import { Card } from "../../Components/Cards/Card";
import styles from "./styles.module.scss";

export function Dashboard() {
  const [news, setNews] = useState<INews[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    allNews();
  }, []);

  async function allNews() {
    try {
      const response = (await Requests.news.getNews()).data;
      setNews(response.reverse());
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }

  return (
    <div className="container">
      {loading ? (
        <Loader size="big" active />
      ) : (
        <div className={styles.listNews}>
          {news?.map((notice) => (
            <Card news={notice} key={notice.id}/>
          ))}
        </div>
      )}
    </div>
  );
}
