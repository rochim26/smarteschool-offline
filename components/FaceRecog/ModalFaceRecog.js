import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";
import UploadPhoto from "../Shared/UploadPhoto.js/UploadPhoto";

const ModalFaceRecog = ({ handleChangeForm, formData, _postFace }) => {
  return (
    <>
      <NewModal
        modalId="modalFaceRecog"
        modalSize="lg"
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
            <div className="mb-4" data-joyride="foto-tentang-sekolah">
              <UploadPhoto
                name={`mukaSiswa${formData.nama}`}
                id="uploadFotoMukaSiswa"
                label="Foto Tentang Sekolah"
                listPhoto={formData?.photos}
                onUpload={(onUpload) =>
                  setButtonState(onUpload ? "loading" : "idle")
                }
                onChange={(e, uploadedFile) =>
                  handleChangeForm(e, uploadedFile)
                }
              />
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            // buttonState={formData.btnBio}
            color={"primary"}
            idleText={"Simpan"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            data-bs-dismiss="modal"
            className={"btn btn-primary"}
            onClick={() => _postFace()}
          />
        }
      />
    </>
  );
};

export default ModalFaceRecog;
