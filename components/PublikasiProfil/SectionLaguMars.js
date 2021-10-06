import { FaLink, FaPaperclip } from "react-icons/fa";
import AudioPlayer from "../Shared/AudioPlayer/AudioPlayer";
import Editor from "../Shared/Editor/Editor";
import EmptyStateFile from "../Shared/EmptyState/EmptyStateFile";
import InputFile from "../Shared/InputFile/InputFile";
import ModalTautanLink from "../Shared/ModalTautanLink/ModalTautanLink";

const SectionLaguMars = ({ formData, handleChangeForm, setButtonState }) => {
  const handleChangeInputFile = async (e, data) => {
    if (data) {
      handleChangeForm(e, data);
    }
  };

  return (
    <>
      <div
        className="card-body px-4 pt-4 pb-0 mb-5"
        data-joyride="lagu-mars-sekolah"
      >
        <h4 className="fw-extrabold color-dark title-border mb-5">
          Lagu Mars Sekolah
        </h4>
        <div className="mb-4" data-joyride="file-lagu-mars">
          <div className="d-flex justify-content-between align-items-sm-center flex-sm-row flex-column mb-3">
            <h6 className="color-dark fw-bold fs-18-ss">File Lagu Mars</h6>
            <div className="d-flex align-items-sm-center flex-sm-row flex-column">
              <label
                htmlFor="uploadLaguMars"
                className="d-flex align-items-center justify-content-center form-label m-0 fs-12-ss fw-bold btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-sm-3 mb-sm-0 mb-3"
              >
                <FaPaperclip className="me-2" />
                <p className="mb-0">Unggah File</p>
              </label>
              <InputFile
                name="laguMars"
                id="uploadLaguMars"
                accept="audio/"
                onChange={handleChangeInputFile}
              />
              <button
                type="button"
                className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fs-12-ss fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#modalTautanLinkLaguMars"
              >
                <FaLink className="me-2" />
                Tautan Link
              </button>
            </div>
          </div>
          {!formData.laguMars && <EmptyStateFile type="music" />}
          {formData.laguMars && <AudioPlayer src={formData.laguMars} />}
        </div>

        <div className="mb-4" data-joyride="lirik-lagu-mars">
          <label htmlFor="#lirikMars" className="form-label">
            Lirik Lagu Mars
          </label>
          <Editor id="lirikMars" defaultValue={formData?.lirikMars} />
        </div>
      </div>
      <div className="px-4 mb-5">
        <hr className="m-0" />
      </div>
      <ModalTautanLink
        toastMessage="Link berhasil ditambahkan"
        name="laguMars"
        modalId="modalTautanLinkLaguMars"
        defaultValue={formData.laguMars}
        getLink={(e, link) => handleChangeForm(e, link)}
      />
    </>
  );
};

export default SectionLaguMars;
