import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/router";

export default function Navbar() {
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Artist Management System
          </Typography>

          <Box>
            <Button color="inherit" onClick={() => push("/user")}>
              User
            </Button>
            <Button color="inherit" onClick={() => push("/artist")}>
              Artist
            </Button>
          </Box>

          <Box display="flex" alignItems="center" gap={1.5}>
            <Avatar />
            <Typography variant="overline">
              {user?.firstName + " " + user?.lastName}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
