import React, { useState } from "react";
import { Typography, Box } from "@mui/material";

function DescriptionWithReadMore({ description, maxChars = 100, link }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Typography
      variant="body2"
      component="div"
      className="text-gray-700 pb-4 font-semibold"
    >
      {showFullDescription ? (
        <div>{description}</div>
      ) : (
        <div>{description?.slice(0, maxChars)}</div>
      )}

      <Box component="span" className="flex pt-4 gap-3">
        {description?.length > maxChars && (
          <span
            onClick={toggleDescription}
            className="capitalize text-gray-600 font-bold cursor-pointer border-b-2 border-transparent hover:border-black"
          >
            {showFullDescription ? "Read Less" : "Read More"}
          </span>
        )}
        <a
          target="_blank"
          href={link}
          rel="noreferrer"
          className="capitalize text-gray-600 font-bold cursor-pointer border-b-2 border-transparent hover:border-black"
        >
          View Article
        </a>

        <span
          onClick={toggleDescription}
          className="capitalize text-gray-600 font-bold cursor-pointer border-b-2 border-transparent hover:border-black"
        >
          Refer this
        </span>
      </Box>
    </Typography>
  );
}

export default DescriptionWithReadMore;
