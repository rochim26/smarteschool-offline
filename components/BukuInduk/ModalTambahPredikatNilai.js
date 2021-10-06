import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const ModalTambahPredikatNilai = ({
  handleChangeForm,
  formData,
  _postPredikatNilai,
  editData,
}) => {
  return (
    <>
      <NewModal
        modalId="modalTambahPredikatNilai"
        modalSize="lg"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Tambah Predikat Nilai</h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah untuk menambah predikat
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Predikat</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Contoh : A"
                type="text"
                name="predikat"
                value={formData?.predikat}
                onChange={handleChangeForm}
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label">Batas Bawah Pengetahuan</label>
                  <input
                    className="form-control"
                    autoComplete="off"
                    placeholder="Contoh : 86"
                    type="text"
                    name="bbPengetahuan"
                    value={formData?.bbPengetahuan}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label">Batas Atas Pengetahuan</label>
                  <input
                    className="form-control"
                    autoComplete="off"
                    placeholder="Contoh : 100"
                    type="text"
                    name="baPengetahuan"
                    value={formData?.baPengetahuan}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label">Batas Bawah Keterampilan</label>
                  <input
                    className="form-control"
                    autoComplete="off"
                    placeholder="Contoh : 86"
                    type="text"
                    name="bbKeterampilan"
                    value={formData?.bbKeterampilan}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label">Batas Atas Keterampilan</label>
                  <input
                    className="form-control"
                    autoComplete="off"
                    placeholder="Contoh : 100"
                    type="text"
                    name="baKeterampilan"
                    value={formData?.baKeterampilan}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Sikap</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Contoh : Sangat Baik"
                type="text"
                name="sikap"
                value={formData?.sikap}
                onChange={handleChangeForm}
              />
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={formData.btnBio}
            color={"primary"}
            idleText={"Simpan"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            data-bs-dismiss="modal"
            className={"btn btn-primary"}
            onClick={() => _postPredikatNilai()}
          />
        }
      />
    </>
  );
};

export default ModalTambahPredikatNilai;
