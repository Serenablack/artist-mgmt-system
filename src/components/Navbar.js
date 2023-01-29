import React, { useEffect } from "react";

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
import { initializeArtists } from "@/redux/reducers/artistReducer";
import { useDispatch } from "react-redux";
import { logUser } from "@/redux/reducers/loginReducer";
import { initializeUsers } from "@/redux/reducers/userReducer";

const Navbar = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUsers());
    dispatch(logUser());
    dispatch(initializeArtists());
  }, [dispatch]);
  const user = JSON.parse(Cookies.get("userLocal")).userFound;

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
              <Button sx={{ color: "white" }} onClick={() => push("/home")}>
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
    </Box>
  );
};
export default Navbar;
