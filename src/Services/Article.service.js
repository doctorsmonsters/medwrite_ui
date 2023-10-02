import { getAxiosConfig } from "../Constans/Api";
import axios from "./Axios.Instance";

export const getArticles = () => {
  const config = getAxiosConfig();
  return axios.get("/article", config);
};


export const createArticle = (data) => {
  const config = getAxiosConfig();
  return axios.post("/article/", data, config);
};
