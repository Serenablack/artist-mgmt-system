import Navbar from "@/components/Navbar";
import { logUser } from "@/redux/reducers/loginReducer";
import ArtistList from "@/sections/ArtistList";
import { Container, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function DashboardPage() {
  const { push } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const userLocal = Cookies.get("userLocal");
    if (!userLocal) {
      push("/");
    } else dispatch(logUser());
  }, [dispatch]);
  const userLocal = Cookies.get("userLocal");

  if (userLocal) {
    return (
      <Container>
        <Navbar />
        <ArtistList />
      </Container>
    );
  }
}
