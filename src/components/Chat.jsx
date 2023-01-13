import { Button, Divider, OutlinedInput, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
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
    width: "70%",
    height: "70%",
    marginTop: "80px",
    display: "flex",
    justifyContent: "flex-end",
    border: "solid 1px lightGrey",
    borderRadius: "5px",
    backgroundColor: "white",
  },
};

const Chat = () => {
  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState([]);
  const [user1, setUser1] = useState("");

  const [messages, setMessages] = useState([]);
  const [userSearch, setUserSearch] = useState("");

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
      let friends = [];

      querySnapshot.forEach((doc) => {
        if (auth.currentUser.uid === doc.data().uid) {
          friends.push(doc.data());
        }
      });

      setCurrentUser(friends);
    });
    return () => unsubUser();
  }, []);

  const findUser = (e) => {
    e.preventDefault();
    const qUser = query(collection(db, "users"));

    // console.log(doc(db, "users", "WdJyHfAeHO7WehJoFuAR"));
    const unsubUser = onSnapshot(qUser, (querySnapshot) => {
      querySnapshot.forEach((docSnapshot) => {
        if (userSearch === docSnapshot.data().email) {
          const currentUser = doc(db, "users", auth.currentUser.uid);
          updateDoc(currentUser, {
            friends: arrayUnion(...[docSnapshot.data()]),
          });
        }
      });
    });

    setUserSearch("");
    return () => unsubUser();
  };

  return (
    <Box sx={style.fullChat}>
      <NavBar />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <OutlinedInput
          placeholder="Add User"
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          sx={{ backgroundColor: "white" }}
        />

        <Button type="submit" variant="contained" onClick={findUser}>
          Add
        </Button>
      </Box>

      <Box sx={style.chatContainer}>
        <Box sx={{ padding: "30px" }}>
          <Users currentUser={currentUser} />
          <Typography>{user1}</Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box
          sx={{
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            flex: 1,
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
          <SendMessage />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
