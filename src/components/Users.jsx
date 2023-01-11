import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Users = ({ users }) => {
  const [currentUser] = useAuthState(auth);
  console.log(users);
  return (
    <Box>
      {users.map((user, id) => {
        return (
          currentUser.uid !== user.uid && (
            <Typography key={id} variant="h4">
              {user.name}
            </Typography>
          )
        );
      })}
    </Box>
  );
};

export default Users;
