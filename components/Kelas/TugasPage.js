import { Tooltip } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import useUser from "../../hooks/useUser";
import Tabs from "../Shared/Tabs/Tabs";

const TugasPage = () => {
  const { user } = useUser();
  const router = useRouter();

  const navItemsPertemuan = [
    {
      id: "instruksi-tugas",
      nav: "Instruksi Tugas",
      active: true,
      dataJoyride: "instruksi-tugas",
      content: (
        <>
          <div className="row mt-4">
            <div className="col-md-8 pe-2 mb-md-0 mb-3">
              <div
                className="status-info px-4 p-3 pb-md-3 pb-0 bg-very-soft-secondary-2 rounded-ss d-flex mb-3 mb-md-0 flex-grow-1 flex-wrap justify-content-md-start justify-content-between"
                data-joyride="informasi-absen"
              >
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss fw-bold color-secondary mb-2">Belum</p>
                  <p className="fs-18-ss fw-extrabold color-primary m-0">
                    {/* {timeline?.meta?.totalHadir} Siswa */}
                    26 Siswa
                  </p>
                </div>
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss fw-bold color-secondary mb-2">
                    Terkumpul
                  </p>
                  <p className="fs-18-ss fw-extrabold color-primary m-0">
                    {/* {timeline?.meta?.totalSakit} Siswa */}
                    10 Siswa
                  </p>
                </div>
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss fw-bold color-secondary mb-2">
                    Dinilai
                  </p>
                  <p className="fs-18-ss fw-extrabold color-primary m-0">
                    {/* {timeline?.meta?.totalIzin} Siswa */}
                    10 Siswa
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 ps-2">
              <div
                className="status-info px-4 p-3 pb-md-3 pb-0 bg-very-soft-secondary-2 rounded-ss d-flex mb-3 mb-md-0 flex-grow-1 flex-wrap justify-content-md-start justify-content-between"
                data-joyride="informasi-absen"
              >
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss fw-bold color-secondary mb-2">
                    Penilaian
                  </p>
                  <p className="fs-18-ss fw-extrabold color-primary m-0">
                    {/* {timeline?.meta?.totalHadir} Siswa */}
                    100 Poin
                  </p>
                </div>
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss fw-bold color-secondary mb-2">KKM</p>
                  <p className="fs-18-ss fw-extrabold color-primary m-0">
                    {/* {timeline?.meta?.totalSakit} Siswa */}
                    75 Poin
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="post-content">
                <p className="color-secondary">
                  {/* Absen Kelas {timeline?.rombel?.nama} Tanggal{" "}
                  {timeline?.tanggalPertemuan} */}
                  Absen Kelas
                </p>
                {/* {timeline?.deskripsi} */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                molestias repellat error sapiente optio illo laboriosam
                repudiandae dolorum voluptatem repellendus cumque earum a ullam
                adipisci, excepturi, iusto culpa eligendi quis!
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <h6 className="fw-bold color-dark">Lampiran Pelajaran</h6>
            </div>
            <div className="col-md-6">
              <div className="bg-soft-primary rounded-ss p-3 d-flex align-items-center w-100 pointer">
                <img
                  width="40px"
                  height="40px"
                  src="/img/icon-file.svg"
                  alt="icon-file"
                  className="me-3"
                />
                <Tooltip title="file">
                  <span className="fw-bold color-dark text-truncate">
                    Mahir Matriks.pdf
                  </span>
                </Tooltip>
              </div>
            </div>
            <div className="col-md-6">
              <div className="bg-soft-primary rounded-ss p-3 d-flex align-items-center w-100 pointer">
                <img
                  width="40px"
                  height="40px"
                  src="/img/icon-file.svg"
                  alt="icon-file"
                  className="me-3"
                />
                <Tooltip title="file">
                  <span className="fw-bold color-dark text-truncate">
                    Mahir Matriks II.pdf
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <h6 className="fw-bold color-dark">Materi Terkait</h6>
            </div>
            <div className="col-md-6">
              <div className="bg-soft-primary rounded-ss p-3 d-flex align-items-center w-100 pointer">
                <img
                  width="40px"
                  height="40px"
                  src="/img/icon-kegiatan-materi.svg"
                  alt="icon-kegiatan-materi"
                  className="me-3"
                />
                <Tooltip title="file">
                  <span className="fw-bold color-dark text-truncate">
                    BAB 1 - Matriks
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>
          <hr />
          {/* {timeline?.komen?.map((komenData, idx) => (
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
          <KomenInput postKomen={postKomen} /> */}
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
                      {/* {timeline?.listSiswaBelum?.length} Siswa */} 0 Siswa
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
                      {/* {timeline?.listSiswaTerkumpul?.length} Siswa */} 0 Siswa
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
                      {/* {timeline?.listSiswaDinilai?.length} Siswa */} 0 Siswa
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
                      <input
                        type="text"
                        className="form-control form-search rounded-pill fs-14-ss fw-semibold border-secondary-ss"
                        id="exampleFormControlInput1"
                        placeholder="Cari Nama Siswa"
                      />
                    </div>
                    {/* <ul className="list-absen-kelas list-group list-group-flush">
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
                    </ul> */}
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
                    {/* <ul className="list-absen-kelas list-group list-group-flush">
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
                    </ul> */}
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
                      {/* {timeline?.listSiswaTerkumpul?.map((d, idx) => {
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
                      })} */}
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

  return (
    <div className="card card-ss p-4 pb-5 mb-4">
      {/* Dropdown Option Start */}

      <div className="dropdown dropdown-ss mb-md-0 mb-2 d-flex justify-content-end">
        {(user?.role == "guru" || user?.role == "admin") && (
          <div
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={`/img/icon-dropdown-option.svg`} alt="icon-option" />
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
            <a className="dropdown-item color-danger">
              <FaTrashAlt className="me-2" />
              <span>Hapus</span>
            </a>
          </li>
        </ul>
      </div>
      {/* Dropdown Option End */}
      <div className="d-flex align-items-center justify-content-md-between mb-4 flex-md-row flex-column">
        <div className="d-flex align-items-center flex-md-row flex-column text-break">
          <img
            src={`/img/icon-kegiatan-tugas.svg`}
            alt="icon-kegiatan-tugas"
            width="86px"
            height="86px"
          />
          <div className="text-md-start text-center ms-md-4 mt-md-0 mt-4">
            <p className="color-secondary mb-2">
              {/* {timeline?.tanggalPertemuan} */}
              Kegiatan - 19 Agustus 2021
            </p>
            <h2 className="color-dark fw-black mb-0">
              Tugas - Determinan Matriks 1x1
              {/* {user?.role == "guru"
                ? "Pertemuan"
                : `${timeline?.user?.nama} - ${timeline?.timeline?.rombel?.nama}`} */}
            </h2>
          </div>
        </div>
      </div>
      {user?.role === "guru" || user?.role == "admin" ? (
        <Tabs navItems={navItemsPertemuan} />
      ) : (
        <>
          {/* <div className="row mt-4">
            <div className="col-md-8 pe-2 mb-md-0 mb-3">
              <h6 className="fs-18-ss fw-bold color-dark mb-3">Informasi</h6>
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
                  timeline?.tanggalAkhir || timeline?.timeline?.tanggalAkhir
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
                        ${timeline?.absen === "hadir" ? "active pe-none" : ""}
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
                        ${timeline?.absen === "izin" ? "active pe-none" : ""}
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
                        ${timeline?.absen === "sakit" ? "active pe-none" : ""}
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
          <KomenInput postKomen={postKomen} /> */}
        </>
      )}
    </div>
  );
};

export default TugasPage;
