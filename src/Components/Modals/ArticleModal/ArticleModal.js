import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormControl, TextField, Typography, Box, Modal } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { ActionCreators as ArticleCreators } from "../../../Redux/Actions/Article.actions";
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
  "@media (max-width: 1024px)": {
    width: "70%",
  },
  "@media (max-width: 768px)": {
    width: "80%",
  },
};

const ArticleModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [title, setTitle] = React.useState("");
  const { showSuccess, showError } = useSystem();

  const handleClose = () => setOpen(false);
  const createArticleMutation = useMutation({
    mutationFn: (data) =>
      createArticle(data)
        .then((res) => {
          showSuccess("Article Created Successfully.");
          dispatch(ArticleCreators.setWorkingArticle(res.data));
          navigate(`/articles/create/${res.data.id}`);
        })
        .catch((error) => {
          const err = error?.response?.data || error.message;
          showError(err);
        }),
    onSuccess: () => {
      queryClient.invalidateQueries(["article"]);
    },
  });

  const onClick = () => {
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
                autoFocus
                margin="normal"
                required
                id="title"
                onKeyUp={(e) => e.key === "Enter" && onClick()}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Enter Title"
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
              type="button"
              text="Create"
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
