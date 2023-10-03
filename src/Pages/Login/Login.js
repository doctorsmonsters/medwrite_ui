import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "../../Components/Divider";
import CircularButton from "../../Components/Buttons/CircularButton/CircularButton";
import ProtectedWrapper from "../../Components/Wrapper/ProtectedWrapper";
import SideGrid from "../../Components/Layouts/Auth/SideGrid";
import useSystem from "../../Hooks/useSystem";
import { ActionCreators as userActions } from "../../Redux/Actions/User.actions";
import { logIn, googleLogIn, getUserData } from "../../Services/User.service";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showError, showSuccess } = useSystem();
  const [loading, setLoading] = React.useState(false);

  const getUserMutation = useMutation({
    mutationFn: () => getUserData(),
    onSuccess: (res) => {
      dispatch(userActions.getUser(res.data));
    },
  });

  const handleGoogleLogin = (accessToken) => {
    const data = {
      access_token: accessToken,
    };
    setLoading(true);
    googleLogIn(data)
      .then((res) => {
        dispatch(userActions.login(res.data));
        getUserMutation.mutate();
        showSuccess("Successfully Logged In.");
        navigate("/articles");
      })
      .catch((error) => {
        const err = error?.response?.data || error.message;
        showError(err);
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get("username")?.trim();
    const password = data.get("password")?.trim();
    const isValid = username && password;
    if (!isValid) return showError("Username & Password both are required!");

    setLoading(true);
    logIn(data)
      .then((res) => {
        dispatch(userActions.login(res.data));
        getUserMutation.mutate();
        showSuccess("Successfully Logged In.");
        navigate("/articles");
      })
      .catch((error) => {
        const err = error?.response?.data || error.message;
        showError(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <ProtectedWrapper page="login">
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
          <Typography component="h1" variant="h3">
            Welcome back!
          </Typography>{" "}
          <Typography component="p" variant="body1" sx={{ mb: 4 }}>
            Please enter your details
          </Typography>
          <Box className="w-full flex justify-center">
            <GoogleLogin
              theme="filled_blue"
              shape="circle"
              onSuccess={(credentialResponse) =>
                handleGoogleLogin(credentialResponse.credential)
              }
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </Box>
          <Divider text="Or" />
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <br />
            <br />
            <CircularButton
              text="Log In"
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
                  onClick={() => navigate("/password/reset")}
                >
                  {"Forgot password?"}
                </Link>
              </Grid>
              <Grid item>
                <Typography component="p" variant="body2" textAlign="right">
                  {"Don't have an account?"}
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
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </SideGrid>
    </ProtectedWrapper>
  );
}
