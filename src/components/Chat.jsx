import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

import Message from "./Message";
import NavBar from "./NavBar";
import SendMessage from "./SendMessage";
import Users from "./Users";

const style = {
  fullChat: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "grey",
  },
  chatContainer: {
    width: "600px",
    height: "700px",
    marginTop: "80px",
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
  const [users, setUsers] = useState([]);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const qMessage = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubMessage = onSnapshot(qMessage, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubMessage();
  }, []);

  useEffect(() => {
    const qUser = query(collection(db, "users"));
    const unsubUser = onSnapshot(qUser, (querySnapshot) => {
      let users = [];

      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });

      setUsers(users);
    });
    return () => unsubUser();
  }, []);

  return (
    <Box sx={style.fullChat}>
      <NavBar />
      <Users users={users} />
      <Box sx={style.chatContainer}>
        <Box
          sx={{
            marginRight: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          {messages &&
            messages.map((message) => {
              return (
                message.uid === user.uid && (
                  <Message key={message.id} message={message} />
                )
              );
            })}
        </Box>
        <SendMessage />
      </Box>
    </Box>
  );
};

export default Chat;
