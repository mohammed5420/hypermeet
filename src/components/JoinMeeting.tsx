import axios from "axios";
import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { useState } from "react";

const JoinMeeting = () => {
  const [meetingID, setMeetingID] = useState("");
  const [inputError, setInputError] = useState(false);
  const session = useSession();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(session.data);
    if (session.data) {
      const { data } = await axios.get("/api/room/meeting", {
        params: { meetingID },
      });
      if (data) {
        // console.log(data);
        Router.push(`/prepare?id=${data.id}`);
      } else {
        setInputError(true);
      }
    }
  };
  return (
    <form
      className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2 w-full"
      onSubmit={handleSubmit}
    >
      <div className="form-control w-full">
        <input
          className="input mr-2 w-full"
          placeholder="Enter Room ID"
          type="text"
          name="roomID"
          id="roomID"
          value={meetingID}
          onChange={(e) => setMeetingID(e.target.value)}
        />
        {inputError && (
          <label className="label">
            <span className="label-text-alt text-error">Invalid Room Id</span>
          </label>
        )}
      </div>
      <button type="submit" className={`btn btn-secondary w-full lg:max-w-max`}>
        Join Meeting
      </button>
    </form>
  );
};

export default JoinMeeting;
