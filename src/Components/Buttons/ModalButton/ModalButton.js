import React from "react";
import clsx from "clsx";
import { Button, Badge } from "@mui/material";

const ModalButton = ({
  text,
  onClick,
  icon,
  classes = "",
  disabled = false,
  badge = false,
  badgeCount = 1,
}) => {
  const CustomButton = (
    <Button
      type="button"
      variant="contained"
      color="secondary"
      disabled={disabled}
      className={clsx("!rounded-full", classes)}
      onClick={onClick}
      sx={{ py: 1.5, px: 3, textTransform: "none" }}
    >
      {icon && icon}
      {text}
    </Button>
  );
  if (badge) {
    return (
      <Badge
        color="green"
        className="text-white"
        badgeContent={badgeCount}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {CustomButton}
      </Badge>
    );
  }
  return CustomButton;
};

export default ModalButton;
