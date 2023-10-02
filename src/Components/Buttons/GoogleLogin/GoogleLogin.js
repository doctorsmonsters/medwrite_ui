import React from "react";
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = ({ onClick }) => {
  return (
    <Button
      fullWidth
      onClick={onClick}
      sx={{
        py: 1.25,
        textTransform: "none",
        fontWeight: 700,
        fontSize: 14,
        display: "flex",
        alignItems: "center",
        border: "1px solid rgba(0,0,0,0.5)",
        transition: "all .5s ease",
        ":hover": {
          color: "white",
          background: "#212F3C",
        },
      }}
      className="!rounded-full"
    >
      <FcGoogle className="mx-3" size={20} />
      Login with Google
    </Button>
  );
};

export default GoogleLogin;
