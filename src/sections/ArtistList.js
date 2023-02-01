import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import {
  Box,
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { delArtist, initializeArtists } from "@/redux/reducers/artistReducer";

const ArtistList = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    dispatch(initializeArtists());
  }, [dispatch]);
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

  const hanldeDelete = async (artist) => {
    await dispatch(delArtist(artist));
  };

  const handleChange = (e, p) => {
    setPageNumber(p);
  };

  const { push } = useRouter();
  const Artists = useSelector((state) => state.artist);
  const handleClick = (id) => {
    push(`/artist/music/${id}`);
  };

  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const artists = Artists?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(Artists.length / itemsPerPage);

  return (
    <>
      <Box sx={{ pt: 4 }}>
        <Button
          variant="outlined"
          size="small"
          sx={{ color: "blue" }}
          onClick={() => push("/artist/create")}
        >
          Create
        </Button>
      </Box>
      <Box>
        <Typography sx={{ display: "flex", justifyContent: "center" }}>
          Artist List
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table
          sx={{
            minWidth: 650,
            borderRadius: "3px",
          }}
          aria-label="table layout"
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "pink",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",

                minWidth: "80px",
                "&:last-child td, &:last-child th": { border: 1 },
              }}
            >
              <TableCell align="center">Name</TableCell>{" "}
              <TableCell align="center">Date of birth </TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Address </TableCell>
              <TableCell align="center">First Release Year </TableCell>
              <TableCell align="center">Albums Released</TableCell>
              <TableCell align="center">Created At</TableCell>
              <TableCell align="center">Updated At</TableCell>
              <TableCell align="center">Actions </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {artists?.map((artist) => (
              <TableRow
                hover={true}
                selected={true}
                onClick={() => {
                  handleClick(artist.id);
                }}
                key={artist.id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell align="left">{artist?.name}</TableCell>
                <TableCell align="left">
                  {new Date(artist?.dob).toLocaleString("en-US", options)}
                </TableCell>
                <TableCell align="left">{artist?.gender}</TableCell>
                <TableCell align="left">{artist?.address}</TableCell>
                <TableCell align="left">{artist?.firstReleaseYear}</TableCell>
                <TableCell align="left">{artist?.noOfAlbumsReleased}</TableCell>
                <TableCell align="left">
                  {new Date(artist?.createdAt).toLocaleString(
                    "en-US",
                    options2
                  )}
                  {}
                </TableCell>
                <TableCell align="left">
                  {new Date(artist?.updatedAt).toLocaleString(
                    "en-US",
                    options2
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      push(`/artist/edit/${artist.id}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      hanldeDelete(artist);
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
        showPrevButton
        style={{ position: "fixed", bottom: 30 }}
        count={totalPages}
        page={pageNumber}
        variant="outlined"
        shape="rounded"
        size="large"
        color="primary"
        onChange={handleChange}
      />
    </>
  );
};

export default ArtistList;
