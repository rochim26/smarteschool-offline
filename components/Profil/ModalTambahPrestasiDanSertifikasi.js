import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { FaLink, FaPaperclip } from "react-icons/fa";
import ReactiveButton from "reactive-button";
import useUser from "../../hooks/useUser";
import { momentPackage } from "../../utilities/HelperUtils";
import EmptyStateFile from "../Shared/EmptyState/EmptyStateFile";
import ModalTautanLink from "../Shared/ModalTautanLink/ModalTautanLink";
import NewModal from "../Shared/NewModal/NewModal";
import TautanCard from "../Shared/TautanCard/TautanCard";
import { postProfilUser } from "../../client/AuthClient";
import { hideModal } from "../../utilities/ModalUtils";
import { toast } from "react-toastify";
import InputFile from "../Shared/InputFile/InputFile";

const ModalTambahPrestasiDanSertifikasi = ({ editIndex = null, setEditIndex }) => {

  const { user, setUser } = useUser();

  const newPrestasi = [{
    nama: "",
    instansi: "",
    tanggalTerbit: momentPackage(),
    tanggalKadaluarsa: momentPackage(),
    idSertifikat: "",
    lampiran: null
  }];

  const [buttonState, setButtonState] = useState("idle");
  const [kadaluarsa, setKadaluarsa] = useState(null);

  const [formData, setFormData] = useState([
    ...user?.profil?.prestasi || [],
    ...newPrestasi
  ]);

  const index = editIndex !== null ? editIndex : formData.length - 1;

  const handleChangeInput = (e, tautan) => {
    const copyFormData = [...formData];
    copyFormData[index][e.target.name] = tautan || e.target.value;
    setFormData(copyFormData);
  }

  const handleChangeDate = (date, name) => {
    const copyFormData = [...formData];
    copyFormData[index][name] = momentPackage(date);
    setFormData(copyFormData);
  }

  const setupPayload = () => {
    const data = [...formData];
    if (data?.length > 0) {
      const newData =  data?.map(d => ({
        nama: d.nama,
        instansi: d.instansi,
        tanggalTerbit: momentPackage(d.tanggalTerbit).format("YYYY-MM-DD"),
        tanggalKadaluarsa: momentPackage(d.tanggalKadaluarsa).format("YYYY-MM-DD"),
        idSertifikat: d.idSertifikat,
        lampiran: d.lampiran
      }));

      if (!kadaluarsa) {
        newData[index].tanggalKadaluarsa = null;
      }

      if (editIndex !== null) {
        newData.splice(newData.length - 1, 1); // remove last item from array if users try to edit data
      }

      return newData;
    }
  }

  const handleDeleteLampiran = () => {
    const copyFormData = [...formData];
    copyFormData[index]["lampiran"] = null;
    setFormData(copyFormData);
  }

  const handleChangeInputFile = async (e, data) => {
    if (data) {
      const copyFormData = [...formData];
      copyFormData[index][e.target.name] = data;
      setFormData(copyFormData);
    }
  };

  const handleSubmit = async () => {
    setButtonState("loading");
    const payload = setupPayload();
    const { data, error } = await postProfilUser({ prestasi: payload });
    if (data) {
      editIndex !== null && setEditIndex(null);
      setButtonState("success");
      hideModal("modalTambahPrestasiDanSertifikasi");
      toast.success(data?.message);
      setUser({ ...user, profil: { ...user.profil, prestasi: payload } });
    } else {
      setButtonState("error");
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    if (editIndex !== null) {
      setKadaluarsa(formData[index].tanggalKadaluarsa !== null)
    }
  }, [editIndex]);

  return (
    <>
      <NewModal
        onCloseModal={() => setEditIndex(null)}
        modalId="modalTambahPrestasiDanSertifikasi"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">
              Tambah Prestasi atau Sertifikasi
            </h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah untuk menambahkan prestasi atau sertifikasi
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Nama</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="nama"
                placeholder="Masukkan Nama"
                value={formData[index].nama}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Lembaga</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="instansi"
                placeholder="Contoh : Kemendikbud"
                value={formData[index].instansi}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Tanggal Terbit</label>
              <DatePicker
                onChange={(date, dateString) =>
                  handleChangeDate(dateString, "tanggalTerbit")
                }
                placeholder="Pilih tanggal"
                className="form-control"
                autoComplete="off"
                value={momentPackage(formData[index].tanggalTerbit)}
              />
            </div>
            <div className="mb-4">
              <h6 className="fs-18-ss fw-bold color-dark mb-3">
                Sertifikat Memliki Tanggal Kadaluarsa
              </h6>
              <div className="row">
                <div className="form-check-ss col-md-6 position-relative">
                  <input
                    className="form-check-input form-check-radio position-absolute"
                    type="radio"
                    name="flexRadioDefault"
                    id="radioYa"
                    style={{
                      top: "36%",
                      left: "2em",
                    }}
                    checked={kadaluarsa}
                    defaultChecked={false}
                    onChange={() => setKadaluarsa(true)}
                  />
                  <label
                    className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="radioYa"
                  >
                    <span className="ms-4 ps-2">Ya</span>
                  </label>
                </div>
                <div className="form-check-ss col-md-6 position-relative">
                  <input
                    className="form-check-input form-check-radio-salah form-check-input-salah position-absolute rounded-pill"
                    type="radio"
                    name="flexRadioDefault"
                    id="radioTidak"
                    style={{
                      top: "36%",
                      left: "2em",
                      // height: "20px",
                    }}
                    checked={!kadaluarsa}
                    defaultChecked={false}
                    onChange={() => setKadaluarsa(false)}
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
            { kadaluarsa && (
              <div className="mb-4">
                <label className="form-label">Tanggal Kadaluarsa</label>
                <DatePicker
                  onChange={(date, dateString) =>
                    handleChangeDate(dateString, "tanggalKadaluarsa")
                  }
                  placeholder="Pilih tanggal"
                  className="form-control"
                  autoComplete="off"
                  value={momentPackage(formData[index].tanggalKadaluarsa)}
                />
              </div>
            )}
            <div className="mb-4">
              <label className="form-label">ID Sertifikat</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="idSertifikat"
                placeholder="Contoh : No. 1001/SES/SEM.1/IV/2021"
                value={formData[index].idSertifikat}
                onChange={handleChangeInput}
              />
            </div>
            <div className="d-flex justify-content-between align-items-lg-center mb-4 flex-lg-row flex-column flex-wrap">
              <h6 className="fs-18-ss m-0 fw-bold color-dark">
                Lampiran Sertifikat
              </h6>
              <div className="d-flex align-items-md-center flex-md-row flex-column justify-content-between mt-xl-0 mt-md-2 mt-3">
                <label
                  htmlFor="inputLampiranSertifikat"
                  className="d-flex align-items-center justify-content-center form-label m-0 fs-6 btn btn-ss fs-12-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-lg-3 fw-bold mb-md-0 mb-3"
                >
                  <FaPaperclip className="me-2" />
                  <p className="mb-0">Unggah File</p>
                </label>

                {/* </label> */}
                <InputFile
                  name="lampiran"
                  id="inputLampiranSertifikat"
                  onChange={handleChangeInputFile}
                />
                {/* <!-- Button Trigger Modal Tautan Link Start --> */}

                <button
                  type="button"
                  className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fs-12-ss fw-bold"
                  data-bs-toggle="modal"
                  data-bs-target="#modalTautanLinkPrestasiDanSertifikasi"
                >
                  <FaLink className="me-2" />
                  Tautan Link
                </button>

                {/* <!-- Button Trigger Modal Tautan Link End --> */}
              </div>
            </div>
            { formData[index].lampiran
              ? <TautanCard value={formData[index].lampiran} onClickDelete={handleDeleteLampiran} />
              : <EmptyStateFile type="file" pesan="Tidak ada file atau link yang dilampirkan" />
            }
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={'idle'}
            color={"primary"}
            idleText={`${editIndex !== null ? "Edit" : "Tambah"}`}
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
      <ModalTautanLink
        toastMessage="Link berhasil ditambahkan"
        name="lampiran"
        modalId="modalTautanLinkPrestasiDanSertifikasi"
        defaultValue={formData[index].lampiran}
        getLink={(e, link) => handleChangeInput(e, link)}
      />
    </>
  );
};

export default ModalTambahPrestasiDanSertifikasi;
