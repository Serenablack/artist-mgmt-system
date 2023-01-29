import tokenExtractor from "@/middleware/tokenExtractor";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

async function handler(req, res) {
  if (req.method === "GET") {
    let artists = await prisma.artist.findMany();
    return res.status(200).json(artists);
  }
  if (req.method === "POST") {
    const { name, dob, gender, address, firstReleaseYear, noOfAlbumsReleased } =
      req.body.data;

    const artist = await prisma.artist.create({
      data: {
        name,
        dob,
        gender,
        address,
        firstReleaseYear,
        noOfAlbumsReleased,
      },
    });
    res.status(203).json(artist);
  }
}

export default tokenExtractor(handler);
