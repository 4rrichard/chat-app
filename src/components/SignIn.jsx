import React, { useState } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import GoogleButton from "react-google-button";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "@firebase/auth";
import { Button, Divider } from "@mui/material";

const style = {
  boxContainer: {
    width: "100vw",
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "grey",
  },
  inputContainer: {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    border: "solid 1px lightGrey",
    borderRadius: "5px",
    backgroundColor: "white",
  },
};

export const SignIn = () => {
  const [user] = useAuthState(auth);
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  console.log(user);

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
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="my-input">Email</InputLabel>
          <OutlinedInput id="component-outlined" label="Email" />
        </FormControl>
        <FormControl
          sx={{ m: 1, width: "25ch", paddingBottom: "20px" }}
          variant="outlined"
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
          <Button variant="contained" sx={{ marginTop: "20px" }}>
            Sign In
          </Button>
        </FormControl>
        <Divider sx={{ marginBottom: "20px" }}>OR</Divider>
        <GoogleButton onClick={googleSignIn} type="light" />
      </Box>
    </Box>
  );
};
