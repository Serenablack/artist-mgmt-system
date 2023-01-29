import Navbar from "@/components/Navbar";
import MusicList from "@/sections/MusicList";
import { Container, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MusicPage() {
  const { push } = useRouter();
  useEffect(() => {
    const userLocal = Cookies.get("userLocal");
    if (!userLocal) {
      push("/");
    }
  });
  const userLocal = Cookies.get("userLocal");
  const router = useRouter();

  const { id } = router.query;

  if (userLocal) {
    return (
      <Container>
        <Navbar />
        <MusicList id={Number(id)} />
      </Container>
    );
  }
}
