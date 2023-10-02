/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import SideGrid from "../../Components/Layouts/Auth/SideGrid";
import Divider from "../../Components/Divider";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { TiTick } from "react-icons/ti";
import { verifyEmail } from "../../Services/User.service";

const VerifyEmail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const verifyEmailQuery = useMutation({
    mutationFn: () => verifyEmail({ key: params.token }),
  });

  React.useEffect(() => {
    verifyEmailQuery.mutate();
  }, []);

  return (
    <SideGrid>
      <Box
        sx={{
          my: 8,
          py: 10,
          px: 5,
          mx: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="!bg-red-00"
      >
        {verifyEmailQuery.isLoading && (
          <Box component="div" className="flex flex-col items-center">
            <CircularProgress size={50} />
            <Typography component="h1" variant="h3" textAlign="center" mt={5}>
              Email Verification
            </Typography>{" "}
            <Typography
              component="p"
              variant="body1"
              sx={{ mt: 2 }}
              textAlign="center"
            >
              Please hold with us! we are verying you email.
            </Typography>
          </Box>
        )}
        {!verifyEmailQuery.isError && (
          <Box component="div" className="flex flex-col items-center">
            <TiTick size={100} />
            <Typography component="h1" variant="h4" textAlign="center" mt={0}>
              Email Verification Success
            </Typography>
            <Divider text="Success" />
            <Typography
              component="p"
              variant="body1"
              sx={{ mt: 2 }}
              textAlign="center"
            >
              Thanks for holding with us! Congratulations your email has been
              verified go ahaed and log into you account.
            </Typography>
            <Button
              onClick={() => navigate("/login")}
              className="cursor-pointer"
              color="primary"
              variant="contained"
              sx={{
                px: 4,
                mt: 3,
              }}
            >
              Log In
            </Button>
          </Box>
        )}
        {verifyEmailQuery.isError && (
          <Box component="div" className="flex flex-col items-center">
            <Typography component="h1" variant="h3" textAlign="center" mt={0}>
              Email Verification Failed
            </Typography>
            <Divider text="Error" />
            <Typography
              component="p"
              variant="body1"
              sx={{ mt: 2 }}
              textAlign="center"
            >
              Oops! We are having trouble verifing you email. Please try again
              after some time.
            </Typography>
            <Button
              onClick={() => navigate("/")}
              className="cursor-pointer"
              color="primary"
              variant="contained"
              sx={{
                px: 4,
                mt: 3,
              }}
            >
              Go back to home
            </Button>
          </Box>
        )}
      </Box>
    </SideGrid>
  );
};

export default VerifyEmail;
