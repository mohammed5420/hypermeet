import { AgoraVideoPlayer, IAgoraRTCRemoteUser } from "agora-rtc-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiMic, FiMicOff } from "react-icons/fi";
type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: string;
  image: string;
};

type Props = {
  agoraUser: IAgoraRTCRemoteUser;
};
const Member = ({ agoraUser }: Props) => {
  console.log(agoraUser.uid);
  const [user, setUser] = useState<User>();
  const fetchUser = async () => {
    const { data } = await axios.post(`/api/users/getuser`, {
      id: agoraUser.uid,
    });
    setUser(data);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="rounded-lg overflow-hidden h-48 relative col-span-3">
      {user && (
        <>
          {agoraUser.videoTrack && agoraUser.hasVideo ? (
            <AgoraVideoPlayer
              videoTrack={agoraUser.videoTrack}
              style={{ height: "100%", width: "100%" }}
            />
          ) : (
            <div className="h-full w-full flex justify-center bg-base-300 items-center">
              <img src={user?.image || ""} className="w-24 rounded-full" />
            </div>
          )}

          <div className="absolute max-h-max p-1 rounded-md left-2 bottom-2 z-10 bg-slate-900 opacity-75">
            <h2>{user.name}</h2>
          </div>
        </>
      )}
      <div className="absolute max-h-max p-1 rounded-md right-2 bottom-3 z-10">
        {agoraUser.audioTrack && agoraUser.hasAudio ? (
          <FiMic className="text-blue-500" />
        ) : (
          <FiMicOff className="text-red-500" />
        )}
      </div>
    </div>
  );
};

{
  /* <FiMic className="text-blue-500" /> */
}

export default Member;
