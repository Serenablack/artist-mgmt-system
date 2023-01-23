const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });
const jwt = require("jsonwebtoken");
import withToken from "src/middleware/withToken";
import jwtDecode from "jwt-decode";

async function handler(req, res) {
  if (req.method === "POST") {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      dob,
      gender,
      address,
    } = req.body;
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        phone,
        dob,
        gender,
        address,
      },
    });
    console.log(user);
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
