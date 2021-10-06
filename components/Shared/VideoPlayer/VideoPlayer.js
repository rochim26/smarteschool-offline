import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import InputFile from "../InputFile/InputFile";

const VideoPlayer = ({
  width = "100%",
  height = "300px",
  src = "",
  onClickHapus,
  name = "",
  getEditData = () => {},
}) => {
  const [videoUrl, setVideoUrl] = useState(src);

  const handleChangeInputFile = async (e, data) => {
    if (data) {
      getEditData(e, data);
    }
  };

  useEffect(() => {
    setVideoUrl(src);
  }, [src]);

  return (
    <div className="dropdown dropdown-ss position-relative">
      <ReactPlayer
        className="react-player"
        url={videoUrl}
        playing={false}
        controls={true}
        width={width}
        height={height}
      />
      <div
        className="rounded-circle shadow-primary-ss position-absolute pointer d-flex justify-content-center align-items-center bg-primary"
        style={{
          right: "7%",
          top: "7%",
          width: "40px",
          height: "40px",
        }}
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="/img/icon-option-horizontal-bg-primary.svg"
          alt="icon-option-vertical"
          style={{ height: "5px" }}
        />
      </div>
      <ul
        className="dropdown-menu dropdown-menu-ss my-1"
        aria-labelledby="dropdownMenuLink"
      >
        <li>
          <label className="dropdown-item" htmlFor="FotoTentangSekolah">
            Edit
          </label>
        </li>
        <li onClick={() => onClickHapus()}>
          <a className="dropdown-item">Hapus</a>
        </li>
      </ul>

      <InputFile
        id="FotoTentangSekolah"
        accept="video/"
        name={name}
        onChange={handleChangeInputFile}
      />
    </div>
  );
};

export default VideoPlayer;
