import { DatePicker } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  FaEllipsisH,
  FaFile,
  FaLink,
  FaMinus,
  FaPaperclip,
  FaPlus,
  FaRegClock,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import Avatar from "../Shared/Avatar/Avatar";
import EmptyStateFile from "../Shared/EmptyState/EmptyStateFile";
import ModalTautanLink from "../Shared/ModalTautanLink/ModalTautanLink";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";
import Tabs from "../Shared/Tabs/Tabs";
import fileTypes from "../../data/supported-file-types.json";
import officeTypes from "../../data/office-live-types.json";
import { toast } from "react-toastify";
import InputFile from "../Shared/InputFile/InputFile";

const ModalDetailKategori = ({
  editId,
  formData,
  handleChangeForm,
  setFormData,
  handleSubmit,
  jobs,
  anggota,
  user,
  proyekRef,
}) => {
  const [komentar, setKomentar] = useState("");
  const [comments, setComments] = useState([]);
  const [commentLimit, setCommentLimit] = useState(3);
  const [activityDates, setActivityDates] = useState([]);
  const [activity, setActivity] = useState([]);
  const [activityLimit, setActivityLimit] = useState([]);
  const [pekerjaanData, setPekerjaanData] = useState({});
  const compareString = [
    "batas_waktu",
    "prioritas",
    "status",
    "deskripsi",
    "judul",
  ];

  useEffect(async () => {
    if (formData.id) {
      getKomentar();
      getLogPekerjaan();
      if (pekerjaanData.id !== formData.id) {
        setPekerjaanData(formData);
      }
    } else {
      setPekerjaanData({});
      setComments([]);
    }
  }, [formData]);

  useEffect(() => {
    if (formData.hasOwnProperty("id")) {
      const dates = [];
      const limit = [];
      const count = Math.ceil(
        (activity[0]?.createdAt.toDate() -
          activity[activity.length - 1]?.createdAt.toDate()) /
          (1000 * 60 * 60 * 24)
      );
      for (let i = 0; i < count; i++) {
        dates.push(
          moment(activity[0]?.createdAt.toDate()).subtract(i, "days").toDate()
        );
        limit.push(3);
      }
      setActivityLimit([...limit]);
      setActivityDates([...dates]);
    } else {
      setActivityDates([]);
    }
  }, [activity, formData]);

  const handleInputChange = (name, value) => {
    if (compareString.includes(name)) {
      setFormData({
        ...formData,
        [name]: value,
        before: {
          ...formData.before,
          [name]: value,
        },
      });
    } else {
      if (name == "lampiran") {
        setFormData({
          ...formData,
          [name]: [...formData.lampiran, value],
          before: {
            ...formData.before,
            [name]: formData?.before?.lampiran
              ? [...formData.before.lampiran, value]
              : [value],
          },
        });
      }
    }
  };

  const getLogPekerjaan = async () => {
    const logData = [];
    const getLog = await proyekRef
      .collection("pekerjaan")
      .doc(`${formData.id}`)
      .collection("logs")
      .get();
    getLog.docs.forEach((doc) => {
      logData.push({ ...doc.data(), id: doc.id });
    });
    setActivity([
      ...logData.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate()),
    ]);
  };

  const postLogPekerjaan = async (message) => {
    if (pekerjaanData.hasOwnProperty("id")) {
      const payload = {
        by: user,
        message,
        createdAt: moment().toDate(),
      };
      await proyekRef
        .collection("pekerjaan")
        .doc(`${formData.id}`)
        .collection("logs")
        .add(payload);
      getLogPekerjaan();
    }
  };

  const getKomentar = async (limit = 3) => {
    const komenData = [];
    const getKomen = await proyekRef
      .collection("pekerjaan")
      .doc(`${formData.id}`)
      .collection("komentar")
      .get();
    getKomen.docs.forEach((doc) => {
      komenData.push({ ...doc.data(), id: doc.id });
    });
    setComments([
      ...komenData
        .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate())
        .slice(0, limit),
    ]);
  };

  const postKomentar = async () => {
    const payload = {
      by: user,
      message: komentar,
      createdAt: moment().toDate(),
    };
    const post = await proyekRef
      .collection("pekerjaan")
      .doc(`${formData.id}`)
      .collection("komentar")
      .add(payload);
    postLogPekerjaan(`Komentar Baru Ditambahkan "${komentar}"`);
    setKomentar("");
    getKomentar();
  };

  const deleteKomentar = async (id) => {
    await proyekRef
      .collection("pekerjaan")
      .doc(`${formData.id}`)
      .collection("komentar")
      .doc(`${id}`)
      .delete();
    getKomentar(commentLimit);
  };

  const loadMoreComment = () => {
    setCommentLimit(commentLimit + 2);
    getKomentar(commentLimit + 2);
  };

  const loadLessComment = () => {
    if (commentLimit - 2 <= 0) {
      setCommentLimit(0);
      getKomentar(0);
    } else {
      setCommentLimit(commentLimit - 2);
      getKomentar(commentLimit - 2);
    }
  };

  const handleChangeInputFile = async (e, data) => {
    if (data) {
      handleInputChange("lampiran", data);
    }
  };

  const deleteFile = async (file) => {
    postLogPekerjaan(
      `Dokumen Dihapus, "${file
        .split("?")[0]
        ?.replace(
          "https://firebasestorage.googleapis.com/v0/b/smart-school-300211.appspot.com/o/",
          ""
        )}"`
    );
    handleChangeForm({
      target: {
        name: "lampiran",
        value: formData.lampiran.filter((data) => data !== file),
      },
    });
  };

  const navItemsModalDetailKolaborasi = [
    {
      id: "laporan",
      nav: "Laporan",
      active: true,
      content: (
        <>
          <div className="row mt-4 gy-4">
            <div className="col-lg-6">
              <h6 className="fs-18-ss fw-bold color-dark mb-2">Ditugaskan</h6>
              <div className="d-flex align-items-center flex-wrap">
                {formData?.anggota && anggota
                  ? formData?.anggota?.slice(0, 4).map((d, idx) => {
                      const data = anggota?.find((e) => e.id == d);
                      if (data)
                        return (
                          <div className="me-3 mb-lg-0 mb-2">
                            <Avatar
                              name={data?.user?.nama}
                              src={data?.user?.avatar}
                              size={45}
                            />
                          </div>
                        );
                    })
                  : ""}
                {formData?.anggota?.length > 4 ? (
                  <div
                    className="rounded-circle bg-white shadow-primary-ss d-flex justify-content-center align-items-center color-primary fw-bold fs-12-ss position-relative me-3"
                    style={{
                      width: "45px",
                      height: "45px",
                    }}
                  >
                    {`+${formData?.anggota?.length - 4}`}
                  </div>
                ) : (
                  ""
                )}
                <div
                  className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white fw-bold fs-12-ss position-relative me-3"
                  style={{
                    width: "45px",
                    height: "45px",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#modalDitugaskan"
                >
                  <FaPlus />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <label className="form-label">Tanggal Batas Waktu</label>
              <DatePicker
                onChange={(date, dateString) =>
                  handleInputChange("batas_waktu", dateString)
                }
                placeholder="Pilih tanggal"
                className="form-control"
                autoComplete="off"
                value={
                  formData?.batas_waktu
                    ? moment(formData?.batas_waktu)
                    : moment()
                }
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Prioritas</label>
              <SelectShared
                name="prioritas"
                handleChangeSelect={(value) =>
                  handleInputChange("prioritas", value.value)
                }
                value={formData?.prioritas}
                options={[
                  { value: "Rendah", label: "Rendah" },
                  { value: "Sedang", label: "Sedang" },
                  { value: "Tinggi", label: "Tinggi" },
                ]}
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Status</label>
              <SelectShared
                name="baru"
                handleChangeSelect={(value) => {
                  handleInputChange("status", value.value);
                }}
                value={formData?.status}
                options={[
                  { value: "Baru", label: "Baru" },
                  { value: "Menunggu", label: "Menunggu" },
                  { value: "Terhambat", label: "Terhambat" },
                  { value: "Sedang Dikerjakan", label: "Sedang Dikerjakan" },
                  { value: "Sudah Dikerjakan", label: "Sudah Dikerjakan" },
                  { value: "Selesai", label: "Selesai" },
                ]}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Deskripsi</label>
              <TextareaAutosize
                className="form-control"
                autoComplete="off"
                style={{
                  resize: "none",
                  width: "100%",
                }}
                placeholder="Tuliskan deskripsi pekerjaan"
                minRows={3}
                value={formData?.deskripsi}
                onChange={({ target }) => {
                  handleChangeForm({
                    target: { name: "deskripsi", value: target.value },
                  });
                }}
                onBlur={({ target }) =>
                  handleInputChange("deskripsi", target.value)
                }
              />
            </div>
            <div className="col-md-12">
              <div className="d-flex justify-content-between align-items-md-center mb-4 flex-md-row flex-column flex-wrap">
                <h6 className="fs-18-ss m-0 fw-bold color-dark">Lampiran</h6>
                <div className="d-flex align-items-md-center flex-md-row flex-column justify-content-between mt-xl-0 mt-md-2 mt-3">
                  <label
                    htmlFor="addLampiranKategori"
                    className="d-flex align-items-center justify-content-center form-label m-0 fs-6 btn btn-ss fs-12-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-md-3 fw-bold mb-md-0 mb-3"
                  >
                    <FaPaperclip className="me-2" />
                    <p className="mb-0">Unggah File</p>
                  </label>

                  {/* </label> */}
                  <InputFile
                    name="addLampiranKategori"
                    id="addLampiranKategori"
                    onChange={handleChangeInputFile}
                  />
                  {/* <!-- Button Trigger Modal Tautan Link Start --> */}

                  <button
                    type="button"
                    className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fs-12-ss fw-bold"
                    data-bs-toggle="modal"
                    data-bs-target="#modalTautanLinkKategoriRuangKerja"
                  >
                    <FaLink className="me-2" />
                    Tautan Link
                  </button>

                  {/* <!-- Button Trigger Modal Tautan Link End --> */}
                </div>
              </div>
              {formData?.lampiran?.length === 0 ? (
                <EmptyStateFile
                  type="file"
                  pesan="Tidak ada file atau link yang dilampirkan"
                />
              ) : (
                formData?.lampiran?.map((file, idx) => {
                  const filename = file
                    .split("?")[0]
                    ?.replace(
                      "https://firebasestorage.googleapis.com/v0/b/smart-school-300211.appspot.com/o/",
                      ""
                    );
                  const type =
                    filename.substring(
                      filename.lastIndexOf(".") + 1,
                      filename.length
                    ) || filename;
                  return (
                    <div
                      className="bg-soft-primary p-3 rounded-ss mb-3 pointer d-flex justify-content-between"
                      key={`file-${idx}`}
                    >
                      <a
                        href={
                          officeTypes.includes(type.toUpperCase())
                            ? `http://view.officeapps.live.com/op/view.aspx?src=${file}`
                            : fileTypes.includes(type.toUpperCase())
                            ? `https://drive.google.com/viewerng/viewer?url=${file}`
                            : file
                        }
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <div className="file-content d-flex align-items-center">
                          <div
                            className="rounded-circle bg-primary d-flex justify-content-center align-items-center text-white fs-3 p-3 me-2"
                            style={{
                              width: "48px",
                              height: "48px",
                            }}
                          >
                            <FaFile className="fs-2" />
                          </div>
                          <div className="p-3 d-flex flex-column">
                            <p className="fw-bold color-primary mb-1">
                              {filename.includes(".jpeg") ? (
                                <img
                                  src={file}
                                  alt="file"
                                  sizes={50}
                                  height={100}
                                />
                              ) : (
                                filename
                              )}
                            </p>
                          </div>
                        </div>
                      </a>
                      <FaTimes
                        className="text-secondary pointer"
                        onClick={() => deleteFile(file)}
                      />
                    </div>
                  );
                })
              )}
            </div>
            <div className="row">
              <div className="col-md-12">
                <h6 className="fs-18-ss fw-bold color-dark">Komentar</h6>
              </div>
              <div className="row mt-3 komen-timeline">
                <div className="col-md-12">
                  {comments.map((d) => {
                    return (
                      <div className="comment-items d-flex">
                        <div className="ava me-3">
                          <Avatar name={d.by.nama} />
                        </div>
                        <div className="d-flex align-items-center justify-content-between w-100">
                          <div className="comment-content">
                            <p className="fw-14-ss fw-bold color-dark mb-2">
                              {d.by.nama}
                            </p>
                            <p className="fw-14-ss color-secondary mb-2">
                              {d.message}
                            </p>
                            <div className="">
                              <span className="color-secondary fw-semibold fs-12-ss">
                                {moment(d.createdAt.toDate())
                                  .locale("ID")
                                  .format("DD MMM YYYY hh:mm:ss a")}
                              </span>
                            </div>
                          </div>
                          <button
                            className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fs-6 icon-trash-komen-timeline"
                            style={{
                              width: "40px",
                              height: "40px",
                            }}
                            onClick={() => deleteKomentar(d.id)}
                          >
                            <FaTrashAlt className="color-secondary" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <FaMinus
                    size={40}
                    className="pointer"
                    onClick={() => loadLessComment()}
                  />
                  <FaEllipsisH
                    size={40}
                    className="pointer"
                    onClick={() => loadMoreComment()}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row justify-content-end mt-3 comment-input">
                <div className="col-md-12">
                  {formData.id && (
                    <div className="comment-items d-flex">
                      <div className="ava me-3 d-md-inline d-none">
                        <Avatar
                          name="Alif Pramana"
                          //   src={user?.avatar}
                        />
                      </div>
                      <div className="flex-grow-1 rounded-ss border border-secondary border-light-secondary-ss position-relative p-2 pe-5">
                        <TextareaAutosize
                          className="textarea-auto"
                          style={{
                            resize: "none",
                            width: "100%",
                            border: "none",
                          }}
                          placeholder="Tuliskan komentar..."
                          onChange={(e) => setKomentar(e.target.value)}
                          value={komentar}
                        />
                        <button
                          className="border-0 btn position-absolute pe-2"
                          style={{
                            bottom: "5%",
                            right: "0",
                          }}
                          onClick={() => postKomentar()}
                        >
                          <img
                            src={`/img/btn-submit-comment.svg`}
                            alt="button-submit-comment"
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "aktivitas",
      nav: "Aktivitas",
      active: false,
      content: (
        <>
          <div className="row mt-4">
            <div className="col-md-12">
              {activityDates.map((date, idx) => {
                const filtered = activity
                  ?.filter((d) =>
                    moment(d.createdAt.toDate()).isSame(date, "days")
                  )
                  .slice(0, activityLimit[idx]);
                if (filtered.length > 0)
                  return (
                    <>
                      <button
                        className="btn btn-primary-ss px-4 py-1 rounded-pill shadow-primary-ss mb-4"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapseExample${idx}`}
                        aria-expanded="false"
                        aria-controls={`collapseExample${idx}`}
                      >
                        {moment(date).locale("ID").format("DD-MMMM dddd")}
                      </button>
                      <div class="collapse show" id={`collapseExample${idx}`}>
                        {filtered.map((log, idx) => {
                          return (
                            <div
                              className="position-relative activity-items"
                              key={`log-${idx}`}
                            >
                              <div className="d-flex align-items-mb-center activity-items-content">
                                <Avatar
                                  name={log.by.nama}
                                  size={45}
                                  className="activity-avatar"
                                />
                                <div className="ms-4">
                                  <h6 className="fs-14-ss color-dark mb-1 fw-bold">
                                    {log.message}
                                  </h6>
                                  <span className="fs-12-ss fw-semilbold">
                                    {moment(log.createdAt.toDate())
                                      .locale("ID")
                                      .format("D MMM YYYY hh:mm:ss a")}{" "}
                                    oleh{" "}
                                    <span className="color-primary">
                                      {log.by.nama}
                                    </span>
                                  </span>
                                </div>
                              </div>
                              {idx < filtered.length - 1 ? (
                                <span className="activity-items-stripe position-absolute"></span>
                              ) : (
                                ""
                              )}
                            </div>
                          );
                        })}
                        <FaMinus
                          size={20}
                          className="pointer"
                          onClick={() =>
                            setActivityLimit([
                              ...activityLimit.map((d, index) => {
                                if (index == idx) {
                                  if (d - 1 <= 0) {
                                    return 1;
                                  } else {
                                    return d - 2;
                                  }
                                } else {
                                  return d;
                                }
                              }),
                            ])
                          }
                        />
                        <FaPlus
                          size={20}
                          className="pointer"
                          onClick={() =>
                            setActivityLimit([
                              ...activityLimit.map((d, index) => {
                                if (index == idx) {
                                  return d + 2;
                                } else {
                                  return d;
                                }
                              }),
                            ])
                          }
                        />
                        <p>
                          {activity?.filter((d) =>
                            moment(d.createdAt.toDate()).isSame(date, "days")
                          ).length - filtered.length}{" "}
                          aktivitas
                        </p>
                      </div>
                    </>
                  );
              })}
            </div>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <NewModal
        modalId="modalDetailKategori"
        modalDetailKategori={true}
        isModalDetail={true}
        modalSize="fullscreen"
        title={
          <>
            <h5 className="fw-extrabold color-primary mb-0">
              Daftar Pekerjaan
            </h5>
          </>
        }
        content={
          <>
            <div
              className={`d-flex align-lg-items-center flex-lg-row flex-column bab-detail mb-4`}
            >
              <div className="bab-title mb-lg-0 mb-3">
                <TextareaAutosize
                  className="ps-0 border-0 border-bottom border-2 form-control form-bab-materi shadow-none fs-4 color-dark fw-extrabold"
                  placeholder="Tuliskan judul disini"
                  onChange={({ target }) =>
                    handleChangeForm({
                      target: { name: "judul", value: target.value },
                    })
                  }
                  onBlur={({ target }) =>
                    handleInputChange("judul", target.value)
                  }
                  value={formData?.judul}
                />
              </div>
              <div className="d-flex flex-column">
                <div
                  className={`rounded-ss px-4 py-2 text-white fs-14-ss bg-danger shadow-danger-ss`}
                  style={{ minWidth: "235px" }}
                >
                  <FaRegClock className="me-2" />
                  Batas Waktu{" "}
                  {moment(formData?.batas_waktu || "")
                    .locale("ID")
                    .format("DD MMMM YYYY")}
                </div>
              </div>
            </div>
            {/* <div className="d-flex justify-content-between align-md-items-center flex-md-row flex-column bab-detail mb-4">
              <div className="bab-title flex-grow-1">
                <input
                  className="ps-0 border-0 border-bottom border-2 form-control form-bab-materi shadow-none fs-4 color-dark fw-extrabold"
                  name="judul"
                  // value={formData?.judul}
                  // onChange={handleChangeForm}
                  placeholder="Tulis judul buku kategori pekerjaan disini"
                />
              </div>
            </div> */}
            <Tabs navItems={navItemsModalDetailKolaborasi} />
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={formData?.btnKategori}
            color={"primary"}
            idleText={"Simpan"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            // data-bs-dismiss="modal"
            className={"btn btn-primary"}
            onClick={handleSubmit}
          />
        }
      />
      <ModalTautanLink
        toastMessage="Video berhasil ditambahkan"
        // name="videoProfil"
        modalId="modalTautanLinkKategoriRuangKerja"
        // defaultValue={formData?.videoProfil}
        // getLink={(e, link) => handleChangeForm(e, link)}
      />
    </>
  );
};

export default ModalDetailKategori;
