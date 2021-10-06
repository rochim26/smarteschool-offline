import { FaFile, FaMusic, FaPlay } from "react-icons/fa";

const EmptyStateFile = ({
  type,
  pesan = "Tidak ada file yang dilampirkan",
}) => {
  return (
    <div className="bg-very-soft-secondary p-3 rounded-ss mb-3">
      <div className="file-content d-flex align-items-center">
        <div
          className="rounded-circle bg-light-secondary d-flex justify-content-center align-items-center text-white fs-3 p-3 me-2"
          style={{
            width: "48px",
            height: "48px",
          }}
        >
          {type === "music" && <FaMusic className="fs-5" />}
          {type === "video" && <FaPlay className="fs-5" />}
          {type === "file" && <FaFile className="fs-2" />}
        </div>
        <div className="p-3 d-flex flex-column">
          <p className="fw-bold color-secondary mb-1">{pesan}</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateFile;
