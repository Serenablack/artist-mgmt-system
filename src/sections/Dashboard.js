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
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { delUser, initializeUsers } from "@/redux/reducers/userReducer";
import { logUser } from "@/redux/reducers/loginReducer";
import Cookies from "js-cookie";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 3;

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
    const userCookies = JSON.parse(Cookies.get("userLocal"));
    if (user.id === userCookies?.userFound.id) {
      Cookies.remove("userLocal");
      push("/");
    }
  };

  const handleChange = (e, p) => {
    setPageNumber(p);
  };

  const Users = useSelector((state) => state.user);

  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const users = Users?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(Users?.length / itemsPerPage);

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
      <Box>
        <Typography sx={{ display: "flex", justifyContent: "center" }}>
          User List
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="table layout">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "pink",
                textTransform: "uppercase",

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

      <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
        <Pagination
          style={{
            position: "fixed",
            flex: 1,
            bottom: 35,
          }}
          count={totalPages}
          page={pageNumber}
          variant="outlined"
          shape="rounded"
          size="large"
          color="primary"
          onChange={handleChange}
        />
      </Box>
    </>
  );
};

export default Dashboard;
