const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

const jwt = require("jsonwebtoken");

async function handler(req, res) {
  if (req.method === "POST") {
    const userFound = await prisma.user.findUnique({
      where: { email: req.body.data.email },
    });

    if (userFound) {
      const userForToken = {
        email: userFound.email,
        id: userFound.id,
      };
      const token = jwt.sign(userForToken, process.env.SECRET);
      res.status(203).json({ userFound, token });
    }
  }
}
export default handler;
