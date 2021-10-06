import { useEffect, useState } from "react";
import { uploadFile } from "../../../client/uploadFileClient";
import LoadingProgress from "../LoadingProgress/LoadingProgress";

const InputFile = ({ name, id, onChange, accept, setLoading = () => {} }) => {
  const [progress, setProgress] = useState(0);

  const checkProgress = (uploadProgress) => {
    if (uploadProgress <= 100) {
      setProgress(uploadProgress);
    }
    if (uploadProgress == 100) setLoading(false);
  };

  const handleChange = async (e) => {
    setLoading(true);
    if (!e.target.files[0]) setLoading(false);
    await uploadFile(e.target.files[0], checkProgress, (fileUrl) => {
      if (fileUrl) {
        onChange(e, fileUrl);
      }
    });
  };

  return (
    <>
      <LoadingProgress progress={progress} />
      <input
        className="form-control d-none"
        type="file"
        name={name}
        id={id}
        accept={accept}
        onChange={handleChange}
      />
    </>
  );
};

export default InputFile;
