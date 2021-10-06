import React, { useEffect, useState } from "react";
import ReactiveButton from "reactive-button";
import { postBabPeraturan, updateBabPeraturan } from "../../../client/TataTertibClient";
import { toast } from "react-toastify";
import NewModal from "../../Shared/NewModal/NewModal";
import { hideModal } from "../../../utilities/ModalUtils";

const ModalTambahBabPeraturan = ({ editData, _getBabPeraturan }) => {

  const [formData, setFormData] = useState({ nama: "" });

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { data } = editData ? await updateBabPeraturan(formData, editData.id) : await postBabPeraturan(formData);
    if (data) {
      toast.success(data?.message);
      _getBabPeraturan();
      hideModal("ModalTambahBabPeraturan");
    }
  }

  useEffect(() => {
    if (editData !== null) {
      setFormData({ nama: editData.nama });
    } else {
      setFormData({ nama: "" });
    }
  }, [editData]);

  return (
    <>
      <NewModal
        modalId="ModalTambahBabPeraturan"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">{`${editData ? "Ubah" : "Tambah"} Bab`}</h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah ini untuk membuat bab
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Nama Bab</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan nama bab"
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
            idleText={`${editData ? "Ubah" : "Tambah"} Bab`}
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

export default ModalTambahBabPeraturan;
