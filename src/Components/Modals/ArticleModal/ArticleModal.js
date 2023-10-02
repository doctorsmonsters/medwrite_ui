import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormControl, TextField } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import CircularButton from "../../Buttons/CircularButton/CircularButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArticle } from "../../../Services/Article.service";

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
  const handleClose = () => setOpen(false);

  const createArticleMutation = useMutation({
    mutationFn: (data) => createArticle(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["article"]);
    },
  });

  const onClick = (e) => {
    e.preventDefault();
    createArticleMutation.mutate({
      title,
      content: `Content For ${title}`,
    });
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
              text="submit"
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
