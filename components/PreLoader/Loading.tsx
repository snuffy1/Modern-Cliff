import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999]">
      <video
        src="/videos/preloader.mp4"
        className=" w-screen"
        autoPlay
        muted
        loop
      ></video>
    </div>
  );
};

export default Loading;
