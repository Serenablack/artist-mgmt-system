import React from "react";

import { useRouter } from "next/router";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";

const Navbar = () => {
  const { push } = useRouter();
  let user;

  user = JSON.parse(Cookies.get("userLocal")).userFound;

  const handleLogout = () => {
    Cookies.remove("userLocal");
    push("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        variant="h6"
        component="div"
        alignItems="center"
        sx={{ flexGrow: 1 }}
      >
        Artist Management System
      </Typography>
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" justifyContent="split-pair">
            <Box>
              <Button sx={{ color: "white" }} onClick={() => push("/user")}>
                Users
              </Button>
              <Button sx={{ color: "white" }} onClick={() => push("/artist")}>
                Artist
              </Button>
            </Box>{" "}
            <Box display="flex" alignItems="center" gap={1.5}>
              <Avatar />
              <Typography variant="overline">
                {user?.firstName + " " + user?.lastName}
              </Typography>
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ pt: 4 }}>
        <Button
          variant="outlined"
          size="small"
          sx={{ color: "blue" }}
          onClick={() => push("/create")}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};
export default Navbar;
