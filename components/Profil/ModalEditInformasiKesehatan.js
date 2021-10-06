import { DatePicker } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { postProfilUser } from "../../client/AuthClient";
import { ssURL } from "../../client/clientAxios";
import useUser from "../../hooks/useUser";
import { hideModal } from "../../utilities/ModalUtils";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const ModalEditInformasiKesehatan = () => {

  const { user, setUser } = useUser();

  const [formData, setFormData] = useState({
    tb: user?.profil?.tb,
    bb: user?.profil?.bb,
    golDarah: user?.profil?.golDarah,
    butaWarna: (user?.profil?.butaWarna === 1),
    kacamata: (user?.profil?.kacamata !== "0"),
    disabilitas: (user?.profil?.disabilitas === "1"),
    suratKeteranganButaWarna: user?.profil?.suratKeteranganButaWarna,
    suratKeteranganSehat: user?.profil?.suratKeteranganSehat
  });
  const [buttonState, setButtonState] = useState("idle");

  const showLampiranTidakButaWarna = !formData.butaWarna;
  const showKeteranganKacamata = formData.kacamata;
  const showLampiranKeteranganSehat = !formData.disabilitas

  const handleChangeForm = (e, uploadedFile) => {
    setFormData({
      ...formData,
      [e.target.name]: uploadedFile || e.target.value,
    });
  }

  const handleSubmit = async () => {
    setButtonState("loading")
    const payload = {
      ...formData,
      kacamata: formData.kacamata ? formData.kacamata : false,
      suratKeteranganButaWarna: formData.butaWarna ? null : formData.suratKeteranganButaWarna,
      suratKeteranganSehat: formData.disabilitas ? null : formData.suratKeteranganSehat
    }
    const { data, error } = await postProfilUser(payload);
    if (data) {
      setButtonState("success")
      hideModal("modalEditInformasiKesehatan")
      toast.success(data?.message);
      setUser({ ...user, profil: { 
        ...user.profil,
        ...payload,
        kacamata: formData.kacamata ? formData.kacamata : "0",
        butaWarna: formData.butaWarna ? 1 : 0,
        disabilitas: formData.disabilitas ? "1" : "0"
      } });
    } else {
      setButtonState("error")
      toast.error(error?.message);
    }
  }

  return (
    <>
      <NewModal
        modalId="modalEditInformasiKesehatan"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Edit Informasi Kesehatan</h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah untuk mengubah informasi kesehatan
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Tinggi Badan</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="tb"
                value={formData?.tb}
                onChange={handleChangeForm}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Berat Badan</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="bb"
                value={formData?.bb}
                onChange={handleChangeForm}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Golongan Darah</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="golDarah"
                value={formData?.golDarah}
                onChange={handleChangeForm}
              />
            </div>
            <div className="mb-4">
              <h6 className="fs-18-ss fw-bold color-dark mb-3">Buta Warna</h6>
              <div className="row">
                <div className="form-check-ss col-md-6 position-relative mb-4">
                  <input
                    className="form-check-input form-check-radio position-absolute"
                    type="radio"
                    id="buta-warna-ya"
                    style={{
                      top: "36%",
                      left: "2em",
                    }}
                    checked={formData?.butaWarna}
                    onChange={(e) => setFormData({ ...formData, butaWarna: true }) }
                  />
                  <label
                    className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="buta-warna-ya"
                  >
                    <span className="ms-4 ps-2">Ya</span>
                  </label>
                </div>
                <div className="form-check-ss col-md-6 position-relative mb-4">
                  <input
                    className="form-check-input form-check-radio-salah form-check-input-salah position-absolute rounded-pill"
                    type="radio"
                    id="buta-warna-tidak"
                    style={{
                      top: "36%",
                      left: "2em",
                      // height: "20px",
                    }}
                    checked={!formData?.butaWarna}
                    onChange={() => setFormData({ ...formData, butaWarna: false }) }
                  />
                  <label
                    className="form-check-label-salah rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="buta-warna-tidak"
                  >
                    <span className="ms-4 ps-2">Tidak</span>
                  </label>
                </div>
                { showLampiranTidakButaWarna && (
                  <div className="col-md-12">
                    <UploadBanner
                      label="Lampiran Surat Keterangan Tidak Buta Warna"
                      titleUnggahan="Foto / File"
                      id="suratKeteranganButaWarna"
                      name="suratKeteranganButaWarna"
                      preview={formData?.suratKeteranganButaWarna}
                      onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
                    />
                    </div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <h6 className="fs-18-ss fw-bold color-dark mb-3">Kacamata</h6>
              <div className="row">
                <div className="form-check-ss col-md-6 position-relative mb-4">
                  <input
                    className="form-check-input form-check-radio position-absolute"
                    type="radio"
                    id="kacamata-ya"
                    style={{
                      top: "36%",
                      left: "2em",
                    }}
                    checked={formData.kacamata}
                    onChange={() => setFormData({ ...formData, kacamata: true }) }
                  />
                  <label
                    className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="kacamata-ya"
                  >
                    <span className="ms-4 ps-2">Ya</span>
                  </label>
                </div>
                <div className="form-check-ss col-md-6 position-relative mb-4">
                  <input
                    className="form-check-input form-check-radio-salah form-check-input-salah position-absolute rounded-pill"
                    type="radio"
                    id="kacamata-tidak"
                    style={{
                      top: "36%",
                      left: "2em",
                      // height: "20px",
                    }}
                    checked={!formData.kacamata}
                    onChange={() => setFormData({ ...formData, kacamata: false }) }
                  />
                  <label
                    className="form-check-label-salah rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="kacamata-tidak"
                  >
                    <span className="ms-4 ps-2">Tidak</span>
                  </label>
                </div>
              </div>
              { showKeteranganKacamata && (
                <div className="col-md-12">
                  <TextareaAutosize
                    className="form-control"
                    autoComplete="off"
                    style={{
                      resize: "none",
                      width: "100%",
                    }}
                    placeholder="Tuliskan keterangan"
                    minRows={3}
                    name="kacamata"
                    defaultValue={user?.profil?.kacamata?.toString()?.replace("0", "")}
                    onChange={(e) => setFormData({ ...formData, kacamata: e.target.value }) }
                    required
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <h6 className="fs-18-ss fw-bold color-dark mb-3">Disabilitas</h6>
              <div className="row">
                <div className="form-check-ss col-md-6 position-relative mb-4">
                  <input
                    className="form-check-input form-check-radio position-absolute"
                    type="radio"
                    id="disabilitas-ya"
                    style={{
                      top: "36%",
                      left: "2em",
                    }}
                    checked={formData.disabilitas}
                    onChange={(e) =>
                      setFormData({ ...formData, disabilitas: true })
                    }
                  />
                  <label
                    className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="disabilitas-ya"
                  >
                    <span className="ms-4 ps-2">Ya</span>
                  </label>
                </div>
                <div className="form-check-ss col-md-6 position-relative mb-4">
                  <input
                    className="form-check-input form-check-radio-salah form-check-input-salah position-absolute rounded-pill"
                    type="radio"
                    id="disabilitas-tidak"
                    style={{
                      top: "36%",
                      left: "2em",
                      // height: "20px",
                    }}
                    checked={!formData.disabilitas}
                    onChange={(e) =>
                      setFormData({ ...formData, disabilitas: false })
                    }
                  />
                  <label
                    className="form-check-label-salah rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="disabilitas-tidak"
                  >
                    <span className="ms-4 ps-2">Tidak</span>
                  </label>
                </div>
                <div className="col-md-12">
                  { showLampiranKeteranganSehat && (
                    <UploadBanner
                      label="Lampiran Surat Keterangan Sehat"
                      titleUnggahan="Foto / File"
                      id="suratKeteranganSehat"
                      name="suratKeteranganSehat"
                      preview={formData.suratKeteranganSehat}
                      onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
                    />
                  )}
                </div>
              </div>
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

export default ModalEditInformasiKesehatan;
