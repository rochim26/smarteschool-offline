import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { postBentukPelanggaran, updateBentukPelanggaran } from "../../../client/TataTertibClient";
import { hideModal } from "../../../utilities/ModalUtils";
import Editor from "../../Shared/Editor/Editor";
import NewModal from "../../Shared/NewModal/NewModal";
import UploadPhoto from "../../Shared/UploadPhoto.js/UploadPhoto";

const initialFormData = {
  nama: "",
  poin: ""
}

const ModalTambahBentukPelanggaran = ({ editData=null, _getDetailPelanggaran, pelanggaranId }) => {

  console.log("editData", editData);

  const [formData, setFormData] = useState(initialFormData);

  const handleChangeForm = (e) => {
    if (!e.target.validity.valid) return;

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { data } = editData ? await updateBentukPelanggaran(formData, editData.id) : await postBentukPelanggaran(formData, pelanggaranId);
    if (data) {
      toast.success(data?.message);
      hideModal("ModalTambahBentukPelanggaran");
      _getDetailPelanggaran();
    }
  }

  useEffect(() => {
    if (editData) {
      setFormData({ nama: editData.nama, poin: editData.poin });
    } else {
      setFormData(initialFormData);
    }
  }, [editData]);

  return (
    <>
      <NewModal
        modalId="ModalTambahBentukPelanggaran"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">{editData ? "Ubah" : "Tambah"} Bentuk Pelanggaran</h4>
            <span className="fs-14-ss fw-normal">
              Isi informasi dibawah ini untuk menambah bentuk pelanggaran
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Bentuk Pelanggaran</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Contoh: Terlambat"
                type="text"
                name="nama"
                value={formData?.nama}
                onChange={handleChangeForm}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Poin</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Contoh: 10"
                type="tel"
                name="poin"
                pattern="[0-9]*"
                value={formData?.poin}
                onInput={handleChangeForm}
              />
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={"idle"}
            color={"primary"}
            idleText={`${editData ? "Ubah" : "Tambah"} Bentuk`}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            data-bs-dismiss="modal"
            className={"btn btn-primary"}
            onClick={handleSubmit}
          />
        }
      />
    </>
  );
};

export default ModalTambahBentukPelanggaran;
