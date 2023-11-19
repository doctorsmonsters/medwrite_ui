import React, { useState, useEffect } from "react";
import { Drawer, Box, Typography } from "@mui/material";
import { TiTick } from "react-icons/ti";
import { removeHTMLTags } from "../../../Constans/Helpers";
import ReadMore from "../../Selector/ReadMore/ReadMore";
import ModalButton from "../../Buttons/ModalButton";

const RefSelectDrawer = ({ open, setOpen, refs, addTextToEditor }) => {
  const [selectedRefs, setSelectedRefs] = useState([]);

  useEffect(() => {
    setSelectedRefs([]);
  }, [open]);

  const handleRefs = (item) => {
    if (selectedRefs.find((i) => i?.id === item.id)) {
      const _selectedRefs = selectedRefs.filter((i) => i.id !== item.id);
      setSelectedRefs(_selectedRefs);
    } else {
      setSelectedRefs((prev) => [...prev, item]);
    }
  };

  const handleOk = () => {
    const content = selectedRefs
      .sort((a, b) => b.ref_num < a.ref_num)
      .map((item) => {
        return `
        <span class="uneditable" title="${item.title}">
            <sup style="color:blue;text-decoration:underline">
                ${item.ref_num}
            </sup>
        </span>`;
      })
      .join("<sup>,</sup>");
    addTextToEditor("", content);
    setOpen((prev) => !prev);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      disableAutoFocus
      PaperProps={{
        sx: {
          width: "60%",
          background: "#EAECEE",
          "@media (max-width: 768px)": {
            width: "90%",
          },
        },
      }}
      onClose={() => setOpen((prev) => !prev)}
    >
      <Box sx={{ px: 5, py: 8 }} color="white" height="100%">
        <Typography
          variant="h4"
          component="h5"
          className="text-black pb-4 border-b-2 border-black flex justify-between"
        >
          Select Article's Reference
        </Typography>

        <Box
          component="div"
          className="my-5 h-full w-full bg-pink-00 overflow-y-auto"
        >
          {refs
            .sort((a, b) => b.ref_num < a.ref_num)
            .map((item, index) => {
              return (
                <Box
                  component="div"
                  className="mx-2 my-3 bg-[#f9f9f9] rounded-md cursor-pointer relative"
                  onClick={() => handleRefs(item)}
                  key={index}
                >
                  <div className="p-3">
                    <Typography
                      variant="body1"
                      component="h5"
                      className="text-black py-2 font-semibold"
                    >
                      {item?.title}
                    </Typography>

                    <ReadMore
                      showFull={false}
                      text={removeHTMLTags(item.abstract_text)}
                    />
                  </div>

                  {selectedRefs.find((i) => i.id === item.id) && (
                    <div className="absolute top-0 right-0">
                      <TiTick size={30} color="black" />
                    </div>
                  )}
                </Box>
              );
            })}
          <ModalButton
            text="Confirm"
            classes="!rounded-md !ml-auto !block !mt-5"
            disabled={!selectedRefs?.length}
            onClick={handleOk}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default RefSelectDrawer;
