// export const API_BASE_URL = "http://localhost:8000/api"; // dev
export const API_BASE_URL = "https://medwriter-backend.vercel.app/api"; // personal
// export const API_BASE_URL = "https://medwriter.vercel.app/api" // client


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


// PRO PLUGINS OF TINYMCE
// a11ychecker advcode advtable autocorrect casechange mediaembed
// mentions pageembed permanentpen powerpaste mergetags checklist
// editimage export typography footnotes formatpainter inlinecss tableofcontents
