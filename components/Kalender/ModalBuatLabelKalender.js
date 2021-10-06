import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const CustomSelect = (props) => {
  console.log("props", props);
  return (
    <div>
      asd
    </div>
  )
}

const ModalBuatLabelKalender = () => {
  return (
    <>
      <NewModal
        modalId="ModalBuatLabelKalender"
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
              <label className="form-label">Label</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="nama"
                placeholder="Masukkan nama label"
                // value={formData[index].nama}
                // onChange={handleChangeInput}
              />
            </div>
            <div className="mb-5">
              <label className="form-label">Warna</label>
              <SelectShared
                name="kelulusan"
                placeholder="Pilih Warna"
                customSelect={(props) => <CustomSelect {...props} />}
                // handleChangeSelect={handleChangeSelect}
                // value={formData.kelulusan}
                // options={keteranganKelulusanData}
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
            // onClick={() => _postProfilUser()}
          />
        }
      />
    </>
  );
};

export default ModalBuatLabelKalender;
