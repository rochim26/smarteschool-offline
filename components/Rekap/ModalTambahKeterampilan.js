import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";
import TeknikKeterampilanData from "../../data/teknikketerampilan.json";

import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const ModalTambahKeterampilan = ({
  handleChangeForm,
  handleChangeSelect,
  formData,
  _postRekap,
}) => {
  return (
    <>
      <NewModal
        modalId="modalTambahKeterampilan"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Nama Keterampilan</h4>
            <span className="fs-6 fw-normal">
              Dibawah ini adalah keterangan yang diberikan untuk siswa
            </span>
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
                placeholder="Nama Keterampilan"
                minRows={3}
                name="judul"
                value={formData.judul}
                onChange={handleChangeForm}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Teknik Penilaian</label>
              <SelectShared
                name="teknik"
                handleChangeSelect={handleChangeSelect}
                value={formData.teknik}
                options={TeknikKeterampilanData}
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

export default ModalTambahKeterampilan;
