import React, { useEffect, useState } from "react";
const MainScreen = dynamic(import("./MainScreen"), {
  ssr: false,
});

import { useSession } from "next-auth/react";

import {
  ClientConfig,
  createClient,
  createMicrophoneAndCameraTracks,
  IAgoraRTCRemoteUser,
} from "agora-rtc-react";
import { env } from "../env/client.mjs";
import dynamic from "next/dynamic.js";
import Router from "next/router.js";
import { Session } from "next-auth";

const Member = dynamic(import("./Member"), { ssr: false });

const config: ClientConfig = { mode: "rtc", codec: "vp8" };
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const AgoraMain = () => {
  const session = useSession();
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  useEffect(() => {
    if (!session.data) return;
    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === "video") {
        setUsers((prevUsers) => {
          return [...Array.from(new Set([...prevUsers, user]))];
        });
      }
      if (mediaType === "audio") {
        user.audioTrack?.play();
      }
    });

    client.on("user-unpublished", (user, mediaType) => {
      if (mediaType === "audio") {
        if (user.audioTrack) user.audioTrack.stop();
      }
      if (mediaType === "video") {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      }
    });

    client.on("user-left", (user) => {
      if (user.hasAudio && user.audioTrack) user.audioTrack.stop();
      if (user.hasVideo && user.videoTrack) user.videoTrack.stop();
      setUsers((prevUsers) => {
        return prevUsers.filter((User) => User.uid !== user.uid);
      });
    });
    console.log(users);
  }, [client, session, users, tracks, ready]);
  const [joinedMeeting, setJoinedMeeting] = useState(false);
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
          if (tracks) await client.publish([tracks[0], tracks[1]]);
          setJoinedMeeting(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (ready && tracks) {
      try {
        if (!joinedMeeting) {
          init();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [client, ready, tracks, session]);

  const leaveMeeting = async () => {
    try {
      // if (tracks) await client.unpublish([tracks[0], tracks[1]]);
      await client.leave();
      await client.removeAllListeners();
      if (tracks) {
        tracks[0].close();
        tracks[1].close();
      }
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="grid grid-cols-12 gap-6 p-4 w-full max-w-screen-2xl mx-auto">
      <div className="col-start-4 row-start-1 row-end-3 col-end-10 rounded-lg bg-base-300 p-4">
        <MainScreen
          ready={ready}
          client={client}
          tracks={tracks}
          leaveMeeting={leaveMeeting}
        />
      </div>
      {users &&
        users.map((agoraUser) => {
          return <Member agoraUser={agoraUser} key={agoraUser.uid} />;
        })}
    </main>
  );
};

export default AgoraMain;
