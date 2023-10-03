import * as React from "react";
import { useDispatch } from "react-redux";
import { ActionCreators as systemActions } from "../Redux/Actions/Sytstem.actions";

const useSystem = () => {
  const dispatch = useDispatch();
  const showError = (message) => {
    dispatch(
      systemActions.showToast({
        message,
        type: "error",
        open: true,
      })
    );
  };

  const showSuccess = (message) => {
    dispatch(
      systemActions.showToast({
        message,
        type: "success",
        open: true,
      })
    );
  };
  return { showError, showSuccess };
};

export default useSystem;
