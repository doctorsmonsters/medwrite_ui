import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularButton from "../../Components/Buttons/CircularButton/CircularButton";
import SideGrid from "../../Components/Layouts/Auth/SideGrid";
import useSystem from "../../Hooks/useSystem";
import { ActionCreators as userActions } from "../../Redux/Actions/User.actions";
import { resetPassword } from "../../Services/User.service";

export default function PasswordReset() {
  const dispatch = useDispatch();
  const { showError, showSuccess } = useSystem();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email", "");
    if (!email) return showError("Kindly Provide us your email.");

    setLoading(true);
    resetPassword(data)
      .then(() => {
        dispatch(userActions.logout());
        showSuccess(
          "Password reset e-mail has been sent, kindly check your email."
        );
      })
      .catch((error) => {
        const _error = error.response.data || error.message;
        showError(_error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <SideGrid>
      <Box
        className="w-full"
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h3" textAlign="center">
          Reset Password!
        </Typography>{" "}
        <Typography component="p" variant="body1" sx={{ mb: 4, mt: 1 }}>
          Please enter your email
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          className="w-full"
        >
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
          />
          <br />
          <br />
          <CircularButton
            text="Submit"
            loading={loading}
            disabled={loading}
            type="submit"
          />
        </Box>
      </Box>
    </SideGrid>
  );
}
