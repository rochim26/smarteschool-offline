import Editor from "../Shared/Editor/Editor";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const SectionSejarahSekolah = ({
  formData,
  handleChangeForm,
  setButtonState,
}) => {
  return (
    <>
      <div
        className="card-body px-4 pt-4 pb-0 mb-5"
        data-joyride="sejarah-sekolah"
      >
        <h4 className="fw-extrabold color-dark title-border mb-5">
          Sejarah Sekolah
        </h4>
        <div className="mb-4" data-joyride="form-sejarah">
          <label htmlFor="#sejarah" className="form-label">
            Sejarah
          </label>
          <Editor id="sejarah" defaultValue={formData?.sejarah} />
        </div>
        <div className="row">
          <div className="col-md-5" data-joyride="foto-sejarah-sekolah">
            <UploadBanner
              label="Foto Sejarah Sekolah"
              accept="image/*"
              id="uploadFotoSejarahSekolah"
              name="fotoSejarah"
              titleUnggahan="Foto"
              titleRasio="3 : 2"
              preview={formData.fotoSejarah}
              onUpload={(onUpload) =>
                setButtonState(onUpload ? "loading" : "idle")
              }
              onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
            />
          </div>
        </div>
      </div>
      <div className="px-4 mb-5">
        <hr className="m-0" />
      </div>
    </>
  );
};

export default SectionSejarahSekolah;
