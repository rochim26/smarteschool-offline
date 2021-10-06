import { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaPen,
  FaTrashAlt,
  FaFilePdf,
  FaRegClock,
  FaClone,
  FaLink,
  FaFile,
  FaPaperclip,
  FaTimes,
} from "react-icons/fa";
import Link from "next/link";
import { baseURL, ssURL } from "../../client/clientAxios";
import { useRouter } from "next/router";
import Tabs from "../../components/Shared/Tabs/Tabs";

import TextareaAutosize from "react-textarea-autosize";
import useUser from "../../hooks/useUser";
import {
  deleteTimelineKomen,
  editTimeline,
  postTimelineKomen,
  postTkTimelineKomen,
} from "../../client/TimelineClient";
import { isValidUrl, momentPackage } from "../../utilities/HelperUtils";
import { uploadFile } from "../../client/uploadFileClient";
import { toast } from "react-toastify";
import KomenTimeline from "../Shared/KomenTimeline/KomenTimeline";
import KomenInput from "../Shared/KomenTimeline/KomenInput";
import useTugasSiswa from "../../hooks/useTugasSiswa";
import { hideModal } from "../../utilities/ModalUtils";
import moment from "moment";
import Avatar from "../Shared/Avatar/Avatar";
import LoadingProgress from "../Shared/LoadingProgress/LoadingProgress";
import WhatsappLink from "../Shared/WhatsappLink/WhatsappLink";
import LampiranSkeleton from "../Shared/Skeleton/LampiranSkeleton";

const initialFormData = {
  lampiran: [],
};

