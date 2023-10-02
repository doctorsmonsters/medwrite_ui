import { UserTypes } from "../Types/User.types";

export const ActionCreators = {
  login: (data) => ({
    type: UserTypes.LOGIN,
    payload: { data },
  }),
  getUser: (data) => ({
    type: UserTypes.USER,
    payload: { data },
  }),
  logout: () => ({ type: UserTypes.LOGOUT }),
};
