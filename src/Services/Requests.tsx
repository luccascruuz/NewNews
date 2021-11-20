import { IResponseRequest } from "../Interfaces/DataTypes";
import { INews } from "../Interfaces/States/NewsTypes";
import AxiosApi from "./AxiosApi";

const Requests = {
  news: {
    getNews: () => {
      return AxiosApi.get("/news");
    },

    getNewsId: (id: string) => {
      const request: Promise<IResponseRequest<INews>> = AxiosApi.get(
        `/news/${id}`
      );

      return request;
    },
  },

  author: {
    getAuthors: () => {
      return AxiosApi.get("/author");
    },

    getAuthorNews: () => {
      return AxiosApi.get("/author?_embed=news");
    },
  },
};

export default Requests;
