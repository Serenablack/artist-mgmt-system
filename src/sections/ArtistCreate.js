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
import { createNew } from "@/redux/reducers/artistReducer";

const ArtistCreate = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [firstReleaseYear, setReleaseYear] = useState("");
  const [noOfAlbumsReleased, setAlbumsReleased] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(
      createNew({
        name,
        dob,
        gender,
        address,
        firstReleaseYear,
        noOfAlbumsReleased,
      })
    );

    push("/artist");
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
          Create Artist Page
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                id="fullname"
                label="Name"
                autoFocus
                value={name}
                onChange={({ target }) => setName(target.value)}
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

            <Grid item xs={12}>
              <TextField
                name="releaseYear"
                required
                fullWidth
                id="releaseYear"
                label="First release Year"
                type="year"
                autoFocus
                value={firstReleaseYear}
                onChange={({ target }) => setReleaseYear(Number(target.value))}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="number of albums"
                label="Albums released"
                type="number"
                name="number of albums"
                autoComplete="number of albums"
                value={noOfAlbumsReleased}
                onChange={({ target }) =>
                  setAlbumsReleased(Number(target.value))
                }
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
            Create a new artist
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default ArtistCreate;
