import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      Home Page
      <button onClick={() => navigate("/login")}>click me to login</button>
    </div>
  );
};

export default Home;
