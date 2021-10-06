import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import { postSurel } from "../../client/SurelClient";
import Editor from "../Shared/Editor/Editor";
import NewModal from "../Shared/NewModal/NewModal";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const ModalTulisSurel = ({
  handleChangeForm,
  formData,
  _postSurel,
  editData,
}) => {
  return (
    <>
      <NewModal
        modalId="modalTulisSurel"
        isSurel={true}
        _postSurel={_postSurel}
        modalSize="lg"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Tulis Surel Baru</h4>
            <span className="fs-6 fw-normal"></span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Nama</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan nama penerima pesan"
                type="text"
                name="nama"
                value={formData?.nama}
                onChange={handleChangeForm}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Alamat Email</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="email@gmail.com"
                type="text"
                name="email"
                value={formData?.email}
                onChange={handleChangeForm}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Perihal</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Contoh : Undangan Rapat"
                type="text"
                name="perihal"
                value={formData?.perihal}
                onChange={handleChangeForm}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Pesan</label>
              <Editor
                id="isi"
                name="isi"
                defaultValue={formData?.isi}
                onChange={handleChangeForm}
              />
            </div>
          </>
        }
        // submitButton={
        //   <ReactiveButton
        //     // buttonState={formData.btnBio}
        //     color={"primary"}
        //     idleText={"Kirim"}
        //     loadingText={"Diproses"}
        //     successText={"Berhasil"}
        //     errorText={"Gagal"}
        //     type={"button"}
        //     data-bs-dismiss="modal"
        //     className={"btn btn-primary"}
        //     onClick={() => _postSurel()}
        //   />
        // }
      />
    </>
  );
};

export default ModalTulisSurel;
