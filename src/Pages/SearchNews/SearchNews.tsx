import { useRef, useState } from "react";
import { Form, Input, Loader } from "semantic-ui-react";
import { debounce, isEmpty } from "lodash";
import Requests from "../../Services/Requests";
import { INews } from "../../Interfaces/States/NewsTypes";
import { Dashboard } from "../Dashboard/Dashboard";

export function SearchNews() {
  const [text, setText] = useState("");
  const [news, setNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState(false);

  const debounceNome = useRef(
    debounce((value) => requestBuscaByText(value), 200)
  ).current;

  function handleSearchNameChange(value: string) {
    setText(value);

    if (value.trim().length < 2) {
      setLoading(false);
    } else {
      setLoading(true);

      debounceNome(value);
    }
  }

  function requestBuscaByText(text: string) {
    getNewsForSearch(text);
  }

  async function getNewsForSearch(text: string) {
    try {
      const response = (await Requests.news.searchNews(text)).data;
      setNews(response);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }

  return (
    <div className="container-form" style={{ justifyContent: "flex-start" }}>
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            value={text}
            label="Pesquisar"
            onChange={(ev: any, nome: { value: string }) => {
              setText(nome.value);
              handleSearchNameChange(nome.value);
            }}
          />
        </Form.Group>
      </Form>

      {isEmpty(news) ? (
        <p>Nenhuma notícia encontrada</p>
      ) : (
        <Dashboard newsSearch={news} />
      )}
    </div>
  );
}
