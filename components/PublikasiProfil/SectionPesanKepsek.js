import Editor from "../Shared/Editor/Editor";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const SectionPesanKepsek = ({ formData, handleChangeForm, setButtonState }) => {
  return (
    <>
      <div
        className="card-body px-4 pt-4 pb-0 mb-5"
        data-joyride="pesan-kepsek"
      >
        <h4 className="fw-extrabold color-dark title-border mb-5">
          Pesan Kepala Sekolah
        </h4>
        <div className="mb-4" data-joyride="pesan">
          <label htmlFor="#pesanKepsek" className="form-label">
            Pesan
          </label>
          <Editor id="pesanKepsek" />
        </div>
        <div className="row">
          <div className="col-md-5" data-joyride="foto-pesan-kepsek">
            <UploadBanner
              label="Foto Kepala Sekolah"
              accept="image/*"
              id="uploadFotoKepsek"
              name="fotoKepsek"
              titleUnggahan="Foto"
              titleRasio="3 : 2"
              preview={formData.fotoKepsek}
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

export default SectionPesanKepsek;
