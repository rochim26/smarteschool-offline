import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { baseURL } from "../../../client/clientAxios";
import { uploadFile } from "../../../client/uploadFileClient";
import LoadingProgress from "../../../components/Shared/LoadingProgress/LoadingProgress";

const UploadSurel = ({
  preview = "",
  onChange = () => {},
  onUpload = () => {},
  onClick = () => {},
  name = "",
  id = "",
  label = "",
  titleUnggahan = "Foto Banner",
  titleUkuran = "",
  titleRasio = "",
  disabled = false,
  accept,
  dataJoyride,
  isFile = false,
  isImport = false,
}) => {
  const [progress, setProgress] = useState(0);

  const checkProgress = (uploadProgress) => {
    if (uploadProgress <= 100) {
      return setProgress(uploadProgress);
    }

    setTimeout(() => {
      setProgress(0);
    }, 500);
  };

  const getFileUrl = (fileUrl, e) => {
    if (fileUrl) {
      onChange(e, fileUrl);
    }
  };

  const uploadFileToServer = async (e) => {
    if (isImport) {
      getFileUrl(e.target.files[0], e);
    } else {
      onUpload(true);
      await uploadFile(e.target.files[0], checkProgress, (fileUrl) =>
        getFileUrl(fileUrl, e)
      );
      onUpload(false);
    }
  };

  return (
    <div>
      <LoadingProgress progress={progress} />
      {label && <p className="form-label">{label}</p>}
      {preview && !isFile && (
        <div className="position-relative mx-auto" data-joyride={dataJoyride}>
          <img width="100%" src={preview} className="rounded" />
          <label
            className="rounded-circle shadow-primary-ss position-absolute pointer"
            htmlFor={id}
            style={{
              right: "5%",
              top: "5%",
              width: "50px",
              height: "50px",
              background: `
                url(/img/icon-edit-foto.svg)`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></label>
        </div>
      )}
      {preview && isFile && (
        <div className="card-lampiran-materi border-0 bg-soft-primary rounded-ss mt-4">
          <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-md-row flex-column">
            <a href={URL.createObjectURL(preview)} target="_blank">
              <div className="d-flex align-items-center flex-wrap">
                <img src="/img/icon-file-xls.svg" alt="" />
                <div className="p-2">
                  <p className="fw-bold color-dark mb-0">
                    Template Import {name}
                  </p>
                  <span className="fs-12-ss color-secondary fs-12-ss fw-bold">
                    {/* PDF */}
                  </span>
                </div>
              </div>
            </a>
            <div className="d-flex justify-content-between align-items-center ps-md-2 pt-md-2 pb-md-2 pe-0 pt-3 p-0">
              <FaTimes
                className="pointer fs-4"
                style={{ color: "#96DAFF" }}
                onClick={onClick}
              />
            </div>
          </div>
        </div>
      )}
      {/* <input
        className="form-control d-none"
        type="file"
        accept={accept}
        id={id}
        name={name}
        onChange={uploadFileToServer}
      /> */}
    </div>
  );
};

export default UploadSurel;
