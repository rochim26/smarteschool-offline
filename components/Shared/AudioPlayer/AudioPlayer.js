import ReactAudioPlayer from "react-audio-player";

const AudioPlayer = ({ src }) => {
  return (
    <div>
      <ReactAudioPlayer className="w-100" src={src} controls />
    </div>
  );
};

export default AudioPlayer;
