import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const userID = req.body.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
  });
  console.log(user);
  res.status(200).json(user);
};

export default getUser;
