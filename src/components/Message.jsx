import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const style = {
  messageSent: {
    width: "max-content",
    margin: "0 0 10px 10px",
    padding: "9px",
    backgroundColor: "#0084FF",
    borderRadius: "8px",
    color: "white",
    fontWeight: "semi-bold",
  },
  messageReceived: {
    width: "max-content",
    marginBottom: "10px",
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
};

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  const dateFormat = new Date(message.timestamp * 1000);
  const dateSettings = { weekday: "long" };
  const hours = dateFormat.getHours();
  const minutes = dateFormat.getMinutes();
  const fullTime = `${hours}:${minutes}`;
  const dayName = dateFormat.toLocaleDateString("en-EN", dateSettings);

  return (
    <>
      <Box sx={message.to === user.uid ? style.messageContainerReceived : null}>
        <Tooltip title={`${dayName} ${fullTime}`}>
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
      </Box>
    </>
  );
};

export default Message;
