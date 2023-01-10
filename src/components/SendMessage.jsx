import React, { useState } from "react";
import { Box, Button, InputBase } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = () => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === "") {
      return;
    }

    const { uid, displayName } = auth.currentUser;
    console.log(uid, displayName);
    await addDoc(collection(db, "messages"), {
      text: input,
      name: displayName,
      uid,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Type your message"
        inputProps={{ "aria-label": "Type your message" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button variant="contained" endIcon={<SendIcon />} onClick={sendMessage}>
        Send
      </Button>
    </Box>
  );
};

export default SendMessage;
