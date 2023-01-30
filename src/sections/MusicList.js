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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { delMusic, initializeMusic } from "@/redux/reducers/musicReducer";

const MusicList = ({ id }) => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 4;
  const artists = useSelector((state) => state.artist);

  useEffect(() => {
    dispatch(initializeMusic(Number(id)));
  }, [dispatch, id]);

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

  const hanldeDelete = async (music) => {
    await dispatch(delMusic(music));
  };

  const handleChange = (e, p) => {
    setPageNumber(p);
  };

  const Musics = useSelector((state) => state.music);

  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const musics = Musics?.slice(startIndex, endIndex);

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
                      push(`/artist/music/edit/${music.id}`);
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
        count={100}
        page={pageNumber}
        variant="outlined"
        shape="rounded"
        size="large"
        color="primary"
        onChange={handleChange}
        itemsPerPage={itemsPerPage}
        totalMusic={musics?.length}
      />
    </>
  );
};

export default MusicList;
