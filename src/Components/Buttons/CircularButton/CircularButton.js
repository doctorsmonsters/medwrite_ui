import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const CircularButton = ({
  loading,
  text,
  onClick,
  disabled,
  type = "button",
  classes = "",
}) => {
  return (
    <Button
      type={type}
      fullWidth
      variant="contained"
      color="secondary"
      onClick={onClick}
      disabled={disabled}
      className={classes}
      sx={{ py: 1.5 }}
    >
      {loading && (
        <span className="flex items-center">
          <CircularProgress size={20} color="light" className="mr-3" />
          Loading...
        </span>
      )}
      {!loading && text}
    </Button>
  );
};

export default CircularButton;
