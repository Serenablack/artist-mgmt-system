const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });
const jwt = require("jsonwebtoken");
import tokenExtractor from "@/middleware/tokenExtractor";
import jwtDecode from "jwt-decode";

async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body.email);
    const userFound = await prisma.user.findUnique({
      where: { email: req.body.data.email },
    });

    const userForToken = {
      email: userFound.email,
      id: userFound.id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);

    console.log(user.token);
    res.status(203).json({ user, token });
  }
}
export default tokenExtractor(handler);
