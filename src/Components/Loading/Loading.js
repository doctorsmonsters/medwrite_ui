import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function Loading({ width = "40%" }) {
  return (
    <Box sx={{ width }}>
      <LinearProgress  className="rounded-xl"/>
    </Box>
  );
}
