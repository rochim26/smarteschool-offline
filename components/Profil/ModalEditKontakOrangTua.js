import React, { useState } from "react";
import { toast } from "react-toastify";
import { postProfilUser } from "../../client/AuthClient";
import { hideModal } from "../../utilities/ModalUtils";

import NewModal from "../Shared/NewModal/NewModal";
import ReactiveButton from "reactive-button";
import useUser from "../../hooks/useUser";

const ModalEditKontakOrangTua = ({}) => {
  const { user, setUser } = useUser();

  const [formData, setFormData] = useState({
    namaAyah: user?.profil?.namaAyah,
    namaIbu: user?.profil?.namaIbu,
    telpAyah: user?.profil?.telpAyah,
    telpIbu: user?.profil?.telpIbu,
  });
  const [buttonState, setButtonState] = useState("idle");

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setButtonState("loading");
    const { data, error } = await postProfilUser(formData);
    if (data) {
      setButtonState("success");
      hideModal("modalEditKontakOrangTua");
      toast.success(data?.message);
      setUser({ ...user, profil: { ...user?.profil, ...formData } });
    } else {
      setButtonState("error");
      toast.error(error?.message);
    }
  };

  return (
    <>
      <NewModal
        modalId="modalEditKontakOrangTua"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Edit Kontak Orang Tua / Wali</h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah untuk mengubah kontak orang tua / wali
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Nama Ayah</label>
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                value={formData?.namaAyah}
                name="namaAyah"
                onChange={handleChangeForm}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Nomor Whatsapp</label>
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                value={formData?.telpAyah}
                name="telpAyah"
                onChange={handleChangeForm}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Nama Ibu</label>
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                value={formData?.namaIbu}
                name="namaIbu"
                onChange={handleChangeForm}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Nomor Whatsapp</label>
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                value={formData?.telpIbu}
                name="telpIbu"
                onChange={handleChangeForm}
              />
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={buttonState}
            color={"primary"}
            idleText={"Simpan"}
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

export default ModalEditKontakOrangTua;
