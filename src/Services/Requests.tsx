import {
  IPayloadAuthor,
  IPayloadNews,
  IResponseRequest,
} from "../Interfaces/DataTypes";
import { IAuthor } from "../Interfaces/States/AuthorsTypes";
import { INews } from "../Interfaces/States/NewsTypes";
import AxiosApi from "./AxiosApi";

const Requests = {
  news: {
    getNews: () => {
      const request: Promise<IResponseRequest<INews[]>> = AxiosApi.get("/news");

      return request;
    },

    getNewsId: (id: string) => {
      const request: Promise<IResponseRequest<INews>> = AxiosApi.get(
        `/news/${id}`
      );

      return request;
    },

    addNews: (payload: IPayloadNews) => {
      const request: Promise<IResponseRequest<INews>> = AxiosApi.post(`/news`, {
        ...payload,
      });
      return request;
    },

    updateNews: (payload: IPayloadNews, id: string) => {
      const request: Promise<IResponseRequest<INews>> = AxiosApi.put(
        `/news/${id}`,
        {
          ...payload,
        }
      );
      return request;
    },

    removeNews: (id: string) => {
      const request: Promise<IResponseRequest<INews>> = AxiosApi.delete(
        `/news/${id}`
      );
      return request;
    },
  },

  author: {
    getAuthors: () => {
      const request: Promise<IResponseRequest<IAuthor[]>> =
        AxiosApi.get("/author");

      return request;
    },

    getAuthorId: (id: string) => {
      const request: Promise<IResponseRequest<IAuthor>> = AxiosApi.get(
        `/author/${id}`
      );

      return request;
    },

    getAuthorNews: () => {
      const resquest: Promise<IResponseRequest<IAuthor>> = AxiosApi.get(
        "/author?_embed=news"
      );

      return resquest;
    },

    addAuthor: (payload: IPayloadAuthor) => {
      const request: Promise<IResponseRequest<IAuthor>> = AxiosApi.post(
        `/author`,
        {
          ...payload,
        }
      );
      return request;
    },
  },
};

export default Requests;
