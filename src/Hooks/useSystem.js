import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ActionCreators as systemActions } from "../Redux/Actions/Sytstem.actions";
import { ActionCreators as userActions } from "../Redux/Actions/User.actions";
import { navLinks, loggedNavLinks } from "../Constans/MetaData";
import { logout as logoutServer } from "../Services/User.service";
import { useMutation } from "@tanstack/react-query";

const useSystem = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();

  const logoutMutation = useMutation({
    mutationFn: () =>
      logoutServer()
        .then((res) => dispatch(userActions.logout()))
        .then(() => {
          showSuccess("Logged out Successfully.");
        })
        .catch((error) => showError(error)),
  });

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

  const logout = logoutMutation.mutate;
  const navItems = user.isLogged
    ? location.pathname === "/"
      ? [...navLinks, ...loggedNavLinks]
      : loggedNavLinks
    :  location.pathname === "/" ? navLinks : [];
  return { showError, showSuccess, logout, navItems };
};

export default useSystem;
