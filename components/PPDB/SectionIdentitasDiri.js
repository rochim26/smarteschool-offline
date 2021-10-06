import React, { useEffect, useState } from "react";
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
import useUser from "../../hooks/useUser";
import UploadProfilePicture from "../Shared/UploadProfilePicture/UploadProfilePicture";

const SectionIdentitasDiri = () => {
  const initialStateForm = {
    nisn: "",
    avatar: "",
    whatsapp: "",
    nama: "",
    panggilan: "",
    gender: "L",
    tempatLahir: "",
    tanggalLahir: momentPackage(),
    asalSekolah: "",
    kodepos: "",
    btnState: "idle",
  };

  const { user, setUser } = useUser();

  const [formData, setFormData] = useState(initialStateForm);

  const [province, setProvince] = useState([]);
  const [regency, setRegency] = useState([]);
  const [district, setDistrict] = useState([]);
  const [village, setVillage] = useState([]);

  const handleChangeSelect = (e, name) => {
    if (name == "provinceId") {
      _getRegency({
        provinceId: e?.value,
      });
    }

    if (name == "regencyId") {
      _getDistrict({
        regencyId: e?.value,
      });
    }

    if (name == "districtId") {
      _getVillage({
        districtId: e?.value,
      });
    }

    setFormData({
      ...formData,
      [name]: e?.value,
    });
  };

  const handleClickSubmit = async () => {
    setFormData({ ...formData, btnState: "loading" });
    const payload = {
      ...formData,
      tanggalLahir: formData.tanggalLahir
        ? momentPackage(formData.tanggalLahir).format("YYYY-MM-DD")
        : momentPackage().format("YYYY-MM-DD"),
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

  const handleChangeForm = (e, data) => {
    if (data) {
      setFormData({ ...formData, [e.target.name]: data });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleChangeDate = (e, name) => {
    setFormData({
      ...formData,
      [name]: e,
    });
  };

  const _getProvince = async () => {
    const { data } = await getProvince();

    if (data) {
      setProvince(
        data.map((d) => {
          return { value: d.id, label: d.name };
        })
      );
    }
  };

  const _getRegency = async (params) => {
    const { data } = await getRegency(params);

    if (data) {
      setRegency(
        data.map((d) => {
          return { value: d.id, label: d.name };
        })
      );
    }
  };

  const _getDistrict = async (params) => {
    const { data } = await getDistrict(params);

    if (data) {
      setDistrict(
        data.map((d) => {
          return { value: d.id, label: d.name };
        })
      );
    }
  };

  const _getVillage = async (params) => {
    const { data } = await getVillage(params);

    if (data) {
      setVillage(
        data.map((d) => {
          return { value: d.id, label: d.name };
        })
      );
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
      if (data.profil?.profil?.provinceId) {
        _getRegency({ provinceId: data.profil?.profil?.provinceId });
      }

      if (data.profil?.profil?.regencyId) {
        _getDistrict({ regencyId: data.profil?.profil?.regencyId });
      }

      if (data.profil?.profil?.districtId) {
        _getVillage({ districtId: data.profil?.profil?.districtId });
      }
    }
  };

  useEffect(() => {
    _getProvince();
    _getProfil();
  }, []);

  return (
    <div className="card card-ss mb-4">
      <div className="card-body p-4">
        <h4 className="fw-extrabold color-dark title-border mb-5">
          Identitas Diri
        </h4>

        <div className="row">
          <div className="col-md-12 text-center mb-4">
            <div className="text-center">
              <h5 className="fs-18-ss color-dark fw-bold mb-3">Foto Profil</h5>
            </div>
            <UploadProfilePicture
              name="avatar"
              id="uploadFotoGuruJurusan"
              preview={formData.avatar}
              onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
            />
          </div>
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label">NISN</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="nisn"
                value={formData?.nisn}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label">Nomor Whatsapp</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label">Nama Lengkap</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label">Nama Panggilan</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="panggilan"
                value={formData.panggilan}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <SelectShared
                name="gender"
                handleChangeSelect={handleChangeSelect}
                value={formData.gender}
                options={genderData}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Agama</label>
              <SelectShared
                name="agama"
                handleChangeSelect={handleChangeSelect}
                value={formData.agama}
                options={agamaData}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label">Tempat Lahir</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Nama Kota"
                type="text"
                name="tempatLahir"
                value={formData?.tempatLahir}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Tanggal Lahir</label>
              <DatePicker
                onChange={(date, dateString) =>
                  handleChangeDate(dateString, "tanggalLahir")
                }
                placeholder="Pilih Tanggal"
                className="form-control"
                autoComplete="off"
                value={
                  formData?.tanggalLahir
                    ? momentPackage(formData?.tanggalLahir)
                    : momentPackage()
                }
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Alamat</label>
                  <input
                    className="form-control"
                    autoComplete="off"
                    type="text"
                    name="alamat"
                    placeholder="Nama Jalan, Gedung, Nomor Rumah"
                    value={formData?.alamat}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Provinsi</label>
                  <SelectShared
                    name="provinceId"
                    handleChangeSelect={handleChangeSelect}
                    value={formData.provinceId}
                    options={province}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Kabupaten/Kota</label>
                  <SelectShared
                    name="regencyId"
                    handleChangeSelect={handleChangeSelect}
                    value={formData.regencyId}
                    options={regency}
                    isDisabled={!regency.length}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Kecamatan</label>
                  <SelectShared
                    name="districtId"
                    handleChangeSelect={handleChangeSelect}
                    value={formData.districtId}
                    options={district}
                    isDisabled={!district.length}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Kelurahan</label>
                  <SelectShared
                    name="villageId"
                    handleChangeSelect={handleChangeSelect}
                    value={formData.villageId}
                    options={village}
                    isDisabled={!village.length}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Kodepos</label>
                  <input
                    className="form-control"
                    autoComplete="off"
                    type="text"
                    name="kodepos"
                    value={formData?.kodepos}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-4">
              <label className="form-label">Asal Sekolah</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Nama Kota"
                type="text"
                name="asalSekolah"
                value={formData?.asalSekolah}
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

export default SectionIdentitasDiri;
