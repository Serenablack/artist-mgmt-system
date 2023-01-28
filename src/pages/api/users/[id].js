import { PrismaClient } from "@prisma/client";

import axios from "axios";

const prisma = new PrismaClient({ log: ["query"] });
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "PUT":
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
        console.log(user);

        res.status(203).json(user);
      } catch (error) {
        return res.status(400).json({ success: false });
      }
      break;
  }
}
