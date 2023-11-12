import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { referenceStyles } from "../../../Constans/Helpers";
import { Modal, Box, Typography } from "@mui/material";

const style = {
  width: "100%",
  background: "white",
  height: "100vh",
  overflow: "scroll",
};

const ReferenceStyleModal = ({
  open,
  handleClose,
  selectedStyle,
  setSelectedStyle,
}) => {
  return (
    <Box component="div">
      <Modal
        disableRestoreFocus
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Modal header */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            component="div"
            className="border border-b-gray-200"
          >
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Choose A Reference Style
            </Typography>
            <AiOutlineClose
              onClick={handleClose}
              className="text-2xl cursor-pointer"
            />
          </Box>
          {/* Modal Body */}
          <Box
            sx={{
              px: 2,
              py: 5,
            }}
            className="flex gap-10 flex-wrap"
          >
            {referenceStyles.map((i, index) => {
              return (
                <Box
                  component="div"
                  key={i.id}
                  onClick={() => setSelectedStyle(i)}
                  className="w-full cursor-pointer shadow-xl py-5 px-10 rounded-lg relative"
                >
                  <Typography variant="h5" component="h3" mb={3}>
                    {i.name}
                  </Typography>
                  <Typography variant="body1" component="div">
                    {i.sample}
                  </Typography>
                  {selectedStyle?.id === i.id && (
                    <div className="absolute top-1 right-5">
                      <TiTick size={30} />
                    </div>
                  )}
                </Box>
              );
            })}
          </Box>
          {/* Modal Footer */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="border border-b-gray-200"
          ></Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ReferenceStyleModal;
