import { PrismaClient } from "@prisma/client";
import tokenExtractor from "@/middleware/tokenExtractor";

const prisma = new PrismaClient({ log: ["query"] });
async function handler(req, res) {
  if (req.method === "PUT") {
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
  }

  if (req.method === "DELETE") {
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
  }
}
export default tokenExtractor(handler);
