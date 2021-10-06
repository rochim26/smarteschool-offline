import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { FaLink, FaPaperclip } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import EmptyStateFile from "../Shared/EmptyState/EmptyStateFile";
import ModalTautanLink from "../Shared/ModalTautanLink/ModalTautanLink";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";
import listNegara from "../../data/negara.json";
import useUser from "../../hooks/useUser";
import moment from "moment";
import { momentPackage } from "../../utilities/HelperUtils";
import TautanCard from "../Shared/TautanCard/TautanCard";
import { postProfilUser } from "../../client/AuthClient";
import { toast } from "react-toastify";
import { hideModal } from "../../utilities/ModalUtils";
import InputFile from "../Shared/InputFile/InputFile";

const ModalTambahBahasa = ({ editIndex = null, setEditIndex }) => {

  const { user, setUser } = useUser();

  const newBahasa = [{
    bahasa: "",
    tingkat: "",
    sertifikat: "",
    lembagaSertifikat: "",
    skor: "",
    tanggalTerbit: momentPackage(),
    tanggalKadaluarsa: momentPackage(),
    idSertifikat: "",
    lampiran: ""
  }];

  const [buttonState, setButtonState] = useState("idle");
  const [isHaveCertificate, setIsHaveCertificate] = useState(null);

  const [formData, setFormData] = useState([
    ...user?.profil?.bahasa || [],
    ...newBahasa
  ]);

  const index = editIndex !== null ? editIndex : formData.length - 1;

  const listTingkatKemampuan = [
    { value: "beginner", label: "beginner" },
    { value: "intermediate", label: "intermediate" },
    { value: "proficient", label: "proficient" },
    { value: "fluent", label: "fluent" },
    { value: "native", label: "native" },
  ];

  const handleChangeSelect = (e, name) => {
    const copyFormData = [...formData];
    
    if (name === "bahasa") {
      copyFormData[index][name] = { name: e.value, img: e.img };
    } else {
      copyFormData[index][name] = e.value;
    }

    setFormData(copyFormData);
  }

  const handleChangeInput = (e, tautan) => {
    const copyFormData = [...formData];
    copyFormData[index][e.target.name] = tautan || e.target.value;
    setFormData(copyFormData);
  }

  const handleChangeDate = (date, name) => {
    const copyFormData = [...formData];
    copyFormData[index][name] = moment(date);
    setFormData(copyFormData);
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

  const setupPayload = () => {
    const data = [...formData];
    if (data?.length > 0) {
      const newData =  data?.map(d => ({
        bahasa: d.bahasa,
        tingkat: d.tingkat,
        sertifikat: d.sertifikat,
        lembagaSertifikat: d.lembagaSertifikat,
        skor: d.skor,
        tanggalTerbit: momentPackage(d.tanggalTerbit).format("YYYY-MM-DD"),
        tanggalKadaluarsa: momentPackage(d.tanggalKadaluarsa).format("YYYY-MM-DD"),
        idSertifikat: d.idSertifikat,
        lampiran: d.lampiran,
      }));

      if (!isHaveCertificate) {
        newData[index].sertifikat = null;
        newData[index].lembagaSertifikat = null;
        newData[index].skor = null;
        newData[index].tanggalTerbit = null;
        newData[index].tanggalKadaluarsa = null;
        newData[index].idSertifikat = null;
        newData[index].lampiran = null;
      }

      if (editIndex !== null) {
        newData.splice(newData.length - 1, 1); // remove last item from array if users try to edit data
      }

      return newData;
    }
  }

  const handleSubmit = async () => {
    setButtonState("loading");
    const payload = setupPayload();
    const { data, error } = await postProfilUser({ bahasa: payload });
    if (data) {
      setEditIndex(null);
      setButtonState("success");
      hideModal("modalTambahBahasa");
      toast.success(data?.message);
      setUser({ ...user, profil: { ...user.profil, bahasa: payload } });
    } else {
      setButtonState("error");
      toast.error(error?.message);
    }
  }
  
  useEffect(() => {
    if (editIndex !== null) {
      setIsHaveCertificate(formData[index].sertifikat !== null)
    }
  }, [editIndex]);

  return (
    <>
      <NewModal
        onCloseModal={() => setEditIndex(null)}
        modalId="modalTambahBahasa"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Tambah Bahasa</h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah untuk menambahkan bahasa
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Nama Bahasa</label>
              <SelectShared
                placeholder="Cari Nama Bahasa"
                handleChangeSelect={e => handleChangeSelect(e, "bahasa")}
                value={formData[index].bahasa.name}
                options={listNegara}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Tingkat Kemampuan</label>
              <SelectShared
                placeholder="Pilih Tingkat Kemampuan Bahasa"
                handleChangeSelect={e => handleChangeSelect(e, "tingkat")}
                value={formData[index].tingkat}
                options={listTingkatKemampuan}
              />
            </div>
            <div className="mb-4">
              <h6 className="fs-18-ss fw-bold color-dark mb-3">
                Sertifikat Bahasa
              </h6>
              <div className="row">
                <div className="form-check-ss col-md-6 position-relative">
                  <input
                    className="form-check-input form-check-radio position-absolute"
                    type="radio"
                    name="flexRadioDefault"
                    id="radioMemilikiSertifikat"
                    style={{
                      top: "36%",
                      left: "2em",
                    }}
                    checked={isHaveCertificate}
                    defaultChecked={false}
                    onChange={() => setIsHaveCertificate(true)}
                  />
                  <label
                    className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="radioMemilikiSertifikat"
                  >
                    <span className="ms-4 ps-2">Memiliki Sertifikat</span>
                  </label>
                </div>
                <div className="form-check-ss col-md-6 position-relative">
                  <input
                    className="form-check-input form-check-radio-salah form-check-input-salah position-absolute rounded-pill"
                    type="radio"
                    name="flexRadioDefault"
                    id="radioTidakMemilikiSeritifikat"
                    style={{
                      top: "36%",
                      left: "2em",
                      // height: "20px",
                    }}
                    checked={!isHaveCertificate}
                    defaultChecked={false}
                    onChange={() => setIsHaveCertificate(false)}
                  />
                  <label
                    className="form-check-label-salah rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="radioTidakMemilikiSeritifikat"
                  >
                    <span className="ms-4 ps-2">
                      Tidak Memiliki Seritifikat
                    </span>
                  </label>
                </div>
              </div>
            </div>
            { isHaveCertificate && <>
              <div className="mb-4">
                <label className="form-label">Nama Sertifikat</label>
                <input
                  className="form-control"
                  autoComplete="off"
                  type="text"
                  name="sertifikat"
                  placeho lder="Contoh : Certificate of Achievement TOEFL ITP Test"
                  value={formData[index].sertifikat}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Lembaga Sertifikat</label>
                <input
                  className="form-control"
                  autoComplete="off"
                  type="text"
                  name="lembagaSertifikat"
                  placeholder="Contoh : ETS"
                  value={formData[index].lembagaSertifikat}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Skor</label>
                <input
                  className="form-control"
                  autoComplete="off"
                  type="text"
                  name="skor"
                  placeholder="Contoh : 85"
                  value={formData[index].skor}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="row mb-4">
                <div className="col-md-6">
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
                <div className="col-md-6">
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
              </div>
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
                    htmlFor="formUploadFileTambahBahasa"
                    className="d-flex align-items-center justify-content-center form-label m-0 fs-6 btn btn-ss fs-12-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-lg-3 fw-bold mb-md-0 mb-3"
                  >
                    <FaPaperclip className="me-2" />
                    <p className="mb-0">Unggah File</p>
                  </label>

                  {/* </label> */}
                  <InputFile
                    name="lampiran"
                    id="formUploadFileTambahBahasa"
                    onChange={handleChangeInputFile}
                  />
                  {/* <!-- Button Trigger Modal Tautan Link Start --> */}

                  <button
                    type="button"
                    className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fs-12-ss fw-bold"
                    data-bs-toggle="modal"
                    data-bs-target="#modalTautanLinkTambahBahasa"
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
            </>}
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={buttonState}
            color={"primary"}
            idleText={"Tambah"}
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
        modalId="modalTautanLinkTambahBahasa"
        defaultValue={formData[index].lampiran}
        getLink={(e, link) => handleChangeInput(e, link)}
      />
    </>
  );
};

export default ModalTambahBahasa;
