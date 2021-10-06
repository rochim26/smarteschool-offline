import { DatePicker } from "antd";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import {
  FaCloudDownloadAlt,
  FaCommentDots,
  FaPaperclip,
  FaPen,
  FaPlus,
  FaSearch,
  FaTrashAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { downloadAbsenRombel } from "../../client/AbsenClient";
import { baseURL, ssURL } from "../../client/clientAxios";
import {
  deleteTimeline,
  downloadTimelineAbsen,
  editTimeline,
  postTimeline,
} from "../../client/TimelineClient";
import useUser from "../../hooks/useUser";
import { momentPackage } from "../../utilities/HelperUtils";
import { hideModal } from "../../utilities/ModalUtils";
import ModalAddPertemuan from "../pertemuan/ModalAddPertemuan";
import TugasSkeleton from "../Shared/Skeleton/TugasSkeleton";

const initialFormInput = {
  tanggalPembagian: "",
  tanggalAkhir: "",
  deskripsi: "",
  gmeet: "",
};

const PertemuanPage = ({
  id,
  jadwalMengajar,
  timelineData,
  mJadwalMengajarId,
  getTimelineData,
  loading,
  tanggal,
}) => {
  const { user } = useUser();
  const { timeline } = timelineData || {};

  const initialFormData = {
    tanggal: tanggal ? momentPackage(tanggal) : momentPackage(),
  };

  const [formData, setFormData] = useState(initialFormData);

  const [formInput, setFormInput] = useState(initialFormInput);
  const [editId, setEditId] = useState(null);

  const downloadAbsenData = async () => {
    if (formData.tanggal) {
      const { data } = await downloadAbsenRombel({
        rombelId: jadwalMengajar?.rombel?.id,
        tanggal: momentPackage(formData.tanggal).format("YYYY-MM-DD"),
      });

      if (data) {
        window.open(`${baseURL}/${data}`);
      }
    } else {
      toast.error("Pilih tanggal terlebih dahulu");
    }
  };

  const handleChangeTanggalPengumpulan = (date, dateString) => {
    setFormData({
      ...formData,
      tanggal: dateString,
    });
  };

  const handleGetAbsenData = () => {
    setFilter();
  };

  const handleChangeForm = (e, name, value) => {
    setFormInput({
      ...formInput,
      [name || e.target.name]: value || e.target.value,
    });
  };

  const handleClickEdit = (data) => {
    setEditId(data.id);
    setFormInput({
      ...formInput,
      tanggalPembagian: moment(data.tanggalPembagian),
      tanggalAkhir: moment(data.tanggalAkhir),
      deskripsi: data.deskripsi,
      gmeet: data.gmeet,
      id: data.id,
    });
  };

  const handleClickDownloadAbsen = async () => {
    const { data } = await downloadTimelineAbsen({ jadwal_mengajar_id: id });

    window.open(`${baseURL}/${data}`, "_blank");
  };

  const handleDeletePertemuan = async (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data } = await deleteTimeline(id);
        if (data) {
          toast.success(data?.message);
          getTimelineData();
          setEditId(null);
          setFormInput(initialFormInput);
        }
      }
    });
  };

  const handleModalSubmit = async () => {
    if (!formInput.tanggalPembagian) {
      toast.error("Anda belum memberikan Awal pertemuan");
      return;
    } else if (!formInput.tanggalAkhir) {
      toast.error("Anda belum memberikan Akhir pertemuan");
      return;
    } else if (!formInput.deskripsi) {
      toast.error("Anda belum menuliskan deskripsi pertemuan");
      return;
    } else if (
      formInput.gmeet &&
      (formInput.gmeet.includes("meet.google.com") ||
        formInput.gmeet.includes("zoom.us"))
    ) {
      if (
        !formInput.gmeet.includes("https://") &&
        !formInput.gmeet.includes("http://")
      ) {
        formInput.gmeet = "https://" + formInput.gmeet;
      }
    }

    const payload = {
      ...formInput,
      mJadwalMengajarId: parseInt(mJadwalMengajarId),
      tanggalPembagian: moment(formInput.tanggalPembagian).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      tanggalAkhir: moment(formInput.tanggalAkhir).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      tipe: "absen",
    };

    const { data } = editId
      ? await editTimeline(editId, payload)
      : await postTimeline(payload);
    if (data) {
      toast.success(data.message);
      getTimelineData();
      hideModal("modalAddPertemuan");
      setFormInput(initialFormInput);
    }
  };

  return (
    <>
      <div className="row justify-content-center g-4">
        {user?.id == jadwalMengajar?.rombel?.mUserId ? (
          <div className="col-md-10">
            <div className=" d-flex flex-column flex-lg-row justify-content-between align-items-lg-center bg-white rounded-ss shadow-dark-ss">
              <h4
                className={
                  user?.role == "guru"
                    ? "fw-extrabold color-dark d-flex justify-content-center justify-content-md-start ms-3 mb-0 mt-lg-0 mt-3"
                    : "p-4 m-0 fw-extrabold color-dark d-flex justify-content-center justify-content-md-start"
                }
              >
                Download Absensi Kelas Anda
              </h4>
              <div className="my-3 my-lg-0 px-3 px-lg-0 me-lg-3 d-flex flex-column flex-lg-row align-items-lg-center">
                <div className="d-flex flex-sm-row flex-column justify-content-md-start justify-content-sm-between justify-content-start align-items-center">
                  <button
                    type="button"
                    className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-lg-3 mb-3 mb-lg-0 fw-bold color-secondary"
                    onClick={() => {
                      downloadAbsenData();
                    }}
                    data-joyride="btn-download-rekapan"
                  >
                    <FaCloudDownloadAlt className="me-2 fs-6" />
                    Rekap Absen
                  </button>
                  <div
                    class="date-picker-kehadiran d-flex my-lg-3 my-0"
                    data-joyride="filter-tanggal"
                  >
                    <DatePicker
                      className="w-100"
                      onChange={handleChangeTanggalPengumpulan}
                      placeholder="Pilih tanggal"
                      value={momentPackage(formData.tanggal)}
                    />
                    <button
                      type="button"
                      className="btn btn-ss btn-primary btn-primary-ss fs-14-ss"
                      onClick={() => {
                        handleGetAbsenData();
                      }}
                    >
                      <FaSearch />
                    </button>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        ) : null}

        <div className="col-lg-10">
          <div className=" d-flex flex-column flex-lg-row justify-content-between align-items-lg-center bg-white rounded-ss shadow-dark-ss">
            <h4
              className={
                user?.role == "guru"
                  ? "fw-extrabold color-dark d-flex justify-content-center justify-content-md-start ms-3 mb-0 mt-lg-0 mt-3"
                  : "p-4 m-0 fw-extrabold color-dark d-flex justify-content-center justify-content-md-start"
              }
            >
              Daftar Pertemuan
            </h4>
            {user?.role == "guru" || user?.role == "admin" ? (
              <div className="my-3 my-lg-0 px-3 px-lg-0 me-lg-3 d-flex flex-column flex-lg-row align-items-lg-center">
                <div className="d-flex flex-column flex-lg-row align-items-lg-center">
                  <button
                    className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-lg-3 mb-3 mb-lg-0 fw-bold color-secondary"
                    onClick={handleClickDownloadAbsen}
                    data-joyride="unduh-absen"
                  >
                    <FaCloudDownloadAlt className="me-2 fs-18-ss" />
                    Unduh Absen
                  </button>
                </div>
                <button
                  className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold my-lg-3 my-0"
                  data-bs-toggle="modal"
                  data-bs-target="#modalAddPertemuan"
                  onClick={() => {
                    setEditId(null);
                    setFormInput(initialFormInput);
                  }}
                  data-joyride="btn-buat-pertemuan"
                  // disabled={jadwalMengajar?.absen ? false : true}
                >
                  <FaPlus className="me-2" />
                  Buat Pertemuan
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <ModalAddPertemuan
        editId={editId}
        handleChangeForm={handleChangeForm}
        formInput={formInput}
        handleModalSubmit={handleModalSubmit}
      />
      {/* Pertemuan Content Start */}

      <div className="row mt-4 justify-content-center gb-3">
        {/* Card Post Tugas Start */}
        {!timeline?.length && (
          <>
            <>
              <div className="col-md-4 col-8">
                <img
                  src="/img/empty-state-timeline.png"
                  alt="empty-state"
                  className="img-fluid"
                />
              </div>
              <div className="col-12 text-center">
                <h5 className="color-dark fw-black">Belum Ada Pertemuan</h5>
                {user?.role == "guru" ? (
                  <p className="fw-bold fs-14-ss">
                    Tekan tombol{" "}
                    <a
                      className="text-decoration-none color-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#modalAddPertemuan"
                    >
                      {" "}
                      Buat Pertemuan
                    </a>{" "}
                    untuk membuat pertemuan
                  </p>
                ) : (
                  <p className="fw-bold fs-14-ss">
                    Sepertinya guru belum memberikan pertemuan untuk kamu saat
                    ini
                  </p>
                )}
              </div>
            </>
          </>
        )}
        {loading && (
          <div className="col-lg-10">
            <TugasSkeleton />
          </div>
        )}
        {!loading &&
          timeline?.map((d, idx) => {
            if (d.tipe == "absen") {
              return (
                <div className="col-lg-10" key={idx}>
                  <div className="card-post card card-ss mb-4">
                    <div className="card-header card-header-ss p-4 d-flex flex-md-row flex-column justify-content-between">
                      {/* Post Title Start */}
                      <Link
                        href={`${ssURL}/timeline/[id]?hal=pertemuan`}
                        as={`${ssURL}/timeline/${d?.id}?hal=pertemuan`}
                      >
                        <a className="text-decoration-none order-md-1 order-2">
                          <div className="card-post-title d-flex align-items-center flex-grow-1 ">
                            <div
                              className="rounded-circle shadow-primary-ss me-4"
                              style={{
                                width: "50px",
                                height: "50px",
                              }}
                            >
                              <img
                                src={`/img/post-icon-1.svg`}
                                alt="post-icon"
                              />
                            </div>
                            <div className="title">
                              <h6 className="color-dark fw-black m-0">
                                Pertemuan
                              </h6>
                              <p className="color-secondary m-0 fs-14-ss mt-2">
                                {momentPackage(
                                  d?.tanggalPembagian ||
                                    d?.timeline?.tanggalPembagian
                                ).format("DD MMMM YYYY")}
                              </p>
                            </div>
                          </div>
                        </a>
                      </Link>
                      {/* Post Title End */}

                      {/* Dropdown Option Start */}

                      {user?.role == "guru" && (
                        <div className="dropdown dropdown-ss mb-md-0 mb-2 d-md-inline d-flex justify-content-end order-md-2 order-1">
                          <div
                            role="button"
                            id="dropdownMenuLink"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <img
                              src={`/img/icon-dropdown-option.svg`}
                              alt="icon-option"
                            />
                          </div>
                          <ul
                            className="dropdown-menu dropdown-menu-ss my-1"
                            aria-labelledby="dropdownMenuLink"
                          >
                            <li
                              data-bs-toggle="modal"
                              data-bs-target="#modalAddPertemuan"
                              onClick={() => handleClickEdit(d)}
                            >
                              <a className="dropdown-item">
                                <FaPen className="me-2" />
                                <span>Edit</span>
                              </a>
                            </li>
                            <li onClick={() => handleDeletePertemuan(d.id)}>
                              <a className="dropdown-item">
                                <FaTrashAlt className="me-2" />
                                <span>Hapus</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      )}
                      {/* Dropdown Option End */}
                    </div>

                    <div className="card-body pt-0 px-4 pb-3">
                      {/* Post Content Start */}
                      <Link
                        href={`${ssURL}/timeline/[id]?hal=pertemuan`}
                        as={`${ssURL}/timeline/${d?.id}?hal=pertemuan`}
                      >
                        <a className="text-decoration-none">
                          <div className="row px-lg-0 px-md-3">
                            {/* Post Description Start */}

                            <div
                              className={`card-post-content dangerous-html ${
                                user?.role === "guru" ? "col-lg-9" : "col-lg-8"
                              } col-md-8 color-secondary`}
                              dangerouslySetInnerHTML={{
                                __html: d?.deskripsi || d?.timeline?.deskripsi,
                              }}
                            />

                            {/* Post Description End */}

                            {/* Post Complete Status Start*/}
                            <div
                              className={`bg-soft-primary rounded-ss d-flex align-items-center post-complete-status ${
                                user?.role === "guru"
                                  ? "col-lg-3 p-3"
                                  : "col-lg-4 py-3 px-4"
                              } col-md-4 mt-md-0 mt-3`}
                            >
                              <div className="d-flex align-items-center">
                                <div
                                  className={`rounded-circle ${
                                    user?.role == "guru"
                                      ? "shadow-primary-ss"
                                      : !d?.absen
                                      ? "shadow-danger-ss"
                                      : "shadow-primary-ss"
                                  } me-4`}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                  }}
                                >
                                  <img
                                    src={`${
                                      user?.role == "guru"
                                        ? `/img/icon-complete.svg`
                                        : !d?.absen
                                        ? "/img/icon-post-warning.svg"
                                        : `/img/icon-complete.svg`
                                    }`}
                                    alt="post-icon"
                                    width="50px"
                                    height="50px"
                                  />
                                </div>
                                <div className="div">
                                  {user?.role === "guru" ? (
                                    <>
                                      <p className="m-0 mb-1 fs-14-ss color-secondary fw-semibold">
                                        Diabsen
                                      </p>
                                      <p className="m-0 text-white fw-extrabold fs-18-ss color-dark">
                                        {`${d.meta.totalAbsen} / ${d.meta.totalSiswa}`}{" "}
                                        Siswa
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <p className="m-0 mb-1 fs-14-ss color-secondary fw-semibold">
                                        Kamu{" "}
                                        {momentPackage() <
                                          momentPackage(
                                            momentPackage(
                                              d?.timeline?.tanggalAkhir ||
                                                d?.timeline?.timeline
                                                  ?.tanggalAkhir
                                            ).format("YYYY-MM-DD") + " 23:59:59"
                                          ) && "hari ini"}
                                      </p>
                                      <p className="m-0 text-white fw-extrabold fs-18-ss color-dark">
                                        {!d?.absen
                                          ? momentPackage() <
                                            momentPackage(
                                              momentPackage(
                                                d?.timeline?.tanggalAkhir ||
                                                  d?.timeline?.timeline
                                                    ?.tanggalAkhir
                                              ).format("YYYY-MM-DD") +
                                                " 23:59:59"
                                            )
                                            ? "Belum Absen"
                                            : "Tidak Absen"
                                          : "Sudah Absen"}
                                      </p>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Post Complete Status End*/}
                          </div>
                        </a>
                      </Link>
                      {/* Post Content End */}
                    </div>
                    <div className="card-footer-ss p-4 pt-0">
                      <hr className="m-0 mb-3" />

                      <div className="d-flex justify-content-between align-items-md-center flex-column flex-md-row">
                        <Link
                          href={`${ssURL}/timeline/[id]?hal=pertemuan`}
                          as={`${ssURL}/timeline/${d.id}?hal=pertemuan`}
                        >
                          <a className="text-decoration-none">
                            {/* Comment & Attachment Start */}
                            <div className="d-flex mb-3 mb-md-0">
                              <div className="comment color-dark fs-14-ss fw-bolder me-4">
                                <FaCommentDots className="me-2" />
                                <span>
                                  {d?.meta?.totalKomen ||
                                    d?.timeline?.meta?.totalKomen}{" "}
                                  Komentar
                                </span>
                              </div>
                              <div className="attach color-dark fs-14-ss fw-bolder">
                                <FaPaperclip className="me-2" />
                                <span>
                                  {d?.lampiran?.length ||
                                    d?.timeline?.lampiran?.length}{" "}
                                  Lampiran
                                </span>
                              </div>
                            </div>
                            {/* Comment & Attachment End */}
                          </a>
                        </Link>

                        {/* Alert Start */}
                        {(d.rpp?.length || d?.jurnal) &&
                        user?.role == "guru" ? (
                          <div className="rounded-ss px-4 py-2 bg-success shadow-success-ss text-white fs-14-ss">
                            <img
                              src={`/img/icon-check-alert.svg`}
                              alt="icon-check-alert"
                              className="me-2"
                            />
                            Anda Sudah Menulis Jurnal Harian
                          </div>
                        ) : user?.role == "guru" ? (
                          <div className="rounded-ss px-4 py-2 bg-danger shadow-danger-ss text-white fs-14-ss">
                            <img
                              src={`/img/icon-warning-alert.svg`}
                              alt="icon-warning-alert"
                              className="me-2"
                            />
                            Anda Belum Menulis Jurnal Harian
                          </div>
                        ) : null}

                        {/* Alert End */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        {/* Card Post Tugas End */}
      </div>
    </>
  );
};

export default PertemuanPage;
