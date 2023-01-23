const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });
const jwt = require("jsonwebtoken");
import withToken from "src/middleware/withToken";

import jwtDecode from "jwt-decode";

async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body.email);
    const userFound = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    const user = await prisma.user.create({ data: req.body.data });
    const userForToken = {
      email: user.email,
      id: user.id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);

    console.log(user.token);
    res.status(203).json({ user, token });
  }
}
export default withToken(handler);
