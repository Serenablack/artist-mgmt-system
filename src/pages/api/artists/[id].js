import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "PUT":
      try {
        const {
          id,
          name,
          dob,
          gender,
          address,
          firstReleaseYear,
          noOfAlbumsReleased,
        } = req.body.data;

        const artist = await prisma.artist.update({
          where: {
            id: Number(id),
          },

          data: {
            id: Number(id),

            name,
            dob,
            gender,
            address,
            firstReleaseYear,
            noOfAlbumsReleased,
          },
        });

        res.status(203).json(artist);
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deleteArtist = await prisma.artist.delete({
          where: {
            id: Number(req.query.id),
          },
        });

        res.status(200).json(deleteArtist);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
}
