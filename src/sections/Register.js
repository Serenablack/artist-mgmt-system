import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";

export default function Register() {
  const { push } = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await registrService.register({
        firstName,
        lastName,
        email,
        password,
        phone,
        dob,
        gender,
        address,
      });
      push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="firstname"
                required
                fullWidth
                id="fullname"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={({ target }) => setFirstName(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoFocus
                value={lastName}
                onChange={({ target }) => setLastName(target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phone"
                label="Phone"
                type="hone"
                id="phone"
                autoComplete="phone"
                value={phone}
                onChange={({ target }) => setPhone(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="dob"
                label="DOB"
                type="dob"
                id="dob"
                autoComplete="dob"
                value={dob}
                onChange={({ target }) => setDob(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="gender"
                label="Gender"
                type="gender"
                id="gender"
                autoComplete="gender"
                value={gender}
                onChange={({ target }) => setGender(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="address"
                label="Address"
                type="address"
                id="address"
                autoComplete="address"
                value={address}
                onChange={({ target }) => setAddress(target.value)}
              />
            </Grid>
          </Grid>

          <Button
            id="register-button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
