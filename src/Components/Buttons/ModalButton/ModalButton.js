import React from "react";
import Button from "@mui/material/Button";

const ModalButton = ({ text, onClick, icon }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      className="!rounded-full"
      onClick={onClick}
      sx={{ py: 1.5, px: 3 }}
    >
      {icon && icon}
      {text}
    </Button>
  );
};

export default ModalButton;
