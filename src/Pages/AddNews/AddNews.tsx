import { useEffect, useState } from "react";
import { Button, Dropdown, Form, Header, Icon, Popup } from "semantic-ui-react";
import { IOptionsAuthor, IPayloadNews } from "../../Interfaces/DataTypes";
import Requests from "../../Services/Requests";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { INews } from "../../Interfaces/States/NewsTypes";

interface IFormeValue {
  title: string;
  text: string;
  authorId: string;
}

export function AddNews() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [news, setNews] = useState<INews>();
  const [optionsAuthors, setOptionsAuthors] = useState<IOptionsAuthor[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<IFormeValue>();

  useEffect(() => {
    setLoading(true);
    if (id) {
      getNewsId(id);
    }
    allAuthors();
  }, []);

  async function getNewsId(id: string) {
    try {
      const response = (await Requests.news.getNewsId(id)).data;

      if (response) {
        setNews(response);
        setValue("title", response.title);
        setValue("text", response.text);
        setValue("authorId", response.authorId);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }

  async function allAuthors() {
    try {
      const newOptionsAuthors: Array<IOptionsAuthor> = [];
      const response = (await Requests.author.getAuthors()).data;

      response.map((author) =>
        newOptionsAuthors.push({
          key: author.name,
          text: author.name,
          value: author.id,
        })
      );

      setOptionsAuthors(newOptionsAuthors);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }

  async function removeNews(id: string) {
    try {
      setLoading(true);
      await Requests.news.removeNews(id);
      setLoading(false);
    } catch (err) {
      setLoading(false);

      console.error(err);
    }
  }

  async function handleSubmitNewNews(data: IFormeValue) {
    try {
      setLoading(true);
      const _id = uuidv4();

      const payload: IPayloadNews = {
        id: _id,
        createdAt: new Date().toISOString(),
        ...data,
      };

      if (news) {
        await Requests.news.updateNews(payload, news.id);
      } else {
        await Requests.news.addNews(payload);
      }

      navigate("/");

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }

  return (
    <div className="container-form">
      <Header size="huge">{`${news ? "Editar" : "Adicionar"}`} notícia</Header>
      <Form onSubmit={handleSubmit(handleSubmitNewNews)}>
        <Form.Group widths="equal">
          <Form.Field>
            <label>
              Título{" "}
              <Popup
                content="Digite o título da matéria"
                inverted
                trigger={<Icon name="question circle" />}
              />
            </label>
            <input
              type="text"
              {...register("title")}
              required
              placeholder="Insira o título"
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>
              Texto da notícia{" "}
              <Popup
                content="Digite o texto da notícia"
                inverted
                trigger={<Icon name="question circle" />}
              />
            </label>
            <textarea
              {...register("text")}
              required
              placeholder="Insira o texto"
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field error={!!errors.authorId}>
            <label>
              Autor{" "}
              <Popup
                content="Escolha o autor"
                inverted
                trigger={<Icon name="question circle" />}
              />
            </label>
            <Controller
              control={control}
              name="authorId"
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <Dropdown
                    options={optionsAuthors}
                    loading={loading}
                    value={field.value}
                    fluid
                    onChange={(ev, data) => field.onChange(data.value)}
                    selection
                    placeholder="Escolha o autor"
                  />
                );
              }}
            />
          </Form.Field>
        </Form.Group>
        <div className="position-buttons">
          <Button
            type="button"
            onClick={() => navigate("/")}
            disabled={loading}
          >
            Cancelar
          </Button>

          {news ? (
            <Button
              type="button"
              color="red"
              onClick={() => {
                removeNews(news.id);
                navigate("/");
              }}
              disabled={loading}
            >
              Excluir
            </Button>
          ) : null}

          <Button
            type="submit"
            color="green"
            loading={loading}
            disabled={loading}
          >
            {news ? "Editar" : "Adicionar"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
