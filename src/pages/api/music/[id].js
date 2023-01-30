import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "PUT":
      try {
        const { id, title, albumName, genre } = req.body.data;

        const music = await prisma.music.update({
          where: {
            id: id,
          },
          data: {
            id,
            title,
            albumName,
            genre,
          },
        });

        res.status(203).json(music);
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedMusic = await prisma.music.delete({
          where: {
            id: Number(req.query.id),
          },
        });

        res.status(200).json(deletedMusic);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
}
