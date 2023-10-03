import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MuiAlert from "@mui/material/Alert";
import { GrFormClose } from "react-icons/gr";
import { ActionCreators as SystemActions } from "../../Redux/Actions/Sytstem.actions";

export default function SnackBar() {
  const dispatch = useDispatch();
  const toastData = useSelector((state) => state.system.toast);
  const [toast, setToast] = React.useState(toastData);
  let Toast;

  React.useEffect(() => {
    const _data = {
      ...toastData,
      message: handleError(toastData.message),
    };
    setToast(_data);
  }, [toastData]);

  const handleError = (msg) => {
    if (typeof msg === "string") return msg;
    else if (Array.isArray(msg)) return msg[0].toString();
    else if (typeof msg === "object") {
      let _msg = Object.values(msg);
      if (Array.isArray(_msg[0])) return _msg[0][0].toString();
      else if (typeof _msg[0] === "string") return _msg[0];
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = () => {
    dispatch(SystemActions.showToast({ ...toast, open: false }));
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="white"
        onClick={handleClose}
      >
        <GrFormClose size={30} />
      </IconButton>
    </React.Fragment>
  );
  if (toast.type === "success")
    Toast = (
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {toast.message}
      </Alert>
    );
  else if (toast.type === "error")
    Toast = toast.type === "error" && (
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {toast.message}
      </Alert>
    );

  return (
    <React.Fragment>
      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {Toast}
      </Snackbar>
    </React.Fragment>
  );
}
