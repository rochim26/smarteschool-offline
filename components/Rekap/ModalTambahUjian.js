import { DatePicker } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import { momentPackage } from "../../utilities/HelperUtils";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const ModalTambahUjian = ({
  handleChangeForm,
  handleChangeSelect,
  formData,
  _postRekapUjian,
  handleChangeDate,
  tugas,
}) => {
  const [diambil, setDiambil] = useState(false);
  const ambilJudul = (d) => {
    setDiambil(d);
    handleChangeForm({ target: { name: "mTugasId", value: 0 } });
  };

  const selectTugas = tugas?.map((data, idx) => {
    return {
      value: data?.id,
      label: `${data?.judul}`,
    };
  });

  useEffect(() => {
    if (formData.mTugasId) setDiambil(true);
  }, [formData]);

  return (
    <>
      <NewModal
        modalId="modalTambahTugas"
        modalSize="lg"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Judul Materi</h4>
            <span className="fs-6 fw-normal">
              Dibawah ini adalah keterangan ujian harian yang diberikan untuk
              siswa
            </span>
          </>
        }
        content={
          <>
            {/* <div className="mb-3">
              <h6 className="fs-18-ss fw-bold color-dark mb-3">
                Ujian diambil dari Smartschool
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
                    name="diambil"
                    checked={diambil == true}
                    onClick={() => ambilJudul(true)}
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
                    }}
                    checked={diambil == false}
                    name="diambil"
                    onClick={() => ambilJudul(false)}
                  />
                  <label
                    className="form-check-label-salah rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="radioTidak"
                  >
                    <span className="ms-4 ps-2">Tidak</span>
                  </label>
                </div>
              </div>
            </div> */}
            {/* {diambil ? (
              <div>
                <div className="mb-4">
                  <label className="form-label">Judul Tugas</label>
                  <SelectShared
                    name="mTugasId"
                    handleChangeSelect={handleChangeSelect}
                    value={formData.mTugasId}
                    options={selectTugas}
                  />
                </div>
              </div>
            ) : ( */}
            <div className="mb-4">
              <label className="form-label">Judul Ujian</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan judul anda"
                type="text"
                name="judul"
                value={formData?.judul}
                onChange={handleChangeForm}
              />
            </div>
            {/* )} */}

            <div className="mt-4 mb-3">
              <label htmlFor="example-date-input" className="form-label">
                Tanggal Ujian
              </label>
              <DatePicker
                onChange={(date, dateString) =>
                  handleChangeDate(dateString, "tanggal")
                }
                placeholder="Pilih tanggal"
                className="form-control"
                autoComplete="off"
                value={formData?.tanggal && momentPackage(formData?.tanggal)}
              />
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={formData.btnBio}
            color={"primary"}
            idleText={"Simpan"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            data-bs-dismiss="modal"
            className={"btn btn-primary"}
            onClick={() => _postRekapUjian()}
          />
        }
      />
    </>
  );
};

export default ModalTambahUjian;
