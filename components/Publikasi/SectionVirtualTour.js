import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const SectionVirtualTour = ({ formData, handleChangeForm, setButtonState }) => {
  return (
    <div className="px-4" data-joride="section-virtual-tour">
      <h4 className="fw-extrabold color-dark title-border mb-5">
        Section Jelajah Sekolah
      </h4>
      <div>
        <UploadBanner
          accept="image/*"
          label="Banner"
          id="backgroundSectionVirtualTour"
          name="backgroundSectionVirtualTour"
          titleUnggahan="Foto Banner"
          titleUkuran="1366 x 385"
          preview={formData.backgroundSectionVirtualTour}
          onUpload={(onUpload) => setButtonState(onUpload ? "loading" : "idle")}
          onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
          dataJoyride="banner-virtual-tour"
        />
        <div className="mt-4" data-joyride="link-virtual-tour">
          <label htmlFor="link-virtual-tour" className="form-label">
            Link Jelajah Sekolah
          </label>
          <input
            className="form-control"
            autoComplete="off"
            id="link-virtual-tour"
            placeholder="Masukkan link Jelajah Sekolah"
            name="virtualTour"
            onChange={handleChangeForm}
            value={formData.virtualTour}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionVirtualTour;
