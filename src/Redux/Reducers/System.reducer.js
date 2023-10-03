import { SystemTypes } from "../Types/System.types";

const initialState = {
  toast: {
    open: false,
    type: "default",
    message: "",
  },
};

const reducer = (state = initialState, action) => {
  const showToast = () => {
    const data = action.payload.data;
    return {
      ...state,
      toast: {
        ...state.toast,
        ...data,
      },
    };
  };

  switch (action.type) {
    case SystemTypes.TOAST:
      return showToast();
    default:
      return state;
  }
};

export default reducer;
