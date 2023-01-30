import React, { useEffect, useState } from "react";
import { Create } from "@mui/icons-material";

import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
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
import { delUser, initializeUsers } from "@/redux/reducers/userReducer";
import { logUser } from "@/redux/reducers/loginReducer";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(initializeUsers());
    dispatch(logUser());
  }, [dispatch]);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const hanldeDelete = async (user) => {
    await dispatch(delUser(user));
  };

  const handleChange = (e, p) => {
    setPageNumber(p);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "red",
    bgcolor: "white",
    boxShadow: 30,
    p: 4,
  };

  const Users = useSelector((state) => state.user);

  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const users = Users?.slice(startIndex, endIndex);

  const { push } = useRouter();
  return (
    <>
      <Box container sx={{ pt: 4 }}>
        <Button
          variant="outlined"
          size="small"
          sx={{ color: "blue" }}
          onClick={() => push("/create")}
        >
          Create
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="table layout">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "green",

                minWidth: "80px",
                "&:last-child td, &:last-child th": {
                  border: 1,
                },
              }}
            >
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email </TableCell>
              <TableCell align="center">Phone number</TableCell>
              <TableCell align="center">Date of birth </TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Address </TableCell>
              <TableCell align="center">Actions </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="left">
                  {user?.firstName + " " + user?.lastName}
                </TableCell>
                <TableCell align="left">{user?.email}</TableCell>
                <TableCell align="left">{user?.phone}</TableCell>
                <TableCell align="left">
                  {new Date(user?.dob).toLocaleString("en-US", options)}
                </TableCell>
                <TableCell align="left">{user?.gender}</TableCell>
                <TableCell align="left">{user?.address}</TableCell>
                <TableCell>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      push(`/user/edit/${user.id}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      hanldeDelete(user);
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
        style={{
          position: "fixed",
          bottom: 50,
        }}
        count={100}
        page={pageNumber}
        variant="outlined"
        shape="rounded"
        size="large"
        // color="primary"
        onChange={handleChange}
        itemsPerPage={itemsPerPage}
        totalUsers={users?.length}
      />
    </>
  );
};

export default Dashboard;
