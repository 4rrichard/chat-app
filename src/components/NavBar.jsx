import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase";
import Logout from "./Logout";

const style = {
  navContainer: {
    position: "absolute",
    top: "0",
    width: "100vw",
    padding: "10px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
  },
};

const NavBar = () => {
  const [user] = useAuthState(auth);

  return (
    <Box sx={style.navContainer}>
      <Typography variant="h4">Hello {user?.displayName}</Typography>
      <Logout />
    </Box>
  );
};

export default NavBar;
