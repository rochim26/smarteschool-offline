import { DatePicker, Upload } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaLink, FaPaperclip, FaQq } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { postProfilUser } from "../../client/AuthClient";
import { uploadFile } from "../../client/uploadFileClient";
import useUser from "../../hooks/useUser";
import { momentPackage } from "../../utilities/HelperUtils";
import { hideModal } from "../../utilities/ModalUtils";
import EmptyStateFile from "../Shared/EmptyState/EmptyStateFile";
import ModalTautanLink from "../Shared/ModalTautanLink/ModalTautanLink";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";
import TautanCard from "../Shared/TautanCard/TautanCard";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";
import InputFile from "../Shared/InputFile/InputFile";
import UploadPhoto from "../Shared/UploadPhoto.js/UploadPhoto";

const ModalTambahPortofolio = ({ editIndex = null, setEditIndex }) => {
  const { user, setUser } = useUser();

  const newPortfolio = [
    {
      nama: "",
      bidang: "",
      dokumentasi: [],
      deskripsi: "",
      dimulai: momentPackage(),
      berakhir: momentPackage(),
      lampiranSertifikat: [],
    },
  ];

  const [buttonState, setButtonState] = useState("idle");
  const [formData, setFormData] = useState([
    ...(user?.profil?.portofolio || []),
    ...newPortfolio,
  ]);

  const index = editIndex !== null ? editIndex : formData.length - 1;

  const handleChangeInput = (e, tautan) => {
    const copyFormData = [...formData];

    if (e.target.name === "lampiranSertifikat") {
      copyFormData[index][e.target.name] = [
        ...copyFormData[index][e.target.name],
        tautan,
      ];
    } else {
      copyFormData[index][e.target.name] = tautan || e.target.value;
    }

    setFormData(copyFormData);
  };

  const handleChangeDate = (date, name) => {
    const copyFormData = [...formData];
    copyFormData[index][name] = momentPackage(date);
    setFormData(copyFormData);
  };

  const handleDeleteLampiran = (deleteIndex) => {
    const copyFormData = [...formData];
    const newLampiran = copyFormData[index]["lampiranSertifikat"];
    newLampiran.splice(deleteIndex, 1);
    copyFormData[index]["lampiranSertifikat"] = newLampiran;
    setFormData(copyFormData);
  };

  const handleChangeLampiranSertifikat = async (e, data) => {
    if (data) {
      const copyFormData = [...formData];
      copyFormData[index][e.target.name] = [
        ...copyFormData[index][e.target.name],
        data,
      ];
      setFormData(copyFormData);
    }
  };

  const setupPayload = () => {
    const data = [...formData];
    if (data?.length > 0) {
      const newData = data?.map((d) => ({
        nama: d.nama,
        bidang: d.bidang,
        dokumentasi: d.dokumentasi,
        deskripsi: d.deskripsi,
        dimulai: momentPackage(d.dimulai).format("YYYY-MM-DD"),
        berakhir: momentPackage(d.berakhir).format("YYYY-MM-DD"),
        lampiranSertifikat: d.lampiranSertifikat,
      }));

      if (editIndex !== null) {
        newData.splice(newData.length - 1, 1); // remove last item from array if users try to edit data
      }

      return newData;
    }
  };

  const handleSubmit = async () => {
    setButtonState("loading");
    const payload = setupPayload();
    const { data, error } = await postProfilUser({ portofolio: payload });
    if (data) {
      setEditIndex(null);
      setButtonState("success");
      hideModal("modalTambahBahasa");
      toast.success(data?.message);
      setUser({ ...user, profil: { ...user.profil, portofolio: payload } });
    } else {
      setButtonState("error");
      toast.error(error?.message);
    }
  };

  return (
    <>
      <NewModal
        onCloseModal={() => setEditIndex(null)}
        modalId="modalTambahPortofolio"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">{`${
              editIndex !== null ? "Edit" : "Tambah"
            } Portofolio`}</h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah untuk{" "}
              {`${editIndex !== null ? "mengubah" : "menambahkan"}`} portofolio
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Nama Portofolio</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="nama"
                placeholder="Contoh : Membuat Aplikasi Smart School"
                value={formData[index].nama}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Bidang Portofolio</label>
              <input
                className="form-control"
                autoComplete="off"
                type="text"
                name="bidang"
                placeholder="Contoh : Membuat Aplikasi Smart School"
                value={formData[index].bidang}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-4">
              <UploadPhoto
                name="dokumentasi"
                id="uploadPhotoPortofolio"
                label="Foto Portofolio"
                col="col-md-4"
                listPhoto={formData[index].dokumentasi}
                onChange={(e, uploadedFile) =>
                  handleChangeInput(e, uploadedFile)
                }
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Deskripsi</label>
              <TextareaAutosize
                className="form-control"
                autoComplete="off"
                style={{
                  resize: "none",
                  width: "100%",
                }}
                placeholder="Tuliskan deskripsi portofolio"
                minRows={3}
                name="deskripsi"
                value={formData[index].deskripsi}
                onChange={handleChangeInput}
              />
            </div>
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label">Dimulai Tanggal</label>
                <DatePicker
                  onChange={(date, dateString) =>
                    handleChangeDate(dateString, "dimulai")
                  }
                  placeholder="Pilih tanggal"
                  className="form-control"
                  autoComplete="off"
                  value={momentPackage(formData[index].dimulai)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Berakhir tanggal</label>
                <DatePicker
                  onChange={(date, dateString) =>
                    handleChangeDate(dateString, "berakhir")
                  }
                  placeholder="Pilih Tanggal"
                  className="form-control"
                  autoComplete="off"
                  value={momentPackage(formData[index].berakhir)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-lg-center mb-4 flex-lg-row flex-column flex-wrap">
              <h6 className="fs-18-ss m-0 fw-bold color-dark">
                Lampiran Sertifikat
              </h6>
              <div className="d-flex align-items-md-center flex-md-row flex-column justify-content-between mt-xl-0 mt-md-2 mt-3">
                <label
                  htmlFor="uploadFileSertifikatPortfolio"
                  className="d-flex align-items-center justify-content-center form-label m-0 fs-6 btn btn-ss fs-12-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-lg-3 fw-bold mb-md-0 mb-3"
                >
                  <FaPaperclip className="me-2" />
                  <p className="mb-0">Unggah File</p>
                </label>

                {/* </label> */}
                <InputFile
                  name="lampiranSertifikat"
                  id="uploadFileSertifikatPortfolio"
                  onChange={handleChangeLampiranSertifikat}
                />
                {/* <!-- Button Trigger Modal Tautan Link Start --> */}

                <button
                  type="button"
                  className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fs-12-ss fw-bold"
                  data-bs-toggle="modal"
                  data-bs-target="#modalTautanLinkTambahPortfolio"
                >
                  <FaLink className="me-2" />
                  Tautan Link
                </button>

                {/* <!-- Button Trigger Modal Tautan Link End --> */}
              </div>
            </div>
            {formData[index].lampiranSertifikat.length > 0 ? (
              formData[index].lampiranSertifikat.map((lampiran, index) => (
                <TautanCard
                  value={lampiran}
                  onClickDelete={() => handleDeleteLampiran(index)}
                />
              ))
            ) : (
              <EmptyStateFile
                type="file"
                pesan="Tidak ada file atau link yang dilampirkan"
              />
            )}
          </>
        }
        submitButton={
          <ReactiveButton
            // buttonState={buttonState}
            color={"primary"}
            idleText={`${editIndex !== null ? "Edit" : "Tambah"} Portofolio`}
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
        name="lampiranSertifikat"
        modalId="modalTautanLinkTambahPortfolio"
        getLink={(e, link) => handleChangeInput(e, link)}
      />
    </>
  );
};

export default ModalTambahPortofolio;
