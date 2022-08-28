import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (id && typeof id == "string") {
    const data = await prisma.meetingRoom.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(data);
  } else {
    res.status(405).json({ type: "error", message: "data not found" });
  }
}
