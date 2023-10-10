import React from "react";
import clsx from "clsx";
import Button from "@mui/material/Button";

const ModalButton = ({ text, onClick, icon, classes = "", disabled=false }) => {
  return (
    <Button
    type="button"
      variant="contained"
      color="secondary"
      disabled={disabled}
      className={clsx("!rounded-full", classes)}
      onClick={onClick}
      sx={{ py: 1.5, px: 3, textTransform: 'none' }}
    >
      {icon && icon}
      {text}
    </Button>
  );
};

export default ModalButton;
