import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { removeHTMLTags } from "../../Constans/Helpers";

function DescriptionWithReadMore({
  item,
  maxChars = 200,
  article,
  handleSelect,
  setRefIndex,
}) {
  const {
    title,
    abstractText,
    pmcid,
    authorString,
    authorList,
    journalInfo,
    firstPublicationDate,
    source,
  } = item;
  const link = `https://europepmc.org/article/MED/${item?.id}`;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [cleanText, setCleanText] = useState();

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    abstractText && setCleanText(removeHTMLTags(abstractText));
  }, [abstractText]);

  const handleReference = () => {
    setRefIndex();
    const data = {
      title,
      article,
      pmc_id: pmcid,
      link,
      abstract_text: abstractText,
      configurations: {
        authorString,
        authorList,
        journalInfo,
        firstPublicationDate,
        source,
        link,
      },
    };
    handleSelect(data);
  };

  return (
    <Typography
      variant="body2"
      component="div"
      className="text-gray-700 pb-4 font-semibold"
    >
      {!showFullDescription ? (
        <div>{cleanText?.slice(0, maxChars)}</div>
      ) : (
        <div>{cleanText}</div>
      )}

      <Box component="span" className="flex pt-4 gap-3">
        {cleanText?.length > maxChars && (
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
          onClick={handleReference}
          className="capitalize text-gray-600 font-bold cursor-pointer border-b-2 border-transparent hover:border-black"
        >
          Refer to this
        </span>
      </Box>
    </Typography>
  );
}

export default DescriptionWithReadMore;
