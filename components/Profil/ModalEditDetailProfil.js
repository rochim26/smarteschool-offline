import { DatePicker } from "antd";
import Link from "next/link";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import { ssURL } from "../../client/clientAxios";
import useUser from "../../hooks/useUser";
import { hideModal } from "../../utilities/ModalUtils";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";
import genderData from "../../data/gender";
import agamaData from "../../data/agama";
import { momentPackage } from "../../utilities/HelperUtils";

const ModalEditDetailProfil = ({
  formData,
  _postProfilUser,
  handleChangeSelect,
  handleChangeForm,
  handleChangeDate,
  province,
  regency,
  district,
  village,
  buttonState,
}) => {
  const { user } = useUser();
  return (
    <>
      <NewModal
        modalId="modalEditDetailProfil"
        modalSize="xl"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Edit Detail Profil</h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah untuk mengubah detail profil
            </span>
          </>
        }
        content={
          <>
            <div className="row">
              {user?.role == "guru" && (
                <div className="col-md-6">
                  <div className="mb-4">
                    <label className="form-label">NIP</label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      type="text"
                      name="nip"
                      // value={formData?.nisn}
                      // onChange={handleChangeForm}
                    />
                  </div>
                </div>
              )}
              {user?.role == "siswa" && (
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
              )}
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="form-label">Nomor Whatsapp</label>
                  <input
                    className="form-control"
                    autoComplete="off"
                    type="text"
                    name="whatsapp"
                    readOnly
                    value={formData.whatsapp}
                    onChange={handleChangeForm}
                  />
                </div>
              </div>
              {user?.role == "guru" && (
                <>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label className="form-label">NRK</label>
                      <input
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        // value={stateFormProfil?.nrk}
                        // id="nrk"
                        // onChange={(e) => handleChangeProfil(e)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label className="form-label">NUPTK</label>
                      <input
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        // value={stateFormProfil?.nuptk}
                        // id="nuptk"
                        // onChange={(e) => handleChangeProfil(e)}
                      />
                    </div>
                  </div>
                </>
              )}
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
              {/* Di komen dulu soalnya kata bapak ochim belom di simpen di backend */}
              {/* <div className="col-md-6">
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
              </div> */}

              <div className="col-md-6">
                <div className="mb-4">
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
                <div className="mb-4">
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
                <div className="mb-4">
                  <label className="form-label">Tanggal Lahir</label>
                  <DatePicker
                    onChange={(date, dateString) =>
                      handleChangeDate(dateString, "tanggalLahir")
                    }
                    placeholder="Pilih Tanggal"
                    className="form-control"
                    autoComplete="off"
                    value={momentPackage(
                      formData?.tanggalLahir || momentPackage()
                    )}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-4">
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
                    <div className="mb-4">
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
                    <div className="mb-4">
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
                    <div className="mb-4">
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
                    <div className="mb-4">
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
                    <div className="mb-4">
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
                  <label className="form-label">Alamat Email</label>
                  <input
                    className="form-control"
                    autoComplete="off"
                    placeholder="Anda belum memasukkan alamat email"
                    type="text"
                    name="email"
                    readOnly
                    value={formData?.email}
                  />
                  <div class="form-text">
                    Untuk menambahkan alamat email dapat dilakukan pada bagian{" "}
                    <Link href={`${ssURL}/profil?nav=akun`}>
                      <a
                        className="text-decoration-none color-primary fw-bold"
                        onClick={() => hideModal("modalEditDetailProfil")}
                      >
                        Akun
                      </a>
                    </Link>
                  </div>
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
            onClick={() => _postProfilUser()}
          />
        }
      />
    </>
  );
};

export default ModalEditDetailProfil;
