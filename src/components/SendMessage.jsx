import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import OutlinedInput from "@mui/material/OutlinedInput";

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
    <Box component="form" sx={{ display: "inline-flex", width: "100%" }}>
      <OutlinedInput
        placeholder="Type your message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        endIcon={<SendIcon />}
        onClick={sendMessage}
      >
        Send
      </Button>
    </Box>
  );
};

export default SendMessage;
