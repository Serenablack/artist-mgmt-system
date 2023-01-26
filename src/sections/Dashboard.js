import React, { useEffect } from "react";

import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Icon,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const dispatch = useDispatch();
  // const users = useSelector((state) => state.user);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const userInLocal = JSON.parse(
  //       window.localStorage.getItem("authorizedUser")
  //     ).userFound;
  //   }
  // }, []);

  const users = [
    {
      id: 2,
      firstName: "Hollee",
      lastName: "Vincent",
      email: "rivu@mailinator.com",
      password: "Pa$$w0rd!",
      phone: "+1 (863) 601-5948",
      dob: "2021-01-02T18:15:00.000Z",
      gender: "m",
      address: "Nihil sit ea harum ",
      createdAt: "2023-01-23T03:56:26.038Z",
      updatedAt: "2023-01-23T03:56:26.038Z",
    },
    {
      id: 3,
      firstName: "Barclay",
      lastName: "Fox",
      email: "syxotyj@mailinator.com",
      password: "$2a$10$hh.Mi9jq68CDMbNg4y8ECewuILw/MdrSYsZBP9F3oC8ECHrlXjRBW",
      phone: "+11648383641",
      dob: "1932-12-31T18:30:00.000Z",
      gender: "f",
      address: "Quam tempor eos ut c",
      createdAt: "2023-01-23T05:46:15.874Z",
      updatedAt: "2023-01-23T05:46:15.874Z",
    },
    {
      id: 4,
      firstName: "Adena",
      lastName: "Benjamin",
      email: "pigyxod@mailinator.com",
      password: "$2a$10$UyL7DJ6wPkrpipkgsB0Os.SVWkRsO/qUQMtbHFQhjFtL2/BuoVVzW",
      phone: "+1 (136) 738-3327",
      dob: "2021-01-04T18:15:00.000Z",
      gender: "f",
      address: "Ipsum voluptatem mo",
      createdAt: "2023-01-23T06:12:03.221Z",
      updatedAt: "2023-01-23T06:12:03.221Z",
    },
    {
      id: 5,
      firstName: "Arden",
      lastName: "Talley",
      email: "mupu@mailinator.com",
      password: "$2a$10$BEyrn3.G4Ctd0y0pu2bdGeYie2XD5rg0OT6bJ2bW6aot882ob3HC.",
      phone: "+1 (989) 268-7171",
      dob: "2016-12-31T18:15:00.000Z",
      gender: "f",
      address: "Et impedit velit ma",
      createdAt: "2023-01-23T10:18:46.423Z",
      updatedAt: "2023-01-23T10:18:46.423Z",
    },
  ];
  const { push } = useRouter();

  return (
    <Container>
      <Navbar />

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
                    main
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleEdit(user.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    main
                    color="error"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      hanldeDelete(user.id);
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
    </Container>
  );
};

export default Dashboard;
