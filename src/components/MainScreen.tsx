import { useSession } from "next-auth/react";
import React from "react";
import {
  FiCopy,
  FiMic,
  FiMicOff,
  FiPhoneMissed,
  FiVideo,
  FiVideoOff,
} from "react-icons/fi";

import {
  AgoraVideoPlayer,
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-react";
import { cameraAtom, micAtom, copyAlertAtom } from "../jotai";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

type Props = {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
  ready: boolean;
  client: IAgoraRTCClient;
  leaveMeeting: () => Promise<void>;
};
const MainScreen = ({ tracks, leaveMeeting }: Props) => {
  const [isAudioActive, setIsAudioActive] = useAtom(micAtom);
  const [isVideoActive, setIsVideoActive] = useAtom(cameraAtom);
  const [copyAlert, setCopyAlert] = useAtom(copyAlertAtom);
  const session = useSession();

  const mute = async (type: "video" | "audio") => {
    if (tracks) {
      if (type === "audio") {
        await tracks[0].setMuted(isAudioActive);
        setIsAudioActive(!isAudioActive);
      } else if (type === "video") {
        await tracks[1].setMuted(isVideoActive);
        setIsVideoActive(!isVideoActive);
      }
    }
  };

  const copyLink = async () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_APP_URL}/prepare?id=${router.query.roomID}`
    );
    setCopyAlert(true);
    setTimeout(() => {
      setCopyAlert(false);
    }, 2000);
  };
  const router = useRouter();
  return (
    <>
      <div className="space-y-4 flex flex-col items-center rounded-lg">
        <div className="w-full h-96 bg-base-100 rounded-lg overflow-hidden flex justify-center items-center">
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
          <div className="btn-group text-xl flex-nowrap">
            <button
              className="btn text-lg"
              onClick={() => {
                mute("audio");
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
                copyLink();
              }}
            >
              <FiCopy className="text-blue-500 text-xl" />
            </button>
            <button
              className="btn text-lg"
              onClick={() => {
                mute("video");
              }}
            >
              {isVideoActive ? (
                <FiVideo className="text-blue-500" />
              ) : (
                <FiVideoOff className="text-red-500" />
              )}
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
