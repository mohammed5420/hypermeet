import type { NextApiRequest, NextApiResponse } from "next";
import { RtcTokenBuilder, RtcRole } from "agora-access-token";
import { env } from "../../../env/server.mjs";

type Params = Partial<{
  token: string | string[];
}>;
export default async function generateRTCToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params: Params = req.query;
  console.log(params);
  if (typeof params.token === "object") {
    if (!params.token) {
      return res.status(200).json({ error: "id is required" });
    }
    if (!params.token[1]) {
      return res.status(200).json({ error: "role is required" });
    }
    let uid = "";
    if (typeof params.token[0] === "string") {
      uid = params.token[0];
    }
    // get role
    let role;
    if (params.token[1] === "publisher") {
      role = RtcRole.PUBLISHER;
    } else if (params.token[1] === "audience") {
      role = RtcRole.SUBSCRIBER;
    } else {
      return res.status(200).json({ error: "role is incorrect" });
    }

    const expireTime = 3600;

    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;

    const token = RtcTokenBuilder.buildTokenWithAccount(
      env.AGORA_APP_ID,
      env.AGORA_CERTIFICATE,
      env.NEXT_PUBLIC_AGORA_CHANNEL_NAME,
      uid,
      role,
      privilegeExpireTime
    );

    console.log({ token });

    res.status(201).json({ token });
  }
}
