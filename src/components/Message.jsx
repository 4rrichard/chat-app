import { Box } from "@mui/system";
import React from "react";

const style = {
  message: {
    width: "max-content",
    margin: "0 0 10px 10px",
    padding: "9px",
    backgroundColor: "#0084FF",
    borderRadius: "8px",
    color: "white",
    fontWeight: "semi-bold",
  },
};

const Message = ({ message }) => {
  return <Box sx={style.message}>{message.text}</Box>;
};

export default Message;
