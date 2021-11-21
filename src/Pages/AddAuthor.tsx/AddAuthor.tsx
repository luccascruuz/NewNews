import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Form, Icon, Popup } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import Requests from "../../Services/Requests";
import { IPayloadAuthor } from "../../Interfaces/DataTypes";
import { v4 as uuidv4 } from "uuid";

interface IFormValue {
  name: string;
}

export function AddAuthor() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { handleSubmit, register } = useForm<IFormValue>();

  async function handleSubmitAuthor(data: IFormValue) {
    try {
      setLoading(true);
      const _id = uuidv4();

      const payload: IPayloadAuthor = {
        ...data,
        id: _id,
        createdAt: new Date().toISOString(),
      };

      const response = (await Requests.author.addAuthor(payload)).data;

      setLoading(false);
      if (response) navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container-form">
      <Form onSubmit={handleSubmit(handleSubmitAuthor)}>
        <Form.Group widths="equal">
          <Form.Field>
            <label>
              Nome do autor{" "}
              <Popup
                content="Digite o nome do autor"
                inverted
                trigger={<Icon name="question circle" />}
              />
            </label>
            <input
              type="text"
              {...register("name")}
              required
              pattern="^[^-\s][a-zA-ZÀ-ú ]*"
              placeholder="Insira o nome do autor"
              disabled={loading}
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

          <Button
            type="submit"
            color="green"
            loading={loading}
            disabled={loading}
          >
            Adicionar
          </Button>
        </div>
      </Form>
    </div>
  );
}
