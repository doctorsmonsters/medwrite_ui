import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { MdOutlineExpandMore } from "react-icons/md";
import { referenceMaker, removeHTMLTags } from "../../../Constans/Helpers";
import Loading from "../../Loading";
import ReadMore from "../../Selector/ReadMore/ReadMore";

const ReferenceWrapper = ({
  item,
  deleteReferenceMutation,
  selectedStyle,
  deleteReference,
  deletingReferenceindex,
  index,
  addTextToEditor,
}) => {
  const [showFull, setShowFull] = useState(false);
  const [selectedText, setSelectedText] = React.useState("");

  React.useEffect(() => {
    const selecteText = () => {
      const selection = window.getSelection().toString();
      if (selection) setSelectedText(selection);
    };

    window.addEventListener("mouseup", selecteText);
    return () => window.removeEventListener("mouseup", selecteText);
  }, []);

  const handleSelect = (item) => {
    if (selectedText) {
      const content = `
      <div class="med-ref-wrapper">
        <p>
          ${selectedText}
          <span class="uneditable" title="${item.title}">
            <sup style="color:blue;text-decoration:underline">
              ${item.ref_num}
            </sup>
          </span>
        </p>
      </div>`;
      addTextToEditor("", content);
      setSelectedText("");
    }
  };

  return (
    <Accordion key={index}>
      <AccordionSummary
        expandIcon={<MdOutlineExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className="!font-bold">
          <span className="flex items-center justify-center w-7 h-7 mb-2 bg-red-500 text-sm text-white font-bold rounded-full">{item.ref_num}</span>
          {item.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ReadMore
          showFull={showFull}
          text={removeHTMLTags(item.abstract_text)}
        />
        <Box component="div" className="mt-3 flex gap-x-3">
          {item.abstract_text?.length > 200 && (
            <span
              onClick={() => setShowFull((prev) => !prev)}
              className="capitalize text-sm text-gray-600 font-bold cursor-pointer border-b-2 border-transparent hover:border-black"
            >
              {showFull ? "Read Less" : "Read More"}
            </span>
          )}

          {selectedText.length > 0 && (
            <span
              onClick={() => handleSelect(item)}
              className="capitalize text-sm text-gray-600 font-bold cursor-pointer border-b-2 border-transparent hover:border-black"
            >
              Select
            </span>
          )}
        </Box>

        <br />

        <Box
          component="div"
          className="mb-6 pb-5 bg-[#f9f9f9] rounded-md relative shadow shadow-black"
          key={item.id}
        >
          {deleteReferenceMutation.isLoading &&
            deletingReferenceindex === index && (
              <div className="absolute h-full w-full bg-gray-200 opacity-100 flex items-center justify-center">
                <Loading />
              </div>
            )}

          <Box
            component="div"
            className="!text-black p-5"
            dangerouslySetInnerHTML={{
              __html: referenceMaker(selectedStyle?.name, item),
            }}
          />

          <div className="capitalize text-gray-600 mb-5">
            <span
              className="absolute right-0 bottom-0 cursor-pointer bg-black rounded-t-md text-sm px-10 py-1 hover:bg-gray-600 text-white"
              onClick={() => deleteReference(item.id, index)}
            >
              Delete
            </span>
          </div>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReferenceWrapper;
