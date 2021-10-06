import React from "react";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import { TwitterPicker } from "react-color";

const ModalKategori = ({ handleChangeForm, formData, _postKategori }) => {
  return (
    <NewModal
      modalSize="md"
      modalId="modalBuatKategori"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            {formData?.idKategori ? "Edit" : "Buat"} Kategori
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk{" "}
            {formData?.idKategori ? "mengedit" : "membuat"} kategori
          </span>
        </>
      }
      content={
        <>
          <div className="mb-4">
            <label className="form-label">Nama Kategori</label>
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              placeholder="Contoh : Sedang Dikerjakan"
              value={formData?.namaKategori}
              name="namaKategori"
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Warna</label>
            <TwitterPicker
              color={formData?.warna ? formData?.warna : ""}
              triangle="hide"
              className="w-100"
              onChange={(color) => {
                handleChangeForm({
                  target: { name: "warna", value: color.hex },
                });
              }}
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
          onClick={_postKategori}
        />
      }
    />
  );
};

export default ModalKategori;
