import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const SectionBannerKegiatan = ({
  formData,
  handleChangeForm,
  kegiatanNama,
}) => {
  return (
    <>
      <div
        className="card-body px-4 pt-4 pb-0 mb-5"
        data-joyride="section-banner-halaman-kegiatan"
      >
        <h4 className="fw-extrabold color-dark title-border mb-5">
          Banner Halaman {kegiatanNama}
        </h4>
        <UploadBanner
          accept="image/*"
          id="uploadBannerHalamanEkskul"
          name="banner"
          preview={formData.banner}
          onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
          dataJoyride="banner-halaman-kegiatan"
        />
      </div>
      <div className="px-4 mb-5">
        <hr className="m-0" />
      </div>
    </>
  );
};

export default SectionBannerKegiatan;
