import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const ModalTambahMateriRekap = ({
  handleChangeForm,
  formData,
  _postRekap,
  editData,
}) => {
  return (
    <>
      <NewModal
        modalId="modalTambahMateriRekap"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Judul Materi</h4>
            {/* <span className="fs-6 fw-normal">
              Dibawah ini adalah keterangan yang diberikan untuk siswa
            </span> */}
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Judul</label>
              <TextareaAutosize
                className="form-control"
                autoComplete="off"
                style={{
                  resize: "none",
                  width: "100%",
                }}
                placeholder="Judul Materi"
                minRows={3}
                name="judul"
                value={formData.judul}
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
            onClick={() => _postRekap()}
          />
        }
      />
    </>
  );
};

export default ModalTambahMateriRekap;
