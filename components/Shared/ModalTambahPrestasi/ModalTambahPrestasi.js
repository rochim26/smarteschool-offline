import { DatePicker } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  FaLink,
  FaPaperclip,
  FaPlus,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
// import jenisPrestasi from "../../../data/jenis-prestasi.json";

import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { postPrestasi, updatePrestasi } from "../../../client/PrestasiClient";
import { alphabet, momentPackage } from "../../../utilities/HelperUtils";
import { hideModal } from "../../../utilities/ModalUtils";
import Editor from "../Editor/Editor";
import NewModal from "../NewModal/NewModal";
import SelectShared from "../SelectShared/SelectShared";
import UploadBukuTamu from "../UploadBanner/UploadBukuTamu";
import EmptyStateFile from "../EmptyState/EmptyStateFile";
import ModalTautanLink from "../ModalTautanLink/ModalTautanLink";
import { uploadFile } from "../../../client/uploadFileClient";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import InputFile from "../InputFile/InputFile";

const ModalTambahPrestasi = ({
  onChange = () => {},
  onUpload = () => {},
  onClick = () => {},
  tingkatPrestasi,
  _getPrestasi,
  editData,
  setHasMore,
  preview = "",
  isFile = false,
  // isImport = false,
  isUploadedFile = false,
  modalTitle="Prestasi"
}) => {
  const initialFormData = {
    nama: "",
    tingkat: "",
    peringkat: "",
    lembaga: "",
    tanggalPenerbit: "",
    sertifikatKadaluarsa: "",
    tanggalKadaluarsa: "",
    idSertifikat: "",
    lampiran: "",
    UserId: "",
  };
  const [buttonState, setButtonState] = useState("idle");
  const [formData, setFormData] = useState(initialFormData);
  const [pilihanJawabanPG, setPilihanJawabanPG] = useState([0]);
  const [isImport, setIsImport] = useState(false);
  const [diambil, setDiambil] = useState(false);
  // console.log(formData);
  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const _postPrestasi = async () => {
    setButtonState("loading");
    const { data } = editData
      ? await updatePrestasi(formData, editData.id)
      : await postPrestasi(formData);
    if (data) {
      toast.success(data.message);
      _getPrestasi();
      setHasMore(true);
      hideModal("modalTambahPrestasi");
      setButtonState("success");
    } else {
      setButtonState("error");
    }
  };
  const handleChangeInputFile = async (e, data) => {
    if (data) {
      handleChangeForm(e, data);
    }
  };

  // const uploadFileToServer = async (e) => {
  //   if (isImport) {
  //     getFileUrl(e.target.files[0], e);
  //   } else {
  //     onUpload(true);
  //     await uploadFile(e.target.files[0], checkProgress, (fileUrl) =>
  //       getFileUrl(fileUrl, e)
  //     );
  //     onUpload(false);
  //   }
  // };

  const removeVideo = () => {
    setFormData({
      ...formData,
      lampiran: "",
    });
  };
  useEffect(() => {
    if (editData) {
      setFormData({ ...formData, ...editData });
    } else {
      setFormData(initialFormData);
    }
  }, [editData]);

  return (
    <NewModal
      modalId="modalTambahPrestasi"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            {editData ? "Ubah" : "Tambah"} {modalTitle}
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk {editData ? "mengubah" : "menambahkan"}{" "}
            prestasi
          </span>
        </>
      }
      content={
        <>
          {editData ? (
            <div className="mb-4">
              <label className="form-label">Nama</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan nama prestasi"
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChangeForm}
              />
            </div>
          ) : (
            <div className="mb-4">
              {pilihanJawabanPG?.map((d, idx) => {
                return (
                  <div className=" d-flex flex-lg-nowrap flex-lg-row flex-column flex-wrap justify-content-between mb-3 align-items-center">
                    <div className="d-flex justify-content-between w-100 flex-column">
                      <div className="d-flex flex-row justify-content-between my-2 my-md-0 align-items-center">
                        <label className="form-label">
                          Nama Siswa {idx == 0 ? `` : `${idx + 1}`}
                        </label>
                        {pilihanJawabanPG[pilihanJawabanPG.length - 1] == d && (
                          <button
                            className="btn btn-danger btn-danger-ss rounded-circle shadow-danger-ss d-flex justify-content-center align-items-center fs-6 ms-3 order-lg-3 order-2 d-lg-none p-0"
                            onClick={() =>
                              setPilihanJawabanPG(
                                pilihanJawabanPG.filter((e) => {
                                  return e !== d;
                                })
                              )
                            }
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                          >
                            <FaTrashAlt />
                          </button>
                        )}
                      </div>
                      <div className="w-100 text-break order-lg-2 order-3 mt-lg-0 mt-2 w-100">
                        <SelectShared
                          name="nama"
                          placeholder="Pilih Siswa"
                          style={{
                            fontSize: "14px !important",
                          }}
                          // handleChangeSelect={handleChangeSelect}
                          value={formData.nama}
                          // options={selectTugas}
                        />
                      </div>
                    </div>

                    {pilihanJawabanPG[pilihanJawabanPG.length - 1] == d && (
                      <button
                        className="btn btn-danger btn-danger-ss rounded-circle shadow-danger-ss d-lg-flex justify-content-center align-items-center fs-6 ms-3 order-lg-3 order-2 d-none mt-4"
                        onClick={() =>
                          setPilihanJawabanPG(
                            pilihanJawabanPG.filter((e) => {
                              return e !== d;
                            })
                          )
                        }
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        <FaTrashAlt />
                      </button>
                    )}
                  </div>
                );
              })}
              {/* {pilihanJawabanPG.length < 5 && ( */}
              <button
                className="btn btn-ss btn-primary btn-primary-ss fs-14-ss fw-bold rounded-pill shadow-primary-ss mt-2"
                onClick={() =>
                  setPilihanJawabanPG([
                    ...pilihanJawabanPG,
                    Math.max(...pilihanJawabanPG) + 1,
                  ])
                }
              >
                <FaPlus className="me-2" />
                Tambah Nama Siswa
              </button>
              {/* )} */}
            </div>
          )}
          <div className="mb-4">
            <label className="form-label">Nama Prestasi</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Tuliskan nama prestasi"
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Jenis Prestasi</label>
            {/* <SelectShared
              name="bidang"
              placeholder="Pilih bidang instansi"
              style={{
                fontSize: "14px !important",
              }}
              // handleChangeSelect={handleChangeSelect}
              // value={formData.bidang}
              options={jenisPrestasi}
            /> */}
          </div>
          <div className="mb-4">
            <label className="form-label">Lembaga</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Contoh : Kemendikbud"
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChangeForm}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Tingkat</label>
            <SelectShared
              name="bidang"
              placeholder="Pilih Tingkat"
              style={{
                fontSize: "14px !important",
              }}
              // handleChangeSelect={handleChangeSelect}
              // value={formData.bidang}
              options={tingkatPrestasi}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Peringkat</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Contoh : 1"
              type="text"
              value={formData.peringkat}
              name="peringkat"
              onChange={handleChangeForm}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Tanggal Terbit (opsional)</label>
            <DatePicker
              // onChange={(date, dateString) =>
              //   handleInputChange("batas_waktu", dateString)
              // }
              placeholder="yyyy / mm / dd"
              className="form-control"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <h6 className="fs-18-ss fw-bold color-dark mb-3">
              Sertifikat Memiliki Tanggal Kadaluarsa
            </h6>
            <div className="row">
              <div className="form-check-ss col-6 position-relative">
                <input
                  className="form-check-input form-check-radio position-absolute"
                  type="radio"
                  name="flexRadioDefault"
                  id="radioYa"
                  style={{
                    top: "36%",
                    left: "2em",
                  }}
                  name="diambil"
                  checked={diambil == true}
                  onClick={() => setDiambil(true)}
                />
                <label
                  className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                  htmlFor="radioYa"
                >
                  <span className="ms-4 ps-2">Ya</span>
                </label>
              </div>
              <div className="form-check-ss col-6 position-relative">
                <input
                  className="form-check-input form-check-radio-salah form-check-input-salah position-absolute rounded-pill"
                  type="radio"
                  name="flexRadioDefault"
                  id="radioTidak"
                  style={{
                    top: "36%",
                    left: "2em",
                  }}
                  checked={diambil == false}
                  name="diambil"
                  onClick={() => setDiambil(false)}
                />
                <label
                  className="form-check-label-salah rounded-ss w-100 border border-light-secondary-ss p-3"
                  htmlFor="radioTidak"
                >
                  <span className="ms-4 ps-2">Tidak</span>
                </label>
              </div>
            </div>
          </div>
          {diambil && (
            <div className="mb-4">
              <label className="form-label">Tanggal Kadaluarsa</label>
              <DatePicker
                // onChange={(date, dateString) =>
                //   handleInputChange("batas_waktu", dateString)
                // }
                placeholder="yyyy / mm / dd"
                className="form-control"
                autoComplete="off"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="form-label">ID Sertifikat</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Contoh : No. 1001/SES/SEM.1/IV/2021"
              type="text"
              value={formData.tempat}
              name="tempat"
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <div className="d-flex align-items-md-center flex-md-row flex-column justify-content-between mb-4">
              <p className="form-label">Lampiran Sertifikat</p>
              <div className="d-flex justify-content-between flex-column flex-md-row">
                <label
                  htmlFor="lampiran"
                  className="d-flex align-items-center justify-content-center form-label m-0 fs-6 btn btn-ss fs-14-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-lg-3 fw-bold mb-md-0 mb-3"
                >
                  <FaPaperclip className="me-2" />
                  <p className="mb-0">Unggah File</p>
                </label>
                <InputFile
                  accept="file/*"
                  name="lampiran"
                  id="lampiran"
                  onChange={handleChangeInputFile}
                />
                <button
                  type="button"
                  className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fs-14-ss fw-bold"
                  data-bs-toggle="modal"
                  data-bs-target="#modalTautanLinkPublikasi"
                >
                  <FaLink className="me-2" />
                  Tautan Link
                </button>
              </div>
            </div>
            {/* tampilan ketika file yang diinsert */}
            <div className="card-lampiran-materi border-0 bg-soft-primary rounded-ss mt-4">
              <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-row">
                {/* <a
                  href={isUploadedFile ? preview : URL.createObjectURL(preview)}
                  target="_blank"
                > */}
                <div className="d-flex align-items-center flex-wrap">
                  <img src="/img/icon-file-download.svg" alt="" />
                  <div className="p-2">
                    <p className="fw-bold color-dark mb-0 ms-4">nama filenya</p>
                    <span className="fs-12-ss color-secondary fs-12-ss fw-bold">
                      {/* PDF */}
                    </span>
                  </div>
                </div>
                {/* </a> */}
                <div className="d-flex justify-content-between align-items-center ps-md-2 pt-md-2 pb-md-2 pe-0 p-0">
                  <FaTimes
                    className="pointer fs-4"
                    style={{ color: "#96DAFF" }}
                    onClick={onClick}
                  />
                </div>
              </div>
            </div>

            {/* tampilan ketika link yg diinsert */}
            <div className="card-lampiran-materi border-0 bg-soft-primary rounded-ss mt-4">
              <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-row">
                {/* <a
                  href={isUploadedFile ? preview : URL.createObjectURL(preview)}
                  target="_blank"
                > */}
                <div className="d-flex align-items-center flex-wrap">
                  <img src="/img/icon-upload-link.svg" alt="" />
                  <div className="p-2">
                    <p className="fw-bold color-dark mb-0 ms-4">nama filenya</p>
                    <span className="fs-12-ss color-secondary fs-12-ss fw-bold">
                      {/* PDF */}
                    </span>
                  </div>
                </div>
                {/* </a> */}
                <div className="d-flex justify-content-between align-items-center ps-md-2 pt-md-2 pb-md-2 pe-0 p-0">
                  <FaTimes
                    className="pointer fs-4"
                    style={{ color: "#96DAFF" }}
                    onClick={onClick}
                  />
                </div>
              </div>
            </div>

            {/* tampilan kosong */}
            {!formData.lampiran && (
              <EmptyStateFile
                type="file"
                pesan="Tidak ada file atau link yang dilampirkan"
              />
            )}
          </div>
          <ModalTautanLink
            toastMessage="Video berhasil ditambahkan"
            name="lampiran"
            modalId="modalTautanLinkPublikasi"
            defaultValue={formData.lampiran}
            getLink={(e, link) => handleChangeForm(e, link)}
          />
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState={buttonState}
          onClick={_postPrestasi}
          color={"primary"}
        idleText={`${editData ? "Ubah" : "Tambah"} ${modalTitle}`}
          loadingText={"Diproses"}
          successText={"Berhasil"}
          errorText={"Gagal"}
          type={"button"}
          data-bs-dismiss="modal"
          className={"btn btn-primary"}
        />
      }
    />
  );
};

export default ModalTambahPrestasi;
