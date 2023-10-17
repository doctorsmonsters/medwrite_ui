import { getAxiosConfig } from "../Constans/Api";
import axios from "./Axios.Instance";

export const processText = (data) => {
  const config = getAxiosConfig();
  return axios.post("/prompt/process_text/", data, config);
};

export const processPrompt = (data) => {
    const config = getAxiosConfig();
    return axios.post("/prompt/custom_prompt/", data, config);
  };
