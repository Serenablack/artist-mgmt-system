import { PrismaClient } from "@prisma/client";
import tokenExtractor from "@/middleware/tokenExtractor";

const prisma = new PrismaClient({ log: ["query"] });
async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const {
        id,
        firstName,
        lastName,
        email,
        password,
        phone,
        dob,
        gender,
        address,
      } = req.body.data;

      const user = await prisma.user.update({
        where: {
          id: Number(id),
        },

        data: {
          id: Number(id),
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
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deleteUser = await prisma.user.delete({
        where: {
          id: Number(req.query.id),
        },
      });

      res.status(200).json(deleteUser);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
export default tokenExtractor(handler);
