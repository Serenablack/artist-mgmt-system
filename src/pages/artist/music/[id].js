import Navbar from "@/components/Navbar";
import { initializeMusic } from "@/redux/reducers/musicReducer";
import MusicList from "@/sections/MusicList";
import { Container, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function MusicPage() {
  const { push } = useRouter();
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const userLocal = Cookies.get("userLocal");
  useEffect(() => {
    if (!userLocal) {
      push("/");
    }
    dispatch(initializeMusic(id));
  }, [dispatch, id]);

  if (userLocal) {
    return (
      <Container>
        <Navbar />
        <MusicList id={Number(id)} />
      </Container>
    );
  }
}
