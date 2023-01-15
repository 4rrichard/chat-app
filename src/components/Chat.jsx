import { Button, Divider, OutlinedInput, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  arrayUnion,
  collection,
  doc,
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
    justifyContent: "space-between",
    border: "solid 1px lightGrey",
    borderRadius: "5px",
    backgroundColor: "white",
    overflow: "hidden",
  },
  messageArea: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
  },
  currentFriend: {
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1976d2",
  },
};

const Chat = () => {
  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState([]);

  const [currentChatPartner, setCurrentChatPartner] = useState("");
  const [messages, setMessages] = useState([]);
  const [userSearch, setUserSearch] = useState("");

  console.log(messages);

  useEffect(() => {
    const qMessage = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubMessage = onSnapshot(qMessage, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
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
          <Users
            currentUser={currentUser}
            setCurrentChatPartner={setCurrentChatPartner}
          />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
          {currentChatPartner.name && (
            <Box sx={style.currentFriend}>
              <Typography sx={{ color: "white", fontSize: "25px" }}>
                {currentChatPartner.name}
              </Typography>
            </Box>
          )}
          <Box sx={style.messageArea}>
            {messages &&
              messages.map((message) => {
                return (
                  message.uid === user.uid && (
                    <Message key={message.id} message={message} />
                  )
                );
              })}
            <SendMessage currentChatPartnerId={currentChatPartner.uid} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
