import { Box } from "@mui/system";
import { Button } from "@mui/material";

import { Typography } from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";

const style = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
};

const SuccessfulReg = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/");
  };

  return (
    <Box sx={style.modal}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        You have successfully registered!
      </Typography>
      <Button
        id="modal-modal-description"
        variant="contained"
        sx={{ mt: 2 }}
        onClick={goToLogin}
      >
        Go to Chat
      </Button>
    </Box>
  );
};

export default SuccessfulReg;
