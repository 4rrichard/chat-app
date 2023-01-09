import React from "react";
import { Box, Button, InputBase } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const SendMessage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Type your message"
        inputProps={{ "aria-label": "search google maps" }}
      />

      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Box>
  );
};

export default SendMessage;
