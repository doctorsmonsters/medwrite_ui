export const API_BASE_URL = "http://localhost:8000/api";
export const GOOGLE_CLIENT_ID =
  "529251858488-17f6bihuopf9c1htvq3gjp9921uljo0e.apps.googleusercontent.com";

export const getAxiosConfig = () => {
  const authToken = localStorage.getItem("userToken");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${authToken}`,
    },
  };
};
