import { useEffect, useState } from "react";
import { FaFile, FaPaperclip, FaTimes } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { editAbsen, postAbsen } from "../../../client/AbsenClient";
import { uploadFile } from "../../../client/uploadFileClient";
import useSekolah from "../../../hooks/useSekolah";
import { momentPackage } from "../../../utilities/HelperUtils";
import { hideModal } from "../../../utilities/ModalUtils";
import InputFile from "../InputFile/InputFile";
import LoadingProgress from "../LoadingProgress/LoadingProgress";
import ModalStep from "../ModalStep/ModalStep";

const initialFormData = {
  lampiran: [],
};

const ModalAbsen = ({ absenData, getDetailAbsenData }) => {
  const { sekolah } = useSekolah();

  const [formData, setFormData] = useState(initialFormData);
  const [current, setCurrent] = useState(0);
  const [buttonState, setButtonState] = useState("idle");

  const [progress, setProgress] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleChangeForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkProgress = (uploadProgress) => {
    if (uploadProgress <= 100) {
      setProgress(uploadProgress);
    }
  };

  const handleChangeInputFile = async (e, data) => {
    if (data) {
      setFormData({
        ...formData,
        lampiran: [...formData.lampiran, data],
      });
    }
  };

  const uploadFotoMasuk = async (e) => {
    await uploadFile(e.target.files[0], checkProgress, (fileUrl) => {
      if (fileUrl) {
        setFormData({
          ...formData,
          fotoMasuk: fileUrl,
        });
      }
    });
  };

  const uploadFotoPulang = async (e) => {
    if (momentPackage().format("HH:mm") <= "12:00") {
      return toast.error("Absen pulang dibuka pukul 12:00");
    }
    await uploadFile(e.target.files[0], checkProgress, (fileUrl) => {
      if (fileUrl) {
        setFormData({
          ...formData,
          fotoPulang: fileUrl,
          waktu_pulang: momentPackage().format("YYYY-MM-DD HH:mm:ss"),
        });
      }
    });
  };

  const handleSubmitAbsenData = async (smarteschool) => {
    setButtonState("loading");

    const payload = {
      ...formData,
      waktuMasuk: momentPackage().format("YYYY-MM-DD HH:mm:ss"),
    };

    if (formData.id) {
      const { data, error } = await editAbsen(formData.id, payload);
      if (data) {
        hideModal("modalAbsen2");
        toast.success(data?.message);
        setButtonState("success");
        getDetailAbsenData();
      } else {
        error?.map((err) => toast.error(err?.message));
        setButtonState("error");
      }
    } else {
      const { data, error } = await postAbsen(smarteschool || payload);
      if (data) {
        hideModal("modalAbsen2");
        toast.success(data?.message);
        setButtonState("success");
        getDetailAbsenData();
      } else {
        error?.map((err) => toast.error(err?.message));
        setButtonState("error");
      }
    }
  };

  const deleteLampiran = (lampiran) => {
    const modifiedLampiran = formData?.lampiran?.filter(
      (val) => val !== lampiran
    );
    setFormData({
      ...formData,
      lampiran: [...modifiedLampiran],
    });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      ...absenData,
    });
    setCurrent(absenData?.absen ? 1 : 0);
  }, [absenData]);

  useEffect(() => {
    if (progress === 100) {
      setProgress(0);
    }
  }, [progress]);

  return (
    <>
    <LoadingProgress progress={progress} />
    <ModalStep
      modalClass="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
      buttonSubmit={
        <ReactiveButton
          buttonState={buttonState}
          color={"primary"}
          idleText={"Absen"}
          loadingText={"Diproses"}
          successText={"Berhasil"}
          errorText={"Gagal"}
          type={"button"}
          data-bs-dismiss="modal"
          className={"btn btn-primary"}
          onClick={() => handleSubmitAbsenData()}
        />
      }
      disabledSecondaryButton={
        absenData?.absen === "izin" || absenData?.absen === "sakit"
      }
      isNext={false}
      modalId="modalAbsen2"
      title={
        <>
          <h4 className="fw-extrabold mb-0">Absen Harian</h4>
        </>
      }
      current={current}
      next={next}
      prev={prev}
      steps={[
        {
          title: "Keterangan Absen",
          content: (
            <div className="p-2 pt-5">
              <h6 className="fs-18-ss fw-bold color-dark mb-4">
                Pilih Keterangan Absen
              </h6>
              <div
                className="card-absen-hadir card mb-4 pointer rounded-ss border-2"
                onClick={() => {
                  if (
                    !formData.waktu_masuk &&
                    (sekolah.id == 5 || sekolah.id == 7)
                  ) {
                    handleSubmitAbsenData({
                      absen: "hadir",
                      fotoMasuk: "smarteschool",
                      waktu_masuk: momentPackage().format(
                        "YYYY-MM-DD HH:mm:ss"
                      ),
                    });

                    if (sekolah.id == 7)
                      window.open(
                        `https://wa.me/62087876672140?text=Selamat ${
                          momentPackage().format("HH") < 12
                            ? "pagi"
                            : momentPackage().format("HH") > 14
                            ? "siang"
                            : "sore"
                        } pak, ${user?.nama} hari ${momentPackage().format(
                          "DD MMMM YYYY HH:mm:ss"
                        )} %0A Keterangan absen: ${
                          !formData.waktu_masuk ? "Hadir" : "Pulang"
                        }`
                      );

                    return;
                  }

                  setFormData({ ...formData, absen: "hadir" });
                  next();
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center">
                    <img
                      src={`/img/icon-absen-hadir.svg`}
                      alt="icon-absen-hadir"
                    />
                    <div className="ms-4 color-secondary">
                      <p className="mb-1 fs-14-ss">Hari ini</p>
                      <h5 className="m-0 fw-bold">Saya Hadir</h5>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div
                className="card-absen-izin card mb-4 pointer rounded-ss border-2"
                onClick={() => {
                  setFormData({ ...formData, absen: "izin" });
                  next();
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center">
                    <img
                      src={`/img/icon-absen-izin.svg`}
                      alt="icon-absen-izin"
                    />
                    <div className="ms-4 color-secondary">
                      <p className="mb-1 fs-14-ss">Hari ini</p>
                      <h5 className="m-0 fw-bold">Saya Izin</h5>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div
                className="card-absen-sakit card mb-4 pointer rounded-ss border-2"
                onClick={() => {
                  setFormData({ ...formData, absen: "sakit" });
                  next();
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center">
                    <img
                      src={`/img/icon-absen-sakit.svg`}
                      alt="icon-absen-sakit"
                    />
                    <div className="ms-4 color-secondary">
                      <p className="mb-1 fs-14-ss">Hari ini</p>
                      <h5 className="m-0 fw-bold">Saya Sakit</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Bukti Keterangan",
          content: (
            <>
              {formData.absen == "hadir" && (
                <div className="p-2 pt-4">
                  <h6 className="fs-18-ss fw-bold color-dark mb-4">
                    Kirimkan Foto Time Stamp untuk Absen Harian
                  </h6>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <span className="jadwal-ujian-label label-ss border border-2 border-primary-ss color-primary rounded-pill fs-12-ss fw-bold mb-3">
                        Absen Masuk
                      </span>
                      {!formData.fotoMasuk && sekolah?.id != 7 ? (
                        <label
                          htmlFor="absenMasuk"
                          className="form-label mt-3 mb-4 w-100"
                        >
                          <div className="drop-file bg-soft-primary rounded d-flex justify-content-center align-items-center pointer w-100 py-lg-5 py-md-3 py-5">
                            <div className="label-input d-flex align-items-center py-5 px-4 flex-column m-3 m-md-0">
                              <img
                                src={`/img/icon-upload-dropfile.svg`}
                                alt=""
                              />
                              <span className="fs-18-ss fw-semibold color-secondary m-0 mt-4 text-center">
                                Tekan untuk mengupload{" "}
                                <span className="color-primary">Foto</span>
                                {" "}(Opsional)
                              </span>
                            </div>
                          </div>
                        </label>
                      ) : null}
                      <div
                        className="position-relative mx-auto mt-3 mb-4"
                        style={{
                          width: "100%",
                        }}
                      >
                        {formData.fotoMasuk && sekolah?.id != 7 ? (
                          <>
                            <img
                              width="100%"
                              src={`${formData.fotoMasuk}`}
                              className="rounded"
                            />
                            <label
                              className="rounded-circle shadow-primary-ss position-absolute pointer"
                              htmlFor="absenMasuk"
                              style={{
                                right: "5%",
                                top: "5%",
                                width: "50px",
                                height: "50px",
                                background: `
                  url(/img/icon-edit-foto.svg)`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                              }}
                            ></label>
                          </>
                        ) : null}

                        <input
                          className="form-control d-none"
                          type="file"
                          id="absenMasuk"
                          accept="image/*"
                          onChange={uploadFotoMasuk}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <span className="jadwal-ujian-label label-ss border border-2 border-primary-ss color-primary rounded-pill fs-12-ss fw-bold mb-3">
                        Absen Pulang
                      </span>
                      {!formData.fotoPulang && (
                        <label
                          htmlFor="absenPulang"
                          className="form-label mt-3 mb-4 w-100"
                        >
                          <div className="drop-file bg-soft-primary rounded d-flex justify-content-center align-items-center pointer w-100 py-lg-5 py-md-3 py-5">
                            <div className="label-input d-flex align-items-center py-5 px-4 flex-column m-3 m-md-0">
                              <img
                                src={`/img/icon-upload-dropfile.svg`}
                                alt=""
                              />
                              <span className="fs-18-ss fw-semibold color-secondary m-0 mt-4 text-center">
                                Tekan untuk mengupload{" "}
                                <span className="color-primary">Foto</span>
                                {" "}(Opsional)
                              </span>
                            </div>
                          </div>
                        </label>
                      )}
                      <input
                        className="form-control d-none"
                        type="file"
                        id="absenPulang"
                        accept="image/*"
                        onChange={uploadFotoPulang}
                      />
                      <div
                        className="position-relative mx-auto mt-3 mb-4"
                        style={{
                          width: "100%",
                        }}
                      >
                        {formData.fotoPulang && (
                          <>
                            <img
                              width="100%"
                              src={`${formData.fotoPulang}`}
                              className="rounded"
                            />

                            <label
                              className="rounded-circle shadow-primary-ss position-absolute pointer"
                              htmlFor="absenPulang"
                              style={{
                                right: "5%",
                                top: "5%",
                                width: "50px",
                                height: "50px",
                                background: `
                  url(/img/icon-edit-foto.svg)`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                              }}
                            ></label>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {formData.absen !== "hadir" && (
                <div className="p-2 pt-4">
                  <h6 className="fs-18-ss fw-bold color-dark mb-4">
                    Kirimkan Bukti Surat Keterangan Dokter atau Lainnya
                  </h6>
                  <TextareaAutosize
                    className="form-control"
                    autoComplete="off"
                    name="keterangan"
                    style={{
                      resize: "none",
                      width: "100%",
                    }}
                    placeholder="Tuliskan keterangan absen harian"
                    minRows={3}
                    onChange={handleChangeForm}
                    value={formData.keterangan}
                  />
                  <div className="d-flex justify-content-between align-items-center my-4 flex-wrap">
                    <h6 className="mt-0 fw-bold color-dark">Lampiran</h6>
                    <div className="d-flex align-items-md-center flex-md-row flex-column justify-content-between">
                      <label
                        htmlFor="lampiran"
                        className="btn btn-ss fs-12-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fw-bold form-label"
                      >
                        <FaPaperclip className="me-2" />
                        Unggah File
                      </label>
                      <InputFile
                        name="lampiran"
                        id="lampiran"
                        onChange={handleChangeInputFile}
                      />
                    </div>
                  </div>
                  {formData?.lampiran?.map((lampiran) => (
                    <div className="mt-3">
                      <div className="card-lampiran-materi border-light-secondary rounded-ss mb-3">
                        <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-md-row flex-column">
                          <div className="d-flex align-items-center flex-wrap">
                            <div className="pdf-icon ms-0 m-2 shadow-primary-ss">
                              <FaFile className="text-white fs-3" />
                            </div>
                            <div className="p-2">
                              <p className="fw-bold color-dark mb-0">
                                {lampiran}
                              </p>
                              <span className="fs-12-ss color-secondary fs-12-ss fw-bold">
                                {/* PDF */}
                              </span>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center ps-md-2 pt-md-2 pb-md-2 pe-0 pt-3 p-0">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary me-3 btn-pratinjau-file rounded-pill fs-12-ss fw-bold d-flex justify-content-center align-items-center"
                            >
                              Pratinjau
                            </button>
                            <FaTimes
                              className="text-secondary"
                              onClick={() => deleteLampiran(lampiran)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ),
        },
      ]}
    />
    </>
  );
};

export default ModalAbsen;
