import axios, { AxiosResponse } from "axios";

export const handleResponseSuccess = async function (response: AxiosResponse) {
  return response;
};

const API_URL = "http://localhost:3335";

const AxiosApi = axios;
AxiosApi.defaults.baseURL = API_URL;
AxiosApi.interceptors.response.use(handleResponseSuccess);

export default AxiosApi;
