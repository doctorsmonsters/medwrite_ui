export const API_BASE_URL = "http://54.224.239.85:8000/api";
export const GOOGLE_CLIENT_ID =
  "945970413385-d8a3jbt748cinsr54k0klctnrfgkno5h.apps.googleusercontent.com";
export const TINYMCE_API_KEY = "gef8xiyvs164fqxpstv7gkqlfzzfveno0wbcqld4etd71mkd"
export const getAxiosConfig = () => {
  const authToken = localStorage.getItem("userToken");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${authToken}`,
    },
  };
};

