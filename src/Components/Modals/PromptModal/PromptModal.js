import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import {
  FormControl,
  Typography,
  Box,
  Modal,
  TextareaAutosize,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { processPrompt } from "../../../Services/Actions.service";
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

const PromptModal = ({ open, setOpen, promptProps }) => {
  const [prompt, setPrompt] = React.useState("");
  const { showSuccess, showError } = useSystem();

  const handleClose = () => setOpen(false);
  const promptMutation = useMutation({
    mutationFn: (data) =>
      processPrompt(data)
        .then((res) => {
          processPrompt.callback(res.data.data.processed_text);
          showSuccess("Article Created Successfully.");
        })
        .catch((error) => {
          const err = error?.response?.data || error.message;
          showError(err);
        })
        .finally(() => promptProps.loader(false)),
  });

  const onClick = () => {
    promptProps.loader(true);
    if (!prompt) return showError("Prompt may not be blank.");
    promptMutation.mutate({
      text: promptProps.text,
      prompt,
    });
    setPrompt("");
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
              Write a Prompt
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
              <TextareaAutosize
                autoFocus
                margin="normal"
                required
                className="!border-black !border-2 p-5"
                placeholder="Enter your Prompt"
                id="title"
                onKeyUp={(e) => e.key === "Enter" && onClick()}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                label="Enter Prompt"
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
              text="Generate"
              onClick={onClick}
              loading={promptMutation.isLoading}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PromptModal;
