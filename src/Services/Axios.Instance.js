import axios from "axios";
import { API_BASE_URL } from "../Constans/Api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 500000,
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
export default axiosInstance;
