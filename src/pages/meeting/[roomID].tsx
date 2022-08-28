import { NextPage, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Router from "next/router";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
const AgoraMain = dynamic(import("../../components/AgoraMain"), { ssr: false });

type Room = {
  id: string;
  hostID: string;
};

export async function getStaticPaths() {
  const result = await fetch("http://localhost:3000/api/room");
  const data = await result.json();
  const paths = await data.map((room: Room) => {
    return { params: { roomID: room.id.toString() } };
  });
  return {
    paths,
    fallback: false,
  };
}

type Props = {
  roomInfo: {
    id: string;
    hostID: string;
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) return { props: {} };
  const result = await fetch(`http://localhost:3000/api/room/${params.roomID}`);
  const roomInfo = await result.json();
  return {
    props: {
      roomInfo,
    },
  };
};

const MeetingRoom: NextPage<Props> = ({ roomInfo }: Props) => {
  const session = useSession();
  useEffect(() => {
    //Redirect the user to the login page
    if (session.status == "unauthenticated") {
      Router.push("/login");
    }
  }, [session]);

  if (session.status == "loading")
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="btn loading">Loading</p>
      </div>
    );

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <AgoraMain />
    </>
  );
};

export default MeetingRoom;
