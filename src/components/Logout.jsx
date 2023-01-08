import { Button } from "@mui/material";
import React from "react";
import { auth } from "../firebase";

const Logout = () => {
  return (
    <div>
      <Button onClick={() => auth.signOut()} variant="outlined">
        Logout
      </Button>
    </div>
  );
};

export default Logout;
