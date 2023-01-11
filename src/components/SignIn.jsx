import React, { useState } from "react";

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Button, Divider } from "@mui/material";

import GoogleButton from "react-google-button";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "@firebase/auth";
import { Link, useNavigate } from "react-router-dom";

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

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const navigate = useNavigate();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider).then(() => {
      navigate("/chat");
    });
  };

  const emailSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        navigate("/chat");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(errorCode);
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
          onChange={(e) => setEmail(e.target.value)}
        >
          <InputLabel htmlFor="my-input">Email</InputLabel>
          <OutlinedInput id="component-outlined" label="Email" />
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
            onClick={emailSignIn}
          >
            Sign In
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <Button size="small" variant="text">
              Forgot password?
            </Button>
            <Button component={Link} to="/register" size="small" variant="text">
              Register
            </Button>
          </Box>
        </FormControl>
        <Divider sx={{ marginBottom: "20px" }}>OR</Divider>
        <GoogleButton
          onClick={googleSignIn}
          type="light"
          style={{ margin: "auto" }}
        />
      </Box>
    </Box>
  );
};