const TugasPage = ({ id, timelineDataProps, getDetailTimelineData }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [tautanLink, setTautanLink] = useState("");
  const [timelineData, setTimelineData] = useState({});
  const [lampiranTugasGuru, setLampiranTugasGuru] = useState([]);
  const [onUpload, setOnUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  const { timeline, sudahLewat } = timelineData || {};

  const { setTugasSiswa } = useTugasSiswa();

  const { user } = useUser();

  const handlePutTimelineData = async (dikumpulkan = null) => {
    const payload = {
      tipe: "tugas",
      keterangan: formData?.keteranganJawaban,
      waktuPengumpulan: momentPackage().format("YYYY-MM-DD HH:mm:ss"),
      dikumpulkan: dikumpulkan,
      lampiran: formData?.lampiran,
    };

    const { data } = await editTimeline(id, payload);
    if (data) {
      hideModal("modalNilaiTugas");
      hideModal("modalKerjakanTugas");
      hideModal("modalLihatHasilTugas");
      toast.success(data?.message);
      getDetailTimelineData();
    }
  };

  const onClickKumpulkanTugas = () => {
    handlePutTimelineData(1);
  };

  const uploadFileToServer = async (e) => {
    setOnUpload(true);
    if (!e.target.files[0]) setOnUpload(false);
    await uploadFile(e.target.files[0], checkProgress, (fileUrl) => {
      setFormData({
        ...formData,
        lampiran: [...formData.lampiran, fileUrl],
      });
      setOnUpload(false);
    });
  };

  const checkProgress = (uploadProgress) => {
    if (uploadProgress <= 100) {
      return setProgress(uploadProgress);
    }

    setTimeout(() => {
      setProgress(0);
    }, 500);
  };

  const postKomen = async (komen) => {
    const payload = {
      mTimelineId: id,
      komen,
    };

    const { data } = await postTimelineKomen(payload);
    if (data) {
      toast.success(data?.message);
      getDetailTimelineData();
    }
  };

  const deleteKomen = async (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data } = await deleteTimelineKomen(id);
        if (data) {
          toast.success(data?.message);
          getDetailTimelineData();
        }
      }
    });
  };

  const handlePostLink = () => {
    if (isValidUrl(tautanLink)) {
      setFormData({
        ...formData,
        lampiran: [...formData.lampiran, tautanLink],
      });
      setTautanLink("");
      toast.success("Berhasil menambahkan link");
      hideModal("modalTautanLink");
    } else {
      toast.error("Harap masukkan url yang valid");
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

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const postKomentarPribadi = async () => {
    if (formData?.komen) {
      const payload = {
        tkTimelineId: id,
        komen: formData?.komen,
      };
      const { data } = await postTkTimelineKomen(payload);
      if (data) {
        setFormData({ komen: "" });
        getDetailTimelineData();
      }
    }
  };

  const postKomenTimeline = async (komen) => {
    const payload = {
      mTimelineId: id,
      komen,
    };

    const { data } = await postTimelineKomen(payload);
    if (data) {
      toast.success(data?.message);
      getDetailTimelineData();
    }
  };

  const deleteKomenTimeline = async (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data } = await deleteTimelineKomen(id);
        if (data) {
          toast.success(data?.message);
          getDetailTimelineData();
        }
      }
    });
  };

  useEffect(() => {
    setTimelineData(timelineDataProps);
    setFormData({
      keteranganJawaban: timelineDataProps?.timeline?.keterangan,
      lampiran: timelineDataProps?.timeline?.lampiran,
    });
    setLampiranTugasGuru([
      ...(timelineDataProps?.timeline?.timeline?.tugas?.lampiran || []),
      ...(timelineDataProps?.timeline?.timeline?.tugas?.link || []),
    ]);
  }, [timelineDataProps]);

  const navItemsTugas = [
    {
      id: "instruksi-tugas",
      nav: "Instruksi Tugas",
      active: true,
      dataJoyride: "instruksi-tugas",
      content: (
        <>
          <div className="row mt-4">
            {/* Status Info Tugas Start */}

            <div className="col-md-8 pe-2 mb-3 mb-md-0">
              <div
                className="status-info p-3 pb-md-3 pb-0 bg-soft-primary rounded-ss d-flex mb-3 mb-md-0 flex-grow-1 flex-wrap justify-content-md-start justify-content-between"
                data-joyride="informasi-tugas"
              >
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss color-secondary mb-2">Penilaian</p>
                  <p className="fs-18-ss fw-bold color-dark m-0">100 Poin</p>
                </div>
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss color-secondary mb-2">KKM</p>
                  <p className="fs-18-ss fw-bold color-dark m-0">
                    {timeline?.tugas?.kkm} Poin
                  </p>
                </div>
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss color-secondary mb-2">Belum</p>
                  <p className="fs-18-ss fw-bold color-dark m-0">
                    {timeline?.listSiswaBelum?.length} Siswa
                  </p>
                </div>
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss color-secondary mb-2">Terkumpul</p>
                  <p className="fs-18-ss fw-bold color-dark m-0">
                    {timeline?.listSiswaTerkumpul?.length} Siswa
                  </p>
                </div>
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss color-secondary mb-2">Dinilai</p>
                  <p className="fs-18-ss fw-bold color-dark m-0">
                    {timeline?.listSiswaDinilai?.length} Siswa
                  </p>
                </div>
              </div>
              <div
                className="post-content mt-4"
                dangerouslySetInnerHTML={{ __html: timeline?.tugas?.instruksi }}
              ></div>
            </div>

            {/* Status Info Tugas End */}

            {/* Lampiran File Tugas Start */}

            <div className="col-md-4 ps-2" data-joyride="lampiran-pelajaran">
              {/* Lampiran Tugas Biasa Start */}

              <h6 className="fs-18-ss color-dark fw-bold">
                Lampiran Pelajaran
              </h6>
              {timeline?.tugas?.lampiran?.length === 0 && (
                <div className="bg-very-soft-secondary p-3 rounded-ss mb-3">
                  <div className="file-content d-flex align-items-center flex-wrap">
                    <div
                      className="rounded-circle bg-light-secondary d-flex justify-content-center align-items-center text-white fs-3 p-2"
                      style={{
                        width: "48px",
                        height: "48px",
                      }}
                    >
                      <FaFile />
                    </div>
                    <div className="p-2 d-flex flex-column">
                      <p className="fw-bold color-secondary mb-1">
                        Tidak ada file yang dilampirkan
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {timeline?.tugas?.lampiran?.map((d, idx) => {
                return (
                  <a
                    key={idx}
                    href={`${d}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <div className="bg-soft-primary p-3 rounded-ss mb-2">
                      <div className="file-content d-flex align-items-center flex-wrap">
                        <div
                          className="rounded-circle bg-primary shadow-primary-ss d-flex justify-content-center align-items-center text-white fs-3 p-2"
                          style={{
                            width: "48px",
                            height: "48px",
                          }}
                        >
                          <FaFile />
                        </div>
                        <div className="p-2 d-flex flex-column">
                          <p className="fw-bold color-dark mb-1 text-break">
                            {d}
                          </p>
                          {/* <p className="fs-12-ss fw-bold color-secondary mb-0">
                          PDF
                        </p> */}
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}

              {timeline?.tugas?.link?.map((link, idx) => (
                <div className="mt-3" key={idx}>
                  <div className="card-lampiran-materi border-light-secondary rounded-ss mb-3">
                    <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-md-row flex-column">
                      <div className="d-flex align-items-center flex-wrap">
                        <div className="pdf-icon ms-0 m-2 shadow-primary-ss">
                          <FaLink className="text-white fs-3" />
                        </div>
                        <div className="p-2">
                          <p className="fw-bold color-dark mb-0">Smartschool</p>
                          <span className="fs-12-ss color-secondary fs-12-ss fw-bold">
                            {link}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center ps-md-2 pt-md-2 pb-md-2 pe-0 pt-3 p-0">
                        <a
                          href={`${link}`}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="btn btn-sm btn-outline-secondary me-3 btn-pratinjau-file rounded-pill fs-12-ss fw-bold d-flex justify-content-center align-items-center"
                        >
                          Pratinjau
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Lampiran Tugas Biasa Start */}

              {/* Lampiran Tugas Kuis Start*/}

              {/* <div className="btn btn-primary btn-primary-ss rounded-ss d-flex align-items-center py-3 ps-4 pe-5">
                <div className="d-flex align-items-center">
                  <img
                    src={`/img/icon-pratinjau.svg`}
                    alt="icon-pratinjau"
                  />
                  <p className="m-0 text-white fw-bold ps-4 pe-5">
                    Tatap Muka
                  </p>
                </div>
              </div> */}

              {/* Lampiran Tugas Kuis End*/}
            </div>

            {/* Lampiran File Tugas End */}
          </div>
          <hr />
          {timeline?.komen?.map((komenData, idx) => (
            <KomenTimeline
              idx={idx}
              totalKomen={timeline?.komen?.length}
              komen={komenData?.komen}
              userObj={komenData?.user}
              userId={komenData?.mUserId}
              createdAt={komenData?.createdAt}
              onClickDelete={deleteKomenTimeline}
              komenId={komenData?.id}
            />
          ))}
          <KomenInput postKomen={postKomenTimeline} />
        </>
      ),
    },
    {
      id: "progres-siswa",
      nav: "Progres Siswa",
      active: false,
      dataJoyride: "progres-siswa",
      content: (
        <>
          <div className="row mt-4">
            <div className="d-flex flex-column flex-md-row nav-side-tab-ss">
              <div className="col-md-3">
                <div
                  className="nav flex-column nav-pills me-md-3 mb-3 mb-md-0 border border-light-secodary-ss rounded-ss p-2"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    className="nav-link active rounded-ss p-2"
                    id="siswa-belum-tab"
                    data-bs-toggle="pill"
                    href="#siswa-belum"
                    role="tab"
                    aria-controls="siswa-belum"
                    aria-selected="true"
                    data-joyride="tugas-belum"
                  >
                    <p className="fs-14-ss mb-2 nav-side-tab-color-secondary">
                      Belum
                    </p>
                    <p className="fs-18-ss fw-bold mb-0 nav-side-tab-color-dark">
                      {timeline?.listSiswaBelum?.length} Siswa
                    </p>
                  </a>
                  <a
                    className="nav-link rounded-ss p-2 pe-5"
                    id="siswa-terkumpul-tab"
                    data-bs-toggle="pill"
                    href="#siswa-terkumpul"
                    role="tab"
                    aria-controls="siswa-terkumpul"
                    aria-selected="true"
                    data-joyride="tugas-terkumpul"
                  >
                    <p className="fs-14-ss mb-2 nav-side-tab-color-secondary">
                      Terkumpul
                    </p>
                    <p className="fs-18-ss fw-bold mb-0 nav-side-tab-color-dark">
                      {timeline?.listSiswaTerkumpul?.length} Siswa
                    </p>
                  </a>
                  <a
                    className="nav-link rounded-ss p-2 pe-5"
                    id="siswa-dinilai-tab"
                    data-bs-toggle="pill"
                    href="#siswa-dinilai"
                    role="tab"
                    aria-controls="siswa-dinilai"
                    aria-selected="true"
                    data-joyride="tugas-dinilai"
                  >
                    <p className="fs-14-ss mb-2 nav-side-tab-color-secondary">
                      Dinilai
                    </p>
                    <p className="fs-18-ss fw-bold mb-0 nav-side-tab-color-dark">
                      {timeline?.listSiswaDinilai?.length} Siswa
                    </p>
                  </a>
                </div>
              </div>
              <div className="col-md-9">
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="siswa-belum"
                    role="tabpanel"
                    aria-labelledby="siswa-belum-tab"
                  >
                    <div className="d-flex justify-content-between flex-column flex-md-row align-items-center mb-4">
                      <h4 className="color-dark fw-bold m-0 mb-md-0 mb-3">
                        Daftar Tugas Belum Selesai
                      </h4>
                      {/* <input
                        type="text"
                        className="form-control form-search rounded-pill fs-14-ss fw-semibold border-secondary-ss"
                        id="exampleFormControlInput1"
                        placeholder="Cari Nama Siswa"
                      /> */}
                    </div>
                    <ul className="list-absen-kelas list-group list-group-flush">
                      {timeline?.listSiswaBelum?.map((d, idx) => {
                        return (
                          <li className="list-group-item" key={idx}>
                            <div className="d-flex align-items-md-center justify-content-between flex-md-row flex-column flex-wrap">
                              <div className="list-group-member d-flex align-items-center mb-3 mb-md-0">
                                <Avatar
                                  name={d?.user?.nama}
                                  src={d?.user?.avatar}
                                  size={45}
                                />
                                <p className="m-0 ms-4 fw-semibold color-secondary">
                                  {d.user?.nama}
                                </p>
                              </div>
                              {d.dikembalikan == 1 && (
                                <div className="list-group-info d-flex justify-content-end justify-content-md-start align-items-center">
                                  <div className="btn-ss bg-light-primary color-primary rounded-pill d-flex justify-content-center align-items-center">
                                    Dikembalikan
                                  </div>
                                </div>
                              )}
                              <div className="list-group-info d-flex justify-content-end justify-content-md-start align-items-center">
                                <WhatsappLink
                                  phoneNumber={d.user?.whatsapp}
                                  text="Halo nak"
                                >
                                  <div
                                    className="rounded-circle shadow-success-ss"
                                    style={{ width: "45px", height: "45px" }}
                                  >
                                    <img
                                      src={`/img/whatsapp.svg`}
                                      width={45}
                                      height={45}
                                    />
                                  </div>
                                </WhatsappLink>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="siswa-terkumpul"
                    role="tabpanel"
                    aria-labelledby="siswa-terkumpul-tab"
                  >
                    <div className="d-flex justify-content-between flex-column flex-md-row align-items-center mb-4">
                      <h4 className="color-dark fw-bold m-0 mb-md-0 mb-3">
                        Daftar Tugas Terkumpul
                      </h4>
                      <input
                        type="text"
                        className="form-control form-search rounded-pill fs-14-ss fw-semibold border-secondary-ss"
                        id="exampleFormControlInput1"
                        placeholder="Cari Nama Siswa"
                      />
                    </div>
                    <ul className="list-absen-kelas list-group list-group-flush">
                      {timeline?.listSiswaTerkumpul?.map((d, idx) => {
                        return (
                          <li className="list-group-item" key={idx}>
                            <div className="d-flex align-items-md-center justify-content-between flex-md-row flex-column flex-wrap">
                              <div className="list-group-member d-flex align-items-center mb-3 mb-md-0">
                                <Avatar
                                  name={d?.user?.nama}
                                  src={d?.user?.avatar}
                                  size={45}
                                />
                                <p className="m-0 ms-4 fw-semibold color-secondary">
                                  {d.user?.nama}
                                </p>
                              </div>
                              <div className="list-group-info d-flex justify-content-end justify-content-md-start align-items-center">
                                {momentPackage(d.waktuPengumpulan).format(
                                  "YYYY-MM-DD HH:mm:ss"
                                ) >=
                                  momentPackage(
                                    d.tugas?.tanggalPengumpulan
                                  ).format("YYYY-MM-DD HH:mm:ss") && (
                                  <div className="btn-ss bg-soft-danger color-danger rounded-pill d-flex justify-content-center align-items-center">
                                    Terlambat
                                  </div>
                                )}

                                {d.dikembalikan == 1 && (
                                  <div className="btn-ss bg-light-primary color-primary rounded-pill d-flex justify-content-center align-items-center">
                                    Dikembalikan
                                  </div>
                                )}

                                {d.nilai > 0 && (
                                  <div className="label-ss bg-soft-success color-success rounded-pill d-flex justify-content-center align-items-center me-3 fw-bold">
                                    {d.nilai}
                                  </div>
                                )}

                                {/* <!-- Button trigger modal --> */}
                                <button
                                  className="btn btn-primary btn-primary-ss shadow-primary-ss rounded-pill d-flex justify-content-center align-items-center ms-3 px-4 py-1"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalNilaiTugas"
                                  onClick={() => setTugasSiswa(d)}
                                >
                                  Nilai Tugas
                                </button>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="siswa-dinilai"
                    role="tabpanel"
                    aria-labelledby="siswa-dinilai-tab"
                  >
                    <div className="d-flex justify-content-between flex-column flex-md-row align-items-center mb-4">
                      <h4 className="color-dark fw-bold m-0 mb-md-0 mb-3">
                        Daftar Tugas Dinilai
                      </h4>
                      <input
                        type="text"
                        className="form-control form-search rounded-pill fs-14-ss fw-semibold border-secondary-ss"
                        id="exampleFormControlInput1"
                        placeholder="Cari Nama Siswa"
                      />
                    </div>
                    <ul className="list-absen-kelas list-group list-group-flush">
                      {timeline?.listSiswaTerkumpul?.map((d, idx) => {
                        return (
                          <li className="list-group-item" key={idx}>
                            <div className="d-flex align-items-md-center justify-content-between flex-md-row flex-column flex-wrap">
                              <div className="list-group-member d-flex align-items-center mb-3 mb-md-0">
                                <Avatar
                                  name={d?.user?.nama}
                                  src={d?.user?.avatar}
                                  size={45}
                                />
                                <p className="m-0 ms-4 fw-semibold color-secondary">
                                  {d.user?.nama}
                                </p>
                              </div>
                              <div className="list-group-info d-flex justify-content-end justify-content-md-start align-items-center">
                                <div className="label-ss bg-soft-success color-success rounded-pill d-flex justify-content-center align-items-center me-3 fw-bold">
                                  {d.nilai}
                                </div>

                                <button
                                  className="btn btn-link btn-secondary-ss border-0 bg-soft-primary color-secondary rounded-circle d-flex justify-content-center align-items-center p-2"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalNilaiTugas"
                                >
                                  <FaPen />
                                </button>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12"></div>
          </div>
        </>
      ),
    },
  ];

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <section className="banner position-absolute"></section>

      <div className="row">
        <div className="col-md-12">
          <a
            className="text-decoration-none fw-bolder position-relative text-white"
            onClick={handleBack}
          >
            <FaChevronLeft />
            <span className="ms-2">Kembali</span>
          </a>

          {/* Card Timeline Detail Start */}

          <div className="card card-ss p-4 pb-5 mt-3 mb-4">
            {/* Dropdown Option Start */}

            {/* <div className="dropdown dropdown-ss mb-md-0 mb-2 d-flex justify-content-end">
              {user?.role === "guru" && (
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
              )}
              <ul
                className="dropdown-menu dropdown-menu-ss my-1"
                aria-labelledby="dropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item">
                    <FaPen className="me-2" />
                    <span>Edit</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item">
                    <FaClone className="me-2" />
                    <span>Duplikat</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item color-danger">
                    <FaTrashAlt className="me-2" />
                    <span>Hapus</span>
                  </a>
                </li>
              </ul>
            </div> */}
            {/* Dropdown Option End */}
            <div className="d-flex align-items-center justify-content-md-between mb-4 flex-md-row flex-column">
              <div className="d-flex align-items-center mb-4 flex-md-row flex-column">
                <div
                  className="rounded-circle shadow-primary-ss me-md-4 mb-4 mb-md-0"
                  style={{
                    width: "86px",
                    height: "86px",
                  }}
                >
                  <img
                    src={`/img/post-icon-1.svg`}
                    alt="post-icon"
                    width="86px"
                    height="86px"
                  />
                </div>
                <div className="title ms-md-3">
                  <h2 className="color-dark fw-black mb-2">
                    {timeline?.tugas?.judul || timeline?.timeline?.tugas?.judul}
                  </h2>
                  <p className="color-secondary m-0">
                    Dikirim {timeline?.createdAt}
                  </p>
                </div>
              </div>
              {/* Alert Start */}
              <div
                className={`
                        rounded-ss px-4 py-2 text-white fs-14-ss
                        ${
                          sudahLewat ||
                          moment(
                            timeline?.tugas?.tanggalPengumpulan ||
                              timeline?.timeline?.tugas?.tanggalPengumpulan
                          ).diff(moment())
                            ? "bg-secondary"
                            : "bg-danger shadow-danger-ss"
                        } 
                      `}
              >
                <FaRegClock className="me-2" />
                Batas Pengumpulan{" "}
                {timeline?.tugas?.tanggalPengumpulan ||
                timeline?.timeline?.tugas?.tanggalPengumpulan
                  ? moment(
                      timeline?.tugas?.tanggalPengumpulan ||
                        timeline?.timeline?.tugas?.tanggalPengumpulan
                    ).fromNow()
                  : "(Tidak ada)"}
              </div>

              {/* Alert End */}
            </div>

            {user?.role === "guru" ? (
              <Tabs navItems={navItemsTugas} />
            ) : (
              <>
                <div className="row">
                  <div className="col-md-8 pe-2 mb-md-0 mb-3">
                    <h6 className="fs-18-ss fw-bold color-dark mb-3">
                      Informasi Tugas
                    </h6>
                    <div className="status-info p-3 pb-md-3 pb-0 bg-soft-primary rounded-ss d-flex mb-3 mb-md-0 flex-grow-1 flex-wrap justify-content-md-start justify-content-between">
                      <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                        <p className="fs-14-ss color-secondary mb-2">
                          Penilaian
                        </p>
                        <p className="fs-18-ss fw-bold color-dark m-0">
                          100 Poin
                        </p>
                      </div>
                      <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                        <p className="fs-14-ss color-secondary mb-2">KKM</p>
                        <p className="fs-18-ss fw-bold color-dark m-0">
                          {timeline?.tugas?.kkm ||
                            timeline?.timeline?.tugas?.kkm}{" "}
                          Poin
                        </p>
                      </div>
                      <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                        <p className="fs-14-ss color-secondary mb-2">Nilai</p>
                        <p className="fs-18-ss fw-bold color-dark m-0">
                          {timeline?.nilai || "-"}
                        </p>
                      </div>
                    </div>
                    <div className="post-content mt-4">
                      <p
                        className="color-secondary"
                        dangerouslySetInnerHTML={{
                          __html:
                            timeline?.tugas?.instruksi ||
                            timeline?.timeline?.tugas?.instruksi,
                        }}
                      ></p>
                    </div>
                  </div>
                  <div className="col-md-4 pe-2 mb-md-0 mb-3">
                    <h6 className="fs-18-ss fw-bold color-dark mb-3">
                      Lampiran Tugas
                    </h6>
                    {lampiranTugasGuru?.length === 0 && (
                      <div className="bg-very-soft-secondary p-3 rounded-ss mb-3 text-break">
                        <div className="file-content d-flex align-items-center flex-wrap">
                          <div
                            className="rounded-circle bg-light-secondary d-flex justify-content-center align-items-center text-white fs-3 p-2"
                            style={{
                              width: "48px",
                              height: "48px",
                            }}
                          >
                            <FaFile />
                          </div>
                          <div className="p-2 d-flex flex-column">
                            <p className="fw-bold color-secondary mb-1">
                              Tidak ada file yang dilampirkan
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {lampiranTugasGuru?.map((lampiranGuru, idx) => (
                      <a
                        key={idx}
                        href={
                          isValidUrl(lampiranGuru)
                            ? lampiranGuru
                            : `${lampiranGuru}`
                        }
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <div className="bg-soft-primary p-3 rounded-ss mb-3">
                          <div className="file-content d-flex align-items-center flex-wrap">
                            <div
                              className="rounded-circle bg-primary shadow-primary-ss d-flex justify-content-center align-items-center text-white fs-3 p-2"
                              style={{
                                width: "48px",
                                height: "48px",
                              }}
                            >
                              {isValidUrl(lampiranGuru) ? (
                                <FaLink />
                              ) : (
                                <FaFile />
                              )}
                            </div>
                            <div className="p-2 d-flex flex-column">
                              <p className="fw-bold color-dark mb-1">
                                {lampiranGuru}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                    <hr />
                    {(!timeline?.dikumpulkan ||
                      timeline?.dikumpulkan === 0) && (
                      <button
                        className="w-100 btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold"
                        data-bs-toggle="modal"
                        data-bs-target="#modalKerjakanTugas"
                      >
                        Kerjakan Tugas
                      </button>
                    )}
                    {timeline?.nilai ? (
                      <button
                        className="w-100 btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold"
                        data-bs-toggle="modal"
                        data-bs-target="#modalLihatHasilTugas"
                      >
                        Lihat Hasil
                      </button>
                    ) : (
                      timeline?.dikumpulkan === 1 && (
                        <>
                          <h6 className="fs-18-ss color-dark fw-bold">
                            Jawaban Kamu
                          </h6>
                          <button
                            className="w-100 btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold mb-3"
                            data-bs-toggle="modal"
                            data-bs-target="#modalLihatHasilTugas"
                          >
                            Lihat Jawaban
                          </button>
                          <button
                            className="w-100 btn btn-ss btn-outline-secondary rounded-pill fw-bold"
                            onClick={() => handlePutTimelineData(0)}
                          >
                            Batalkan Pengumpulan
                          </button>
                        </>
                      )
                    )}
                  </div>
                </div>
                <hr className="mt-5 mb-4" />

                {timeline?.timeline?.komen?.map((komenData, idx) => (
                  <KomenTimeline
                    idx={idx}
                    totalKomen={timeline?.timeline?.komen?.length}
                    komen={komenData?.komen}
                    userObj={komenData?.user}
                    userId={komenData?.mUserId}
                    createdAt={komenData?.createdAt}
                    onClickDelete={deleteKomen}
                    komenId={komenData?.id}
                  />
                ))}
                <KomenInput postKomen={postKomen} />
                {/* <div className="row">
                  <div className="col-md-12">
                    <h6 className="fs-18-ss fw-bold color-dark">
                      Komentar (2)
                    </h6>
                    <p className="color-secondary fw-semibold pointer">
                      Tampilkan lebih banyak balasan...
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="comment-items d-flex">
                        <div className="ava me-3">
                          <img
                            src={`/img/avatar.svg`}
                            width={50}
                            height={50}
                          />
                        </div>
                        <div className="comment-content">
                          <p className="fw-14-ss fw-bold color-dark mb-2">
                            Lorem Ipsum Dolor
                          </p>
                          <p className="fw-14-ss color-secondary mb-2">Haloo</p>
                          <div className="">
                            <span className="me-2 color-primary fw-semibold fs-12-ss pointer">
                              Balas
                            </span>
                            <span className="color-secondary fw-semibold fs-12-ss">
                              29 Des 2020 10 : 00 : 00 AM
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-end mt-3">
                    <div className="col-11 me-md-3 ms-5 ms-md-0 ps-md-0 ps-5">
                      <div className="comment-reply-toggle pointer">
                        <img
                          src={`/img/icon-reply.svg`}
                          alt="icon-reply"
                        />
                        <span className="fw-semibold color-secondary ms-2">
                          1 Balasan
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-end mt-3">
                    <div className="col-11 me-md-3 ms-5 ms-md-0 ps-md-0 ps-5">
                      <div className="comment-items d-flex">
                        <div className="ava me-3">
                          <img
                            src={`/img/avatar.svg`}
                            width={50}
                            height={50}
                          />
                        </div>
                        <div className="comment-content">
                          <p className="fw-14-ss fw-bold color-dark mb-2">
                            Lorem Ipsum Dolor
                          </p>
                          <p className="fw-14-ss color-secondary mb-2">Haloo</p>
                          <div className="">
                            <span className="color-secondary fw-semibold fs-12-ss">
                              29 Des 2020 10 : 00 : 00 AM
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-end mt-3 comment-input">
                    <div className="col-11 me-md-3 ms-5 ms-md-0 ps-md-0 ps-5">
                      <div className="comment-items d-flex">
                        <div className="ava me-3 d-md-inline d-none">
                          <img
                            src={`/img/avatar.svg`}
                            width={50}
                            height={50}
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
                          />
                          <button
                            className="border-0 btn position-absolute pe-2"
                            style={{
                              bottom: "5%",
                              right: "0",
                            }}
                          >
                            <img
                              src={`/img/btn-submit-comment.svg`}
                              alt="button-submit-comment"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-end mt-3 comment-input">
                    <div className="col-md-12">
                      <div className="comment-items d-flex">
                        <div className="ava me-3 d-md-inline d-none">
                          <img
                            src={`/img/avatar.svg`}
                            width={50}
                            height={50}
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
                          />
                          <button
                            className="border-0 btn position-absolute pe-2"
                            style={{
                              bottom: "5%",
                              right: "0",
                            }}
                          >
                            <img
                              src={`/img/btn-submit-comment.svg`}
                              alt="button-submit-comment"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                 */}
                <div
                  className="modal modal-ss fade"
                  id="modalKerjakanTugas"
                  tabIndex="-1"
                  aria-labelledby="modalKerjakanTugasLabel"
                  aria-hidden="true"
                >
                  <LoadingProgress progress={progress} />
                  <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                      <div className="modal-header p-3">
                        <div className="container">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                                <div
                                  className="modal-title d-flex flex-column col-md-6 order-2 order-md-1"
                                  id="modalKerjakanTugasLabel"
                                >
                                  <h4 className="mb-2 fw-extrabold">
                                    {timeline?.tugas?.judul}
                                  </h4>
                                  <span className="fs-14-ss">
                                    Isi jawabanmu untuk mengerjakan tugas
                                  </span>
                                </div>
                                <div className="order-1 order-md-2 d-flex d-md-inline justify-content-end m-md-0 m-2">
                                  <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() =>
                                      hideModal("modalKerjakanTugas")
                                    }
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-body">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-8">
                              <h6 className="mb-4 fw-extrabold color-dark">
                                Jawaban
                              </h6>
                              <TextareaAutosize
                                className="form-control"
                                autoComplete="off"
                                style={{
                                  resize: "none",
                                  width: "100%",
                                }}
                                placeholder="Tuliskan jawabanmu disini"
                                minRows={3}
                                name="keteranganJawaban"
                                value={formData?.keteranganJawaban}
                                onChange={handleChangeForm}
                              />
                              <div className="d-flex justify-content-between align-items-lg-start mb-4 mt-5 flex-lg-row flex-column flex-wrap">
                                <h6 className="m-0 fw-extrabold color-dark">
                                  Lampiran
                                </h6>
                                <div className="d-flex align-items-md-center flex-md-row flex-column justify-content-between mt-xl-0 mt-md-2 mt-3">
                                  <label
                                    htmlFor="formFileMultiple"
                                    className="d-flex align-items-center justify-content-center form-label m-0 fs-6 btn btn-ss fs-14-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-lg-3 fw-bold mb-md-0 mb-3"
                                  >
                                    <FaPaperclip className="me-2" />
                                    <p className="mb-0">Unggah File</p>
                                  </label>
                                  <input
                                    className="form-control d-none"
                                    type="file"
                                    name="formFileMultiple"
                                    id="formFileMultiple"
                                    onChange={uploadFileToServer}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fs-14-ss fw-bold"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalTautanLink"
                                  >
                                    <FaLink className="me-2" />
                                    Tautan Link
                                  </button>
                                </div>
                              </div>
                              {onUpload && <LampiranSkeleton />}
                              {!onUpload &&
                                formData?.lampiran?.map((lampiranData, idx) => (
                                  <div className="mt-3" key={idx}>
                                    <div className="card-lampiran-materi border-light-secondary rounded-ss mb-3">
                                      <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-md-row flex-column">
                                        <div className="d-flex align-items-center flex-wrap">
                                          <div className="pdf-icon ms-0 m-2 shadow-primary-ss">
                                            <FaFile className="text-white fs-3" />
                                          </div>
                                          <div className="p-2">
                                            <p className="fw-bold color-dark mb-0">
                                              {lampiranData}
                                            </p>
                                            <span className="fs-12-ss color-secondary fs-12-ss fw-bold">
                                              {/* PDF */}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center ps-md-2 pt-md-2 pb-md-2 pe-0 pt-3 p-0">
                                          <a
                                            href={`${lampiranData}`}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="btn btn-sm btn-outline-secondary me-3 btn-pratinjau-file rounded-pill fs-12-ss fw-bold pointer d-flex justify-content-center align-items-center"
                                          >
                                            Pratinjau
                                          </a>
                                          <FaTimes
                                            className="text-secondary"
                                            onClick={() =>
                                              deleteLampiran(lampiranData)
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                            <div className="col-lg-4 position-relative">
                              {/* Card Penilaian Start */}

                              <div className="card card-ss rounded-ss p-4 mt-4 mt-lg-0">
                                <h6 className="fs-18-ss fw-bold color-dark mb-3">
                                  Komentar Pribadi ( {timeline?.komen?.length} )
                                </h6>
                                {timeline?.komen?.map((komen) => (
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="comment-items d-flex">
                                        <div className="ava me-3">
                                          <img
                                            src={
                                              komen?.user?.avatar
                                                ? `${komen?.user?.avatar}`
                                                : `/img/avatar.svg`
                                            }
                                            width={50}
                                            height={50}
                                          />
                                        </div>
                                        <div className="comment-content">
                                          <div>
                                            <p className="fw-14-ss fw-bold color-dark mb-0 me-2 d-inline">
                                              {komen?.user?.nama}
                                            </p>
                                            <span className="color-secondary fw-semibold fs-12-ss">
                                              {komen?.createdAt}
                                            </span>
                                          </div>
                                          <p className="fw-14-ss color-secondary mb-2">
                                            {komen?.komen}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                <div className="row justify-content-end mt-3 comment-input">
                                  <div className="col-11 me-md-3 ms-5 ms-md-0 ps-md-0 ps-5">
                                    <div className="comment-items d-flex">
                                      <div className="ava me-3 d-md-inline d-none">
                                        <img
                                          src={`/img/avatar.svg`}
                                          width={50}
                                          height={50}
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
                                          name="komen"
                                          onChange={handleChangeForm}
                                          value={formData?.komen}
                                        />
                                        <button
                                          className="border-0 btn position-absolute pe-2"
                                          style={{
                                            bottom: "5%",
                                            right: "0",
                                          }}
                                          onClick={postKomentarPribadi}
                                        >
                                          <img
                                            src={`/img/btn-submit-comment.svg`}
                                            alt="button-submit-comment"
                                          />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Card Penilaian End */}
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
                                data-bs-dismiss="modal"
                              >
                                Batal
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary ms-3"
                                disabled={onUpload}
                                onClick={onClickKumpulkanTugas}
                              >
                                Kumpulkan Tugas
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="modal modal-ss fade"
                  id="modalTautanLink"
                  tabIndex="-1"
                  aria-labelledby="modalTautanLinkLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-sm modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4
                          className="modal-title fw-extrabold"
                          id="modalTautanLinkLabel"
                        >
                          Tambah Link
                        </h4>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => hideModal("modalTautanLink")}
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="mb-4">
                          <label className="form-label">Alamat Link</label>
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            placeholder="Contoh:http://getsmartschool.id"
                            onChange={(e) => setTautanLink(e.target.value)}
                            value={tautanLink}
                          />
                        </div>
                      </div>
                      <div className="modal-footer d-flex justify-content-center">
                        <div className="row w-100">
                          <div className="col-6 ps-0">
                            <button
                              type="button"
                              className="btn btn-secondary w-100"
                              data-bs-dismiss="modal"
                            >
                              Batal
                            </button>
                          </div>
                          <div className="col-6 pe-0">
                            <button
                              type="button"
                              className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                              onClick={handlePostLink}
                            >
                              Tambah
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="modal modal-ss fade"
                  id="modalLihatHasilTugas"
                  tabIndex="-1"
                  aria-labelledby="modalLihatHasilTugasLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                      <div className="modal-header p-3">
                        <div className="container">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                                <div
                                  className="modal-title d-flex flex-column col-md-6 order-2 order-md-1"
                                  id="modalLihatHasilTugasLabel"
                                >
                                  <h4 className="mb-2 fw-extrabold">
                                    {timeline?.tugas?.judul ||
                                      timeline?.timeline?.tugas?.judul}
                                  </h4>
                                </div>
                                <div className="order-1 order-md-2 d-flex d-md-inline justify-content-end m-md-0 m-2">
                                  <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() =>
                                      hideModal("modalLihatHasilTugas")
                                    }
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-body">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="card card-ss rounded-ss p-4">
                                <h4 className="mb-4 fw-extrabold color-dark">
                                  Jawaban Tugas
                                </h4>
                                <div className="post-content mb-4">
                                  {timeline?.keterangan && (
                                    <p className="color-secondary">
                                      {timeline?.keterangan}
                                    </p>
                                  )}
                                </div>
                                <div>
                                  {timeline?.lampiran?.map(
                                    (lampiranData, idx) => (
                                      <a
                                        key={idx}
                                        href={`${lampiranData}`}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                      >
                                        <div className="bg-soft-primary p-3 rounded-ss mb-3">
                                          <div className="file-content d-flex align-items-center flex-wrap">
                                            <div
                                              className="rounded-circle bg-primary shadow-primary-ss d-flex justify-content-center align-items-center text-white fs-3 p-2"
                                              style={{
                                                width: "48px",
                                                height: "48px",
                                              }}
                                            >
                                              <FaFile />
                                            </div>
                                            <div className="p-2 d-flex flex-column">
                                              <p className="fw-bold color-dark mb-1">
                                                {lampiranData}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    )
                                  )}
                                </div>
                                <hr />
                                <h6 className="fs-18-ss fw-bold color-dark mb-3">
                                  Komentar Pribadi ( {timeline?.komen?.length} )
                                </h6>
                                {timeline?.komen?.map((komen) => (
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="comment-items d-flex">
                                        <div className="ava me-3">
                                          <img
                                            src={
                                              komen?.user?.avatar
                                                ? `${komen?.user?.avatar}`
                                                : `/img/avatar.svg`
                                            }
                                            width={50}
                                            height={50}
                                          />
                                        </div>
                                        <div className="comment-content">
                                          <div className="d-flex justify-content-between align-items-center">
                                            <p className="fw-14-ss fw-bold color-dark mb-0 me-2">
                                              {komen?.user?.nama}
                                            </p>
                                            <span className="color-secondary fw-semibold fs-12-ss">
                                              {komen?.createdAt}
                                            </span>
                                          </div>
                                          <p className="fw-14-ss color-secondary mb-2">
                                            {komen?.komen}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                <div className="row justify-content-end mt-3 comment-input">
                                  <div className="col-md-12">
                                    <div className="comment-items d-flex">
                                      <div className="ava me-3 d-md-inline d-none">
                                        <img
                                          src={`/img/avatar.svg`}
                                          width={50}
                                          height={50}
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
                                          name="komen"
                                          value={formData?.komen}
                                          onChange={handleChangeForm}
                                        />
                                        <button
                                          className="border-0 btn position-absolute pe-2"
                                          style={{
                                            bottom: "5%",
                                            right: "0",
                                          }}
                                          onClick={postKomentarPribadi}
                                        >
                                          <img
                                            src={`/img/btn-submit-comment.svg`}
                                            alt="button-submit-comment"
                                          />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Card Timeline Detail End */}
        </div>
      </div>
    </>
  );
};

export default TugasPage;
