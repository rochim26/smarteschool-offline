import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";

const ModalEditTemplateDeskripsi = ({
  handleChangeForm,
  formData,
  handleSubmit,
  tipe,
}) => {
  return (
    <>
      <NewModal
        modalId="modalEditTemplateDeskripsi"
        modalSize="lg"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Edit Template Deskripsi</h4>
            {/* <span className="fs-6 fw-normal">
              Dibawah ini adalah keterangan yang diberikan untuk siswa
            </span> */}
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">
                Deskripsi {tipe ? "Materi" : "Sikap"} Sangat Baik
              </label>
              <TextareaAutosize
                className="form-control"
                autoComplete="off"
                style={{
                  resize: "none",
                  width: "100%",
                }}
                placeholder="Prolog"
                minRows={2}
                name="prolog"
                value={formData.prolog}
                onChange={handleChangeForm}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">
                Deskripsi Materi Perlu Ditingkatkan
              </label>
              <TextareaAutosize
                className="form-control"
                autoComplete="off"
                style={{
                  resize: "none",
                  width: "100%",
                }}
                placeholder="Epilog"
                minRows={2}
                name="epilog"
                value={formData.epilog}
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
            onClick={() => handleSubmit()}
          />
        }
      />
    </>
  );
};

export default ModalEditTemplateDeskripsi;
