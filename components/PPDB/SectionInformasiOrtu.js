import React, { useEffect, useState } from "react";
import agama from "../../data/agama.json";
import Select, { components } from "react-select";
import TextareaAutosize from "react-textarea-autosize";
import SelectShared from "../Shared/SelectShared/SelectShared";
import { DatePicker } from "antd";
import genderData from "../../data/gender";
import agamaData from "../../data/agama";
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

const SectionInformasiOrtu = () => {
  const initialStateForm = {
    namaAyah: "",
    telpAyah: "",
    alamatAyah: "",
    pekerjaanAyah: "",
    namaIbu: "",
    telpIbu: "",
    alamatIbu: "",
    pekerjaanIbu: "",
    btnState: "idle",
  };

  const { user, setUser } = useUser();

  const [formData, setFormData] = useState(initialStateForm);

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

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
          Informasi Orang Tua
        </h4>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label">Nama Ayah</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="namaAyah"
                value={formData?.namaAyah}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label">Nama Ibu</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="namaIbu"
                value={formData.namaIbu}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label">Pekerjaan Ayah</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="pekerjaanAyah"
                value={formData.pekerjaanAyah}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label">Pekerjaan Ibu</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="pekerjaanIbu"
                value={formData.pekerjaanIbu}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label">No Telp Ayah</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="telpAyah"
                value={formData.telpAyah}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label">No Telp Ibu</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="telpIbu"
                value={formData.telpIbu}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Alamat Ayah</label>
              <TextareaAutosize
                className="form-control"
                autoComplete="off"
                name="alamatAyah"
                style={{
                  resize: "none",
                  width: "100%",
                }}
                minRows={5}
                value={formData.alamatAyah}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Alamat Ibu</label>
              <TextareaAutosize
                className="form-control"
                autoComplete="off"
                name="alamatIbu"
                style={{
                  resize: "none",
                  width: "100%",
                }}
                minRows={5}
                value={formData.alamatIbu}
                onChange={handleChangeForm}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer-ss pb-4">
        <div className="mb-4">
          <hr className="m-0" />
        </div>
        <div className="d-flex justify-content-end align-items-center px-4 pb-3">
          <div data-joyride="btn-simpan">
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
                "btn-save-admin btn btn-primary rounded-pill fs-5 fw-bolder py-2 px-5 bg-gradient-primary"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionInformasiOrtu;
