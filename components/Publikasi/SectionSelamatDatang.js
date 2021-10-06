import TextareaAutosize from "react-textarea-autosize";
import Editor from "../Shared/Editor/Editor";

const SectionSelamatDatang = ({ formData }) => {
  return (
    <div className="px-4" data-joyride="section-selamat-datang">
      <h4 className="fw-extrabold color-dark title-border mb-5">
        Section Selamat Datang
      </h4>
      <div>
        <div className="mb-4" data-joyride="deskripsi-singkat-sekolah">
          <label className="form-label">Deskripsi Singkat Sekolah</label>
          <Editor defaultValue={formData?.deskripsiSingkat} id="deskripsi" />
        </div>
        <div className="row">
          <div className="col-md-6 mb-md-0 mb-4" data-joyride="visi-sekolah">
            <label className="form-label">Visi Sekolah</label>
            <Editor defaultValue={formData?.visi} id="visi" />
          </div>
          <div className="col-md-6" data-joyride="misi-sekolah">
            <label className="form-label">Misi Sekolah</label>
            <Editor defaultValue={formData?.misi} id="misi" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionSelamatDatang;
