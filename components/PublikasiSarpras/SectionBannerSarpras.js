import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const SectionBannerSarpras = ({
  formData,
  handleChangeForm,
  setButtonState,
}) => {
  return (
    <>
      <div
        className="card-body px-4 pt-4 pb-0 mb-5"
        data-joyride="section-banner-halaman-sarpras"
      >
        <h4 className="fw-extrabold color-dark title-border mb-5">
          Banner Halaman Sarpras
        </h4>
        <UploadBanner
          accept="image/*"
          id="bannerSarpras"
          name="bannerSarpras"
          preview={formData.bannerSarpras}
          onUpload={(onUpload) => setButtonState(onUpload ? "loading" : "idle")}
          onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
          dataJoyride="banner-halaman-sarpras"
        />
      </div>
      <div className="px-4 mb-5">
        <hr className="m-0" />
      </div>
    </>
  );
};

export default SectionBannerSarpras;
