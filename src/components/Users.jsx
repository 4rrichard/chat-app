import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import React from "react";

const style = {
  friendContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  friendBtn: {
    justifyContent: "flex-start",
    fontSize: "20px",
  },
};

const Users = ({ currentUser, setCurrentChatPartner }) => {
  const handleFriendClick = (e, friend) => {
    e.preventDefault();
    setCurrentChatPartner(friend);
  };

  return (
    <Box>
      <Typography variant="h4">Friends:</Typography>
      <Box sx={style.friendContainer}>
        {currentUser[0]?.friends?.map((friend, id) => {
          return (
            <Button
              key={id}
              variant="text"
              sx={style.friendBtn}
              onClick={(e) => handleFriendClick(e, friend)}
            >
              {friend.name}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default Users;
