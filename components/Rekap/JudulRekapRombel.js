import moment from "moment";
import React from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import daftarTipeUjian from "../../data/tipe-ujian.json";

const JudulRekapRombel = ({
  rekap,
  rekapRombel,
  onClickEdit,
  _deleteRekapTugas,
  _downloadTemplate,
  _importNilaiRekap,
  tipe,
}) => {
  return (
    <div className="col-md-12">
      <div className="card-jadwal-ujian card card-ss bg-white rounded-ss p-0">
        <div className="card-header card-header-ss p-0">
          <div className="d-flex justify-content-between align-items-center px-4 py-3">
            {/* Jadwal Ujian Label Start */}

            <div className="jadwal-ujian-label label-ss bg-primary text-white rounded-pill fs-12-ss me-2 text-capitalize">
              {tipe == "Ujian"
                ? daftarTipeUjian.find((tipe) => tipe.value == rekap?.teknik)
                    ?.label
                : rekapRombel?.diSs
                ? rekap?.tipe + " dari smartschool"
                : rekap?.tipe}
            </div>

            {/* Jadwal Ujian Label End */}

            {/* Dropdown Option Start */}

            <div className="dropdown dropdown-ss mb-md-0 mb-2 d-md-inline d-flex justify-content-end">
              <div
                role="button"
                id="dropdownOption"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-joyride="dropdown"
              >
                <img src={`/img/icon-dropdown-option.svg`} alt="icon-option" />
              </div>
              <ul
                className="dropdown-menu dropdown-menu-ss my-1"
                aria-labelledby="dropdownOption"
              >
                <li
                  onClick={() => onClickEdit(rekapRombel)}
                  data-bs-toggle="modal"
                  data-bs-target={
                    tipe == "Tugas" || tipe == "Ujian"
                      ? "#modalTambahTugas"
                      : "#modalTambahKeterampilan"
                  }
                >
                  <a className="dropdown-item">
                    <FaPen className="me-2" />
                    <span>Edit</span>
                  </a>
                </li>
                <li onClick={() => _deleteRekapTugas(rekapRombel.id)}>
                  <a className="dropdown-item color-danger">
                    <FaTrashAlt className="me-2" />
                    <span>Hapus</span>
                  </a>
                </li>
              </ul>
            </div>
            {/* Dropdown Option End */}
          </div>
          <hr className="m-0" />
        </div>
        <div className="card-body p-4">
          <div className="d-flex align-items-start mb-4 flex-md-row flex-column pb-3">
            <div
              className="rounded-circle shadow-primary-ss me-md-4 mb-4 mb-md-0"
              style={{
                width: "73px",
                height: "73px",
              }}
            >
              <img
                src={`/img/post-icon-1.svg`}
                alt="post-icon"
                width="73px"
                height="73px"
              />
            </div>
            <div className="title">
              <h2 className="color-dark fw-black mb-2">{rekapRombel?.judul}</h2>
              <h5 className="color-dark fw-bold m-0">{rekap?.judul}</h5>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-lg-0 mb-3">
              <div
                className="status-info p-3 pb-md-3 pb-0 rounded-ss d-flex mb-3 mb-md-0 flex-grow-1 flex-wrap justify-content-sm-start justify-content-between h-100"
                style={{ backgroundColor: "#f8f8fb" }}
              >
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0 order-md-1 order-1">
                  <h6 className="fw-bold fs-14-ss  color-secondary mb-2">
                    Dibawah KKM
                  </h6>
                  <h4 className="fw-extrabold fs-18-ss color-primary m-0">
                    {rekapRombel?.meta?.total} Siswa
                  </h4>
                </div>
                <div className="status-info-items me-md-5 mb-lg-0 mb-3 p-3 p-md-0 order-md-1 order-3">
                  <h6 className="fw-bold fs-14-ss color-secondary mb-2">
                    Tanggal
                  </h6>
                  <h5 className="fw-extrabold fs-18-ss color-primary m-0">
                    {`
                    ${moment(rekapRombel?.tanggal).format("dddd, DD MMMM YYYY")}
                    `}
                  </h5>
                </div>
              </div>
            </div>

            <div className="col-md-3 ps-2">
              <a
                href={`#`}
                onClick={() => _downloadTemplate(rekapRombel?.id)}
                className="btn btn-light btn-light-ss rounded-ss d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-start py-3 px-4 h-100"
              >
                <div className="d-flex align-items-center flex-lg-row flex-md-column flex-row ">
                  <img
                    src={`/img/icon-download-dropfile.svg`}
                    alt="icon-pratinjau"
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  />
                  <p className="m-0 text-dark fw-bold px-lg-4 px-md-0 px-4 py-lg-0 py-md-2 py-0">
                    Template Input Nilai
                  </p>
                </div>
              </a>
            </div>
            <div className="col-md-3 ps-2">
              <label
                htmlFor="import"
                className="btn btn-light btn-light-ss rounded-ss d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-start py-3 px-4 h-100"
              >
                <div className="d-flex align-items-center flex-lg-row flex-md-column flex-row ">
                  <img
                    src={`/img/icon-upload-dropfile.svg`}
                    alt="icon-pratinjau"
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  />
                  <p className="m-0 text-dark fw-bold px-lg-4 px-md-0 px-4 py-lg-0 py-md-2 py-0">
                    import Nilai
                  </p>
                  <input
                    type="file"
                    name="import"
                    id="import"
                    onChange={(e) =>
                      _importNilaiRekap(rekapRombel?.id, e.target.files[0])
                    }
                    className="form-control d-none"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudulRekapRombel;
