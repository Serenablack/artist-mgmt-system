const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

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
    } = req.body.data;

    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        dob: dob,
        gender: gender,
        address: address,
      },
    });
    res.status(203).json(user);
  }
}
export default handler;
