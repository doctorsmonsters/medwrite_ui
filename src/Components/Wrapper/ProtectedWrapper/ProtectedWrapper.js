/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedWrapper = ({ children, page = null }) => {
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.user.isLogged);

  React.useEffect(() => {
    handleRoute();
  }, [isLogged]);

  const handleRoute = () => {
    if (isLogged && (page === "login" || page === "signup")) {
      return navigate("/articles");
    }
    if (!isLogged && (page !== "signup")) {
      return navigate("/login");
    }
  };

  return <>{children}</>;
};

export default ProtectedWrapper;
