import MusicCreate from "@/sections/MusicCreate";
import { Container, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MusicCreatePage() {
  const { push } = useRouter();
  const router = useRouter();
  const { id } = router.query;
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
        <MusicCreate id={id} />
      </Container>
    );
  }
}
