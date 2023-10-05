import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box mx={3} my={5}>
      <Box component="footer" py={2} className="border-b-2 border-gray-300">
        <Typography variant="h5" component="h5" onClick={() => navigate("/")}>
          MedWriter
        </Typography>
      </Box>
      <Typography variant="p" component="p" mt={2}>
        © 2023 MedWriter™. All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
