import React from "react";

import { useRouter } from "next/router";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

const Navbar = () => {
  const { push } = useRouter();
  let user;
  if (typeof window !== "undefined") {
    user = JSON.parse(window.localStorage.getItem("authorizedUser")).userFound;
  }

  const handleLogout = () => {
    window.localStorage.removeItem("authorizedUser");
    push("/");
  };

  return (
    <Container>
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
                <Button onClick={() => push("/user")}>Users</Button>
                <Button onClick={() => push("/artist")}>Artist</Button>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Avatar />
              <Typography variant="overline">
                {user?.firstName + " " + user?.lastName}
              </Typography>
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Container>
  );
};
export default Navbar;
