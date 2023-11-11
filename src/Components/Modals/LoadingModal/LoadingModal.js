import { Modal, CircularProgress } from "@mui/material";

const LoadingModal = ({ open }) => {
  return (
    <Modal
      open={open}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress className="!text-white !fill-white !border-none !outline-none" />
    </Modal>
  );
};

export default LoadingModal;
