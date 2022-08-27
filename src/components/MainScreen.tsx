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
  leaveMeeting: () => Promise<void>;
};
const MainScreen = ({ tracks, leaveMeeting }: Props) => {
  const session = useSession();
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type: "video" | "audio") => {
    if (tracks) {
      if (type === "audio") {
        await tracks[0].setEnabled(!trackState.audio);
        setTrackState((ps) => {
          return { ...ps, audio: !ps.audio };
        });
      } else if (type === "video") {
        await tracks[1].setEnabled(!trackState.video);
        setTrackState((ps) => {
          return { ...ps, video: !ps.video };
        });
      }
    }
  };
  return (
    <>
      <div className="space-y-4 flex flex-col items-center rounded-lg">
        <div className="w-full h-96 bg-base-100 rounded-lg overflow-hidden flex justify-center items-center">
          {tracks && trackState.video ? (
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
                mute("audio");
              }}
            >
              {trackState.audio ? (
                <FiMic className="text-blue-500" />
              ) : (
                <FiMicOff className="text-red-500" />
              )}
            </button>
            <button
              className="btn text-lg"
              onClick={() => {
                mute("video");
              }}
            >
              {trackState.video ? (
                <FiVideo className="text-blue-500" />
              ) : (
                <FiVideoOff className="text-red-500" />
              )}
            </button>
            <button className="btn focus:btn-active">
              <FiMonitor className="text-blue-500 text-xl" />
            </button>
            <button className="btn focus:btn-active" onClick={leaveMeeting}>
              <FiPhoneMissed className="text-red-500 text-xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
