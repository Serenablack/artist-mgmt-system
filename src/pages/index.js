import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { loginUser } from "@services/loginService";
import { useRouter } from "next/router";
import { initializeUsers } from "@/redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const HomePage = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();

  const userLocal = Cookies.get("userLocal");
  if (userLocal) {
    const user = JSON.parse(userLocal);
    push("/home");
  }
  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await loginUser({
      email,
      password,
    });
    Cookies.set("userLocal", JSON.stringify(user));
    dispatch(initializeUsers());
    setEmail("");
    setPassword("");
    push("/home");
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="email"
                required
                fullWidth
                value={email}
                name="email"
                label="email"
                autoFocus
                onChange={({ target }) => setEmail(target.value)}
              />{" "}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                type="password"
                fullWidth
                value={password}
                name="Password"
                label="password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </Grid>{" "}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          <Grid item xs={12}>
            <Typography>
              No account yet?
              <Button href="/register" variant="text" color="primary">
                Register
              </Button>
            </Typography>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default HomePage;
