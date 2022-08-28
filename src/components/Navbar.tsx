import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const session = useSession();
  return (
    <nav className="navbar bg-base-300 w-full max-w-screen-xl rounded-xl p-3 m-2 mx-auto ">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">HyperMeet</a>
      </div>
      <div className="flex-none space-x-2">
        {!session.data?.user ? (
          <div className="">
            <button
              className="btn btn-secondary"
              onClick={() => {
                signIn();
              }}
            >
              Sign in
            </button>
          </div>
        ) : (
          <>
            <div className="">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </button>
            </div>
            <div className="">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={session.data.user.image || ""} />
                </div>
              </label>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
