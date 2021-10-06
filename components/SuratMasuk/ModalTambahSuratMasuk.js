import { DatePicker } from "antd";
import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import UploadSuratMasuk from "../Shared/UploadBanner/UploadSuratMasuk";
import Editor from "../Shared/Editor/Editor";
import InputFile from "../Shared/InputFile/InputFile";

const ModalTambahSuratMasuk = ({
  handleChangeForm,
  formData,
  handleSubmit,
  isMasuk,
}) => {
  useEffect(() => {
    window.$("#isi").summernote("reset");
  }, []);
  useEffect(() => {
    window.$("#isi").summernote("code", formData.isi);
  }, [formData.isi]);
  return (
    <>
      <NewModal
        modalId="modalTambahSuratMasuk"
        modalSize="lg"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">
              {formData.id ? "Edit" : "Buat"} Agenda Surat{" "}
              {isMasuk ? "Masuk" : "Keluar"}
            </h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah untuk {formData.id ? "mengedit" : "membuat"}{" "}
              agenda surat {isMasuk ? "masuk" : "keluar"}
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">
                {isMasuk ? "Asal" : "Penerima"} Surat
              </label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan asal surat"
                type="text"
                name="asal"
                value={formData?.asal}
                onChange={handleChangeForm}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Nomor Surat</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan nomor surat"
                type="text"
                name="nomor"
                value={formData?.nomor}
                onChange={handleChangeForm}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Tanggal Surat</label>
              <DatePicker
                className="form-control"
                autoComplete="off"
                value={formData?.tanggal}
                placeholder="Pilih tanggal"
                onChange={(date, dateString) =>
                  handleChangeForm({ target: { name: "tanggal", value: date } })
                }
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Perihal</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan perihal surat"
                type="text"
                name="perihal"
                value={formData?.perihal}
                onChange={handleChangeForm}
              />
            </div>
            <div className="mb-4">
              <h6 className="fs-18-ss fw-bold color-dark mb-3">
                Tingkat Keamanan
              </h6>
              <div className="row">
                <div className="form-check-ss col-md-4 position-relative mb-3 mb-md-0">
                  <input
                    className="form-check-input form-check-radio position-absolute"
                    type="radio"
                    name="keamanan"
                    id="sangat-rahasia"
                    style={{
                      top: "36%",
                      left: "2em",
                    }}
                    name="keamanan"
                    value="Sangat Rahasia"
                    checked={formData.keamanan == "Sangat Rahasia"}
                    onChange={handleChangeForm}
                  />
                  <label
                    className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="sangat-rahasia"
                  >
                    <span className="ms-4 ps-2">Sangat Rahasia</span>
                  </label>
                </div>
                <div className="form-check-ss col-md-4 position-relative mb-3 mb-md-0">
                  <input
                    className="form-check-input form-check-radio position-absolute"
                    type="radio"
                    name="keamanan"
                    id="rahasia"
                    style={{
                      top: "36%",
                      left: "2em",
                    }}
                    name="keamanan"
                    value="Rahasia"
                    checked={formData.keamanan == "Rahasia"}
                    onChange={handleChangeForm}
                  />
                  <label
                    className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="rahasia"
                  >
                    <span className="ms-4 ps-2">Rahasia</span>
                  </label>
                </div>
                <div className="form-check-ss col-md-4 position-relative">
                  <input
                    className="form-check-input form-check-radio position-absolute"
                    type="radio"
                    name="keamanan"
                    id="biasa"
                    style={{
                      top: "36%",
                      left: "2em",
                    }}
                    name="keamanan"
                    value="Biasa"
                    checked={formData.keamanan == "Biasa"}
                    onChange={handleChangeForm}
                  />
                  <label
                    className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="biasa"
                  >
                    <span className="ms-4 ps-2">Biasa</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Isi Ringkasan Surat</label>
              <Editor id="isi" />
            </div>
            <div className="">
              <div className="d-flex align-items-md-center flex-md-row flex-column">
                <p className="form-label">File Surat</p>
              </div>
              <UploadSuratMasuk
                accept="file/*"
                id="file"
                name="file"
                titleUnggahan="file"
                isFile
                // preview={formData.ttd}
                onUpload={(onUpload) =>
                  handleChangeForm({
                    target: {
                      name: "btnBio",
                      value: onUpload ? "loading" : "idle",
                    },
                  })
                }
                onChange={(e, uploadedFile) =>
                  handleChangeForm({
                    target: {
                      name: "file",
                      value: [...formData.file, uploadedFile],
                    },
                  })
                }
              />

              {/* tampilan ketika file sudah  diinsert */}
              {formData?.file?.map((item) => {
                const fileName = item
                  .split("?")[0]
                  .replace(
                    "https://firebasestorage.googleapis.com/v0/b/smart-school-300211.appspot.com/o/",
                    ""
                  );
                const type =
                  fileName.substring(
                    fileName.lastIndexOf(".") + 1,
                    fileName.length
                  ) || fileName;
                return (
                  <div className="card-lampiran-materi border-0 bg-soft-primary rounded-ss mb-4">
                    <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-row">
                      {/* <a
                  href={isUploadedFile ? preview : URL.createObjectURL(preview)}
                  target="_blank"
                > */}
                      <div className="d-flex align-items-center flex-wrap">
                        <img src="/img/icon-upload-link.svg" alt="" />
                        <div className="px-4">
                          <p className="fw-bold color-dark mb-0 ">{fileName}</p>
                          <span className="fs-12-ss color-secondary fs-12-ss fw-bold">
                            {type}
                          </span>
                        </div>
                      </div>
                      {/* </a> */}
                      <div
                        className="d-flex justify-content-between align-items-center ps-md-2 pt-md-2 pb-md-2 pe-0 p-0"
                        onClick={() =>
                          handleChangeForm({
                            target: {
                              name: "file",
                              value: [
                                ...formData.file.filter((file) => file != item),
                              ],
                            },
                          })
                        }
                      >
                        <FaTimes
                          className="pointer fs-4"
                          style={{ color: "#96DAFF" }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={formData.btnBio}
            color={"primary"}
            idleText={formData.id ? "Edit Agenda" : "Buat Agenda"}
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
    </>
  );
};

export default ModalTambahSuratMasuk;
