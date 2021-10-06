import { baseURL } from "../../../client/clientAxios";
import { uploadFile } from "../../../client/uploadFileClient";
import useUser from "../../../hooks/useUser";
import Avatar from "../Avatar/Avatar";
import InputFile from "../InputFile/InputFile";

const UploadProfilePicture = ({
  name = "",
  id = "",
  preview = "",
  onChange = () => {},
  size = 150,
}) => {
  const handleChangeInputFile = async (e, data) => {
    if (data) {
      onChange(e, data);
    }
  };

  const { user } = useUser();

  return (
    <div
      className="position-relative mx-auto"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {preview ? (
        <Avatar
          name={user?.nama}
          src={user?.avatar ? user?.avatar : preview}
          size={size}
        />
      ) : (
        <img
          src="/img/avatar.svg"
          alt="avatar"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            objectFit: "cover",
          }}
          className="rounded-circle"
        />
      )}
      <label
        className="rounded-circle shadow-primary-ss position-absolute pointer"
        htmlFor={id}
        style={{
          right: "0",
          bottom: "0",
          width: "45px",
          height: "45px",
          background: `
          url(/img/icon-edit-foto.svg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></label>
      <InputFile
        accept="image/*"
        id={id}
        name={name}
        onChange={handleChangeInputFile}
      />
    </div>
  );
};

export default UploadProfilePicture;
