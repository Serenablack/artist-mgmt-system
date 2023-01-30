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

import { useDispatch, useSelector } from "react-redux";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { editOld } from "@/redux/reducers/artistReducer";

const EditPage = () => {
  const { push } = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const artists = useSelector((state) => state.artist);

  const reqdArtist = artists?.find((artist) => artist.id === Number(id));

  const [name, setName] = useState(reqdArtist?.name);
  const [dob, setDob] = useState(reqdArtist?.dob);
  const [gender, setGender] = useState(reqdArtist?.gender);
  const [address, setAddress] = useState(reqdArtist?.address);
  const [firstReleaseYear, setReleaseYear] = useState(
    reqdArtist?.firstReleaseYear
  );
  const [noOfAlbumsReleased, setAlbumsReleased] = useState(
    reqdArtist?.noOfAlbumsReleased
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(
      editOld({
        id: id,
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
          Edit Artist Details
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
            id="EditArtistPage-button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default EditPage;
