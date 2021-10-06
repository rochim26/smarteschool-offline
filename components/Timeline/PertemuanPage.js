import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaPen } from "react-icons/fa";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import swal from "sweetalert";
import {
  deleteTimelineKomen,
  editTimeline,
  getDetailTimeline,
  postTimelineKomen,
} from "../../client/TimelineClient";
import Tabs from "../../components/Shared/Tabs/Tabs";
import useAbsenSiswa from "../../hooks/useAbsenSiswa";
import useUser from "../../hooks/useUser";
import { isValidGmeetUrl, momentPackage } from "../../utilities/HelperUtils";
import Avatar from "../Shared/Avatar/Avatar";
import Editor from "../Shared/Editor/Editor";
import KomenInput from "../Shared/KomenTimeline/KomenInput";
import KomenTimeline from "../Shared/KomenTimeline/KomenTimeline";
import WhatsappLink from "../Shared/WhatsappLink/WhatsappLink";

const initialFormData = {
  tingkat: "",
  mJurusanId: "",
  mUserId: "",
  kode: "",
  rpp: [],
  jurnal: "",
};

const PertemuanPage = ({
  id,
  setModalType,
  handleAbsensi,
  timelineDataProps,
}) => {
  const { user } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);

  const [timelineData, setTimelineData] = useState({});
  const { timeline } = timelineData;

  const [buttonRPP, setButtonRPP] = useState("idle");
  const [buttonJurnal, setButtonJurnal] = useState("idle");
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handlePutTimelineData = async () => {
    formData.tanggalAkhir == null || formData.tanggalAkhir == undefined
      ? delete formData.tanggalAkhir
      : null;

    setButtonRPP("loading");
    const { data, isSuccess } = await editTimeline(id, {
      ...formData,
      tanggalPembagian: momentPackage(formData.tanggalPembagian).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      tanggalAkhir: momentPackage(formData.tanggalAkhir).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      jurnal: window.$(`#editorJurnalHarian`).summernote("code"),
    });

    if (isSuccess) {
      toast.success(data?.message);
      setButtonRPP("success");
      setButtonJurnal("success");
      getDetailTimelineData();
    } else {
      setButtonRPP("error");
      setButtonJurnal("success");
    }
  };

  const getDetailTimelineData = async () => {
    const { data } = await getDetailTimeline(id, {
      waktuSaatIni: momentPackage().format("YYYY-MM-DD HH:mm:ss"),
    });

    if (data) {
      setFormData({
        ...formData,
        ...data.timeline,
      });
      jurnal: window
        .$(`#editorJurnalHarian`)
        .summernote("code", data.timeline?.jurnal);
      setTimelineData(data);
    }
  };

  const handleClickPilihanAbsen = (type, e, siswa) => {
    if (siswa) {
      handleAbsensi(type, siswa);
      getDetailTimelineData();
    } else if (e) {
      e.preventDefault();
      isValidGmeetUrl(timeline?.gmeet || timeline?.timeline?.gmeet) == "#!"
        ? null
        : window.open(timeline?.gmeet || timeline?.timeline?.gmeet);
      setModalType("");
      handleAbsensi("hadir");
    } else if (!timeline?.absensi) {
      if (type === "hadir") {
        isValidGmeetUrl(timeline?.gmeet || timeline?.timeline?.gmeet) == "#!"
          ? null
          : window.open(timeline?.gmeet || timeline?.timeline?.gmeet);
        setModalType("");
        handleAbsensi("hadir");
      } else if (type === "izin") {
        setModalType("izin");
      } else {
        setModalType("sakit");
      }
    }
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

  const { setAbsenSiswa } = useAbsenSiswa();

  const onChangeSearch = (value) => {
    if (value === "") {
      getDetailTimelineData();
      return;
    }

    const copyTkTimeline = [...timelineData?.timeline?.tkTimeline];
    const newTkTimeline = copyTkTimeline?.filter(
      (timeline) =>
        timeline?.user?.nama?.toLowerCase()?.indexOf(value?.toLowerCase()) >= 0
    );
    setTimelineData({
      ...timelineData,
      timeline: { tkTimeline: [...newTkTimeline] },
    });
  };

  useEffect(() => {
    getDetailTimelineData();
  }, []);

  useEffect(() => {
    setTimelineData(timelineDataProps);
  }, [timelineDataProps]);

  const navItemsPertemuan = [
    {
      id: "informasi",
      nav: "Informasi",
      active: true,
      dataJoyride: "informasi",
      content: (
        <>
          <div className="row mt-4">
            <div className="col-md-8 pe-2 mb-md-0 mb-3">
              <div
                className="status-info p-3 pb-md-3 pb-0 bg-soft-primary rounded-ss d-flex mb-3 mb-md-0 flex-grow-1 flex-wrap justify-content-md-start justify-content-between"
                data-joyride="informasi-absen"
              >
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss color-secondary mb-2">Hadir</p>
                  <p className="fs-18-ss fw-bold color-dark m-0">
                    {timeline?.meta?.totalHadir} Siswa
                  </p>
                </div>
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss color-secondary mb-2">Sakit</p>
                  <p className="fs-18-ss fw-bold color-dark m-0">
                    {timeline?.meta?.totalSakit} Siswa
                  </p>
                </div>
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss color-secondary mb-2">Izin</p>
                  <p className="fs-18-ss fw-bold color-dark m-0">
                    {timeline?.meta?.totalIzin} Siswa
                  </p>
                </div>
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss color-secondary mb-2">Alpa</p>
                  <p className="fs-18-ss fw-bold color-dark m-0">
                    {timeline?.meta?.totalAlpa} Siswa
                  </p>
                </div>
              </div>
              <div className="post-content mt-4">
                <p className="color-secondary">
                  Absen Kelas {timeline?.rombel?.nama} Tanggal{" "}
                  {timeline?.tanggalPertemuan}
                </p>
                {timeline?.deskripsi}
              </div>
            </div>
            <div className="col-md-4 ps-2">
              <a
                onClick={(e) => handleClickPilihanAbsen("hadir", e)}
                rel="noreferrer noopener"
                className={`btn ${
                  isValidGmeetUrl(
                    timeline?.gmeet || timeline?.timeline?.gmeet
                  ) == "#!"
                    ? "btn-secondary btn-secondary-ss"
                    : "btn-primary btn-primary-ss"
                } rounded-ss d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-start py-3 px-4`}
                style={{
                  height: "90px",
                }}
                data-joyride="btn-tatap-muka"
              >
                <div className="d-flex align-items-center flex-lg-row flex-md-column flex-row">
                  <img
                    src={`/img/icon-tatap-muka.svg`}
                    alt="icon-tatap-muka"
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  />
                  <p className="m-0 text-white fw-bold ps-lg-4 pe-lg-5 px-md-0 ps-4 pe-5">
                    {isValidGmeetUrl(
                      timeline?.gmeet || timeline?.timeline?.gmeet
                    ) == "#!"
                      ? "Tidak ada tatap muka"
                      : "Tatap Muka"}
                  </p>
                </div>
              </a>
            </div>
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
              onClickDelete={deleteKomen}
              komenId={komenData?.id}
            />
          ))}
          <KomenInput postKomen={postKomen} />
        </>
      ),
    },
    {
      id: "absen-siswa",
      nav: "Absen Siswa",
      active: false,
      dataJoyride: "absen-siswa",
      content: (
        <>
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="d-flex justify-content-between flex-column flex-md-row align-items-center mb-4">
                <h4 className="color-dark fw-bold m-0 mb-md-0 mb-3">
                  Daftar Absen Siswa
                </h4>
                <input
                  type="text"
                  className="form-control form-search rounded-pill fs-14-ss fw-semibold border-secondary-ss"
                  id="exampleFormControlInput1"
                  placeholder="Cari Nama Siswa"
                  onChange={(e) => onChangeSearch(e.target.value)}
                />
              </div>
              <ul className="list-absen-kelas list-group list-group-flush">
                {timeline?.tkTimeline?.map((d, idx) => {
                  let status;

                  if (d.absen == "izin") {
                    status = (
                      <>
                        <div className="label-ss bg-soft-success color-success rounded-pill d-flex justify-content-center align-items-center me-3">
                          Izin
                        </div>
                        <button
                          className="btn btn-ss btn-outline-secondary rounded-pill d-flex justify-content-center align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#keteranganAbsen"
                          onClick={() => setAbsenSiswa(d)}
                        >
                          Keterangan
                        </button>
                      </>
                    );
                  } else if (!d.absen) {
                    status = (
                      <>
                        <div className="label-ss bg-soft-danger color-danger rounded-pill d-flex justify-content-center align-items-center me-3">
                          Alpa
                        </div>
                        <WhatsappLink
                          phoneNumber={d.user?.whatsapp}
                          text={`Halo nak ${d.user?.nama}`}
                        >
                          <button className="btn btn-ss btn-outline-secondary rounded-pill d-flex justify-content-center align-items-center">
                            Hubungi Siswa
                          </button>
                        </WhatsappLink>
                      </>
                    );
                  } else if (d.absen == "hadir") {
                    status = (
                      <>
                        <div
                          className={`label-ss bg-${
                            timeline.tanggalAkhir
                              ? momentPackage(d.updatedAt).utcOffset(7) <
                                momentPackage(timeline.tanggalAkhir).utcOffset(
                                  7
                                )
                                ? "primary"
                                : "warning"
                              : "primary"
                          } text-white rounded-pill d-flex justify-content-center align-items-center me-3`}
                        >
                          {timeline.tanggalAkhir
                            ? momentPackage(d.updatedAt).utcOffset(7) <
                              momentPackage(timeline.tanggalAkhir).utcOffset(7)
                              ? "Hadir"
                              : "Telat"
                            : "Hadir"}
                        </div>
                        <div
                          className="bg-soft-primary color-primary d-flex justify-content-center py-1 px-2 rounded-pill"
                          style={{ minWidth: "160px" }}
                        >
                          {d.waktuAbsen}
                        </div>
                      </>
                    );
                  } else if (d.absen == "sakit") {
                    status = (
                      <>
                        <div className="label-ss bg-soft-warning color-warning rounded-pill d-flex justify-content-center align-items-center me-3">
                          Sakit
                        </div>
                        <button
                          className="btn btn-ss btn-outline-secondary rounded-pill d-flex justify-content-center align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#keteranganAbsen"
                          onClick={() => setAbsenSiswa(d)}
                        >
                          Keterangan
                        </button>
                      </>
                    );
                  }

                  return (
                    <li className="list-group-item" key={idx}>
                      <div className="d-flex align-items-md-center justify-content-between flex-md-row flex-column">
                        <div className="list-group-member d-flex align-items-center mb-3 mb-md-0">
                          <Avatar
                            name={d?.user?.nama}
                            src={d?.user?.avatar}
                            size={45}
                          />
                          <p className="m-0 ms-4 fw-semibold color-secondary">
                            {d?.user?.nama}
                          </p>
                        </div>
                        <div className="list-group-info d-flex justify-content-end justify-content-md-start align-items-center">
                          {status}
                          <div className="dropdown dropdown-ss mb-md-0 mb-2 d-md-inline d-flex justify-content-end order-md-2 order-1 ms-3">
                            <div
                              role="button"
                              id="dropdownMenuLink"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <button
                                type="button"
                                className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fs-6 mb-lg-0 mb-md-3 mb-0"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                }}
                              >
                                <FaPen className="color-secondary" />
                              </button>
                            </div>
                            <ul
                              className="dropdown-menu dropdown-menu-ss my-1"
                              aria-labelledby="dropdownMenuLink"
                            >
                              <li
                                onClick={() =>
                                  handleClickPilihanAbsen("hadir", null, {
                                    siswaId: d?.user?.id,
                                    tkId: d.id,
                                  })
                                }
                              >
                                <a className="dropdown-item">
                                  <span>Hadir</span>
                                </a>
                              </li>
                              <li
                                onClick={() =>
                                  handleClickPilihanAbsen("izin", null, {
                                    siswaId: d?.user?.id,
                                    tkId: d.id,
                                  })
                                }
                              >
                                <a className="dropdown-item">
                                  <span>izin</span>
                                </a>
                              </li>
                              <li
                                onClick={() =>
                                  handleClickPilihanAbsen("sakit", null, {
                                    siswaId: d?.user?.id,
                                    tkId: d.id,
                                  })
                                }
                              >
                                <a className="dropdown-item">
                                  <span>Sakit</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "rpp-jurnal",
      nav: "Jurnal Harian",
      active: false,
      dataJoyride: "rpp-jurnal",
      content: (
        <>
          {/* <div className="row mt-4" data-joyride="rpp">
            <div className="col-md-12">
              <h4 className="color-dark fw-bold m-0 mb-4">
                Rencana Pelaksanaan Pembelajaran
              </h4>
            </div>
            <div className="col-md-6 text-md-left text-center mb-md-0 mb-4">
              <label
                htmlFor="formFile"
                className="form-label mb-md-0 mb-3 w-100 h-100"
              >
                <div className="drop-file bg-soft-primary rounded-ss d-flex justify-content-center align-items-center pointer w-100 h-100 border border-primary-ss">
                  <div className="label-input d-flex align-items-center p-sm-5 px-4 flex-column m-3 m-md-0 flex-md-row">
                    <img src={`/img/icon-upload-dropfile.svg`} alt="" />
                    <span className="fs-18-ss fw-semibold color-secondary ms-md-4 m-0 mt-4 mt-sm-4 mt-md-0">
                      Klik untuk mengunggah{" "}
                      <span className="color-primary">File RPP</span>
                    </span>
                  </div>
                </div>
              </label>
              <input
                className="form-control d-none"
                type="file"
                id="formFile"
                onChange={async ({ target }) => {
                  setLoading(true);
                  const data = await uploadFile(target.files[0]);
                  if (data) {
                    setFormData({
                      ...formData,
                      rpp: [...formData.rpp, data],
                    });
                  }
                  setLoading(false);
                }}
              />
              <div className="div"></div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column">
                <h6 className="fs-18-ss fw-bold color-dark mb-4">
                  File Terunggah
                </h6>
                {loading && <LampiranSkeleton />}
                {!loading && formData?.rpp?.length ? (
                  formData?.rpp?.map((d, idx) => {
                    return (
                      <div
                        className="card-lampiran-materi border-light-secondary rounded-ss mb-3"
                        key={idx}
                      >
                        <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-md-row flex-column">
                          <div className="d-flex align-items-center flex-wrap">
                            <div className="pdf-icon ms-0 m-2 shadow-primary-ss">
                              <FaFile className="text-white fs-3" />
                            </div>
                            <div className="p-2">
                              <p className="fw-bold color-dark mb-0">{d}</p>
                              <span className="fs-12-ss color-secondary fs-12-ss fw-bold">
                              </span>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center ps-md-2 pt-md-2 pb-md-2 pe-0 pt-3 p-0">
                            <a
                              target="_blank"
                              rel="noreferrer noopener"
                              href={`${isValidUrl(d) ? d : `${d}`}`}
                              className="btn btn-sm btn-outline-secondary me-3 btn-pratinjau-file rounded-pill fs-12-ss fw-bold d-flex align-items-center justify-content-center"
                            >
                              Pratinjau
                            </a>
                            <a
                              className="btn"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  rpp: formData.rpp.filter((e) => e != d),
                                })
                              }
                            >
                              <FaTimes className="text-secondary" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
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
                          Belum ada file yang dilampirkan
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <ReactiveButton
                  buttonState={buttonRPP}
                  onClick={handlePutTimelineData}
                  color={"primary"}
                  idleText={"Kumpulkan File RPP"}
                  loadingText={"Diproses"}
                  successText={"Berhasil"}
                  errorText={"Gagal"}
                  type={"button"}
                  data-bs-dismiss="modal"
                  className={
                    "btn btn-primary bg-gradient-primary rounded-pill py-2 fw-bold fs-6"
                  }
                />
              </div>
            </div>
          </div> */}
          <div className="row mt-4">
            <div className="col-md-12" data-joyride="jurnal">
              <h4 className="color-dark fw-bold m-0 mb-4">Jurnal Harian</h4>
              <Editor id="editorJurnalHarian" defaultValue={formData?.jurnal} />
              <div className="mt-3 d-flex justify-content-end">
                <ReactiveButton
                  buttonState={buttonJurnal}
                  onClick={handlePutTimelineData}
                  color={"primary"}
                  idleText={"Simpan"}
                  loadingText={"Diproses"}
                  successText={"Berhasil"}
                  errorText={"Gagal"}
                  type={"button"}
                  data-bs-dismiss="modal"
                  className={
                    "btn btn-primary bg-gradient-primary rounded-pill py-2 fs-6 fw-bold"
                  }
                />
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <section className="banner position-absolute"></section>

      <div className="row">
        <div className="col-md-12">
          <div
            className={`${
              (user?.role == "guru" ||
                user?.role == "admin" ||
                user?.role == "kepsek") &&
              "d-flex justify-content-between"
            }`}
          >
            <a
              className="text-decoration-none fw-bolder position-relative text-white pointer"
              onClick={handleBack}
            >
              <FaChevronLeft />
              <span className="ms-2">Kembali</span>
            </a>
          </div>

          {/* Card Timeline Detail Start */}

          <div className="card card-ss p-4 pb-5 mt-3 mb-4">
            {/* Dropdown Option Start */}

            {/* <div className="dropdown dropdown-ss mb-md-0 mb-2 d-flex justify-content-end">
              {(user?.role == "guru" || user?.role == 'admin') && (
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
                    {user?.role == "guru"
                      ? "Pertemuan"
                      : `${timeline?.user?.nama} - ${timeline?.timeline?.rombel?.nama}`}
                  </h2>
                  <p className="color-secondary m-0">
                    {timeline?.tanggalPertemuan}
                  </p>
                </div>
              </div>
              {/* Alert Start */}
              {user?.role === "guru" ||
              user?.role == "admin" ||
              user?.role == "kepsek" ? (
                timeline?.rpp?.length || timeline?.jurnal ? (
                  <div className="rounded-ss px-4 py-2 bg-success shadow-success-ss text-white fs-14-ss">
                    <img
                      src={`/img/icon-check-alert.svg`}
                      alt="icon-check-alert"
                      className="me-2"
                    />
                    {user?.role == "guru" ? "Anda" : timeline?.user?.nama} Sudah
                    Menulis Jurnal Harian
                  </div>
                ) : (
                  <div className="rounded-ss px-4 py-2 bg-danger shadow-danger-ss text-white fs-14-ss">
                    <img
                      src={`/img/icon-warning-alert.svg`}
                      alt="icon-warning-alert"
                      className="me-2"
                    />
                    {user?.role == "guru" ? "Anda" : timeline?.user?.nama} Belum
                    Menulis Jurnal Harian
                  </div>
                )
              ) : null}
              {/* Alert End */}
            </div>
            {user?.role === "guru" ||
            user?.role == "admin" ||
            user?.role == "kepsek" ? (
              <Tabs navItems={navItemsPertemuan} />
            ) : (
              <>
                <div className="row mt-4">
                  <div className="col-md-8 pe-2 mb-md-0 mb-3">
                    <h6 className="fs-18-ss fw-bold color-dark mb-3">
                      Informasi
                    </h6>
                    <a
                      href={isValidGmeetUrl(
                        timeline?.gmeet || timeline?.timeline?.gmeet
                      )}
                      target={
                        isValidGmeetUrl(
                          timeline?.gmeet || timeline?.timeline?.gmeet
                        ) == "#!"
                          ? "_self"
                          : "_blank"
                      }
                      rel="noreferrer noopener"
                      className={`btn ${
                        isValidGmeetUrl(
                          timeline?.gmeet || timeline?.timeline?.gmeet
                        ) == "#!"
                          ? "btn-secondary btn-secondary-ss"
                          : "btn-primary btn-primary-ss"
                      }  rounded-ss d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-start p-4`}
                    >
                      <div className="d-flex align-items-center flex-lg-row flex-md-column flex-row">
                        <img
                          src={`/img/icon-tatap-muka.svg`}
                          alt="icon-tatap-muka"
                          style={{
                            width: "50px",
                            height: "50px",
                          }}
                        />
                        <p className="m-0 text-white fw-bold ps-lg-4 pe-lg-5 px-md-0 ps-4 pe-5">
                          {isValidGmeetUrl(
                            timeline?.gmeet || timeline?.timeline?.gmeet
                          ) == "#!"
                            ? "Tidak ada tatap muka"
                            : "Tatap Muka"}
                        </p>
                      </div>
                    </a>
                    <div className="post-content mt-4">
                      <p className="color-secondary">
                        Absen Kelas {timeline?.timeline?.rombel?.nama} Tanggal{" "}
                        {timeline?.timeline?.tanggalPertemuan}
                      </p>
                      {timeline?.timeline?.deskripsi}
                    </div>
                  </div>
                  {momentPackage() <
                    momentPackage(
                      momentPackage(
                        timeline?.tanggalAkhir ||
                          timeline?.timeline?.tanggalAkhir
                      ).format("YYYY-MM-DD") + " 23:59:59"
                    ) && (
                    <div className="col-md-4 pe-2 mb-md-0 mb-3">
                      <h6 className="fs-18-ss fw-bold color-dark mb-3">
                        Pilih Keterangan Absen
                      </h6>
                      {(timeline?.absen === "hadir" || !timeline?.absen) && (
                        <div
                          className={`
                                card-absen-hadir card mb-3 pointer rounded-ss border-2
                                ${
                                  timeline?.absen === "hadir"
                                    ? "active pe-none"
                                    : ""
                                }
                              `}
                          onClick={() => handleClickPilihanAbsen("hadir")}
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
                        </div>
                      )}
                      {(timeline?.absen === "izin" || !timeline?.absen) && (
                        <div
                          className={`
                                card-absen-izin card mb-3 pointer rounded-ss border-2
                                ${
                                  timeline?.absen === "izin"
                                    ? "active pe-none"
                                    : ""
                                }
                              `}
                          data-bs-toggle="modal"
                          data-bs-target="#modal-absen-izin-sakit"
                          onClick={() => handleClickPilihanAbsen("izin")}
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
                        </div>
                      )}
                      {(timeline?.absen === "sakit" || !timeline?.absen) && (
                        <div
                          className={`
                                card-absen-sakit card mb-3 pointer rounded-ss border-2
                                ${
                                  timeline?.absen === "sakit"
                                    ? "active pe-none"
                                    : ""
                                }
                              `}
                          data-bs-toggle="modal"
                          data-bs-target="#modal-absen-izin-sakit"
                          onClick={() => handleClickPilihanAbsen("sakit")}
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
                      )}
                      {timeline?.lampiran?.length > 0 && (
                        <div
                          className="btn btn-primary btn-primary-ss rounded-ss d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-start py-3 px-4 "
                          style={{
                            height: "90px",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#modal-bukti-keterangan"
                        >
                          <div className="d-flex align-items-center flex-lg-row flex-md-column flex-row">
                            <img
                              src="/img/icon-bukti-keterangan.svg"
                              alt="icon-tatap-muka"
                              style={{
                                width: "50px",
                                height: "50px",
                              }}
                            />
                            <p className="m-0 text-white fw-bold ps-lg-4 pe-lg-5 px-md-0 ps-4 pe-5">
                              Bukti Keterangan
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <hr />
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
                </div> */}
              </>
            )}
          </div>

          {/* Card Timeline Detail End */}
        </div>
      </div>
    </>
  );
};

export default PertemuanPage;
