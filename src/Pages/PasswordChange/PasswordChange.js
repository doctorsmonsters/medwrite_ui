import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularButton from "../../Components/Buttons/CircularButton/CircularButton";
import SideGrid from "../../Components/Layouts/Auth/SideGrid";
import useSystem from "../../Hooks/useSystem";
import { ActionCreators as userActions } from "../../Redux/Actions/User.actions";
import { changePassword } from "../../Services/User.service";
import ProtectedWrapper from "../../Components/Wrapper/ProtectedWrapper";

export default function PasswordChange() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showError, showSuccess } = useSystem();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const new1 = data.get("new_password1")?.trim();
    const new2 = data.get("new_password2")?.trim();

    const isValid = new1 && new2;
    const isSame = new1 === new2;
    if (!isValid)
      return showError("Kindly provide us with the following details");
    if (!isSame) return showError("The passwords does not match");

    setLoading(true);
    changePassword(data)
      .then((res) => {
        dispatch(userActions.logout());
        showSuccess("Password changed successfully.");
        navigate("/login");
      })
      .catch((error) => {
        const _error = error?.response?.data || error.message;
        showError(_error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <ProtectedWrapper>
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
            Update password
          </Typography>{" "}
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
              text="Change"
              loading={loading}
              disabled={loading}
              type="submit"
            />
            <Grid container mt={1}>
              <Grid item xs>
                <Link
                  color="secondary"
                  variant="body2"
                  className="cursor-pointer"
                  sx={{
                    textDecoration: "none",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={() => navigate("/")}
                >
                  {"Forgot password?"}
                </Link>
              </Grid>
              <Grid item>
                <Link
                  className="ml-2 font-bold cursor-pointer"
                  color="secondary"
                  variant="body2"
                  sx={{
                    ml: 1,
                    fontWeight: "bold",
                    textDecoration: "none",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={() => navigate("/articles")}
                >
                  back to home
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </SideGrid>
    </ProtectedWrapper>
  );
}
