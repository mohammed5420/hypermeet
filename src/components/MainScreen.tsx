import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  FiMic,
  FiMicOff,
  FiMonitor,
  FiPhoneMissed,
  FiVideo,
  FiVideoOff,
} from "react-icons/fi";
import useAuth from "../hooks/useAuth";

import {
  AgoraVideoPlayer,
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-react";
import { env } from "../env/client.mjs";
type Props = {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
  ready: boolean;
  client: IAgoraRTCClient;
};
const MainScreen = ({ ready, client, tracks }: Props) => {
  const session = useSession();
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [isVideoActive, setIsVideoActive] = useState(true);
  // const [isVideoActive, setIsVideoActive] = useState(true);
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
        }
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);
  const data = useAuth();
  if (!data) return <div className="">loading</div>;
  return (
    <>
      <div className="space-y-4 flex flex-col items-center">
        <div className="w-full h-96 bg-base-100 rounded-lg flex justify-center items-center">
          {tracks && isVideoActive ? (
            <AgoraVideoPlayer
              videoTrack={tracks[1]}
              style={{ height: "100%", width: "100%" }}
            />
          ) : (
            <div className="h-full w-full flex justify-center bg-base-100 items-center">
              <img
                src={session.data?.user?.image || ""}
                className="w-24 rounded-full"
              />
            </div>
          )}
        </div>
        <div className="controls">
          <div className="btn-group text-xl">
            <button
              className="btn text-lg"
              onClick={() => {
                setIsAudioActive(!isAudioActive);
                if (tracks) tracks[0].setMuted(!tracks[0].muted);
              }}
            >
              {isAudioActive ? (
                <FiMic className="text-blue-500" />
              ) : (
                <FiMicOff className="text-red-500" />
              )}
            </button>
            <button
              className="btn text-lg"
              onClick={() => {
                setIsVideoActive(!isVideoActive);
                if (tracks) tracks[1].setMuted(!tracks[1].muted);
              }}
            >
              {isVideoActive ? (
                <FiVideo className="text-blue-500" />
              ) : (
                <FiVideoOff className="text-red-500" />
              )}
            </button>
            <button className="btn focus:btn-active">
              <FiMonitor className="text-blue-500 text-xl" />
            </button>
            <button className="btn focus:btn-active">
              <FiPhoneMissed className="text-red-500 text-xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
