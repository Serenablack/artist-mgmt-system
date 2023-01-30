import tokenExtractor from "@/middleware/tokenExtractor";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

async function handler(req, res) {
  if (req.method === "GET") {
    let musics = await prisma.music.findMany();

    return res.status(200).json(musics);
  }
  if (req.method === "POST") {
    const { title, albumName, genre, artistId } = req.body.data;

    const music = await prisma.music.create({
      data: {
        title,
        albumName,
        genre,
        artist: {
          connect: {
            id: artistId,
          },
        },
      },
    });
    res.status(203).json(music);
  }
}

export default tokenExtractor(handler);
