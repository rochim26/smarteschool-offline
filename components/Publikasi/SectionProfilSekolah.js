import { FaLink, FaPaperclip } from "react-icons/fa";
import EmptyStateFile from "../Shared/EmptyState/EmptyStateFile";
import InputFile from "../Shared/InputFile/InputFile";
import ModalTautanLink from "../Shared/ModalTautanLink/ModalTautanLink";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";
import VideoPlayer from "../Shared/VideoPlayer/VideoPlayer";

const SectionProfilSekolah = ({
  formData,
  setFormData,
  handleChangeForm,
  setButtonState,
}) => {
  const handleChangeInputFile = async (e, data) => {
    if (data) {
      handleChangeForm(e, data);
    }
  };

  const removeVideo = () => {
    setFormData({
      ...formData,
      videoProfil: "",
    });
  };

  return (
    <div className="px-4" data-joyride="section-profil-sekolah">
      <h4 className="fw-extrabold color-dark title-border mb-5">
        Section Profil Sekolah
      </h4>
      <div>
        <div className="row">
          <div className="col-md-6" data-joyride="thumbnail-video">
            <UploadBanner
              accept="image/*"
              id="thumbnailProfil"
              name="thumbnailProfil"
              label="Thumbnail Video"
              titleUnggahan="Foto Thumbnail"
              titleUkuran="300 x 250"
              preview={formData.thumbnailProfil}
              onUpload={(onUpload) =>
                setButtonState(onUpload ? "loading" : "idle")
              }
              onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
            />
          </div>
          <div className="col-md-6" data-joyride="video-profil">
            <div className="d-flex justify-content-between align-items-lg-start mb-4 flex-lg-row flex-column flex-wrap">
              <p className="form-label mb-3">Video</p>
              <div className="d-flex align-items-md-center flex-md-row flex-column justify-content-between mt-xl-0 mt-md-2 mt-3">
                <label
                  htmlFor="formVideoProfil"
                  className="d-flex align-items-center justify-content-center form-label m-0 fs-6 btn btn-ss fs-14-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-lg-3 fw-bold mb-md-0 mb-3"
                >
                  <FaPaperclip className="me-2" />
                  <p className="mb-0">Unggah File</p>
                </label>
                <InputFile
                  accept="video/*"
                  name="videoProfil"
                  id="formVideoProfil"
                  onChange={handleChangeInputFile}
                />
                <button
                  type="button"
                  className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fs-14-ss fw-bold"
                  data-bs-toggle="modal"
                  data-bs-target="#modalTautanLinkPublikasi"
                >
                  <FaLink className="me-2" />
                  Tautan Link
                </button>
              </div>
            </div>
            {formData.videoProfil && (
              <VideoPlayer
                name="videoProfil"
                src={formData.videoProfil}
                onClickHapus={removeVideo}
                getEditData={(e, videoUrl) => handleChangeForm(e, videoUrl)}
              />
            )}
            {!formData.videoProfil && <EmptyStateFile type="video" />}
          </div>
        </div>
      </div>
      <ModalTautanLink
        toastMessage="Video berhasil ditambahkan"
        name="videoProfil"
        modalId="modalTautanLinkPublikasi"
        defaultValue={formData.videoProfil}
        getLink={(e, link) => handleChangeForm(e, link)}
      />
    </div>
  );
};

export default SectionProfilSekolah;
