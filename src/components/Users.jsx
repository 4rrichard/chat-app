import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Users = ({ currentUser }) => {
  const [currentProfile] = useAuthState(auth);
  return (
    <Box>
      {currentUser[0]?.friends.map((friend, id) => {
        console.log(friend);
        return (
          currentProfile.uid !== friend.uid && (
            <Typography key={id} variant="h5">
              {friend.name}
            </Typography>
          )
        );
      })}
    </Box>
  );
};

export default Users;
