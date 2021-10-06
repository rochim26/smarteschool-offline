import React from "react";

const VideoContainer = ({ cam }) => {
  return (
    <>
      {cam?.map((cam, index) => (
        <video
          id={cam.deviceId}
          width="720"
          height="576"
          autoPlay
          muted
        ></video>
      ))}
    </>
  );
};

export default VideoContainer;
