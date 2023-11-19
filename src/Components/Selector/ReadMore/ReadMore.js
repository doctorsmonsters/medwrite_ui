import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
const ReadMore = ({ text, showFull }) => {
  const [showFullDescription, setShowFullDescription] = useState(showFull);

  useEffect(() => {
    setShowFullDescription(showFull);
  }, [showFull]);
  return (
    <Typography component="p" variant="body2" className="text-gray-600">
      {!showFullDescription ? (
        <div>{text?.slice(0, 200)}...</div>
      ) : (
        <div>{text}</div>
      )}
    </Typography>
  );
};

export default ReadMore;
