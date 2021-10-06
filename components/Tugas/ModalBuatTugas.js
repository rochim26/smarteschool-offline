import { DatePicker, Select, TimePicker } from "antd";
import React from "react";
import { FaLink, FaPaperclip } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import Tabs from "../Shared/Tabs/Tabs";
import moment from "moment";
import { hideModal } from "../../utilities/ModalUtils";
import Editor from "../Shared/Editor/Editor";
import { momentPackage } from "../../utilities/HelperUtils";
import InputFile from "../Shared/InputFile/InputFile";

const ModalBuatTugas = ({
  editId,
  isDuplicate,
  formData,
  navItemsModalTugas,
  onUpload,
  setOnUpload,
  listAnggota,
  listRombel,
  rombelOptions,
  anggotaRombelOptions,
  uploadFileToServer,
  formatDateTimeValue,
  handleChangeForm,
  handleChangeSelect,
  handleChangeDate,
  handleModalSubmit,
}) => {
  return (
    <div
      className="modal modal-ss fade"
      id="modalBuatTugas"
      tabIndex="-1"
      aria-labelledby="modalBuatTugasLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="modal-title" id="modalBuatTugasLabel">
                      <h4 className="mb-1 fw-extrabold">
                        {editId ? "Edit" : isDuplicate ? "Duplikat" : "Buat"}{" "}
                        Tugas
                      </h4>
                      <span className="fs-6 fw-normal">
                        Isi informasi dibawah untuk membuat tugas
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => hideModal("modalBuatTugas")}
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="row">
                <div className="col-lg-7">
                  <div className="card card-ss rounded-ss p-4 card-content-informasi-tugas mb-md-0 mb-4">
                    <h4 className="mb-4 fw-extrabold color-dark">
                      Informasi Tugas
                    </h4>
                    <div className="mb-4">
                      <label className="form-label">Judul</label>
                      <input
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        name="judul"
                        value={formData?.judul}
                        onChange={(e) => handleChangeForm(e)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Instruksi Tugas</label>
                      <Editor id="instruksi-tugas" />
                      {/* <TextareaAutosize
                              className="form-control"
                              autoComplete="off"
                              style={{
                                resize: "none",
                                width: "100%",
                              }}
                              placeholder="Tuliskan Instruksi Tugas"
                              minRows={3}
                              name="instruksi"
                              value={formData?.instruksi}
                              onChange={handleChangeForm}
                            /> */}
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Bagikan Untuk</label>
                      <div className="row">
                        <div className="col-md-6 mb-md-0 mb-2">
                          <Select
                            disabled={editId}
                            mode="multiple"
                            value={listRombel}
                            options={rombelOptions}
                            onChange={(e) =>
                              handleChangeSelect("pilihKelas", e)
                            }
                            placeholder="Pilih Kelas.."
                            style={{ width: "100%" }}
                            maxTagCount="responsive"
                          />
                        </div>
                        <div className="col-md-6">
                          <Select
                            mode="multiple"
                            value={listAnggota}
                            options={anggotaRombelOptions}
                            placeholder="Pilih Siswa.."
                            style={{ width: "100%" }}
                            onChange={(e) =>
                              handleChangeSelect("pilihSiswa", e)
                            }
                            disabled={
                              listRombel.length === 0 || listRombel.length > 1
                            }
                            maxTagCount="responsive"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">
                        Waktu Pengumpulan Tugas
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="dikumpulkan"
                        value={formData?.dikumpulkan}
                        onChange={handleChangeForm}
                      >
                        <option value={""}>
                          Tugas ini tidak memiliki waktu pengumpulan
                        </option>
                        <option value={true}>
                          Tugas ini memiliki waktu pengumpulan
                        </option>
                      </select>
                    </div>
                    {formData?.dikumpulkan && (
                      <>
                        <div className="mb-4">
                          <label
                            htmlFor="example-date-input"
                            className="form-label"
                          >
                            Tanggal Pengumpulan
                          </label>
                          <DatePicker
                            onChange={(date, dateString) =>
                              handleChangeDate(dateString, "tanggalPengumpulan")
                            }
                            placeholder="Pilih Tanggal"
                            className="form-control"
                            autoComplete="off"
                            value={formatDateTimeValue(
                              momentPackage(formData?.tanggalPengumpulan),
                              "date"
                            )}
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="example-date-input"
                            className="form-label"
                          >
                            Jam Pengumpulan
                          </label>
                          <TimePicker
                            format="HH:mm"
                            onChange={(date, dateString) =>
                              handleChangeForm({
                                target: {
                                  name: "waktuPengumpulan",
                                  value: date,
                                },
                              })
                            }
                            className="form-control"
                            autoComplete="off"
                            placeholder="--:--"
                            value={formData?.waktuPengumpulan}
                          />
                        </div>
                      </>
                    )}
                    <div className="mb-4">
                      <label className="form-label">Penilaian</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="dikkm"
                        value={formData?.dikkm}
                        onChange={handleChangeForm}
                      >
                        <option value="" selected>
                          Tugas ini dinilai tanpa KKM
                        </option>
                        <option value={true}>
                          Tugas ini dinilai dengan KKM
                        </option>
                      </select>
                    </div>
                    {formData?.dikkm && (
                      <div className="mb-4">
                        <label
                          htmlFor="example-number-input"
                          className="form-label"
                        >
                          KKM
                        </label>
                        <input
                          className="form-control"
                          autoComplete="off"
                          type="number"
                          name="kkm"
                          value={formData?.kkm}
                          onChange={handleChangeForm}
                        />
                      </div>
                    )}
                    <div className="mb-4">
                      <label className="form-label">
                        Jadwal Pembagian Tugas
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="dijadwalkan"
                        value={formData?.dijadwalkan}
                        onChange={handleChangeForm}
                      >
                        <option value={""}>Bagikan sekarang</option>
                        <option value={true}>Atur jadwal pembagian</option>
                      </select>
                    </div>
                    {formData.dijadwalkan && (
                      <>
                        <div className="mb-4">
                          <label
                            htmlFor="example-date-input"
                            className="form-label"
                          >
                            Tanggal Pembagian
                          </label>
                          <DatePicker
                            onChange={(date, dateString) =>
                              handleChangeDate(dateString, "tanggalPembagian")
                            }
                            placeholder="Pilih Tanggal"
                            className="form-control"
                            autoComplete="off"
                            value={formatDateTimeValue(
                              momentPackage(formData?.tanggalPembagian),
                              "date"
                            )}
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="example-date-input"
                            className="form-label"
                          >
                            Jam Pembagian
                          </label>
                          <TimePicker
                            format="HH:mm"
                            onChange={(date, dateString) =>
                              handleChangeForm({
                                target: {
                                  name: "waktuPembagian",
                                  value: date,
                                },
                              })
                            }
                            className="form-control"
                            autoComplete="off"
                            placeholder="--:--"
                            value={formData?.waktuPembagian}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="card card-ss rounded-ss p-4 card-content-lampiran-tugas">
                    <div className="d-flex justify-content-between align-items-lg-start mb-4 flex-lg-row flex-column flex-wrap">
                      <h4 className="m-0 fw-extrabold color-dark">
                        Lampiran Tugas
                      </h4>
                      <div className="d-flex align-items-md-center flex-md-row flex-column justify-content-between mt-3">
                        {/* <label
                                  htmlFor="inputFileModalBuatTugas"
                                  className="form-label m-0 fs-6 d-flex align-items-md-center flex-md-row flex-column"
                                > */}

                        <label
                          htmlFor="inputFileModalBuatTugas"
                          className="d-flex align-items-center justify-content-center form-label m-0 fs-6 btn btn-ss fs-14-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-lg-3 fw-bold mb-md-0 mb-3"
                        >
                          <FaPaperclip className="me-2" />
                          <p className="mb-0">Unggah File</p>
                        </label>

                        {/* </label> */}
                        <InputFile
                          name="inputFileModalBuatTugas"
                          id="inputFileModalBuatTugas"
                          setLoading={(bool) => setOnUpload(bool)}
                          onChange={uploadFileToServer}
                        />
                        {/* <!-- Button Trigger Modal Tautan Link Start --> */}

                        <button
                          type="button"
                          className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fs-14-ss fw-bold"
                          data-bs-toggle="modal"
                          data-bs-target="#modalTautanLinkBuatSoalLabel"
                        >
                          <FaLink className="me-2" />
                          Tautan Link
                        </button>

                        {/* <!-- Button Trigger Modal Tautan Link End --> */}
                      </div>
                    </div>
                    <Tabs navItems={navItemsModalTugas} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <div className="container">
              <div className="row ">
                <div className="col-md-12 d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleModalSubmit(true)}
                  >
                    Draf
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary ms-3"
                    onClick={() => handleModalSubmit()}
                    disabled={onUpload}
                  >
                    {editId ? "Edit" : isDuplicate ? "Duplikat" : "Bagikan"}{" "}
                    Tugas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBuatTugas;
