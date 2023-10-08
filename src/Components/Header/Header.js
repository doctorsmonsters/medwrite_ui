import * as React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  Drawer,
} from "@mui/material";
import { CgMenuLeftAlt as MenuIcon } from "react-icons/cg";
import useSystem from "../../Hooks/useSystem";
import ModalButton from "../Buttons/ModalButton";
import ProfileMenu from "../ProfileMenu";

export default function Header({ isConcise }) {
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.user.isLogged);
  const matches = useMediaQuery("(min-width:1024px)");
  const { logout, navItems } = useSystem();
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1 }} component="nav">
      <AppBar
        position="static"
        sx={{ background: "transparent", py: isConcise ? 0 : 2 }}
      >
        <Toolbar sx={{ color: "primary.main" }}>
          {!matches  && (
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon color="black" />
            </IconButton>
          )}

          <Typography
            variant="h5"
            component="h5"
            mr={2}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          >
            MedWriter
          </Typography>
          {matches && (
            <>
              <List
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  px: 1,
                }}
              >
                {navItems.map(({ link, title, isPage }, index) => (
                  <ListItem
                    key={index}
                    className="bg-pink-00 mx-1 !w-max hidden md:block"
                  >
                    <ListItemText>
                      {!isPage ? (
                        <a href={link} className="font-bold text-md">
                          {title}
                        </a>
                      ) : (
                        <span
                          className="font-bold text-md cursor-pointer"
                          onClick={() => navigate(link)}
                        >
                          {title}
                        </span>
                      )}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>

              <Box component="div" className="flex items-center ml-auto">
                {!isLogged && (
                  <>
                    <Link
                      mx={3}
                      sx={{
                        fontWeight: "bold",
                        textTransform: "none",
                        textDecoration: "none",
                      }}
                      className="cursor-pointer"
                      onClick={() => navigate("/login")}
                    >
                      Log in
                    </Link>
                    <ModalButton
                      text="Get MedWriter it's free"
                      classes={clsx("!rounded-lg", isConcise && "!py-2")}
                      onClick={() => navigate("/signup")}
                    />
                  </>
                )}
              </Box>
            </>
          )}

          {matches && isLogged && (
            <ProfileMenu classes="ml-auto cursor-pointer" />
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen((prev) => !prev)}
      >
        <Box
          sx={{ px: 5, py: 8 }}
          bgcolor="#00231f"
          color="white"
          height="100%"
        >
          <List>
            {navItems.map(({ link, title, isPage }, index) => (
              <ListItem key={index} className="mr-36 !w-max !px-0">
                <ListItemText>
                  {!isPage ? (
                    <a
                      href={link}
                      className="font-bold text-md"
                      onClick={() => setOpen(false)}
                    >
                      {title}
                    </a>
                  ) : (
                    <span
                      className="font-bold text-md cursor-pointer"
                      onClick={() => navigate(link)}
                    >
                      {title}
                    </span>
                  )}
                </ListItemText>
              </ListItem>
            ))}
          </List>

          <Box component="div" className="flex items-center" mt={2}>
            {!isLogged ? (
              <>
                {" "}
                <Link
                  mr={3}
                  sx={{
                    fontWeight: "bold",
                    textTransform: "none",
                    textDecoration: "none",
                  }}
                  color="light.main"
                  className="cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </Link>
                <ModalButton
                  text="Get MedWriter it's free"
                  classes="!rounded-lg"
                  onClick={() => navigate("/singup")}
                />
              </>
            ) : (
              <ModalButton
                text="Logout"
                classes="!rounded-lg !px-8"
                onClick={() => logout()}
              />
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
