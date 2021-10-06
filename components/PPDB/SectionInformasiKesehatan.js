import UploadBanner from "../Shared/UploadBanner/UploadBanner";
import React, { useEffect, useState } from "react";
import agama from "../../data/agama.json";
import Select, { components } from "react-select";
import TextareaAutosize from "react-textarea-autosize";
import SelectShared from "../Shared/SelectShared/SelectShared";
import { DatePicker } from "antd";
import genderData from "../../data/gender";
import golDarahData from "../../data/gol-darah.json";
import { momentPackage } from "../../utilities/HelperUtils";
import {
  getProvince,
  getRegency,
  getDistrict,
  getVillage,
} from "../../client/LokasiClient";
import ReactiveButton from "reactive-button";
import { postProfilUser, getProfilUser } from "../../client/AuthClient";
import { toast } from "react-toastify";
import { getProfil } from "../../client/sharedClient";
import useUser from "../../hooks/useUser";

const SectionInformasiKesehatan = () => {
  const initialStateForm = {
    tb: "",
    bb: "",
    golDarah: "",
    butaWarna: "",
    kacamata: "",
    disabilitas: "",
    suratKeteranganSehat: "",
    suratKeteranganButaWarna: "",
    btnState: "idle",
  };

  const { user, setUser } = useUser();

  const [formData, setFormData] = useState(initialStateForm);

  const handleChangeSelect = (e, name) => {
    setFormData({
      ...formData,
      [name]: e?.value,
    });
  };

  const handleClickSubmit = async () => {
    setFormData({ ...formData, btnState: "loading" });
    const payload = {
      ...formData,
      tanggalLahir: momentPackage(formData.tanggalLahir).format("YYYY-MM-DD"),
    };
    const { data, error } = await postProfilUser(payload);

    if (data) {
      setFormData({ ...formData, btnState: "success" });
      toast.success(data?.message);
      _getProfil();
    } else {
      setFormData({ ...formData, btnState: "error" });
      toast.error(error?.message);
    }
  };

  const handleChangeForm = (e, uploadedFile) => {
    if (uploadedFile) {
      setFormData({
        ...formData,
        [e.target.name]: uploadedFile,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const _getProfil = async () => {
    const { data } = await getProfilUser();

    if (data) {
      setUser(data.profil);
      setFormData({
        ...initialStateForm,
        ...data.profil,
        ...data?.profil?.profil,
      });
    }
  };

  useEffect(() => {
    _getProfil();
  }, []);

  return (
    <div className="card card-ss mb-4">
      <div className="card-body p-4">
        <h4 className="fw-extrabold color-dark title-border mb-5">
          Informasi Kesehatan
        </h4>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label">Tinggi Badan</label>
              <input
                className="form-control"
                autoComplete="off"
                type="number"
                name="tb"
                value={formData?.tb}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label">Berat Badan</label>
              <input
                className="form-control"
                autoComplete="off"
                type="number"
                name="bb"
                value={formData?.bb}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label">Golongan Darah</label>
              <SelectShared
                name="golDarah"
                handleChangeSelect={handleChangeSelect}
                value={formData.golDarah}
                options={golDarahData}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label">Buta Warna</label>
              <SelectShared
                name="butaWarna"
                handleChangeSelect={handleChangeSelect}
                value={formData.butaWarna}
                options={[
                  { label: "Ya", value: 1 },
                  { label: "Tidak", value: 0 },
                ]}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label">Kacamata</label>
                  <SelectShared
                    name="isKacamata"
                    handleChangeSelect={handleChangeSelect}
                    value={formData.isKacamata}
                    options={[
                      { label: "Ya", value: 1 },
                      { label: "Tidak", value: 0 },
                    ]}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label">Keterangan Kacamata</label>
                  <input
                    className="form-control"
                    autoComplete="off"
                    type="number"
                    name="kacamata"
                    value={formData?.kacamata}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label">Disabilitas</label>
                  <SelectShared
                    name="isDisabilitas"
                    handleChangeSelect={handleChangeSelect}
                    value={formData.isDisabilitas}
                    options={[
                      { label: "Ya", value: 1 },
                      { label: "Tidak", value: 0 },
                    ]}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label">Keterangan Disabilitas</label>
                  <input
                    className="form-control"
                    autoComplete="off"
                    type="text"
                    name="disabilitas"
                    value={formData?.disabilitas}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <UploadBanner
          label="Lampiran Surat Keterangan Sehat"
          titleUnggahan="Foto / File"
          id="suratKeteranganSehat"
          name="suratKeteranganSehat"
          preview={formData.suratKeteranganSehat}
          onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
        />
        <UploadBanner
          label="Lampiran Surat Keterangan Tidak Buta Warna"
          titleUnggahan="Foto / File"
          id="suratKeteranganButaWarna"
          name="suratKeteranganButaWarna"
          preview={formData.suratKeteranganButaWarna}
          onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
        />

        <div className="d-flex justify-content-end mt-4">
          <ReactiveButton
            buttonState={formData.btnState}
            onClick={handleClickSubmit}
            color={"primary"}
            idleText={"Simpan"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            className={
              "btn btn-primary rounded-pill fs-14-ss fw-bolder py-2 px-4 d-flex align-items-center bg-gradient-primary"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SectionInformasiKesehatan;
