import React from "react";
import { FiMic, FiMicOff } from "react-icons/fi";

const Member = () => {
  return (
    <div className="rounded-lg overflow-hidden h-48 relative col-span-3">
      <img
        className="w-full h-48 object-cover"
        src="https://api.lorem.space/image/face?w=720&h=480"
        alt=""
      />
      <div className="absolute max-h-max p-1 rounded-md left-2 bottom-2 z-10 bg-slate-900 opacity-75">
        <h2>randomOne</h2>
      </div>
      <div className="absolute max-h-max p-1 rounded-md right-2 bottom-3 z-10">
        <FiMicOff className="text-red-500" />
      </div>
    </div>
  );
};

{
  /* <FiMic className="text-blue-500" /> */
}

export default Member;
