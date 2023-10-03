import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularButton from "../../Components/Buttons/CircularButton/CircularButton";
import SideGrid from "../../Components/Layouts/Auth/SideGrid";
import useSystem from "../../Hooks/useSystem";
import { ActionCreators as userActions } from "../../Redux/Actions/User.actions";
import { resetPasswordConfirm } from "../../Services/User.service";

export default function PasswordChange() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccess, showError } = useSystem();
  const params = useParams();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const new1 = data.get("new_password1", "");
    const new2 = data.get("new_password2", "");

    const isValid = new1 && new2;
    const isSame = new1 === new2;
    if (!isValid)
      return showError("Kindly provide us with the following details");
    if (!isSame) return showError("The passwords does not match");

    data.append("uid", params?.uuid);
    data.append("token", params?.token);
    setLoading(true);
    resetPasswordConfirm(data)
      .then((res) => {
        dispatch(userActions.logout());
        showSuccess("Your password has been successfully reset.");
        navigate("/login");
      })
      .catch((error) => {
        const _error = error?.response?.data || error.message;
        showError(_error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <SideGrid>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h3" textAlign="center">
          Create password
        </Typography>
        <Typography component="p" variant="body1" sx={{ mb: 4, mt: 1 }}>
          Please enter your new password
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="new_password1"
            label="New password"
            type="password"
            id="new_password1"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="new_password2"
            label="Confirm Password"
            type="password"
            id="new_password2"
          />
          <br />
          <br />
          <CircularButton
            text="Reset"
            loading={loading}
            disabled={loading}
            type="submit"
          />
        </Box>
      </Box>
    </SideGrid>
  );
}
