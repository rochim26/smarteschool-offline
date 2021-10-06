import { useRouter } from "next/router";
import React from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import useUser from "../../hooks/useUser";
import Tabs from "../Shared/Tabs/Tabs";

const MateriPage = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <>
      <div className="card card-ss p-4 mb-4">
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
              src={`/img/icon-kegiatan-materi.svg`}
              alt="icon-kegiatan-materi"
              width="86px"
              height="86px"
            />
            <div className="text-md-start text-center ms-md-4 mt-md-0 mt-4">
              <p className="color-secondary mb-2">
                {/* {timeline?.tanggalPertemuan} */}
                Kegiatan - 19 Agustus 2021
              </p>
              <h2 className="color-dark fw-black mb-0">
                Materi - Determinan Matriks 1x1
                {/* {user?.role == "guru"
                ? "Pertemuan"
                : `${timeline?.user?.nama} - ${timeline?.timeline?.rombel?.nama}`} */}
              </h2>
            </div>
          </div>
        </div>
        <div className="div d-flex flex-md-row flex-column">
          <div
            className="status-info p-3 pb-md-3 pb-0 bg-very-soft-secondary-2 rounded-ss d-flex mb-3 mb-md-0 flex-grow-1 flex-wrap justify-content-md-start justify-content-between"
            data-joyride="informasi-materi"
          >
            <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
              <p className="fs-14-ss fw-bold color-secondary mb-2">
                Sudah Baca
              </p>
              <p className="fs-18-ss fw-extrabold color-primary m-0">
                {/* {topik?.meta?.sudahBaca} */} 13 Siswa
              </p>
            </div>
            <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0">
              <p className="fs-14-ss fw-bold color-secondary mb-2">
                Belum Baca
              </p>
              <p className="fs-18-ss fw-extrabold color-primary m-0">
                {/* {user?.length - topik?.meta?.sudahBaca} */} 15 Siswa
              </p>
            </div>
          </div>
          <a
            href={`#`}
            //   href={`${ssURL}/bab/${topik?.bab?.id}?topik_id=${topik?.id}`}
            target="_blank"
            className="btn btn-primary btn-primary-ss rounded-ss d-flex align-items-center py-3 ps-4 pe-5 ms-md-3"
            data-joyride="btn-pratinjau-materi"
          >
            <div className="d-flex align-items-center">
              <img src={`/img/icon-pratinjau.svg`} alt="icon-pratinjau" />
              <p className="m-0 text-white fw-bold ps-4 pe-5">
                Pratinjau Materi
              </p>
            </div>
          </a>
        </div>
      </div>
      <div className="card card-ss">
        <div className="card-header-ss p-4 d-flex justify-content-between align-items-center">
          <h4 className="fw-extrabold m-0 color-dark">Daftar Siswa</h4>
          <div className="dropdown dropdown-ss">
            <div
              className="rounded-ss shadow-primary-ss"
              style={{
                width: "32px",
                height: "32px",
              }}
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={`/img/icon-filter.svg`} alt="icon-filter" />
            </div>
            <ul
              className="dropdown-menu dropdown-menu-ss my-1"
              aria-labelledby="dropdownMenuLink"
            >
              <li>
                <a className="dropdown-item">Semua</a>
              </li>
              <li>
                <a className="dropdown-item">Sudah Baca</a>
              </li>
              <li>
                <a className="dropdown-item">Belum Baca</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="card-body px-0 pb-4 pt-0">
          {/* <div className="table-responsive">
            {loading && <Skeleton height={40} />}
            {!loading && (
              <table className="table-ss">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Waktu Mulai</th>
                    <th>Waktu Selesai</th>
                    <th>Durasi</th>
                    <th>Kesimpulan</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.map((d, idx) => {
                    return (
                      <tr key={idx}>
                        <td data-th="No">{idx + 1}</td>
                        <td data-th="Nama">{d.nama}</td>
                        <td data-th="Waktu Mulai">
                          {d.kesimpulan?.[0]?.waktuMulai}
                        </td>
                        <td data-th="Waktu Selesai">
                          {d.kesimpulan?.[0]?.waktuSelesai}
                        </td>
                        <td data-th="Durasi">{d.kesimpulan?.[0]?.durasi}</td>
                        <td data-th="Kesimpulan">
                          {!d?.kesimpulan?.[0]?.kesimpulan && (
                            <button
                              className="btn btn-secondary-disable-ss btn-secondary btn-secondary-ss shadow-secondary-ss rounded-pill fs-14-ss py-1 px-4"
                              data-joyride="btn-kesimpulan"
                              disabled
                            >
                              Detail
                            </button>
                          )}

                          {d?.kesimpulan?.[0]?.kesimpulan &&
                          d?.kesimpulan?.[0]?.dibaca == 0 ? (
                            <button
                              className="btn btn-primary btn-primary btn-primary-ss shadow-primary-ss rounded-pill fs-14-ss py-1 px-4"
                              data-bs-toggle="modal"
                              data-bs-target="#modalKesimpulanAnalisisMateri"
                              onClick={() => lihatKesimpulan(d)}
                              data-joyride="btn-kesimpulan"
                            >
                              Detail
                            </button>
                          ) : null}

                          {d?.kesimpulan?.[0]?.dibaca == 1 && (
                            <button
                              className="btn btn-success btn-success btn-success-ss shadow-success-ss rounded-pill fs-14-ss py-1 px-4"
                              data-bs-toggle="modal"
                              data-bs-target="#modalKesimpulanAnalisisMateri"
                              onClick={() => lihatKesimpulan(d)}
                            >
                              Terperiksa
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div> */}

        </div>
      </div>
    </>
  );
};

export default MateriPage;
