import { useState } from "react";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import InputFile from "../InputFile/InputFile";

const UploadPhoto = ({
  id = "",
  name = "",
  label = "Label",
  col = "col-lg-3 col-md-4",
  listPhoto = [],
  titleUnggahan = "Foto Banner",
  titleUkuran = "",
  titleRasio = "",
  disabled = false,
  isFile = false,
  isSarpras = false,

  onChange = () => {},
  onUpload = () => {},
}) => {
  const [idx, setIdx] = useState(null);

  const onChangeUploadFile = async (e, data) => {
    if (data) {
      if (idx || idx === 0) {
        listPhoto[idx] = data;
        onChange(e, [...listPhoto]);
        setIdx(null);
      } else {
        onChange(e, [...listPhoto, data]);
      }
    }
  };

  const handleDelete = (e, deletePhoto) => {
    e.stopPropagation();
    const newPhotos = listPhoto?.filter((photo) => photo !== deletePhoto);
    const customEvent = {
      target: {
        name: name,
      },
    };
    onChange(customEvent, newPhotos);
  };

  const handleEdit = async (e, idx) => {
    e.stopPropagation();
    setIdx(idx);
  };

  const showFullImage = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      {isSarpras ? (
        <div>
          <h4 className="fs-18-ss fw-bold color-dark">{label}</h4>
          <div className="row">
            {listPhoto?.length >= 0 &&
              listPhoto?.map((photo, idx) => (
                <div
                  className={`${col} dropdown dropdown-ss position-relative pointer`}
                  onClick={() => showFullImage(photo)}
                >
                  <img
                    src={photo}
                    alt={photo}
                    className="w-100 rounded-ss img-fit-cover"
                    style={{ height: "150px" }}
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
                    <li onClick={(e) => handleEdit(e, idx)}>
                      <label className="dropdown-item" htmlFor={id}>
                        <FaPen className="me-2" />
                        <span>Edit</span>
                      </label>
                    </li>
                    <li onClick={(e) => handleDelete(e, photo)}>
                      <a className="dropdown-item color-danger">
                        <FaTrashAlt className="me-2" />
                        <span>Hapus</span>
                      </a>
                    </li>
                  </ul>
                </div>
              ))}
            {listPhoto?.length == 0 && (
              <div className={` ${col}`}>
                <label
                  className="rounded-circle shadow-primary-ss position-absolute pointer"
                  htmlFor={id}
                  className={`form-label w-100 ${disabled ? "no-drop" : ""}`}
                >
                  <div
                    className={`drop-file bg-soft-primary rounded-ss d-flex justify-content-center align-items-center flex-column pointer w-100 px-3 border border-primary-ss ${
                      isFile ? "py-lg-4 py-md-3 py-4" : "py-lg-4 py-md-3 py-5"
                    }`}
                  >
                    <img
                      src={
                        isFile
                          ? "/img/icon-file-upload.svg"
                          : "/img/icon-upload-dropfile.svg"
                      }
                      className="mb-3"
                    />
                    <div className="label-input d-flex align-items-center m-3 m-md-0">
                      <span className="fs-14-ss fw-semibold color-secondary text-center">
                        Klik untuk mengunggah{" "}
                        <span className="color-primary">{titleUnggahan}</span>
                      </span>
                    </div>
                    {titleUkuran && (
                      <span className="fs-14-ss fw-semibold color-secondary mt-1">
                        Sebaiknya memiliki ukuran {titleUkuran} pixel
                      </span>
                    )}
                    {titleRasio && (
                      <span className="fs-14-ss fw-semibold color-secondary mt-1">
                        Sebaiknya memiliki rasio {titleRasio}
                      </span>
                    )}
                  </div>
                </label>
              </div>
            )}
          </div>
          <InputFile id={id} name={name} onChange={onChangeUploadFile} />
        </div>
      ) : (
        <div>
          <h4 className="fs-18-ss fw-bold color-dark">{label}</h4>
          <div className="row">
            {listPhoto?.length > 0 &&
              listPhoto?.map((photo, idx) => (
                <div
                  className={`${col} dropdown dropdown-ss position-relative pointer`}
                  onClick={() => showFullImage(photo)}
                >
                  <img
                    src={photo}
                    alt={photo}
                    className="w-100 rounded-ss img-fit-cover"
                    style={{ height: "150px" }}
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
                    <li onClick={(e) => handleEdit(e, idx)}>
                      <label className="dropdown-item" htmlFor={id}>
                        <FaPen className="me-2" />
                        <span>Edit</span>
                      </label>
                    </li>
                    <li onClick={(e) => handleDelete(e, photo)}>
                      <a className="dropdown-item color-danger">
                        <FaTrashAlt className="me-2" />
                        <span>Hapus</span>
                      </a>
                    </li>
                  </ul>
                </div>
              ))}

            <div className={` ${col}`}>
              {/* <label
            htmlFor={id}
            className="w-100 rounded-ss bg-soft-primary border border-primary-ss pointer d-flex align-items-center justify-content-center"
            style={{ minHeight: "150px" }}
          >
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div
                className="rounded-circle shadow-primary-ss bg-primary text-white d-flex  justify-content-center align-items-center mb-2"
                style={{ height: "50px", width: "50px" }}
              >
                <FaPlus />
              </div>
              <span className="color-primary fw-bold">Tambahkan Foto</span>
            </div>
          </label> */}
              <label
                className="rounded-circle shadow-primary-ss position-absolute pointer"
                htmlFor={id}
                className={`form-label w-100 ${disabled ? "no-drop" : ""}`}
              >
                <div
                  className={`drop-file bg-soft-primary rounded-ss d-flex justify-content-center align-items-center flex-column pointer w-100 px-3 border border-primary-ss ${
                    isFile ? "py-lg-4 py-md-3 py-4" : "py-lg-4 py-md-3 py-5"
                  }`}
                >
                  <img
                    src={
                      isFile
                        ? "/img/icon-file-upload.svg"
                        : "/img/icon-upload-dropfile.svg"
                    }
                    className="mb-3"
                  />
                  <div className="label-input d-flex align-items-center m-3 m-md-0">
                    <span className="fs-14-ss fw-semibold color-secondary text-center">
                      Klik untuk mengunggah{" "}
                      <span className="color-primary">{titleUnggahan}</span>
                    </span>
                  </div>
                  {titleUkuran && (
                    <span className="fs-14-ss fw-semibold color-secondary mt-1">
                      Sebaiknya memiliki ukuran {titleUkuran} pixel
                    </span>
                  )}
                  {titleRasio && (
                    <span className="fs-14-ss fw-semibold color-secondary mt-1">
                      Sebaiknya memiliki rasio {titleRasio}
                    </span>
                  )}
                </div>
              </label>
            </div>
          </div>
          <InputFile id={id} name={name} onChange={onChangeUploadFile} />
        </div>
      )}
    </>
  );
};

export default UploadPhoto;
