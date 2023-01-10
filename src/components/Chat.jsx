import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

import Logout from "./Logout";
import Message from "./Message";
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
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  console.log(messages);

  return (
    <Box sx={style.fullChat}>
      <Typography variant="h1">Hello {user?.displayName}</Typography>

      <Logout />
      <Box sx={style.chatContainer}>
        {messages &&
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        <SendMessage />
      </Box>
    </Box>
  );
};

export default Chat;
