import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Logout from "./Logout";
import SendMessage from "./SendMessage";

const style = {
  fullChat: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "grey",
  },
  chatContainer: {
    width: "600px",
    height: "700px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    border: "solid 1px lightGrey",
    borderRadius: "5px",
    backgroundColor: "white",
  },
};

const Chat = () => {
  const [user] = useAuthState(auth);

  return (
    <Box sx={style.fullChat}>
      <Typography variant="h1">Hello {user.displayName}</Typography>

      <Logout />

      <Box sx={style.chatContainer}>
        <SendMessage />
      </Box>
    </Box>
  );
};

export default Chat;
