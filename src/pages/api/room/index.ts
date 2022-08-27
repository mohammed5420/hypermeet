import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const getAllMeetingIDs = async (req: NextApiRequest, res: NextApiResponse) => {
  const ids = await prisma.meetingRoom.findMany();
  res.status(200).json(ids);
};

export default getAllMeetingIDs;
