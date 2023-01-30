import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { Dayjs } from "dayjs";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useDispatch } from "react-redux";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { createNew } from "@/redux/reducers/userReducer";

const CreatePage = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
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

    dispatch(
      createNew({
        firstName,
        lastName,
        email,
        password,
        phone,
        dob,
        gender,
        address,
      })
    );

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
          Add user
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={12}>
                <DatePicker
                  displayStaticWrapperAs="desktop"
                  openTo="year"
                  value={dob}
                  onChange={(newValue) => {
                    setDob(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      required
                      fullWidth
                      name="dob"
                      label="Date of birth"
                      type="date of birth"
                      id="dob"
                      {...params}
                    />
                  )}
                />
              </Grid>
            </LocalizationProvider>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="Age"
                  onChange={(event) => setGender(event.target.value)}
                >
                  <MenuItem value={"m"}>Male</MenuItem>
                  <MenuItem value={"f"}>Female</MenuItem>
                  <MenuItem value={"o"}>Other</MenuItem>
                </Select>
              </FormControl>
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
            id="CreatePage-button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create a new user
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default CreatePage;
