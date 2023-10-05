import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import VerifyEmail from "./Pages/VerifyEmail";
import Article from "./Pages/Article";
import ArticleCreate from "./Pages/ArticleCreate";
import PasswordChange from "./Pages/PasswordChange";
import PasswordReset from "./Pages/PasswordReset";
import PasswordResetConfirm from "./Pages/PasswordResetConfirm";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/articles" element={<Article />} />
      <Route path="/articles/:uuid/" element={<ArticleCreate />} />
      <Route path="/email/confirm/:token" element={<VerifyEmail />} />
      <Route path="/password/change" element={<PasswordChange />} />
      <Route path="/password/reset" element={<PasswordReset />} />
      <Route
        path="/password/reset/confirm/:uuid/:token/"
        element={<PasswordResetConfirm />}
      />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AllRoutes;
