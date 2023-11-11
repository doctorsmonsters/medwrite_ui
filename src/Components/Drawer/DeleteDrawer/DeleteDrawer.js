import React from "react";
import { Drawer, Box, Typography, List, ListItem } from "@mui/material";
import { BiSolidRightArrow } from "react-icons/bi";
import ModalButton from "../../Buttons/ModalButton";
import CircularButton from "../../Buttons/CircularButton";

const DeleteDrawer = ({
  openDrawer,
  setOpenDrawer,
  selectedRows,
  handleClose,
  deleteMutation,
}) => {
  return (
    <Drawer
      anchor="right"
      open={openDrawer}
      onClose={() => setOpenDrawer((prev) => !prev)}
    >
      <Box
        sx={{ px: 5, py: 8 }}
        className="text-charcol "
        color=""
        height="100%"
      >
        <Typography component="p" variant="body1">
          Do you want to Delete the following Articles?
        </Typography>

        <List className="!my-5">
          {selectedRows.map((item, index) => (
            <ListItem key={index} className="!px-0 !mx-0">
              <div className="flex gap-x-3 items-center">
                <BiSolidRightArrow />
                {item.title}
              </div>
            </ListItem>
          ))}
        </List>

        <Box className="flex gap-x-3 py-5 justify-end">
          <ModalButton
            onClick={handleClose}
            text="Cancel"
            classes="!font-sm !px-0 !bg-transparent !shadow-none !text-black"
          />
          <CircularButton
            text="Confirm"
            classes="!w-max !px-5"
            loading={deleteMutation.isLoading}
            disabled={deleteMutation.isLoading}
            onClick={() =>
              deleteMutation.mutate({
                article_ids: [...selectedRows.map((item) => item.id)],
              })
            }
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default DeleteDrawer;
