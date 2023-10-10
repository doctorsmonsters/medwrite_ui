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

export const bulkDelete = (data) => {
  const config = getAxiosConfig();
  return axios.post("/bulk_delete_article/", data, config);
};

export const getArticleById = (uuid) => {
  return axios.get(`/article/${uuid}`);
};

export const deleteArticle = (uuid) => {
  const config = getAxiosConfig();
  return axios.delete(`/article/${uuid}`, config);
};

export const updateArticle = (uuid, data) => {
  const config = getAxiosConfig();
  return axios.put(`/article/${uuid}/`, data, config);
};

export const searchDatabases = (params) => {
  const config = getAxiosConfig();
  return axios.get("/search/databases", {
    ...config,
    params: params,
  });
};
