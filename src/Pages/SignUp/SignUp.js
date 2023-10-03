import * as React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "../../Components/Divider";
import CircularButton from "../../Components/Buttons/CircularButton/CircularButton";
import SideGrid from "../../Components/Layouts/Auth/SideGrid";
import useSystem from "../../Hooks/useSystem";
import { ActionCreators as userActions } from "../../Redux/Actions/User.actions";
import { signUp, googleLogIn, getUserData } from "../../Services/User.service";
import ProtectedWrapper from "../../Components/Wrapper/ProtectedWrapper";

const initialForm = {
  username: "",
  password1: "",
  password2: "",
  email: "",
};

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccess, showError } = useSystem();
  const [loading, setLoading] = React.useState(false);
  const [signUpForm, setSignUpform] = React.useState(initialForm);
  const [isOk, setIsOk] = React.useState(false);

  const getUserMutation = useMutation({
    mutationFn: () => getUserData(),
    onSuccess: (res) => {
      dispatch(userActions.getUser(res.data));
    },
  });

  React.useEffect(() => {
    const data = Object.values(signUpForm);
    const _isOk = !data.some((element) => element === "");
    setIsOk(_isOk);
  }, [signUpForm]);

  const handleGoogleLogin = (accessToken) => {
    const data = {
      access_token: accessToken,
    };
    setLoading(true);
    googleLogIn(data)
      .then((res) => {
        dispatch(userActions.login(res.data));
        getUserMutation.mutate();
        showSuccess("Signed up Successfully.");
        navigate("/articles");
      })
      .catch((error) => {
        let _error = error?.response?.data || error.message;
        showError(_error);
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = () => {
    if (isOk) {
      if (signUpForm.password1 !== signUpForm.password2)
        return showError("The passwords does not match");
      setLoading(true);
      signUp(signUpForm)
        .then((res) => {
          navigate("/login");
          showSuccess("Signed up Successfully.");
        })
        .catch((error) => {
          let _error = error?.response?.data || error.message;
          showError(_error);
        })
        .finally(() => setLoading(false));
    } else {
      showError("kindly provide us with the following details");
    }
  };

  const handleSignUpForm = (e) => {
    setSignUpform((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <ProtectedWrapper page="signup">
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
          <Typography component="h1" variant="h3" sx={{ textAlign: "center" }}>
            Create your account
          </Typography>
          <Typography component="p" variant="body1" sx={{ mb: 3 }}>
            Let's get started with your free account
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
          {/* Sign Up Form */}
          <Box component="form">
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={signUpForm.username}
              onChange={(e) => handleSignUpForm(e)}
            />
            <TextField
              margin="normal"
              type="email"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={signUpForm.email}
              onChange={(e) => handleSignUpForm(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password1"
              label="Password"
              type="password"
              id="password1"
              value={signUpForm.password1}
              onChange={(e) => handleSignUpForm(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="password2"
              value={signUpForm.password2}
              onChange={(e) => handleSignUpForm(e)}
            />
            <br />
            <br />
            <CircularButton
              text="Sign Up"
              loading={loading}
              disabled={loading}
              onClick={handleSubmit}
            />
            <Grid container mt={1}>
              <Grid item sm={12}>
                <Typography component="p" variant="body2" textAlign="right">
                  {"Already have an account?"}
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
                    onClick={() => navigate("/login")}
                  >
                    Log In
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
