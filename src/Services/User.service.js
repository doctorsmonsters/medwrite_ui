import { getAxiosConfig } from "../Constans/Api";
import axios from "./Axios.Instance";

export const signUp = (data) => {
  return axios.post("/auth/register/", data);
};

export const logIn = (data) => {
  return axios.post("/auth/login/", data);
};

export const getUserData = () => {
  const config = getAxiosConfig();
  return axios.get("/auth/user", config);
};

export const logout = () => {
  const config = getAxiosConfig();
  return axios.post("/auth/logout/", config);
};

export const googleLogIn = (data) => {
  return axios.post("/auth/google/", data);
};

export const verifyEmail = (data) => {
  return axios.post("/auth/account-confirm-email/", data);
};

export const changePassword = (data) => {
  const config = getAxiosConfig();
  return axios.post("/auth/password/change/", data, config);
};

export const resetPassword = (data) => {
  return axios.post("/auth/password/reset/", data);
};

export const resetPasswordConfirm = (data) => {
  return axios.post("/auth/password/reset/confirm/", data);
};
