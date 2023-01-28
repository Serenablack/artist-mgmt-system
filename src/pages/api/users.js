import tokenExtractor from "@/middleware/tokenExtractor";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });
const bcrypt = require("bcryptjs");

async function handler(req, res) {
  if (req.method === "GET") {
    let users = await prisma.user.findMany();
    return res.status(200).json(users);
  }
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
    } = req.body.data;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: passwordHash,
        phone: phone,
        dob: dob,
        gender: gender,
        address: address,
      },
    });
    res.status(203).json(user);
  }
}

export default tokenExtractor(handler);
