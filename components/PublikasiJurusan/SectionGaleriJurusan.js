import { FaPlus } from "react-icons/fa";
import UploadPhoto from "../Shared/UploadPhoto.js/UploadPhoto";

const SectionGaleriJurusan = ({
  formData,
  handleChangeForm,
  setButtonState,
}) => {
  return (
    <>
      <div
        className="card-body px-4 pt-4 pb-0 mb-5"
        data-joyride="galeri-jurusan"
      >
        <h4 className="fw-extrabold color-dark title-border mb-5">
          Galeri Jurusan
        </h4>
        <div>
          <div className="row">
            <UploadPhoto
              name="galeri"
              id="uploadPhotoGaleriJurusan"
              label="Foto Foto Jurusan"
              listPhoto={formData.galeri}
              onUpload={(onUpload) =>
                setButtonState(onUpload ? "loading" : "idle")
              }
              onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionGaleriJurusan;
