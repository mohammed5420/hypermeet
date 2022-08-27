// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const isValidMeeting = async (req: NextApiRequest, res: NextApiResponse) => {
  const { meetingID } = req.query;
  if (typeof meetingID == "string") {
    const meeting = await prisma.meetingRoom.findUnique({
      where: {
        id: meetingID,
      },
    });
    console.log(meeting);
    res.status(200).json(meeting);
  } else {
    res.status(405).end("invalid meeting id");
  }
};

const createMeeting = async (req: NextApiRequest, res: NextApiResponse) => {
  const meeting = await prisma.meetingRoom.create({
    data: {
      hostID: req.body.host,
    },
  });
  res.status(200).json(meeting);
};

const meetingHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      createMeeting(req, res);
      break;
    case "GET":
      // Update or create data in your database
      isValidMeeting(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default meetingHandler;
