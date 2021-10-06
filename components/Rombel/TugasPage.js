import { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrashAlt,
  FaPen,
  FaClone,
  FaCommentDots,
  FaPaperclip,
  FaRegClock,
} from "react-icons/fa";
import Link from "next/link";
import { baseURL, ssURL } from "../../client/clientAxios";
import Tabs from "../../components/Shared/Tabs/Tabs";
import NewModal from "../../components/Shared/NewModal/NewModal";
import ReactiveButton from "reactive-button";
import { toast } from "react-toastify";
import Navbar from "../../components/Shared/Navbar/Navbar";
import TextareaAutosize from "react-textarea-autosize";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { Fragment } from "react";
import { getTugas, deleteTugas } from "../../client/TugasClient";
import swal from "sweetalert";
import TugasSkeleton from "../Shared/Skeleton/TugasSkeleton";
import useUser from "../../hooks/useUser";
import { deleteTimeline } from "../../client/TimelineClient";
import moment from "moment";
import { hideModal } from "../../utilities/ModalUtils";

const TugasPage = ({
  subnav,
  id,
  setInitialFormData,
  setStateEditData,
  tugasData,
  isLoading,
  getTugasData,
  setIsDuplicate,
  timelineData,
}) => {
  const { user } = useUser();
  const [isTugasLoading, setIsTugasLoading] = useState(isLoading);
  const [activeSubTugas, setActiveSubTugas] = useState([]);
  const {
    tugasDraf,
    tugasSaatIni,
    tugasSelesai,
    tugasTerjadwal,
    tugasTerperiksa,
  } = tugasData || {};

  const deleteTimelineData = (id) => {
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
          getTugasData();
        }
      }
    });
  };

  const getActiveSubTugasData = () => {
    let data = [];
    const tugasDataSiswa = timelineData?.timeline?.filter(
      (data) => data.tipe === "tugas"
    );

    if (subnav === "saat-ini" || !subnav) {
      if (user?.role === "guru") {
        data = tugasSaatIni;
      } else {
        data = tugasDataSiswa?.filter((data) => !data.dikumpulkan);
      }
    } else if (subnav === "terjadwal") {
      data = tugasTerjadwal;
    } else if (subnav === "sudah-selesai") {
      if (user?.role === "guru") {
        data = tugasSelesai;
      } else {
        data = tugasDataSiswa?.filter((data) => data.dikumpulkan === 1);
      }
    } else if (subnav === "terperiksa") {
      data = tugasTerperiksa;
    } else {
      data = tugasDraf;
    }

    setActiveSubTugas(data);
  };

  const navItems = [
    {
      url: `${ssURL}/rombel/[id]?nav=tugas&subnav=saat-ini`,
      as: `${ssURL}/rombel/${id}?nav=tugas&subnav=saat-ini`,
      text: "Saat Ini",
      active: subnav == "saat-ini" || subnav == undefined,
      dataJoyride: "saat-ini",
    },
    user?.role === "guru" && {
      url: `${ssURL}/rombel/[id]?nav=tugas&subnav=terjadwal`,
      as: `${ssURL}/rombel/${id}?nav=tugas&subnav=terjadwal`,
      text: "Terjadwal",
      active: subnav == "terjadwal",
      dataJoyride: "terjadwal",
    },
    {
      url: `${ssURL}/rombel/[id]?nav=tugas&subnav=sudah-selesai`,
      as: `${ssURL}/rombel/${id}?nav=tugas&subnav=sudah-selesai`,
      text: "Sudah Selesai",
      active: subnav == "sudah-selesai",
      dataJoyride: "sudah-selesai",
    },
    user?.role === "guru" && {
      url: `${ssURL}/rombel/[id]?nav=tugas&subnav=terperiksa`,
      as: `${ssURL}/rombel/${id}?nav=tugas&subnav=terperiksa`,
      text: "Terperiksa",
      active: subnav == "terperiksa",
      dataJoyride: "terperiksa",
    },
    user?.role === "guru" && {
      url: `${ssURL}/rombel/[id]?nav=tugas&subnav=draf`,
      as: `${ssURL}/rombel/${id}?nav=tugas&subnav=draf`,
      text: "Draf",
      active: subnav == "draf",
      dataJoyride: "draf",
    },
  ];

  const options = [
    { label: "Thing 1", value: 1 },
    { label: "Thing 2", value: 2 },
  ];

  const ContentTab = () => {
    return (
      <Fragment>
        <div className="kuis-component">
          <div className="kuis-card rounded-ss mb-3 d-flex align-items-md-center border border-secondary border-light-secondary-ss p-3 flex-lg-nowrap flex-md-row flex-column flex-wrap">
            <div
              className="rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fw-extrabold color-dark me-3 p-3"
              style={{
                width: "40px",
                height: "40px",
              }}
            >
              1
            </div>
            <div className="d-flex justify-content-sm-between align-items-sm-center flex-column flex-sm-row flex-grow-1">
              <div className="soal-content fs-14-ss p-md-1 p-0 m-md-0 mt-3 mb-4">
                <p className="mb-0 color-secondary">Lorem ipsum</p>
              </div>
              <div className="d-flex flex-lg-row flex-sm-column flex-row justify-content-between">
                <button
                  className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fs-6 me-lg-2 mb-lg-0 mb-md-2 mb-0"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <FaPen className="color-secondary" />
                </button>
                <button
                  className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fs-6"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <FaTrashAlt className="color-secondary" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const navItemsModalTugasKuis = [
    {
      id: "pilihan-ganda",
      nav: "Pilihan Ganda",
      active: true,
      content: <ContentTab />,
    },
    {
      id: "esai",
      nav: "Esai",
      active: false,
      content: <ContentTab />,
    },
  ];

  const NavbarTugas = ({ setInitialFormData }) => (
    <>
      <Navbar
        nav={navItems}
        action={[
          {
            button: (
              <div className="dropdown dropdown-ss d-flex flex-column">
                {user?.role == "guru" && (
                  <a
                    className="dropdown-item pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#modalBuatTugas"
                    onClick={() => setInitialFormData()}
                  >
                    <div
                      role="button"
                      className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold"
                      data-joyride="btn-buat-tugas"
                    >
                      <div>
                        <FaPlus className="me-2" />
                        Buat Tugas
                      </div>
                    </div>
                  </a>

                  // <div
                  //   role="button"
                  //   id="dropdownMenuLink"
                  //   data-bs-toggle="dropdown"
                  //   aria-expanded="false"
                  //   className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold"
                  //   data-joyride="btn-buat-tugas"
                  // >
                  //   <div>
                  //     <FaPlus className="me-2" />
                  //     Buat Tugas
                  //   </div>
                  // </div>
                )}
                <ul
                  className="dropdown-menu dropdown-menu-ss my-1"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li onClick={() => setInitialFormData()}>
                    <a
                      className="dropdown-item pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#modalBuatTugas"
                    >
                      <span>Tugas</span>
                    </a>
                  </li>
                  {/* <li>
                    <a
                      className="dropdown-item pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#modalBuatTugasKuis"
                    >
                      <span>Tugas Kuis</span>
                    </a>
                  </li> */}
                </ul>
              </div>
            ),
          },
        ]}
      />
    </>
  );

  useEffect(() => {
    if (tugasData) {
      setIsTugasLoading(true);
      setTimeout(() => {
        getActiveSubTugasData();
        setIsTugasLoading(false);
      }, 350);
    }
  }, [subnav, tugasData]);

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <NavbarTugas setInitialFormData={setInitialFormData} />
        </div>
      </div>

      {/* <!-- Modal Fullscreen Buat Tugas Kuis--> */}
      <div
        className="modal modal-ss fade"
        id="modalBuatTugasKuis"
        tabIndex="-1"
        aria-labelledby="modalBuatTugasKuisLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="modal-title" id="modalBuatTugasKuisLabel">
                        <h4 className="mb-1 fw-extrabold">Buat Tugas Kuis</h4>
                        <span className="fs-6 fw-normal">
                          Isi informasi dibawah untuk membuat tugas
                        </span>
                      </div>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => hideModal("modalBuatTugasKuis")}
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
                  <div className="col-lg-5">
                    <div className="card card-ss rounded-ss p-4 card-content-informasi-tugas mb-md-0 mb-4">
                      <h4 className="mb-4 fw-extrabold color-dark">
                        Informasi Tugas
                      </h4>

                      <div className="mb-3">
                        <label className="form-label">Judul</label>
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Instruksi Tugas</label>
                        <TextareaAutosize
                          className="form-control"
                          autoComplete="off"
                          style={{
                            resize: "none",
                            width: "100%",
                          }}
                          placeholder="Tuliskan Instruksi Tugas"
                          minRows={3}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Bagikan Untuk</label>
                        <div className="row">
                          <div className="col-md-6 mb-md-0 mb-2">
                            <div className="react-multi-select">
                              <ReactMultiSelectCheckboxes
                                options={options}
                                placeholderButtonLabel="Pilih Kelas.."
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="react-multi-select">
                              <ReactMultiSelectCheckboxes
                                options={options}
                                placeholderButtonLabel="Pilih Siswa.."
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Batas Waktu</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>
                            Tugas ini tidak memiliki batas waktu
                          </option>
                          <option>Tugas ini memiliki batas waktu</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="example-date-input"
                          className="form-label"
                        >
                          Tanggal Batas Waktu
                        </label>
                        <input
                          className="form-control"
                          autoComplete="off"
                          id="example-date-input"
                          placeholder="Pilih Tanggal"
                          type="date"
                          // onfocus={this.type="date"}
                          // onblur={this.type="text"}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="example-date-input"
                          className="form-label"
                        >
                          Jam Batas Waktu
                        </label>
                        <input
                          className="form-control"
                          autoComplete="off"
                          id="example-date-input"
                          placeholder="--:--"
                          type="time"
                          // onfocus={this.type="date"}
                          // onblur={this.type="text"}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Penilaian</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Tugas ini dinilai tanpa KKM</option>
                          <option>Tugas ini dinilai dengan KKM</option>
                        </select>
                      </div>
                      <div className="mb-3">
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
                          id="example-number-input"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Jadwal Pembagian</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Bagikan sekarang</option>
                          <option>Atur jadwal pembagian</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="example-date-input"
                          className="form-label"
                        >
                          Tanggal Pembagian
                        </label>
                        <input
                          className="form-control"
                          autoComplete="off"
                          id="example-date-input"
                          placeholder="Pilih Tanggal"
                          type="date"
                          // onfocus={this.type="date"}
                          // onblur={this.type="text"}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="example-date-input"
                          className="form-label"
                        >
                          Jam Pembagian
                        </label>
                        <input
                          className="form-control"
                          autoComplete="off"
                          id="example-date-input"
                          placeholder="--:--"
                          type="time"
                          // onfocus={this.type="date"}
                          // onblur={this.type="text"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="card card-ss rounded-ss p-4 card-content-lampiran-tugas">
                      <div className="d-flex justify-content-between align-items-lg-start mb-4 flex-lg-row flex-column flex-wrap">
                        <h4 className="m-0 fw-extrabold color-dark">Soal</h4>
                        <div className="d-flex align-items-md-center flex-md-row flex-column justify-content-between mt-xl-0 mt-md-2 mt-3">
                          {/* Disini */}
                          <div className="dropdown dropdown-ss">
                            <div
                              className="rounded-ss"
                              role="button"
                              id="dropdownMenuLink"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <button
                                type="button"
                                className="btn btn-ss btn-primary bg-gradient-primary rounded-pill"
                              >
                                <FaPlus className="me-2" />
                                Buat Soal
                              </button>
                            </div>
                            <ul
                              className="dropdown-menu dropdown-menu-ss my-1"
                              aria-labelledby="dropdownMenuLink"
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  Pilihan Ganda
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalAddQuiz"
                                >
                                  Esai
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <Tabs navItems={navItemsModalTugasKuis} />
                      <NewModal
                        title={
                          <>
                            <h5 className="mb-0 fw-bold">
                              Buat Soal Pilihan Ganda
                            </h5>
                            <span className="fs-6">
                              Isi informasi dibawah untuk membuat soal pilihan
                              ganda
                            </span>
                          </>
                        }
                        content={<></>}
                        submitButton={
                          <ReactiveButton
                            buttonState={"idle"}
                            color={"primary"}
                            idleText={"Buat Soal"}
                            loadingText={"Diproses"}
                            successText={"Berhasil"}
                            errorText={"Gagal"}
                            type={"button"}
                            data-bs-dismiss="modal"
                            className={"btn btn-primary"}
                          />
                        }
                      />
                      <NewModal
                        modalId="modalAddQuiz"
                        title={
                          <>
                            <h5 className="mb-0 fw-bold">
                              Buat Soal Pilihan Esai
                            </h5>
                            <span className="fs-6">
                              Isi informasi dibawah untuk membuat soal esai
                            </span>
                          </>
                        }
                        content={<></>}
                        submitButton={
                          <ReactiveButton
                            buttonState={"idle"}
                            color={"primary"}
                            idleText={"Buat Soal"}
                            loadingText={"Diproses"}
                            successText={"Berhasil"}
                            errorText={"Gagal"}
                            type={"button"}
                            data-bs-dismiss="modal"
                            className={"btn btn-primary"}
                          />
                        }
                      />
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
                      data-bs-dismiss="modal"
                    >
                      Draf
                    </button>
                    <button type="button" className="btn btn-primary ms-3">
                      Bagikan Tugas
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4 justify-content-center gb-3">
        {/* Card Post Tugas Start */}
        {isTugasLoading && <TugasSkeleton />}
        {!isTugasLoading && !activeSubTugas?.length && (
          <>
            <div className="col-md-4 col-8">
              <img
                src="/img/empty-state-timeline.png"
                alt="empty-state"
                className="img-fluid"
              />
            </div>
            <div className="col-12 text-center">
              <h5 className="color-dark fw-black">Belum Ada Tugas</h5>
              {user?.role === "guru" ? (
                <p className="fw-bold fs-14-ss">
                  Tekan tombol{" "}
                  <a
                    className="text-decoration-none color-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#modalBuatTugas"
                    onClick={() => setInitialFormData()}
                  >
                    {" "}
                    Buat Tugas
                  </a>{" "}
                  untuk membuat tugas
                </p>
              ) : (
                <p className="fw-bold fs-14-ss">
                  Sepertinya guru belum memberikan tugas untuk kamu saat ini
                </p>
              )}
            </div>
          </>
        )}
        {!isTugasLoading &&
          activeSubTugas?.map((d, idx) => {
            return (
              <div className="col-lg-10 mb-3" key={idx}>
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
                            <img src={`/img/post-icon-1.svg`} alt="post-icon" />
                          </div>
                          <div className="title">
                            <h6 className="color-dark fw-black m-0">
                              {d.tugas?.judul || d?.timeline?.tugas?.judul}
                            </h6>
                            <p className="color-secondary m-0 fs-14-ss mt-2">
                              {d.tugas?.createdAt ||
                                d?.timeline?.tugas?.createdAt}
                            </p>
                          </div>
                        </div>
                      </a>
                    </Link>
                    {/* Post Title End */}

                    {/* Dropdown Option Start */}

                    <div className="dropdown dropdown-ss mb-md-0 mb-2 d-md-inline d-flex justify-content-end order-md-2 order-1">
                      {user?.role == "guru" ? (
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
                      ) : null}
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
                        <li onClick={() => deleteTimelineData(d?.mTugasId)}>
                          <a className="dropdown-item color-danger">
                            <FaTrashAlt className="me-2" />
                            <span>Hapus</span>
                          </a>
                        </li>
                      </ul>
                    </div>
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
                            className="card-post-content col-lg-9 col-md-8 color-secondary clamp"
                            dangerouslySetInnerHTML={{
                              __html:
                                d.tugas?.instruksi ||
                                d.timeline?.tugas?.instruksi,
                            }}
                          ></div>

                          {/* Post Description End */}

                          {/* Post Complete Status Start*/}
                          {subnav !== "draf" && (
                            <div
                              className={`bg-soft-primary rounded-ss d-flex align-items-center post-complete-status ${
                                user?.role === "guru"
                                  ? "col-lg-3 p-3"
                                  : "col-lg-3 py-3 px-4"
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
                          )}
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
                            {subnav !== "draf" && (
                              <div className="comment color-dark fs-14-ss fw-bolder me-4">
                                <FaCommentDots className="me-2" />
                                <span>
                                  {d?.meta?.totalKomen ||
                                    d?.timeline?.meta?.totalKomen}{" "}
                                  Komentar
                                </span>
                              </div>
                            )}
                            <div className="attach color-dark fs-14-ss fw-bolder">
                              <FaPaperclip className="me-2" />
                              <span>
                                {d?.tugas?.lampiran?.length ||
                                  d?.timeline?.tugas?.lampiran?.length}{" "}
                                Lampiran
                              </span>
                            </div>
                          </div>
                          {/* Comment & Attachment End */}
                        </a>
                      </Link>

                      {/* Alert Start */}
                      {subnav !== "draf" && (
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
                      )}
                      {/* Alert End */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {/* Card Post Tugas End */}
      </div>
    </>
  );
};

export default TugasPage;
