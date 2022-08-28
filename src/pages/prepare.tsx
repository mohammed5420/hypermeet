import dynamic from "next/dynamic";
import Head from "next/head";
import Router from "next/router";
import { FiArrowLeft, FiVideo } from "react-icons/fi";
const Prepare = dynamic(import("../components/Prepare"), { ssr: false });
const PrePare = () => {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { id } = Router.query;
    Router.push(`/meeting/${id}`);
  };
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <div className="card w-full max-w-md bg-base-300 space-y-3 p-4">
          <div className="card-body p-0">
            <div className="flex justify-start">
              <button className="mr-3 cursor-pointer">
                <FiArrowLeft />
              </button>
              <h2 className="card-title text-md">
                Setup Your Camera and Microphone
              </h2>
            </div>
          </div>
          <div className="space-y-3">
            <Prepare />
          </div>
          <div className="card-actions flex justify-center items-center">
            <button
              className="btn btn-primary  w-full flex justify-center items-center"
              onClick={handleSubmit}
            >
              <FiVideo className="text-lg mr-2" /> Start New Meeting
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default PrePare;