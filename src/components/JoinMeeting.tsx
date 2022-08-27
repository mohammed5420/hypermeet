import axios from "axios";
import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { useState } from "react";

type Room = {
  id: string;
  hostID: string;
};

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
    <form className="flex" onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          className="input mr-2"
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
      <button type="submit" className={`btn btn-secondary `}>
        Join Meeting
      </button>
    </form>
  );
};

export default JoinMeeting;
