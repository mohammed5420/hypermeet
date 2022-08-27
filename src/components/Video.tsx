import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import {
  AgoraVideoPlayer,
  ClientConfig,
  createClient,
  createMicrophoneAndCameraTracks,
  IAgoraRTCRemoteUser,
} from "agora-rtc-react";
import { env } from "../env/client.mjs";
type Props = {
  setIsReady: Dispatch<SetStateAction<boolean>>;
};

const Video = ({ setIsReady }: Props) => {
  const session = useSession();
  const config: ClientConfig = { mode: "rtc", codec: "vp8" };
  const useClient = createClient(config);
  const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const client = useClient();
  const [Users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  useEffect(() => {
    const init = async () => {
      if (!session.data) return;
      client.on("user-published", async (user, mediaType) => {
        if (user.uid == session.data.user?.id) return;
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
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
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(
          env.NEXT_PUBLIC_AGORA_APP_ID,
          env.NEXT_PUBLIC_AGORA_CHANNEL_NAME,
          env.NEXT_PUBLIC_AGORA_APP_TOKEN,
          session.data.user?.id
        );
        if (tracks) await client.publish([tracks[0], tracks[1]]);
      } catch (error) {
        console.log("error");
      }
    };

    init();
  }, [client, Users, tracks, ready]);
  const leaveMeeting = async () => {
    await client.leave();
    await client.removeAllListeners();
    if (tracks) {
      tracks[0].close();
      tracks[1].close();
    }

    setIsReady(false);
  };
  return (
    <div>
      {ready && tracks && (
        <div className="">
          <button onClick={() => leaveMeeting()}>leave meeting</button>
          <div className="w-96 h-96">
            <AgoraVideoPlayer
              // audio={tracks[1]}
              videoTrack={tracks[1]}
              style={{ height: "100%", width: "100%" }}
              className="rounded-lg overflow-hidden"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {Users &&
              Users.map((user) => {
                if (user.videoTrack)
                  return (
                    <div className="w-96 h-96" key={user.uid}>
                      <AgoraVideoPlayer
                        videoTrack={user.videoTrack}
                        style={{ height: "100%", width: "100%" }}
                        className="rounded-lg overflow-hidden"
                      />
                    </div>
                  );
                return null;
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
