import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const ModalTambahArsip = ({ handleChangeForm, formData, _postArsip }) => {
  return (
    <>
      <NewModal
        modalId="modalTambahArsip"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Judul Folder</h4>
            {/* <span className="fs-6 fw-normal">
              Dibawah ini adalah keterangan yang diberikan untuk siswa
            </span> */}
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Nama Folder Arsip</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Contoh : Folder Edaran"
                type="text"
                name="nama"
                value={formData?.nama}
                onChange={handleChangeForm}
              />
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={formData.btnBio}
            color={"primary"}
            idleText={"Tambah Folder"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            data-bs-dismiss="modal"
            className={"btn btn-primary"}
            onClick={() => _postArsip()}
          />
        }
      />
    </>
  );
};

export default ModalTambahArsip;
