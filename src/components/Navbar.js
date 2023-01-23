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
              <Button color="#c223er" onClick={() => push("/create")}>
                Create
              </Button>
            </Box>
            <Box>
              <Button color="inherit" onClick={() => push("/user")}>
                Users
              </Button>
              <Button color="inherit" onClick={() => push("/artist")}>
                Artist
              </Button>
            </Box>
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
