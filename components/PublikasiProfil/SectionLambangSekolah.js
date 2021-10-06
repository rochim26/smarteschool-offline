import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const SectionLambangSekolah = ({
  formData,
  handleChangeForm,
  setButtonState,
}) => {
  return (
    <>
      <div
        className="card-body px-4 pt-4 pb-0 mb-5"
        data-joyride="lambang-sekolah"
      >
        <h4 className="fw-extrabold color-dark title-border mb-5">
          Lambang Sekolah
        </h4>
        <div className="row">
          <div className="col-md-4" data-joyride="foto-lambang-sekolah">
            <UploadBanner
              label="Foto Lambang Sekolah"
              accept="image/*"
              id="uploadFotoLambangSekolah"
              name="fotoLogo"
              titleUnggahan="Foto Lambang Sekolah"
              titleRasio="3 : 2"
              preview={formData.fotoLogo}
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

export default SectionLambangSekolah;
