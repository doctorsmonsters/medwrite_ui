import { UserTypes } from "../Types/User.types";
import { clearLocalStorage } from "../../Constans/Helpers";

const userString = localStorage.getItem("user");

const initialState = {
  userToken: localStorage.getItem("userToken") || "",
  user: userString ? JSON.parse(userString) : null,
  isLogged: userString ? true : false,
};

const reducer = (state = initialState, action) => {
  const handleLogin = () => {
    const { key } = action.payload.data;
    return {
      ...state,
      userToken: key,
      isLogged: true,
    };
  };

  const handleUser = () => {
    return {
      ...state,
      user: action.payload.data,
    };
  };

  const handleLogout = () => {
    clearLocalStorage();
    return {
      ...state,
      userToken: "",
      user: null,
      isLogged: false,
    };
  };

  switch (action.type) {
    case UserTypes.LOGIN:
      return handleLogin();
    case UserTypes.USER:
      return handleUser();
    case UserTypes.LOGOUT:
      return handleLogout();
    default:
      return state;
  }
};

export default reducer;
