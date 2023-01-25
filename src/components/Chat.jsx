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
    maxWidth: "650px",
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
  const [sortedMessages, setSortedMessages] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [userNotFound, setUserNotFound] = useState("");
  const [refresh, setRefresh] = useState(false);

  // const privateChatId = user.uid + currentChatPartner.uid;

  // useEffect(() => {
  //   const qMessage = query(
  //     collection(db, "messages", privateChatId, "chat"),
  //     orderBy("timestamp")
  //   );
  //   onSnapshot(qMessage, (querySnapshot) => {
  //     let messages = [];
  //     querySnapshot.forEach((doc) => {
  //       messages.push(doc.data());
  //     });
  //     setMessages(messages);
  //   });
  // }, [privateChatId]);

  useEffect(() => {
    const qReceivedM = query(collection(db, "messages"));

    onSnapshot(qReceivedM, (querySnapshot) => {
      let messagesR = [];

      querySnapshot.forEach((doc) => {
        if (doc.id.includes(user.uid)) {
          const qrm = query(
            collection(db, "messages", doc.id, "chat"),
            orderBy("timestamp")
          );
          onSnapshot(qrm, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
              messagesR.push({ ...doc.data(), id: doc.id });
            });
          });
        }
      });
      setMessages(messagesR);
    });
  }, [user.uid, refresh]);

  useEffect(() => {
    const sorted = messages.slice(0).sort((a, b) => {
      return a.timestamp.toDate() - b.timestamp.toDate();
    });
    setSortedMessages(sorted);
  }, [messages, currentChatPartner]);

  useEffect(() => {
    const qUser = query(collection(db, "users"));
    onSnapshot(qUser, (querySnapshot) => {
      let friends = [];
      querySnapshot.forEach((doc) => {
        if (auth.currentUser.uid === doc.data().uid) {
          friends.push(doc.data());
        }
      });

      setCurrentUser(friends);
    });
  }, []);

  const findUser = (e) => {
    e.preventDefault();
    const qUser = query(collection(db, "users"));

    onSnapshot(qUser, (querySnapshot) => {
      querySnapshot.forEach((docSnapshot) => {
        if (userSearch === docSnapshot.data().email) {
          const currentUser = doc(db, "users", auth.currentUser.uid);

          updateDoc(currentUser, {
            friends: arrayUnion(...[docSnapshot.data()]),
          });
        } else {
          setUserNotFound("this user does not exist!");
        }
      });
    });

    setUserSearch("");
  };

  setTimeout(() => {
    setUserNotFound("");
  }, 3000);

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
        <Typography>{userNotFound}</Typography>
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
            {sortedMessages &&
              currentChatPartner &&
              sortedMessages.map((message, id) => {
                return message.privateChatId.includes(
                  currentChatPartner.uid
                ) ? (
                  <Message key={id} message={message} />
                ) : null;
              })}
            {currentChatPartner && (
              <SendMessage
                currentChatPartnerId={currentChatPartner.uid}
                setRefresh={setRefresh}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
