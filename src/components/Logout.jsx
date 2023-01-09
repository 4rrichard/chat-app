import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const Logout = () => {
  return (
    <div>
      <Button
        onClick={() => auth.signOut()}
        variant="outlined"
        component={Link}
        to="/"
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
