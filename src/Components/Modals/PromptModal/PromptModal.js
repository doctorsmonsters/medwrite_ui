import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import {
  FormControl,
  Typography,
  Box,
  Modal,
  TextField,
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

const PromptModal = ({ open, setOpen, promptProps, setLoading }) => {
  const [prompt, setPrompt] = React.useState("");
  const { showSuccess, showError } = useSystem();

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
  };

  const promptMutation = useMutation({
    mutationFn: (data) =>
      processPrompt(data)
        .then((res) => {
          promptProps.callback(res.data.data);
          setPrompt("");
          setOpen(false);
          showSuccess("Propmt response is added to your editor.");
        })
        .catch((error) => {
          const err = error?.response?.data || error.message;
          console.log(error, err);
          showError(err);
        })
        .finally(() => setLoading(false)),
  });

  const onClick = () => {
    if (!prompt) return showError("Prompt may not be blank.");
    setLoading(true);
    promptMutation.mutate({
      text: promptProps.text,
      prompt,
    });
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
              <TextField
                autoFocus
                multiline
                margin="normal"
                required
                className="!border-black !border-2 p-5"
                placeholder="Enter your Prompt"
                id="title"
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
              disabled={!prompt}
              onClick={onClick}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PromptModal;
