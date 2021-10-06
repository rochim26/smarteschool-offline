import moment from "moment";
import Link from "next/link";
import {
  FaClone,
  FaCommentDots,
  FaPaperclip,
  FaPen,
  FaRegClock,
  FaTrashAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { ssURL } from "../../client/clientAxios";
import { deleteTimeline } from "../../client/TimelineClient";
import { deleteTugas } from "../../client/TugasClient";
import useUser from "../../hooks/useUser";
import { momentPackage } from "../../utilities/HelperUtils";
import Avatar from "../Shared/Avatar/Avatar";
import TugasSkeleton from "../Shared/Skeleton/TugasSkeleton";
import CardDiskusi from "./CardDiskusi";

const TimelinePage = ({
  jadwalMengajar,
  getTimelineData,
  timelineData,
  setFormData,
  setEditId,
  checkAbsensi,
  setIsDuplicate,
  setStateEditData,
  loading,
}) => {
  const { timeline } = timelineData || {};

  const { user } = useUser();

  const deleteTimelineData = async (id) => {
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
        }
      }
    });
  };

  const deleteTugasData = async (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data } = await deleteTugas(id);
        if (data) {
          toast.success(data?.message);
          getTimelineData();
        }
      }
    });
  };

  const handleClickEdit = (data) => {
    setFormData(data);
    setEditId(data.id);
    window.$(`#editorDiskusi`).summernote("code", data.deskripsi);
  };

  const handleClickEditPertemuan = (data) => {
    setEditId(data.id);
    setFormData({
      ...FormData,
      tanggalPembagian: moment(data.tanggalPembagian),
      tanggalAkhir: moment(data.tanggalAkhir),
      deskripsi: data.deskripsi,
      gmeet: data.gmeet,
      id: data.id,
    });
  };

  return (
    <>
      <div className="row justify-content-center gy-4">
        {/* Alert Absen Start */}

        {/* <div className="col-lg-10">
          {checkAbsensi && !jadwalMengajar?.absen && user?.role == "guru" ? (
            <div className="d-flex bg-gradient-primary-2 px-4 py-3 rounded-ss align-items-lg-end justify-content-between flex-wrap flex-lg-row flex-column">
              <div className="text-white">
                <h6 className="fs-18-ss fw-bold mb-1">Absen Kelas</h6>
                <p className="mb-0">
                  Anda belum mengabsen kelas, absen kelas dulu yuk
                </p>
              </div>
              <button
                className="btn btn-light rounded-pill py-1 px-4 py-1 fs-12-ss fw-bold color-primary mt-3 mt-lg-0"
                data-bs-toggle="modal"
                data-bs-target="#modalAddPertemuan"
                onClick={() => setEditId(null)}
              >
                <span>
                  Absen Kelas
                  <FaAngleRight className="ms-2" />
                </span>
              </button>
            </div>
          ) : null}
        </div> */}

        {/* Card Add Postingan Start*/}
        <div className="col-lg-10" onClick={() => setEditId(null)}>
          <div
            className="card card-ss bg-white p-4 pointer"
            data-bs-toggle="modal"
            data-bs-target="#modalAddPostingan"
            data-joyride="add-postingan"
          >
            <div className="div d-flex align-items-center">
              <Avatar size={45} name={user?.nama} src={user?.avatar} />
              <p className="mb-0 color-secondary ms-3">
                Diskusikan sesuatu ke kelas Anda...
              </p>
            </div>
          </div>
        </div>
        {!timeline?.length && (
          <>
            <div className="row justify-content-center mt-3">
              <div className="col-md-4 col-8">
                <img
                  src="/img/empty-state-timeline.png"
                  alt="empty-state"
                  className="img-fluid"
                />
              </div>
              <div className="col-12 text-center">
                <h5 className="color-dark fw-black">
                  {user?.role == "guru"
                    ? "Belum Ada Kegiatan Di Kelas"
                    : "Belum Ada Tugas Maupun Pertemuan "}
                </h5>
                <p className="fw-bold fs-14-ss">
                  {user?.role == "guru"
                    ? "Silahkan tambahkan tugas, materi, dan pertemuan untuk siswa"
                    : "Sepertinya kamu belum diberikan tugas ataupun pertemuan untuk saat ini"}
                </p>
              </div>
            </div>
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
              // if (
              //   moment() > moment(d?.timeline?.tanggalPembagian) ||
              //   user?.role == "guru"
              // )
              return (
                <div className="col-lg-10" key={idx}>
                  <div className="card-post card card-ss">
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
                              onClick={() => handleClickEditPertemuan(d)}
                            >
                              <a className="dropdown-item">
                                <FaPen className="me-2" />
                                <span>Edit</span>
                              </a>
                            </li>

                            <li onClick={() => deleteTimelineData(d?.id)}>
                              <a className="dropdown-item color-danger">
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
                          as={`${ssURL}/timeline/${d?.id}?hal=pertemuan`}
                        >
                          <a className="text-decoration-none">
                            {/* Comment & Attachment Start */}
                            <div className="d-flex mb-3 mb-md-0">
                              <div className="comment color-dark fs-14-ss fw-bolder me-4">
                                <FaCommentDots className="me-2" />
                                <span>
                                  {user?.role == "guru" && d?.meta?.totalKomen}
                                  {user?.role == "siswa" &&
                                    d?.timeline?.meta?.totalKomen}{" "}
                                  Komentar
                                </span>
                              </div>
                              <div className="attach color-dark fs-14-ss fw-bolder">
                                <FaPaperclip className="me-2" />
                                <span>
                                  {user?.role == "guru" && d?.lampiran?.length}
                                  {user?.role == "siswa" &&
                                    d?.timeline?.lampiran?.length}{" "}
                                  Lampiran
                                </span>
                              </div>
                            </div>
                            {/* Comment & Attachment End */}
                          </a>
                        </Link>

                        {/* Alert Start */}
                        {(d.rpp?.length || d.jurnal) && user?.role == "guru" ? (
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
            } else if (d.tipe == "diskusi") {
              return (
                <CardDiskusi
                  d={d}
                  user={user}
                  handleClickEdit={handleClickEdit}
                  deleteTimelineData={deleteTimelineData}
                />
              );
            } else if (d.tipe == "tugas") {
              return (
                <div className="col-lg-10">
                  <div className="card-post card card-ss">
                    <div className="card-header card-header-ss p-4 d-flex flex-md-row flex-column justify-content-between">
                      {/* Post Title Start */}
                      <Link
                        href={`${ssURL}/timeline/[id]?hal=tugas`}
                        as={`${ssURL}/timeline/${d.id}?hal=tugas`}
                      >
                        <a className="text-decoration-none order-md-1 order-2">
                          <div className="card-post-title d-flex align-items-center flex-grow-1">
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
                                {d.tugas?.judul || d.timeline?.tugas?.judul}
                              </h6>
                              <p className="color-secondary m-0 fs-14-ss mt-2">
                                {d.createdAt || d.timeline?.createdAt}
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
                              data-bs-target="#modalBuatTugas"
                              onClick={() => setStateEditData(d)}
                            >
                              <a className="dropdown-item">
                                <FaPen className="me-2" />
                                <span>Edit</span>
                              </a>
                            </li>
                            <li
                              data-bs-toggle="modal"
                              data-bs-target="#modalBuatTugas"
                              onClick={() => {
                                setIsDuplicate(true);
                                setStateEditData(d, false);
                              }}
                            >
                              <a className="dropdown-item">
                                <FaClone className="me-2" />
                                <span>Duplikat</span>
                              </a>
                            </li>
                            <li onClick={() => deleteTugasData(d?.mTugasId)}>
                              <a className="dropdown-item color-danger">
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
                        href={`${ssURL}/timeline/[id]?hal=tugas`}
                        as={`${ssURL}/timeline/${d.id}?hal=tugas`}
                      >
                        <a className="text-decoration-none">
                          <div className="row px-lg-0 px-md-3">
                            {/* Post Description Start */}

                            <div
                              className={`card-post-content clamp ${
                                user?.role === "guru" ? "col-lg-9" : "col-lg-8"
                              } col-md-8 color-secondary`}
                              dangerouslySetInnerHTML={{
                                __html:
                                  d.tugas?.instruksi ||
                                  d.timeline?.tugas?.instruksi,
                              }}
                            ></div>

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
                                  className={`rounded-circle me-4 ${
                                    user?.role == "guru"
                                      ? "shadow-primary-ss"
                                      : d?.nilai
                                      ? "bg-primary d-flex justify-content-center align-items-center shadow-primary-ss"
                                      : !d?.dikumpulkan
                                      ? "shadow-danger-ss"
                                      : "shadow-primary-ss"
                                  }`}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                  }}
                                >
                                  {user?.role === "guru" ||
                                  (d?.dikumpulkan === 1 && !d?.nilai) ? (
                                    <img
                                      src={`/img/icon-complete.svg`}
                                      alt="post-icon"
                                      width="50px"
                                      height="50px"
                                    />
                                  ) : user?.role === "siswa" && d?.nilai ? (
                                    <span className="fs-18-ss fw-bold text-white">
                                      {d?.nilai}
                                    </span>
                                  ) : (
                                    (!d?.dikumpulkan ||
                                      d?.dikumpulkan === 0) && (
                                      <img
                                        src="/img/icon-post-warning.svg"
                                        alt="post-icon"
                                        width="50px"
                                        height="50px"
                                      />
                                    )
                                  )}
                                </div>
                                <div className="div">
                                  <p className="m-0 mb-1 fs-14-ss color-secondary fw-semibold">
                                    {user?.role === "guru"
                                      ? "Dikumpulkan"
                                      : "Tugas"}
                                  </p>
                                  <p className="m-0 text-white fw-extrabold fs-18-ss color-dark">
                                    {user?.role === "guru"
                                      ? `${d?.meta?.totalRespon} / ${d?.meta?.totalSiswa} Siswa`
                                      : user?.role === "siswa" &&
                                        (!d?.dikumpulkan ||
                                          d?.dikumpulkan === 0)
                                      ? "Belum Dikerjakan"
                                      : d?.nilai
                                      ? "Sudah Dinilai"
                                      : "Sudah Dikumpul"}
                                  </p>
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
                          href={`${ssURL}/timeline/[id]?hal=tugas`}
                          as={`${ssURL}/timeline/${d.id}?hal=tugas`}
                        >
                          <a className="text-decoration-none">
                            {/* Comment & Attachment Start */}
                            <div className="d-flex mb-3 mb-md-0">
                              <div className="comment color-dark fs-14-ss fw-bolder me-4">
                                <FaCommentDots className="me-2" />
                                <span>
                                  {user?.role == "guru" && d?.meta?.totalKomen}
                                  {user?.role == "siswa" &&
                                    d?.timeline?.meta?.totalKomen}{" "}
                                  Komentar
                                </span>
                              </div>
                              <div className="attach color-dark fs-14-ss fw-bolder">
                                <FaPaperclip className="me-2" />
                                <span>
                                  {user?.role == "guru" &&
                                    d.tugas?.lampiran?.length}
                                  {user?.role == "siswa" &&
                                    d.timeline?.tugas?.lampiran?.length}{" "}
                                  Lampiran
                                </span>
                              </div>
                            </div>
                            {/* Comment & Attachment End */}
                          </a>
                        </Link>

                        {/* Alert Start */}
                        <div
                          className={`
                            rounded-ss px-4 py-2 text-white fs-14-ss
                            ${
                              d.tugas?.tanggalPengumpulan ||
                              d?.timeline?.tugas?.tanggalPengumpulan
                                ? moment(
                                    moment(
                                      d.tugas?.tanggalPengumpulan ||
                                        d?.timeline?.tugas?.tanggalPengumpulan
                                    )
                                      .add(7, "hours")
                                      .format("YYYY-MM-DD ") +
                                      d.tugas?.waktuPengumpulan ||
                                      d?.timeline?.tugas?.waktuPengumpulan
                                  ) < moment()
                                  ? "bg-secondary"
                                  : "bg-danger shadow-danger-ss"
                                : "bg-secondary"
                            }
                          `}
                        >
                          <FaRegClock className="me-2" />
                          Batas Pengumpulan{" "}
                          {d.tugas?.tanggalPengumpulan ||
                          d?.timeline?.tugas?.tanggalPengumpulan
                            ? moment(
                                moment(
                                  d.tugas?.tanggalPengumpulan ||
                                    d?.timeline?.tugas?.tanggalPengumpulan
                                )
                                  .add(7, "hours")
                                  .format("YYYY-MM-DD ") +
                                  d.tugas?.waktuPengumpulan ||
                                  d?.timeline?.tugas?.waktuPengumpulan
                              ).fromNow()
                            : "Tidak Ada"}
                        </div>
                        {/* Alert End */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}

        {/* Card Postingan Start */}

        {/* Card Postingan End */}
      </div>
    </>
  );
};

export default TimelinePage;
