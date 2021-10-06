import React from "react";
import { FaPen } from "react-icons/fa";
import ReactiveButton from "reactive-button";
import InputFile from "../Shared/InputFile/InputFile";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";

const ModalUbahFotoProfil = ({ formData, onSubmit, changeFoto }) => {
  return (
    <>
      <NewModal
        modalId="modalUbahFotoProfil"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Ubah Foto</h4>
            {/* <span className="fs-6 fw-normal">
              Dibawah ini adalah keterangan yang diberikan untuk siswa
            </span> */}
          </>
        }
        content={
          <>
            <div className="d-flex justify-content-center">
              <div
                className="position-relative img-fluid"
                style={{ width: "175px", height: "240px" }}
              >
                <img
                  src={formData.avatar || "/img/cover-sma-smk.svg"}
                  alt="cover-foto-rapor"
                  className="img-fluid img-fit-cover rounded-ss"
                  style={{ width: "175px", height: "240px" }}
                />
                <label
                  htmlFor="avatar"
                  className="rounded-circle bg-primary d-flex justify-content-center align-items-center text-white position-absolute pointer"
                  style={{
                    width: "40px",
                    height: "40px",
                    top: "10px",
                    right: "10px",
                    boxShadow: "0 5px 15px rgba(58,65,102,.2)",
                  }}
                >
                  <FaPen className="fs-5" />
                </label>
                <InputFile name="avatar" id="avatar" onChange={changeFoto} />
              </div>
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={formData.button}
            color={"primary"}
            idleText={"Ubah Foto"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            data-bs-dismiss="modal"
            className={"btn btn-primary"}
            onClick={() => onSubmit()}
          />
        }
      />
    </>
  );
};

export default ModalUbahFotoProfil;
