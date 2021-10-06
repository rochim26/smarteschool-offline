import { FaPlus } from "react-icons/fa";
import Editor from "../Shared/Editor/Editor";
import UploadPhoto from "../Shared/UploadPhoto.js/UploadPhoto";

const SectionTentangSekolah = ({
  formData,
  handleChangeForm,
  setButtonState,
}) => {
  return (
    <>
      <div
        className="card-body px-4 pt-4 pb-0 mb-5"
        data-joyride="tentang-sekolah"
      >
        <h4 className="fw-extrabold color-dark title-border mb-5">
          Tentang Sekolah
        </h4>
        <div className="mb-4" data-joyride="deskripsi-sekolah">
          <label htmlFor="#deskripsiSekolah" className="form-label">
            Deskripsi Sekolah
          </label>
          <Editor
            id="deskripsiSekolah"
            defaultValue={formData?.deskripsiSekolah}
          />
        </div>
        <div className="mb-4" data-joyride="foto-tentang-sekolah">
          <UploadPhoto
            name="fotoTentangSekolah"
            id="uploadPhotoTentangSekolah"
            label="Foto Tentang Sekolah"
            listPhoto={formData?.fotoTentangSekolah}
            onUpload={(onUpload) =>
              setButtonState(onUpload ? "loading" : "idle")
            }
            onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
          />
        </div>
      </div>
      <div className="px-4 mb-5">
        <hr className="m-0" />
      </div>
    </>
  );
};

export default SectionTentangSekolah;
