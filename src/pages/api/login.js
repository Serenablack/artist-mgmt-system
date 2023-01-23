const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
import tokenExtractor from "@/middleware/tokenExtractor";
import jwtDecode from "jwt-decode";

async function handler(req, res) {
  if (req.method === "POST") {
    const userFound = await prisma.user.findUnique({
      where: { email: req.body.data.email },
    });
    console.log(userFound);
    const passwordCorrect =
      userFound === null
        ? false
        : await bcrypt.compare(req.body.data.password, userFound.password);
    if (userFound && passwordCorrect) {
      const userForToken = {
        email: userFound.email,
        id: userFound.id,
      };
      const token = jwt.sign(userForToken, process.env.SECRET);
      res.status(203).json({ userFound, token });
    }
  }
}
export default tokenExtractor(handler);
