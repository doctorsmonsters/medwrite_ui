import * as React from "react";
import { useSelector } from "react-redux";
import { Menu, MenuItem, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useSystem from "../../Hooks/useSystem";

const ProfileMenu = ({ classes }) => {
  const navigate = useNavigate();
  const { logout } = useSystem();
  const user = useSelector((state) => state.user.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function stringToColor(string, darkness = 0.5) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      // Reduce the value to make the color darker
      const darkValue = Math.floor(value * darkness);
      color += `00${darkValue.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: name[0].toUpperCase(),
    };
  }
  return (
    <div className={classes}>
      <Avatar
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        {...stringAvatar(
          user?.username
            ? user.username
            : user?.first_name || user?.last_name || "Jhon Deo"
        )}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => navigate("/password/change")}>
          Change Password
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
