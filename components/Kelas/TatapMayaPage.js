import { useRouter } from "next/router";
import React from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import useUser from "../../hooks/useUser";
import Tabs from "../Shared/Tabs/Tabs";

const TatapMayaPage = () => {
  const { user } = useUser();
  const router = useRouter();

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
                className="status-info px-4 p-3 pb-md-3 pb-0 bg-very-soft-secondary-2 rounded-ss d-flex mb-3 mb-md-0 flex-grow-1 flex-wrap justify-content-md-start justify-content-between"
                data-joyride="informasi-absen"
              >
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss fw-bold color-secondary mb-2">Hadir</p>
                  <p className="fs-18-ss fw-extrabold color-primary m-0">
                    {/* {timeline?.meta?.totalHadir} Siswa */}
                    Siswa
                  </p>
                </div>
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss fw-bold color-secondary mb-2">Sakit</p>
                  <p className="fs-18-ss fw-extrabold color-primary m-0">
                    {/* {timeline?.meta?.totalSakit} Siswa */}
                    Siswa
                  </p>
                </div>
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss fw-bold color-secondary mb-2">Izin</p>
                  <p className="fs-18-ss fw-extrabold color-primary m-0">
                    {/* {timeline?.meta?.totalIzin} Siswa */}
                    Siswa
                  </p>
                </div>
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
                  <p className="fs-14-ss fw-bold color-secondary mb-2">Alpa</p>
                  <p className="fs-18-ss fw-extrabold color-primary m-0">
                    {/* {timeline?.meta?.totalAlpa} Siswa */}
                    Siswa
                  </p>
                </div>
              </div>
              <div className="post-content mt-4">
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
            <div className="col-md-4 ps-2">
              {/* <a
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
              </a> */}
              <a
                // onClick={(e) => handleClickPilihanAbsen("hadir", e)}
                rel="noreferrer noopener"
                className={`btn btn-primary btn-primary-ss rounded-ss d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-start py-3 px-4`}
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
                    {/* {isValidGmeetUrl(
                      timeline?.gmeet || timeline?.timeline?.gmeet
                    ) == "#!"
                      ? "Tidak ada tatap muka"
                      : "Tatap Muka"} */}
                    Tatap Maya
                  </p>
                </div>
              </a>
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
                  className="form-control form-search rounded-pill fs-14-ss fw-semibold border-secondary-ss px-3"
                  id="exampleFormControlInput1"
                  placeholder="Cari Nama Siswa"
                  // onChange={(e) => onChangeSearch(e.target.value)}
                />
              </div>
              {/* <ul className="list-absen-kelas list-group list-group-flush">
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
              </ul> */}
            </div>
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
            src={`/img/icon-kegiatan-tatap-maya.svg`}
            alt="icon-kegiatan-tatap-maya"
            width="86px"
            height="86px"
          />
          <div className="text-md-start text-center ms-md-4 mt-md-0 mt-4">
            <p className="color-secondary mb-2">
              {/* {timeline?.tanggalPertemuan} */}
              Kegiatan - 19 Agustus 2021
            </p>
            <h2 className="color-dark fw-black mb-0">
              Tatap Maya
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

export default TatapMayaPage;
