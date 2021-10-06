import Editor from "../Shared/Editor/Editor";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const SectionDeskripsiJurusan = ({
  formData,
  handleChangeForm,
  setButtonState,
}) => {
  return (
    <>
      <div
        className="card-body px-4 pt-4 pb-0 mb-5"
        data-joyride="deskripsi-jurusan"
      >
        <h4 className="fw-extrabold color-dark title-border mb-5">
          Deskripsi Jurusan
        </h4>
        <div className="mb-4" data-joyride="form-deskripsi">
          <label htmlFor="#editorDeskripsiJurusan" className="form-label">
            Deskripsi
          </label>
          <Editor id="deskripsi" />
        </div>
        <UploadBanner
          label="Foto Cover Jurusan"
          titleUnggahan="Foto"
          accept="image/*"
          id="uploadBannerDeskripsiJurusan"
          name="cover"
          preview={formData.cover}
          onUpload={(onUpload) => setButtonState(onUpload ? "loading" : "idle")}
          onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
          dataJoyride="foto-cover-jurusan"
        />
      </div>
      <div className="px-4 mb-5">
        <hr className="m-0" />
      </div>
    </>
  );
};

export default SectionDeskripsiJurusan;
