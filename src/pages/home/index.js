import Navbar from "@/components/Navbar";
import Dashboard from "@/sections/Dashboard";
import { Container, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DashboardPage() {
  const { push } = useRouter();
  useEffect(() => {
    const userLocal = Cookies.get("userLocal");
    if (!userLocal) {
      push("/");
    }
  }, []);
  const userLocal = Cookies.get("userLocal");

  if (userLocal) {
    return (
      <Container>
        <Navbar />
        <Dashboard />
      </Container>
    );
  }
}
