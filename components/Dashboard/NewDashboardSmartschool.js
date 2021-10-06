import { Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaClock,
  FaCommentDots,
  FaPaperclip,
  FaRegClock,
} from "react-icons/fa";
import { detailAbsen } from "../../client/AbsenClient";
import { ssURL } from "../../client/clientAxios";
import { getAbsen, getTugas } from "../../client/DashboardClient";
import { getJadwalUjian } from "../../client/JadwalUjianClient";
import { getRombel } from "../../client/RombelClient";
import useSekolah from "../../hooks/useSekolah";
import useUser from "../../hooks/useUser";
import { ternaryAbsen } from "../../utilities/DashboardUtils";
import { momentPackage, renderJamMengajar } from "../../utilities/HelperUtils";
import ModalAbsen from "../Shared/Modal/ModalAbsen";

const NewDashboardSmartSchool = () => {
  const { sekolah } = useSekolah();
  const { user } = useUser();
  const router = useRouter();

  const [absenData, setAbsenData] = useState({});
  const [jadwalMengajarSaatIni, setJadwalMengajarSaatIni] = useState(null);

  const [jadwalUjian, setJadwalUjian] = useState([]);
  const [statusJadwalUjian, setStatusJadwalUjian] = useState("berlangsung");

  const [timeline, setTimeline] = useState([]);

  const [collapseAbsenKelas, setCollapseAbsenKelas] = useState(false);
  const [collapseJadwalUjian, setCollapseJadwalUjian] = useState(false);

  const [rombelData, setRombelData] = useState([]);
  const [rombel, setRombel] = useState([]);
  const [absenRombel, setAbsenRombel] = useState([]);

  const jadwalSelanjutnya = rombelData?.jadwalMengajar?.filter((d) => {
    return (
      momentPackage(d.jamMengajar.jamMulai, "HH:mm:ss").format("HH:mm") >
      momentPackage().format("HH:mm")
    );
  });

  const sudahAbsen = absenData?.createdAt || absenData?.waktuPulang;

  const getDetailAbsenData = async () => {
    const params = {
      hariIni: momentPackage().format("YYYY-MM-DD"),
      kodeHari: new Date().getDay(),
      jamSaatIni: momentPackage().format("HH:mm"),
    };

    const { data } = await detailAbsen(params);
    if (data) {
      setAbsenData(data.absen);
      setJadwalMengajarSaatIni(data.jadwalMengajar);
    }
  };

  const _getJadwalUjian = async () => {
    const params = {
      status: statusJadwalUjian,
      hariIni: momentPackage().format("YYYY-MM-DD HH:mm"),
    };
    const { data } = await getJadwalUjian(params);
    if (data?.jadwalUjian?.length > 0) {
      setJadwalUjian(data.jadwalUjian?.filter((d) => d.jadwalUjian !== null));
    } else {
      setStatusJadwalUjian("akan-datang");
    }
  };

  const getRombelData = async () => {
    // skeleton loading
    // setLoading(true);
    const { data } = await getRombel({
      kode_hari: new Date().getDay(),
      jam_saat_ini: momentPackage().format("HH:mm"),
      kelompok: "reguler",
    });
    if (data) {
      setRombelData(data);
    }
    // end skeleton
    // setLoading(false);
  };

  const getAbsenRombelData = async () => {
    // skeleton loading
    // setLoading(true);
    const { data } = await getAbsen({
      kode_hari: new Date().getDay(),
    });
    if (data) {
      setAbsenRombel(data?.absen);
      setRombel(data?.rombel);
    }
    // end skeleton
    // setLoading(false);
  };

  const getTugasData = async () => {
    const { data } = await getTugas();
    if (data?.timeline) {
      setTimeline([...data.timeline]);
    }
  };

  const getButtonActionAbsen = () => {
    let text = "";
    let dataBsTarget = "#modalAbsen2";
    let onClick = () => {};

    const currentDateTime = momentPackage().format("HH:mm");

    if (
      (absenData?.fotoMasuk && sekolah?.id === 5) ||
      absenData?.absen === "izin" ||
      absenData?.absen === "sakit"
    )
      return false;

    if (!absenData?.createdAt && !absenData?.waktuPulang) {
      if (currentDateTime >= "03:00" && currentDateTime <= "17:00") {
        if (sekolah.id == 7) {
          if (currentDateTime >= "03:00" && currentDateTime <= "09:00") {
            text = "Absen Masuk";
          } else {
            if (user?.role == "guru") {
              text = "Absen Masuk";
            } else {
              text = "Hari ini Anda tidak absen";
              dataBsTarget = "";
            }
          }
        } else {
          text = "Absen Masuk";
        }
      } else {
        if (user?.role == "guru") {
          text = "Absen Masuk";
        } else {
          text = "Hari ini Anda tidak absen";
          dataBsTarget = "";
        }
      }
    } else if (
      absenData?.createdAt &&
      !absenData?.waktuPulang &&
      currentDateTime > (user?.role == "siswa" ? "12:00" : "12:00")
    ) {
      if (currentDateTime >= "12:00" && currentDateTime <= "23:59") {
        text = "Absen Pulang";
      } else {
        text = "Hari ini Anda tidak absen";
        dataBsTarget = "";
      }
    } else if (absenData?.createdAt && absenData?.waktuPulang) {
      text = "Lihat Semua Absen";
      dataBsTarget = "";
      onClick = () => router.push("/smartschool/absen");
    } else {
      text = "Lihat Absen";
    }

    return {
      text,
      dataBsTarget,
      onClick,
    };
  };

  const getAbsenInfoText = () => {
    let title = "";
    let subTitle = "";

    if (absenData?.absen === "izin") {
      title = "Terimakasih kabarnya";
    } else if (absenData?.absen === "sakit") {
      title = "Semoga lekas sembuh";
    } else if (absenData?.fotoMasuk && sekolah?.id === 5) {
      title = "";
      subTitle = "Silahkan ke menu kelas untuk mengajar";
    } else if (!absenData?.createdAt && !absenData?.waktuPulang) {
      title = "Kamu belum absen hari ini";
      subTitle = "Tekan tombol absen dibawah untuk absen";
    } else if (
      absenData?.createdAt &&
      !absenData?.waktuPulang &&
      momentPackage().format("HH:mm") <=
        (user?.role == "siswa" ? "12:00" : "12:00")
    ) {
      title = "Kamu sudah absen";
      subTitle = `Absen pulang pukul ${
        user?.role == "siswa" ? "12:00" : "12:00"
      }`;
    } else if (
      absenData?.createdAt &&
      !absenData?.waktuPulang &&
      momentPackage().format("HH:mm") >
        (user?.role == "siswa" ? "12:00" : "12:00")
    ) {
      title = "Kamu belum absen pulang";
      subTitle = "Tekan tombol absen dibawah untuk absen";
    } else {
      title = "Kamu sudah absen pulang";
      subTitle = "Sampai ketemu besok";
    }

    return {
      title,
      subTitle,
    };
  };

  useEffect(() => {
    getDetailAbsenData();
    _getJadwalUjian();
    getRombelData();
    getAbsenRombelData();
    getTugasData();
  }, []);

  useEffect(() => {
    if (statusJadwalUjian !== "berlangsung") {
      _getJadwalUjian();
    }
  }, [statusJadwalUjian]);

  return (
    <>
      <div className="row gy-4">
        <div className="col-lg-3 order-lg-1 order-1">
          <div className="alert-hallo-new rounded-ss bg-soft-primary p-4 position-relative  mb-4 flex-sm-row flex-column align-items-center d-lg-none d-flex mb-4">
            <div className="alert-hallo-content-new order-sm-1 order-2 py-md-0 py-sm-4 py-0">
              <h3 className="fw-extrabold color-dark text-capitalize mb-0">
                Halo, Selamat Datang
              </h3>
              <h3 className="fw-extrabold color-dark text-capitalize">
                {user?.nama}
              </h3>
              <p className="color-secondary m-0">
                {user?.role == "guru"
                  ? "Sudah siap untuk mengajar hari ini ?"
                  : "Sudah siap untuk belajar hari ini ?"}
              </p>
            </div>
            <img
              src={`/img/${
                user?.role == "guru"
                  ? "illustrasi-dashboard-guru.png"
                  : "illustrasi-alert-helo-siswa.png"
              }`}
              alt="illustrasi-dashboard"
              className="order-sm-2 order-1"
            />
          </div>
          <div className="row">
            <div className="col-lg-12 col-sm-6">
              <div className="card card-ss mb-lg-4 mb-sm-0 mb-4">
                <div className="card-header-ss p-3 pb-4 bg-gradient-primary-2 text-white">
                  <h5 className="fw-extrabold">Absen Harian</h5>
                  <div className="d-flex mb-1">
                    {sudahAbsen ? (
                      <img
                        src={`/img/icon-check-alert.svg`}
                        alt="icon-check-alert"
                        className="me-2"
                        width="20px"
                      />
                    ) : (
                      <img
                        src={`/img/icon-warning-alert.svg`}
                        alt="icon-warning-alert"
                        className="me-2"
                        width="20px"
                      />
                    )}
                    <h6 className="fw-bold mb-0">{getAbsenInfoText().title}</h6>
                  </div>
                  <p className="fs-14-ss mb-0">{getAbsenInfoText().subTitle}</p>
                </div>
                <div className="card-body p-3">
                  <h6 className="fw-extrabold">
                    {momentPackage().format("DD MMMM YYYY")}
                  </h6>
                  {(absenData?.absen === "izin" ||
                    absenData?.absen === "sakit") && (
                    <>
                      <h6 className="fw-bold color-dark">
                        Absen {absenData?.absen}
                      </h6>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="color-primary">
                          <FaClock className="me-2" />
                          <span className="fs-14-ss fw-bold">
                            {momentPackage(absenData?.createdAt).format(
                              "HH:mm"
                            )}
                          </span>
                        </div>
                        <button
                          className="btn btn-outline-primary btn-outline-primary-ss py-1 px-3 fs-12-ss fw-bold rounded-pill"
                          data-bs-toggle="modal"
                          data-bs-target="#modalAbsen2"
                        >
                          Lihat Foto
                        </button>
                      </div>
                    </>
                  )}
                  {absenData?.absen !== "izin" && absenData?.absen !== "sakit" && (
                    <>
                      <div className="mb-3">
                        <h6 className="fw-bold color-dark">Absen Masuk</h6>
                        {absenData?.createdAt ? (
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="color-primary">
                              <FaClock className="me-2" />
                              <span className="fs-14-ss fw-bold">
                                {momentPackage(absenData?.createdAt).format(
                                  "HH:mm"
                                )}
                              </span>
                            </div>
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#modalAbsen2"
                              className="btn btn-outline-primary btn-outline-primary-ss py-1 px-3 fs-12-ss fw-bold rounded-pill"
                            >
                              Lihat Foto
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex">
                            <img
                              src="/img/icon-warning-danger.svg"
                              alt="icon-warning-danger"
                              className="me-2"
                            />
                            <span className="fs-14-ss fw-bold color-danger">
                              Belum Absen
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h6 className="fw-bold color-dark">Absen Pulang</h6>
                        {momentPackage().format("HH:mm") <=
                        (user?.role == "siswa" ? "12:00" : "12:00") ? (
                          <span className="fs-14-ss fw-bold">
                            Dibuka pukul{" "}
                            {user?.role == "siswa" ? "12:00" : "12:00"}
                          </span>
                        ) : absenData?.waktuPulangText ? (
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="color-primary">
                              <FaClock className="me-2" />
                              <span className="fs-14-ss fw-bold">
                                {absenData?.waktuPulangText}
                              </span>
                            </div>
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#modalAbsen2"
                              className="btn btn-outline-primary btn-outline-primary-ss py-1 px-3 fs-12-ss fw-bold rounded-pill"
                            >
                              Lihat Foto
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex">
                            <img
                              src="/img/icon-warning-danger.svg"
                              alt="icon-warning-danger"
                              className="me-2"
                            />
                            <span className="fs-14-ss fw-bold color-danger">
                              Belum Absen
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <div className="card-footer-ss">
                  <hr className="m-0" />
                  <div className="p-3 text-center">
                    {getButtonActionAbsen() && (
                      <button
                        className="btn btn-ss btn-primary btn-primary-ss fs-12-ss fw-bold shadow-primary-ss rounded-pill"
                        onClick={getButtonActionAbsen().onClick}
                        data-bs-toggle="modal"
                        data-bs-target={getButtonActionAbsen().dataBsTarget}
                      >
                        {getButtonActionAbsen().text}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-sm-6">
              <div className="d-flex bg-gradient-primary-2 px-4 py-3 rounded-ss justify-content-between flex-wrap flex-column text-white h-100">
                <div className="div">
                  <h5 className="text white fw-bold mb-3">Jadwal Saat Ini</h5>
                  {!jadwalMengajarSaatIni && (
                    <p className="mb-1 fw-semibold">
                      {rombelData?.jadwalMengajar?.findIndex(
                        (d) => d.aktif == true
                      ) < 0 ? (
                        jadwalSelanjutnya?.length == 0 ? (
                          `Jadwal ${
                            user?.role == "guru" ? "mengajar" : "belajar"
                          } hari ini sudah selesai`
                        ) : (
                          <>
                            <span>{`Saat ini anda tidak memiliki jadwal ${
                              user?.role == "guru" ? "mengajar" : "belajar"
                            }`}</span>
                            <div className="mb-4">
                              <hr
                                className="mt-3"
                                style={{
                                  height: "2px",
                                  backgroundColor: "white",
                                }}
                              />
                              <h5 className="text white fw-bold mb-3">
                                Jadwal Selanjutnya
                              </h5>
                              <h6 className="fw-semibold mb-2">
                                {user?.role == "guru"
                                  ? `Kelas ${jadwalSelanjutnya[0].rombel?.nama} - ${jadwalSelanjutnya[0].mataPelajaran?.nama}`
                                  : `${jadwalSelanjutnya[0].mataPelajaran?.nama} - ${jadwalSelanjutnya[0].mataPelajaran?.user?.nama}`}
                              </h6>
                              <h6 className="fw-semibold mb-5">
                                {renderJamMengajar(
                                  jadwalSelanjutnya[0].jamMengajar?.jamMulai,
                                  jadwalSelanjutnya[0].jamMengajar?.jamSelesai
                                )}
                              </h6>
                              <div className="d-flex justify-content-end">
                                <Link
                                  href={`${ssURL}/rombel/[id]`}
                                  as={`${ssURL}/rombel/${jadwalSelanjutnya[0].id}`}
                                >
                                  <a
                                    href={`${ssURL}/rombel/[id]`}
                                    className="btn btn-light btn-ss fs-12-ss fw-bold rounded-pill color-primary"
                                  >
                                    {user?.role == "guru"
                                      ? "Mengajar di kelas"
                                      : "Belajar di kelas"}
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </>
                        )
                      ) : (
                        <>
                          {rombelData?.jadwalMengajar
                            ?.filter((d) => d.aktif == true)
                            .map((d, idx) => (
                              <div className="mb-4">
                                {idx > 0 && (
                                  <hr
                                    className="mt-3"
                                    style={{
                                      height: "2px",
                                      backgroundColor: "white",
                                    }}
                                  />
                                )}
                                <h6 className="fw-semibold mb-2">
                                  {user?.role == "guru"
                                    ? `Kelas ${d?.rombel?.nama} - ${d?.mataPelajaran?.nama}`
                                    : `${d?.mataPelajaran?.nama} - ${d?.mataPelajaran?.user?.nama}`}
                                </h6>
                                <h6 className="fw-semibold mb-5">
                                  {renderJamMengajar(
                                    d?.jamMengajar?.jamMulai,
                                    d?.jamMengajar?.jamSelesai
                                  )}
                                </h6>
                                <div className="d-flex justify-content-end">
                                  <Link
                                    href={`${ssURL}/rombel/[id]`}
                                    as={`${ssURL}/rombel/${d.id}`}
                                  >
                                    <a
                                      href={`${ssURL}/rombel/[id]`}
                                      className="btn btn-light btn-ss fs-12-ss fw-bold rounded-pill color-primary"
                                    >
                                      {user?.role == "guru"
                                        ? "Mengajar di kelas"
                                        : "Belajar di kelas"}
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            ))}
                        </>
                      )}
                    </p>
                  )}
                  {jadwalMengajarSaatIni && (
                    <>
                      <p className="mb-1 fw-semibold">
                        {jadwalMengajarSaatIni?.mataPelajaran?.nama} - Kelas{" "}
                        {jadwalMengajarSaatIni?.rombel?.nama}
                      </p>
                      <p className="mb-0">
                        {jadwalMengajarSaatIni?.jamMengajar?.jamFormat}
                      </p>
                    </>
                  )}
                </div>
                {jadwalMengajarSaatIni && (
                  <Link
                    href={`${ssURL}/rombel/[id]`}
                    as={`${ssURL}/rombel/${jadwalMengajarSaatIni?.id}`}
                  >
                    <a className="btn btn-light rounded-pill py-1 px-4 py-1 fs-12-ss fw-bold color-primary mt-3">
                      <span>Mengajar di kelas</span>
                      <FaAngleRight className="ms-2" />
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 order-lg-2 order-3">
          <div className="alert-hallo-new rounded-ss bg-soft-primary p-4 position-relative  mb-4 flex-sm-row flex-column align-items-center d-lg-flex d-none">
            <div className="alert-hallo-content-new order-sm-1 order-2 py-md-0 py-sm-4 py-0">
              <h3 className="fw-extrabold color-dark text-capitalize mb-0">
                Halo, Selamat Datang
              </h3>
              <h3 className="fw-extrabold color-dark text-capitalize">
                {user?.nama}
              </h3>
              <p className="color-secondary m-0">
                {user?.role == "guru"
                  ? jadwalSelanjutnya?.length == 0
                    ? "Jadwal mengajar hari ini sudah selesai"
                    : "Sudah siap untuk mengajar hari ini ?"
                  : jadwalSelanjutnya?.length == 0
                  ? "Jadwal belajar hari ini sudah selesai"
                  : "Sudah siap untuk belajar hari ini ?"}
              </p>
            </div>
            <img
              src={`/img/${
                user?.role == "guru"
                  ? "illustrasi-dashboard-guru.png"
                  : "illustrasi-alert-helo-siswa.png"
              }`}
              alt="illustrasi-dashboard"
              className="order-sm-2 order-1"
            />
          </div>
          <div>
            {/* <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia
              reiciendis, eveniet perspiciatis consequuntur ullam quos!
              Consequuntur dolores beatae amet at, a cumque eius itaque,
              voluptate ipsum repudiandae cum ratione nulla.
            </p> */}
          </div>
          {/* <div
            className="card card-ss bg-white p-4 pointer"
            data-bs-toggle="modal"
            data-bs-target="#modalAddPostingan"
          >
            <div className="div d-flex align-items-center">
              <Avatar size={45} name={user?.nama} src={user?.avatar} />
              <p className="mb-0 color-secondary ms-3">
                Diskusikan sesuatu ke kelas Anda...
              </p>
            </div>
          </div> */}
          <hr className="my-4" />
          <div className="row gy-4">
            {timeline?.length == 0 ? (
              <div className="row justify-content-center mt-3">
                <div className="col-md-6 col-8">
                  <img
                    src="/img/empty-state-timeline.png"
                    alt="empty-state"
                    className="img-fluid"
                  />
                </div>
                <div className="col-12 text-center mt-3">
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
            ) : (
              timeline?.map((d, idx) => {
                if (d?.tipe == "absen") {
                  // if (
                  //   moment() > moment(d?.timeline?.tanggalPembagian) ||
                  //   user?.role == "guru"
                  // )
                  return (
                    <div className="col-lg-12" key={idx}>
                      <div className="card-post card card-ss">
                        <div className="card-header card-header-ss p-4 flex-column">
                          {/* Post Title Start */}
                          <Link
                            href={`${ssURL}/timeline/[id]?hal=pertemuan`}
                            as={`${ssURL}/timeline/${d?.id}?hal=pertemuan`}
                          >
                            <a className="text-decoration-none order-md-1 order-2">
                              <span className="label-ss rounded-pill bg-primary text-white">
                                {user?.role == "guru" &&
                                  `   ${d?.rombel?.nama} - ${d?.mataPelajaran?.nama}`}
                                {user?.role == "siswa" &&
                                  `   ${d?.timeline?.mataPelajaran?.nama} - ${d?.timeline?.user?.nama}`}
                              </span>
                              <hr style={{ backgroundColor: "#80849c" }} />
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

                          {/* Dropdown Option End */}
                        </div>

                        <div className="card-body pt-0 px-4 pb-3">
                          {/* Post Content Start */}
                          <Link
                            href={`${ssURL}/timeline/[id]?hal=pertemuan`}
                            as={`${ssURL}/timeline/${d?.id}?hal=pertemuan`}
                          >
                            <a className="text-decoration-none">
                              <div className="row px-lg-0 px-md-0 mx-0">
                                {/* Post Description Start */}

                                <div
                                  className={`card-post-content dangerous-html col-md-12 color-secondary`}
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      d?.deskripsi || d?.timeline?.deskripsi,
                                  }}
                                />

                                {/* Post Description End */}

                                {/* Post Complete Status Start*/}
                                <div
                                  className={`bg-soft-primary rounded-ss d-flex align-items-center post-complete-status col-md-12 mt-3 py-3 `}
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
                                            {`${d?.meta?.totalAbsen} / ${d?.meta?.totalSiswa}`}{" "}
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
                                                ).format("YYYY-MM-DD") +
                                                  " 23:59:59"
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
                                      {user?.role == "guru" &&
                                        d?.meta?.totalKomen}
                                      {user?.role == "siswa" &&
                                        d?.timeline?.meta?.totalKomen}{" "}
                                      Komentar
                                    </span>
                                  </div>
                                  <div className="attach color-dark fs-14-ss fw-bolder">
                                    <FaPaperclip className="me-2" />
                                    <span>
                                      {user?.role == "guru" &&
                                        d?.lampiran?.length}
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
                            {(d.rpp?.length || d.jurnal) &&
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
                } else if (d?.tipe == "tugas") {
                  return (
                    <div className="col-lg-12">
                      <div className="card-post card card-ss">
                        <div className="card-header card-header-ss p-4 flex-column">
                          {/* Post Title Start */}
                          <Link
                            href={`${ssURL}/timeline/[id]?hal=tugas`}
                            as={`${ssURL}/timeline/${d.id}?hal=tugas`}
                          >
                            <a className="text-decoration-none order-md-1 order-2">
                              <span className="label-ss rounded-pill bg-primary text-white">
                                {user?.role == "guru" &&
                                  `   ${d?.rombel?.nama} - ${d?.mataPelajaran?.nama}`}
                                {user?.role == "siswa" &&
                                  `   ${d?.timeline?.mataPelajaran?.nama} - ${d?.timeline?.user?.nama}`}
                              </span>
                              <hr style={{ backgroundColor: "#80849c" }} />
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
                                    {d?.tugas?.judul ||
                                      d?.timeline?.tugas?.judul}
                                  </h6>
                                  <p className="color-secondary m-0 fs-14-ss mt-2">
                                    {d?.createdAt || d?.timeline?.createdAt}
                                  </p>
                                </div>
                              </div>
                            </a>
                          </Link>
                          {/* Post Title End */}

                          {/* Dropdown Option Start */}

                          {/* Dropdown Option End */}
                        </div>

                        <div className="card-body pt-0 px-4 pb-3">
                          {/* Post Content Start */}
                          <Link
                            href={`${ssURL}/timeline/[id]?hal=tugas`}
                            as={`${ssURL}/timeline/${d.id}?hal=tugas`}
                          >
                            <a className="text-decoration-none">
                              <div className="row px-lg-0 px-md-0 mx-0">
                                {/* Post Description Start */}

                                <div
                                  className={`col-md-12 color-secondary clamp`}
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      d?.tugas?.instruksi ||
                                      d?.timeline?.tugas?.instruksi,
                                  }}
                                ></div>

                                {/* Post Description End */}

                                {/* Post Complete Status Start*/}
                                <div
                                  className={`bg-soft-primary rounded-ss d-flex align-items-center post-complete-status col-md-12 mt-3 py-3 `}
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
                                      {user?.role == "guru" &&
                                        d?.meta?.totalKomen}
                                      {user?.role == "siswa" &&
                                        d?.timeline?.meta?.totalKomen}{" "}
                                      Komentar
                                    </span>
                                  </div>
                                  <div className="attach color-dark fs-14-ss fw-bolder">
                                    <FaPaperclip className="me-2" />
                                    <span>
                                      {user?.role == "guru" &&
                                        d?.tugas?.lampiran?.length}
                                      {user?.role == "siswa" &&
                                        d?.timeline?.tugas?.lampiran
                                          ?.length}{" "}
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
                              d?.tugas?.tanggalPengumpulan ||
                              d?.timeline?.tugas?.tanggalPengumpulan
                                ? momentPackage(
                                    momentPackage(
                                      d.tugas?.tanggalPengumpulan ||
                                        d?.timeline?.tugas?.tanggalPengumpulan
                                    )
                                      .add(7, "hours")
                                      .format("YYYY-MM-DD ") +
                                      d?.tugas?.waktuPengumpulan ||
                                      d?.timeline?.tugas?.waktuPengumpulan
                                  ) < momentPackage()
                                  ? "bg-secondary"
                                  : "bg-danger shadow-danger-ss"
                                : "bg-secondary"
                            }
                          `}
                            >
                              <FaRegClock className="me-2" />
                              Batas Pengumpulan{" "}
                              {d?.tugas?.tanggalPengumpulan ||
                              d?.timeline?.tugas?.tanggalPengumpulan
                                ? momentPackage(
                                    momentPackage(
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
              })
            )}
          </div>
        </div>
        <div className="col-lg-3 order-lg-3 order-2">
          <div className="row">
            <div className="col-lg-12 col-sm-6">
              <div className="card card-ss card-absen-kelas pb-3 mb-lg-4 mb-sm-0 mb-4">
                <div className="card-header-ss px-3 d-flex align-items-center text-white">
                  <h5 className="fw-extrabold mb-0">Absen Kelas</h5>
                </div>
                <div className="card-body p-0">
                  {rombel?.length > 0 ? (
                    rombel?.slice(0, 3).map((d) => (
                      <Link href={`${ssURL}/rombel/${d.id}?nav=pertemuan`}>
                        <div className="list-kelas d-flex p-3 pointer">
                          <div
                            className={`rounded-circle me-3 ${
                              user.role == "guru"
                                ? ternaryAbsen(
                                    d,
                                    absenRombel,
                                    true,
                                    "shadow-primary-ss",
                                    "shadow-danger-ss",
                                    "shadow-primary-ss"
                                  )
                                : ternaryAbsen(
                                    d,
                                    absenRombel,
                                    false,
                                    "shadow-primary-ss",
                                    "shadow-danger-ss",
                                    "shadow-primary-ss"
                                  )
                            }`}
                            style={{
                              width: "45px",
                              height: "45px",
                            }}
                          >
                            <img
                              src={
                                user.role == "guru"
                                  ? ternaryAbsen(
                                      d,
                                      absenRombel,
                                      true,
                                      `/img/post-icon-1.svg`,
                                      "/img/icon-post-warning.svg",
                                      `/img/post-icon-1.svg`
                                    )
                                  : ternaryAbsen(
                                      d,
                                      absenRombel,
                                      false,
                                      `/img/post-icon-1.svg`,
                                      "/img/icon-post-warning.svg",
                                      `/img/post-icon-1.svg`
                                    )
                              }
                              alt="post-icon"
                              width="45px"
                              height="45px"
                            />
                          </div>
                          <span className="w-75">
                            <Tooltip
                              title={`${d?.rombel?.nama} - ${d?.mataPelajaran?.nama}`}
                            >
                              <h6 className="fw-bold color-dark text-truncate mb-1">
                                {`${d?.rombel?.nama} - ${d?.mataPelajaran?.nama}`}
                              </h6>
                            </Tooltip>
                            <div className="d-flex align-items-center">
                              <img
                                src={
                                  user.role == "guru"
                                    ? ternaryAbsen(
                                        d,
                                        absenRombel,
                                        true,
                                        `/img/icon-check-success.svg`,
                                        "/img/icon-warning-danger.svg",
                                        `/img/icon-clock-secondary.svg`
                                      )
                                    : ternaryAbsen(
                                        d,
                                        absenRombel,
                                        false,
                                        `/img/icon-check-success.svg`,
                                        "/img/icon-warning-danger.svg",
                                        `/img/icon-clock-secondary.svg`
                                      )
                                }
                                alt="icon-warning-danger"
                                className="me-2"
                              />
                              <span
                                className={`fs-14-ss fw-bold color-${
                                  user.role == "guru"
                                    ? ternaryAbsen(
                                        d,
                                        absenRombel,
                                        true,
                                        `success`,
                                        "danger",
                                        `secondary`
                                      )
                                    : ternaryAbsen(
                                        d,
                                        absenRombel,
                                        false,
                                        `success`,
                                        "danger",
                                        `secondary`
                                      )
                                }`}
                              >
                                {user.role == "guru"
                                  ? ternaryAbsen(
                                      d,
                                      absenRombel,
                                      true,
                                      `Sudah Membuat Absen`,
                                      "Belum Membuat Absen",
                                      `${d?.jamMengajar?.jamFormat}`
                                    )
                                  : ternaryAbsen(
                                      d,
                                      absenRombel,
                                      false,
                                      `Sudah Absen`,
                                      `Belum Absen`,
                                      `${d?.jamMengajar?.jamFormat}`
                                    )}
                              </span>
                            </div>
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-center">
                      <img
                        src="/img/empty-state-kelas.png"
                        alt="empty set"
                        className="img-fluid"
                      />
                      <p className="mt-3 mb-0 fw-bold">
                        Tidak ada jam mengajar hari ini
                      </p>
                    </div>
                  )}
                  {rombel?.length > 3 && (
                    <div class="collapse" id="collapseExample">
                      {rombel?.slice(3).map((d) => (
                        <div className="list-kelas d-flex p-3 pointer">
                          <div
                            className={`rounded-circle me-3 ${
                              user.role == "guru"
                                ? ternaryAbsen(
                                    d,
                                    absenRombel,
                                    true,
                                    "shadow-primary-ss",
                                    "shadow-danger-ss",
                                    "shadow-primary-ss"
                                  )
                                : ternaryAbsen(
                                    d,
                                    absenRombel,
                                    false,
                                    "shadow-primary-ss",
                                    "shadow-danger-ss",
                                    "shadow-primary-ss"
                                  )
                            }`}
                            style={{
                              width: "45px",
                              height: "45px",
                            }}
                          >
                            <img
                              src={
                                user.role == "guru"
                                  ? ternaryAbsen(
                                      d,
                                      absenRombel,
                                      true,
                                      `/img/post-icon-1.svg`,
                                      "/img/icon-post-warning.svg",
                                      `/img/post-icon-1.svg`
                                    )
                                  : ternaryAbsen(
                                      d,
                                      absenRombel,
                                      false,
                                      `/img/post-icon-1.svg`,
                                      "/img/icon-post-warning.svg",
                                      `/img/post-icon-1.svg`
                                    )
                              }
                              alt="post-icon"
                              width="45px"
                              height="45px"
                            />
                          </div>
                          <span className="w-75">
                            <Tooltip
                              title={`${d?.rombel?.nama} - ${d?.mataPelajaran?.nama}`}
                            >
                              <h6 className="fw-bold color-dark text-truncate mb-1">
                                {`${d?.rombel?.nama} - ${d?.mataPelajaran?.nama}`}
                              </h6>
                            </Tooltip>
                            <div className="d-flex align-items-center">
                              <img
                                src={
                                  user.role == "guru"
                                    ? ternaryAbsen(
                                        d,
                                        absenRombel,
                                        true,
                                        `/img/icon-check-success.svg`,
                                        "/img/icon-warning-danger.svg",
                                        `/img/icon-clock-secondary.svg`
                                      )
                                    : ternaryAbsen(
                                        d,
                                        absenRombel,
                                        false,
                                        `/img/icon-check-success.svg`,
                                        "/img/icon-warning-danger.svg",
                                        `/img/icon-clock-secondary.svg`
                                      )
                                }
                                alt="icon-warning-danger"
                                className="me-2"
                              />
                              <span
                                className={`fs-14-ss fw-bold color-${
                                  user.role == "guru"
                                    ? ternaryAbsen(
                                        d,
                                        absenRombel,
                                        true,
                                        `success`,
                                        "danger",
                                        `secondary`
                                      )
                                    : ternaryAbsen(
                                        d,
                                        absenRombel,
                                        false,
                                        `success`,
                                        "danger",
                                        `secondary`
                                      )
                                }`}
                              >
                                {user.role == "guru"
                                  ? ternaryAbsen(
                                      d,
                                      absenRombel,
                                      true,
                                      `Sudah Membuat Absen`,
                                      "Belum Membuat Absen",
                                      `${d?.jamMengajar?.jamFormat}`
                                    )
                                  : ternaryAbsen(
                                      d,
                                      absenRombel,
                                      false,
                                      `Sudah Absen`,
                                      `Belum Absen`,
                                      `${d?.jamMengajar?.jamFormat}`
                                    )}
                                {/* 13:30 - 12:00 */}
                              </span>
                            </div>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {rombel?.length > 3 && (
                  <div className="card-footer-ss">
                    <hr className="m-0" />
                    <div className="p-3 pb-0 text-center">
                      <button
                        className="btn btn-ss btn-primary btn-primary-ss fs-12-ss fw-bold shadow-primary-ss rounded-pill"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseExample"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                        onClick={() =>
                          setCollapseAbsenKelas(!collapseAbsenKelas)
                        }
                      >
                        {collapseAbsenKelas
                          ? "Lihat Sedikit Kelas"
                          : "Lihat Semua Kelas"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-12 col-sm-6">
              <div className="card card-ss card-absen-kelas card-list-jadwal-ujian pb-3 mb-lg-4">
                <div className="card-header-ss px-3 d-flex align-items-center text-white">
                  <h5 className="fw-extrabold mb-0">Jadwal Ujian</h5>
                </div>
                <div className="card-body p-0">
                  {jadwalUjian?.length > 0 ? (
                    jadwalUjian?.slice(0, 3)?.map((ujian) => (
                      <Link
                        href={
                          user?.role == "guru"
                            ? `${ssURL}/jadwal-ujian/${ujian?.jadwalUjian?.id}`
                            : statusJadwalUjian === "berlangsung"
                            ? `${ssURL}/jadwal-ujian`
                            : `${ssURL}/jadwal-ujian?subnav=akan-datang`
                        }
                        as={
                          user?.role == "guru"
                            ? `${ssURL}/jadwal-ujian/${ujian?.jadwalUjian?.id}`
                            : statusJadwalUjian === "berlangsung"
                            ? `${ssURL}/jadwal-ujian`
                            : `${ssURL}/jadwal-ujian?subnav=akan-datang`
                        }
                      >
                        <div className="list-kelas d-flex p-3 pointer">
                          <div
                            className={`rounded-circle shadow-${
                              statusJadwalUjian === "berlangsung"
                                ? "danger-ss"
                                : "primary-ss"
                            } me-3`}
                            style={{
                              width: "45px",
                              height: "45px",
                            }}
                          >
                            <img
                              src={
                                statusJadwalUjian === "berlangsung"
                                  ? `/img/icon-ujian-warning.svg`
                                  : `/img/icon-list-jadwal-ujian.svg`
                              }
                              alt="icon-list-jadwal-ujian"
                              width="45px"
                              height="45px"
                            />
                          </div>
                          <span className="w-75">
                            <Tooltip title={ujian?.jadwalUjian?.ujian?.nama}>
                              <h6 className="fw-bold color-dark text-truncate mb-1">
                                {ujian?.jadwalUjian?.ujian?.nama}
                              </h6>
                            </Tooltip>
                            <div className="d-flex">
                              <img
                                src={
                                  statusJadwalUjian === "berlangsung"
                                    ? `/img/icon-warning-danger.svg`
                                    : "/img/icon-clock-primary.svg"
                                }
                                alt="icon-warning-danger"
                                className="me-2"
                              />
                              <span
                                className={`fs-14-ss fw-bold ${
                                  statusJadwalUjian === "berlangsung"
                                    ? "color-danger"
                                    : "color-primary"
                                }`}
                              >
                                {statusJadwalUjian === "berlangsung" ? (
                                  "Sedang berlangsung"
                                ) : (
                                  <span className="text-capitalize">
                                    {momentPackage(
                                      ujian?.jadwalUjian?.waktuDibuka
                                    ).fromNow()}
                                  </span>
                                )}
                              </span>
                            </div>
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-center">
                      <img
                        src="/img/empty-state-jadwal.png"
                        alt="empty set"
                        className="img-fluid"
                      />
                      <p className="mt-3 mb-0 fw-bold">
                        Tidak ada jadwal ujian
                      </p>
                    </div>
                  )}
                  {jadwalUjian?.length > 3 && (
                    <div class="collapse" id="collapseJadwalUjian">
                      {jadwalUjian?.slice(3)?.map((ujian) => (
                        <Link
                          href={
                            user?.role == "guru"
                              ? `${ssURL}/jadwal-ujian/${ujian?.jadwalUjian?.id}`
                              : statusJadwalUjian === "berlangsung"
                              ? `${ssURL}/jadwal-ujian`
                              : `${ssURL}/jadwal-ujian?subnav=akan-datang`
                          }
                          as={
                            user?.role == "guru"
                              ? `${ssURL}/jadwal-ujian/${ujian?.jadwalUjian?.id}`
                              : statusJadwalUjian === "berlangsung"
                              ? `${ssURL}/jadwal-ujian`
                              : `${ssURL}/jadwal-ujian?subnav=akan-datang`
                          }
                        >
                          <div className="list-kelas d-flex p-3 pointer">
                            <div
                              className={`rounded-circle shadow-${
                                statusJadwalUjian === "berlangsung"
                                  ? "danger-ss"
                                  : "primary-ss"
                              } me-3`}
                              style={{
                                width: "45px",
                                height: "45px",
                              }}
                            >
                              <img
                                src={
                                  statusJadwalUjian === "berlangsung"
                                    ? `/img/icon-ujian-warning.svg`
                                    : `/img/icon-list-jadwal-ujian.svg`
                                }
                                alt="icon-list-jadwal-ujian"
                                width="45px"
                                height="45px"
                              />
                            </div>
                            <span className="w-75">
                              <Tooltip title={ujian?.jadwalUjian?.ujian?.nama}>
                                <h6 className="fw-bold color-dark text-truncate mb-1">
                                  {ujian?.jadwalUjian?.ujian?.nama}
                                </h6>
                              </Tooltip>
                              <div className="d-flex align-items-center color-primary">
                                <img
                                  src={
                                    statusJadwalUjian === "berlangsung"
                                      ? `/img/icon-warning-danger.svg`
                                      : "/img/icon-clock-primary.svg"
                                  }
                                  alt="icon-warning-danger"
                                  className="me-2"
                                />
                                <span
                                  className={`fs-14-ss fw-bold ${
                                    statusJadwalUjian === "berlangsung"
                                      ? "color-danger"
                                      : "color-primary"
                                  }`}
                                >
                                  {statusJadwalUjian === "berlangsung" ? (
                                    "Sedang berlangsung"
                                  ) : (
                                    <span className="text-capitalize">
                                      {momentPackage(
                                        ujian?.jadwalUjian?.waktuDibuka
                                      ).fromNow()}
                                    </span>
                                  )}
                                </span>
                              </div>
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                {jadwalUjian?.length > 3 && (
                  <div className="card-footer-ss">
                    <hr className="m-0" />
                    <div className="p-3 pb-0 text-center">
                      <button
                        className="btn btn-ss btn-primary btn-primary-ss fs-12-ss fw-bold shadow-primary-ss rounded-pill"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseJadwalUjian"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                        onClick={() =>
                          setCollapseJadwalUjian(!collapseJadwalUjian)
                        }
                      >
                        {collapseJadwalUjian
                          ? "Lihat Sedikit Jadwal"
                          : "Lihat Semua Jadwal"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalAbsen
        absenData={absenData}
        getDetailAbsenData={getDetailAbsenData}
      />
    </>
  );
};

export default NewDashboardSmartSchool;
