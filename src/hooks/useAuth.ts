import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { useEffect } from "react";
const useAuth = () => {
  const session = useSession();

  useEffect(() => {
    if (session.status == "unauthenticated") Router.push("/login");
  }, [session]);
  if (session.status == "authenticated")
    return { userData: session.data?.user };
  else null;
};

export default useAuth;
