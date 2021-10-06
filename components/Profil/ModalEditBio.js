import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const ModalEditBio = ({ handleChangeForm, formData, _postProfilUser }) => {
  return (
    <>
      <NewModal
        modalId="modalEditBio"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Edit Bio</h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah untuk mengubah bio
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Detail Bio</label>
              <TextareaAutosize
                className="form-control"
                autoComplete="off"
                style={{
                  resize: "none",
                  width: "100%",
                }}
                placeholder="Tuliskan Bio Anda"
                minRows={3}
                name="bio"
                value={formData.bio}
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
            onClick={() => _postProfilUser()}
          />
        }
      />
    </>
  );
};

export default ModalEditBio;
