import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { FaLink, FaPaperclip, FaTimes } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { postSanksiSiswa } from "../../../client/TataTertibClient";
import { hideModal } from "../../../utilities/ModalUtils";
import EmptyStateFile from "../../Shared/EmptyState/EmptyStateFile";
import InputFile from "../../Shared/InputFile/InputFile";
import ModalTautanLink from "../../Shared/ModalTautanLink/ModalTautanLink";
import NewModal from "../../Shared/NewModal/NewModal";


const ModalSanksiTindakLanjut = ({ daftarSanksi, jumlahPoinPelanggaran, _getDetailSiswa, siswa }) => {

  const selectedSanksi = daftarSanksi?.find(sanksi => (jumlahPoinPelanggaran >= sanksi?.poinBawah && jumlahPoinPelanggaran <= sanksi?.poinAtas));

  const initialFormData = {
    mSanksiPelanggaranId: selectedSanksi?.id,
    keterangan: "",
    lampiran: [],
    link: []
  }

  const [formData, setFormData] = useState(initialFormData);

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeInputFile = async (e, data) => {
    if (data) {
      setFormData({
        ...formData,
        lampiran: [...formData?.lampiran, data]
      });
    }
  };

  const handleChangeTautanLink = (e, link) => {
    setFormData({
      ...formData,
      link: [...formData.link, link]
    })
  }

  const handleRemoveLampiran = (lamp) => {
    setFormData({
      ...formData,
      lampiran: formData.lampiran.filter(lampiranFile => lampiranFile !== lamp)
    })
  }

  const handleRemoveLink = (link) => {
    setFormData({
      ...formData,
      link: formData.link.filter(lampiranLink => lampiranLink !== link)
    });
  }

  const handleSubmit = async () => {
    const { data,error } = await postSanksiSiswa(siswa?.id, formData);
    if (data) {
      toast.success(data?.message);
      hideModal("ModalSanksiTindakLanjut");
      _getDetailSiswa(siswa?.id);
    } else {
      error?.map(err => toast?.error(err?.message));
    }
  }

  useEffect(() => {
    if (selectedSanksi) {
      setFormData({
        ...formData,
        mSanksiPelanggaranId: selectedSanksi?.id
      })
    }
  }, [selectedSanksi]);

  return (
    <>
      <NewModal
        modalId="ModalSanksiTindakLanjut"
        modalSize="lg"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Sanksi Tindak Lanjut</h4>
            <span className="fs-14-ss fw-normal">
              Isi informasi dibawah ini untuk menambah pelanggaran
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Sanksi</label>
              {/* * Catatan Developer : Auto Select */}
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Sanksi"
                type="text"
                name="nama"
                value="Pemanggilan Orang Tua dan Pembinaan oleh BK"
                disabled
                value={selectedSanksi?.nama}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Keterangan</label>
              <TextareaAutosize
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan keterangan untuk siswa"
                type="text"
                name="keterangan"
                style={{}}
                value={formData?.keterangan}
                onChange={handleChangeForm}
              />
            </div>
            <div className="mb-4">
              <div className="d-flex align-items-md-center flex-md-row flex-column justify-content-between mb-4">
                <p className="form-label">Lampiran</p>
                <div className="d-flex justify-content-between flex-column flex-md-row">
                  <label
                    htmlFor="lampiranFileModalSanksiTindakLanjut"
                    className="d-flex align-items-center justify-content-center form-label m-0 fs-6 btn btn-ss fs-14-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-lg-3 fw-bold mb-md-0 mb-3"
                  >
                    <FaPaperclip className="me-2" />
                    <p className="mb-0">Unggah File</p>
                  </label>
                  <InputFile
                    accept="file/*"
                    name="lampiran"
                    id="lampiranFileModalSanksiTindakLanjut"
                    onChange={handleChangeInputFile}
                  />
                  <button
                    type="button"
                    className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fs-14-ss fw-bold"
                    data-bs-toggle="modal"
                    data-bs-target="#ModalTautanLinkSanksiTindakLanjut"
                  >
                    <FaLink className="me-2" />
                    Tautan Link
                  </button>
                </div>
              </div>
              {/* tampilan ketika file yang diinsert */}
              { formData?.lampiran?.map((lamp, index) => (
                <div className="card-lampiran-materi border-0 bg-soft-primary rounded-ss mt-4" key={`${lamp}-${index}`}>
                  <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-row">
                    {/* <a
                      href={isUploadedFile ? preview : URL.createObjectURL(preview)}
                      target="_blank"
                    > */}
                    <div className="d-flex align-items-center flex-wrap" style={{ width: "95%" }}>
                      <img src="/img/icon-file-download.svg" alt="" />
                      <div className="p-2" style={{ width: "90%" }}>
                        <Tooltip title={lamp}>
                          <p className="fw-bold color-dark mb-0 ms-4 text-truncate">{lamp}</p>
                        </Tooltip>
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
                        onClick={() => handleRemoveLampiran(lamp)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* tampilan ketika link yg diinsert */}
              { formData?.link?.map((link, index) => (
                <div className="card-lampiran-materi border-0 bg-soft-primary rounded-ss mt-4" key={`${link}-${index}`}>
                  <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-row">
                    {/* <a
                      href={isUploadedFile ? preview : URL.createObjectURL(preview)}
                      target="_blank"
                    > */}
                    <div className="d-flex align-items-center flex-wrap" style={{ width: "95%" }}>
                      <img src="/img/icon-upload-link.svg" alt="" />
                      <div className="p-2" style={{ width: "90%" }}>
                        <Tooltip title={link}>
                          <p className="fw-bold color-dark mb-0 ms-4 text-truncate">{link}</p>
                        </Tooltip>
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
                        onClick={() => handleRemoveLink(link)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* tampilan kosong */}
              {formData?.lampiran?.length === 0 && formData?.link?.length === 0 && (
                <EmptyStateFile
                  type="file"
                  pesan="Tidak ada file atau link yang dilampirkan"
                />
              )}
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={"idle"}
            color={"primary"}
            idleText={"Tambah Pelanggaran"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            data-bs-dismiss="modal"
            className={"btn btn-primary"}
            onClick={() => handleSubmit()}
          />
        }
      />
      <ModalTautanLink
        toastMessage="Link berhasil ditambahkan"
        name="link"
        modalId="ModalTautanLinkSanksiTindakLanjut"
        getLink={(e, link) => handleChangeTautanLink(e, link)}
      />
    </>
  );
};

export default ModalSanksiTindakLanjut;
