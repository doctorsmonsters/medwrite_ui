import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  return (
    <Box
      component="header"
      className="flex items-center justify-center text-center md:text-left bg-green-dark"
      sx={{
        py: 2,
        px: 2,
        letterSpacing: "1px",
      }}
    >
      <Typography
        color="white"
        component="h5"
        variant="body1"
        className="flex flex-wrap items-center justify-center"
      >
        {"Generative AI assistance for manuscript writing challenge"}
        <Link
          sx={{
            ml: 2,
          }}
          className="cursor-pointer flex items-center !text-green-light"
          onClick={() => navigate("/login")}
        >
          {"Try it for free"}
          <HiOutlineArrowNarrowRight size={25} className="ml-1" />
        </Link>
      </Typography>
    </Box>
  );
};

export default TopBar;
