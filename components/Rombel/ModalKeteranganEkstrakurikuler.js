import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const ModalKeteranganEkstrakurikuler = ({
  handleChangeForm,
  formData,
  _postRaporEkskul,
}) => {
  return (
    <>
      <NewModal
        modalId="modalKeteranganEkstrakurikuler"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Ekstrakurikuler Rapor</h4>
            <span className="fs-6 fw-normal">
              Dibawah ini adalah keterangan yang diberikan untuk siswa
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Keterangan Siswa</label>
              <TextareaAutosize
                className="form-control"
                autoComplete="off"
                style={{
                  resize: "none",
                  width: "100%",
                }}
                placeholder="Tuliskan catatan untuk siswa"
                minRows={3}
                name="keterangan"
                value={formData.keterangan}
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
            onClick={() => _postRaporEkskul()}
          />
        }
      />
    </>
  );
};

export default ModalKeteranganEkstrakurikuler;
