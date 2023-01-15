import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../firebase";

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import SuccessfulReg from "./SuccessfulReg";
import { doc, setDoc } from "firebase/firestore";

const style = {
  boxContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "grey",
  },
  inputContainer: {
    width: "300px",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    border: "solid 1px lightGrey",
    borderRadius: "5px",
    backgroundColor: "white",
  },
};

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const registration = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, {
          name: displayName,
          email: email,
          uid: user.uid,
        });

        updateProfile(auth.currentUser, {
          displayName: displayName,
        });

        handleOpen();
      })
      .catch((error) => {
        const errorCode = error.code;
        //   const errorMessage = error.message;
        console.log(errorCode);

        // ..
      });
  };

  const handleChange = (key) => (event) => {
    setValues({ ...values, [key]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={style.boxContainer}>
      <Box sx={style.inputContainer}>
        <FormControl
          sx={{ m: 1, width: "initial" }}
          variant="outlined"
          onChange={(e) => setDisplayName(e.target.value)}
        >
          <InputLabel htmlFor="my-input">Display Name</InputLabel>
          <OutlinedInput id="component-outlined" label="Display Name" />
        </FormControl>
        <FormControl
          sx={{ m: 1, width: "initial" }}
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        >
          <InputLabel htmlFor="my-input">Email</InputLabel>
          <OutlinedInput id="component-outlined email" label="Email" />
        </FormControl>
        <FormControl
          sx={{ m: 1, width: "initial", marginBottom: "10px" }}
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <Button
            variant="contained"
            sx={{ marginTop: "20px" }}
            onClick={registration}
          >
            Register
          </Button>
        </FormControl>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <SuccessfulReg />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Register;
