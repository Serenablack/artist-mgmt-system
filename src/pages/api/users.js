import tokenExtractor from "@/middleware/tokenExtractor";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });
const bcrypt = require("bcryptjs");

async function handler(req, res) {
  if (req.method === "GET") {
    let user = await prisma.user.findMany();
    console.log(user);
    return res.status(200).json(user);
  }
}
export default tokenExtractor(handler);
