import React, { useEffect } from "react";

import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MusicCreate from "./MusicCreate";

const MusicList = ({ id }) => {
  const dispatch = useDispatch();

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var options2 = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const handleClick = () => {
    push(`/artist/music/create/${id}`);
  };

  const musics = [
    {
      title: "Shape of You",
      albumName: "Divide",
      genre: "Pop",
      artist: {
        id: 1,
        name: "Ed Sheeran",
        dob: "1991-02-17T00:00:00.000Z",
        gender: "Male",
        address: "London, UK",
        firstReleaseYear: 2011,
        noOfAlbumsReleased: 7,
      },
      artistId: 1,
      createdAt: "2022-01-01T00:00:00.000Z",
      updatedAt: "2022-01-01T00:00:00.000Z",
    },
    {
      title: "Thriller",
      albumName: "Thriller",
      genre: "Pop",
      artist: {
        id: 2,
        name: "Michael Jackson",
        dob: "1958-08-29T00:00:00.000Z",
        gender: "Male",
        address: "Gary, Indiana, USA",
        firstReleaseYear: 1971,
        noOfAlbumsReleased: 12,
      },
      artistId: 2,
      createdAt: "2022-01-01T00:00:00.000Z",
      updatedAt: "2022-01-01T00:00:00.000Z",
    },
  ];

  const { push } = useRouter();
  return (
    <>
      <Box sx={{ pt: 4 }}>
        <Button
          variant="outlined"
          size="small"
          sx={{ color: "blue" }}
          onClick={handleClick}
        >
          Create
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="table layout">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "rgb(250 500 500)",
                minWidth: "80px",
                "&:last-child td, &:last-child th": { border: 1 },
              }}
            >
              <TableCell align="center">Title</TableCell>{" "}
              <TableCell align="center">Name of Album</TableCell>
              <TableCell align="center">Genre</TableCell>
              <TableCell align="center">Artist </TableCell>
              <TableCell align="center">Created At</TableCell>
              <TableCell align="center">Updated At</TableCell>
              <TableCell align="center">Actions </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {musics?.map((music) => (
              <TableRow
                key={music.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="left">{music?.title}</TableCell>

                <TableCell align="left">{music?.albumName}</TableCell>
                <TableCell align="left">{music?.genre}</TableCell>
                <TableCell align="left">{music?.artist?.name}</TableCell>

                <TableCell align="left">
                  {new Date(music?.createdAt).toLocaleString("en-US", options2)}
                  {}
                </TableCell>
                <TableCell align="left">
                  {new Date(music?.updatedAt).toLocaleString("en-US", options2)}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      push(`/music/edit/${music.id}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      hanldeDelete(music);
                    }}
                  >
                    delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        style={{ position: "fixed", bottom: 50 }}
        count={10}
        variant="outlined"
        shape="rounded"
        size="large"
      />
    </>
  );
};

export default MusicList;
