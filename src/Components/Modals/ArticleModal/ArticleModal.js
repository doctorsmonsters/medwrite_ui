import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormControl, TextField, Typography, Box, Modal } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { createArticle } from "../../../Services/Article.service";
import useSystem from "../../../Hooks/useSystem";
import CircularButton from "../../Buttons/CircularButton/CircularButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
};

const ArticleModal = ({ open, setOpen }) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = React.useState("");
  const { showSuccess, showError } = useSystem();

  const handleClose = () => setOpen(false);

  const createArticleMutation = useMutation({
    mutationFn: (data) =>
      createArticle(data)
        .then(() => {
          showSuccess("Article Created Successfully.");
        })
        .catch((error) => {
          const err = error?.response?.data || error.message;
          showError(err);
        }),
    onSuccess: () => {
      queryClient.invalidateQueries(["article"]);
    },
  });

  const onClick = (e) => {
    e.preventDefault();
    if (!title) return showError("Title may not be blank.");
    createArticleMutation.mutate({
      title,
      content: `Content For ${title}`,
    });
    setTitle("");
    handleClose();
  };

  return (
    <div>
      <Modal
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
            className="border border-b-gray-200"
          >
            <Typography id="modal-modal-title" variant="h6" component="h6">
              Create New Article
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
              py: 3,
            }}
          >
            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Enter Title"
                autoFocus
              />
            </FormControl>
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
          >
            <CircularButton
              text="button"
              onClick={onClick}
              loading={createArticleMutation.isLoading}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ArticleModal;
