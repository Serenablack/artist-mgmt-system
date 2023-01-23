import tokenExtractor from "@/middleware/tokenExtractor";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });
const bcrypt = require("bcryptjs");

async function handler(req, res) {
  if (req.method === "GET") {
    if (req.user) {
      let user = await prisma.user.findMany({});
      console.log(user);
      return res.status(200).json(user);
    }
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
    console.log(firstName, lastName);
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    console.log(firstName, lastName);
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
    console.log(user);

    res.status(203).json({ user });
  }
}
export default tokenExtractor(handler);
