import { useSession } from "next-auth/react";
import React from "react";
import {
  FiMic,
  FiMonitor,
  FiPhone,
  FiPhoneMissed,
  FiVideo,
  FiVideoOff,
} from "react-icons/fi";
import useAuth from "../hooks/useAuth";
const MainScreen = () => {
  const data = useAuth();
  if (!data) return <div className="">loading</div>;
  return (
    <>
      <div className="space-y-4 flex flex-col items-center">
        <div className="w-full h-96 bg-base-100 rounded-lg flex justify-center items-center">
          <img
            className="w-24 h-24 rounded-full overflow-hidden object-cover"
            src={data.userData?.image || ""}
            alt={data.userData?.name || ""}
          />
        </div>
        <div className="controls">
          <div className="btn-group text-xl">
            <button className="btn focus:btn-active">
              <FiMic className="text-blue-500 text-xl" />
            </button>
            <button className="btn focus:btn-active">
              <FiVideoOff className="text-red-500 text-xl" />
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
