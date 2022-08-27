import React, { useEffect } from "react";
const MainScreen = dynamic(import("./MainScreen"), {
  ssr: false,
});

import { useSession } from "next-auth/react";

import {
  ClientConfig,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
import { env } from "../env/client.mjs";
import dynamic from "next/dynamic.js";

const Member = dynamic(import("./Member"), { ssr: false });

const config: ClientConfig = { mode: "rtc", codec: "vp8" };
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
const AgoraMain = () => {
  const session = useSession();
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    const init = async () => {
      try {
        if (session.data) {
          await client.join(
            env.NEXT_PUBLIC_AGORA_APP_ID,
            env.NEXT_PUBLIC_AGORA_CHANNEL_NAME,
            env.NEXT_PUBLIC_AGORA_APP_TOKEN,
            session.data.user?.id
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);
  return (
    <main className="grid grid-cols-12 gap-6 p-4 w-full max-w-screen-2xl mx-auto">
      <div className="col-start-4 row-start-1 row-end-3 col-end-10 bg-base-300 p-4">
        <MainScreen ready={ready} client={client} tracks={tracks} />
      </div>
      <Member />
      <Member />
      <Member />
      <Member />
    </main>
  );
};

export default AgoraMain;
