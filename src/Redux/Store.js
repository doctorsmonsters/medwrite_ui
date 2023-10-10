import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./Reducers/User.reducer";
import systemReducer from "./Reducers/System.reducer";
import articleReducer from "./Reducers/Artilce.reducer";

const saveToLocalStorage = (store) => (next) => (action) => {
  const result = next(action);
  const { userToken, user } = store.getState().user;
  if (userToken) {
    localStorage.setItem("userToken", userToken);
  }
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  return result;
};

const store = configureStore({
  reducer: {
    user: userReducer,
    system: systemReducer,
    article: articleReducer,
  },
  middleware: [thunk, saveToLocalStorage],
});

export default store;
