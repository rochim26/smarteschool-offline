import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { postKategoriPelanggaran, updateKategoriPelanggaran } from "../../../client/TataTertibClient";
import { hideModal } from "../../../utilities/ModalUtils";
import NewModal from "../../Shared/NewModal/NewModal";

const ModalTambahKategoriPelanggaran = ({ editData=null, _getKategoriPelanggaran }) => {

  console.log("editData", editData);

  const [formData, setFormData] = useState({ nama: "" });

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { data } = editData ? await updateKategoriPelanggaran(formData, editData.id) : await postKategoriPelanggaran(formData);
    if (data) {
      toast.success(data?.message);
      hideModal("ModalTambahKategoriPelanggaran");
      _getKategoriPelanggaran();
    }
  }

  useEffect(() => {
    setFormData({ nama: editData ? editData.nama : "" })
  }, [editData]);

  return (
    <>
      <NewModal
        modalId="ModalTambahKategoriPelanggaran"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">{editData ? "Ubah" : "Tambah"} Kategori Pelanggaran</h4>
            <span className="fs-14-ss fw-normal">
              Isi informasi dibawah ini untuk menambah kategori pelanggaran
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Kategori Pelanggaran</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Contoh: Kedisiplinan"
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
            buttonState={"idle"}
            color={"primary"}
            idleText={`${editData ? "Ubah" : "Tambah"} Kategori`}
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

export default ModalTambahKategoriPelanggaran;
