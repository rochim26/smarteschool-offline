import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { postPenghargaan, updatePenghargaan } from "../../../client/TataTertibClient";
import { hideModal } from "../../../utilities/ModalUtils";
import NewModal from "../../Shared/NewModal/NewModal";

const initialFormData = {
  poin: "",
  tingkat: ""
}

const ModalTambahPoinPenghargaan = ({ editData, _getPenghargaan }) => {

  const [formData, setFormData] = useState(initialFormData);

  const handleChangeForm = (e) => {
    if (!e.target.validity.valid) return;

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { data } = editData ? await updatePenghargaan(formData, editData.id) : await postPenghargaan(formData);
    if (data) {
      toast.success(data?.message);
      hideModal("ModalTambahPoinPenghargaan");
      _getPenghargaan();
    }
  }

  useEffect(() => {
    if (editData) {
      setFormData({ poin: editData.poin, tingkat: editData.tingkat });
    } else {
      setFormData(initialFormData);
    }
  }, [editData]);

  return (
    <>
      <NewModal
        modalId="ModalTambahPoinPenghargaan"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">{editData ? "Ubah" : "Tambah"} Poin Penghargaan</h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah ini untuk menambah penghargaan
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Tingkat Prestasi</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Contoh: Nasional"
                type="text"
                name="tingkat"
                value={formData?.tingkat}
                onChange={handleChangeForm}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Poin Penghargaan</label>
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
            idleText={`${editData ? "Ubah" : "Tambah"} Poin Penghargaan`}
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

export default ModalTambahPoinPenghargaan;
