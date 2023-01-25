import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useState } from "react";

const style = {
  messageSent: {
    width: "max-content",
    margin: "0 0 3px 5px",
    padding: "9px",
    backgroundColor: "#0084FF",
    borderRadius: "8px",
    color: "white",
    fontWeight: "semi-bold",
  },
  messageReceived: {
    width: "max-content",
    margin: "0 5px 3px 0",
    padding: "9px",
    backgroundColor: "#3E4042",
    borderRadius: "8px",
    color: "white",
    fontWeight: "semi-bold",
  },
  messageContainerReceived: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  messageContainerSent: {
    width: "100%",
    display: "flex",
    flexDirection: "row-reverse",
  },
  menuBtn: {
    marginBottom: "10px",
    padding: "0",
  },
};

const Message = ({ message, deleteMsg }) => {
  const [user] = useAuthState(auth);
  const dateFormat = new Date(message.timestamp * 1000);
  const dateSettings = { weekday: "long" };
  const hours = dateFormat.getHours();
  const minutes = dateFormat.getMinutes();
  const fullTime = `${hours}:${minutes}`;
  const dayName = dateFormat.toLocaleDateString("en-EN", dateSettings);

  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <Box
        sx={
          message.to === user.uid
            ? style.messageContainerReceived
            : style.messageContainerSent
        }
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <Tooltip
          title={`${dayName} ${fullTime}`}
          placement={message.to === user.uid ? "left" : "right"}
        >
          <Box
            sx={
              message.to === user.uid
                ? style.messageReceived
                : style.messageSent
            }
          >
            {message.text}
          </Box>
        </Tooltip>
        {isHovered && (
          <>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={openMenu ? "long-menu" : undefined}
              aria-expanded={openMenu ? "true" : undefined}
              aria-haspopup="true"
              sx={style.menuBtn}
              onClick={handleMenuClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              PaperProps={{
                style: {
                  maxHeight: 216,
                  width: "20ch",
                },
              }}
            >
              <MenuItem
                onClick={(e) => {
                  handleCloseMenu();
                  deleteMsg(message.text);
                }}
              >
                Delete message
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </>
  );
};

export default Message;
