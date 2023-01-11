import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Logout = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigate("/");
    });
  };

  return (
    <div>
      <Button onClick={handleSignOut} variant="outlined">
        Logout
      </Button>
    </div>
  );
};

export default Logout;
