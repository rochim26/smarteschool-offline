import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const SectionBannerHalamanJurusan = ({
  formData,
  handleChangeForm,
  setButtonState,
}) => {
  return (
    <>
      <div
        className="card-body px-4 pt-4 pb-0 mb-5"
        data-joyride="section-banner-halaman-jurusan"
      >
        <h4 className="fw-extrabold color-dark title-border mb-5">
          Banner Halaman Jurusan
        </h4>
        <UploadBanner
          accept="image/*"
          id="uploadBannerJurusan"
          name="banner"
          titleUkuran="1366 x 768"
          preview={formData.banner}
          onUpload={(onUpload) => setButtonState(onUpload ? "loading" : "idle")}
          onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
          dataJoyride="banner-halaman-jurusan"
        />
      </div>
      <div className="px-4 mb-5">
        <hr className="m-0" />
      </div>
    </>
  );
};

export default SectionBannerHalamanJurusan;
