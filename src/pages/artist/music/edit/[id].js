import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { editOld } from "@/redux/reducers/musicReducer";

const MusicEdit = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const musics = useSelector((state) => state.music);
  const reqdMusic = musics?.find((mus) => mus.id === Number(id));

  const [title, setTitle] = useState(reqdMusic?.title);
  const [albumName, setAlbumName] = useState(reqdMusic?.albumName);
  const [genre, setGenre] = useState(reqdMusic?.genre);

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(
      editOld({
        id: Number(id),
        title,
        albumName,
        genre,
      })
    );

    router.back();
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
          Edit Music
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="album name"
                required
                fullWidth
                id="albumName"
                label="Album Name"
                autoFocus
                value={albumName}
                onChange={({ target }) => setAlbumName(target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={genre}
                  label="genre"
                  onChange={(event) => setGenre(event.target.value)}
                >
                  <MenuItem value={"rnb"}>RNB</MenuItem>
                  <MenuItem value={"country"}>Country</MenuItem>
                  <MenuItem value={"classic"}>Classic</MenuItem>
                  <MenuItem value={"rock"}>Rock</MenuItem>
                  <MenuItem value={"jazz"}>Jazz</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            id="EditMusicPage-button"
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
export default MusicEdit;
