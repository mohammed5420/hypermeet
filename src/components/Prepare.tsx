import React, { useEffect, useState } from "react";
import { FiMic, FiMicOff, FiVideo, FiVideoOff } from "react-icons/fi";
import {
  AgoraVideoPlayer,
  ClientConfig,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
import { env } from "../env/client.mjs";
import { useSession } from "next-auth/react";
const config: ClientConfig = { mode: "rtc", codec: "vp8" };
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const Prepare = () => {
  const session = useSession();
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [isVideoActive, setIsVideoActive] = useState(true);
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
    <>
      <div className="card-body p-0 rounded-lg overflow-hidden">
        <div className="w-full h-80 object-cover">
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
      </div>
      <div className="card-actions flex justify-center items-center">
        <button
          className="btn btn-circle text-lg"
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
          className="btn btn-circle text-lg"
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
      </div>
    </>
  );
};

export default Prepare;
