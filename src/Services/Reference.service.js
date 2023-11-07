import { getAxiosConfig } from "../Constans/Api";
import axios from "./Axios.Instance";

export const createReference = (data) => {
  const config = getAxiosConfig();
  return axios.post("/reference/", data, config);
};
