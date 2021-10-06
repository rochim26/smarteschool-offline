import Link from "next/link";
import React from "react";
import { FaClone, FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { ssURL } from "../../client/clientAxios";
import useUser from "../../hooks/useUser";
import ModalTambahSikapSosial from "./ModalTambahSikapSosial";
import ModalTambahSikapSpiritual from "./ModalTambahSikapSpiritual";

const TableSikap = () => {
  const { user } = useUser();

  const backendRekap = [
    { judul: "Ulangan Konsep Limit Aljabar", nilai: 90 },
    { judul: "Ulangan Konsep Nilai Suku Banyak", nilai: 75 },
    { judul: "Ulangan Determinan dan Invers Matriks", nilai: 80 },
    {
      judul: "Ulangan Logika Matematika : Konvers, Invers dan Kontraposisi",
      nilai: 85,
    },
  ];

  return (
    <>
      <table className="table-ss">
        <thead>
          <tr>
            <th style={{ width: "15%" }}>Nama Sikap</th>
            <th colSpan="2">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-th="Nama Sikap">
              <span className="fw-semibold">Sikap Spiritual</span>
            </td>
            <td data-th="Keterangan">
              <p className="fw-semibold mb-0">
                Peserta didik dinyatakan telah memahami pengetahuan mengenai
                persamaan dan pertidaksamaan nilai mutlak, SPLTV, SPtDV, Relasi
                dan Fungsi dengan baik. Perlu ditingkatkan mengenai
                pertidaksamaan rasional dan irrasional .
              </p>
            </td>
            <td>
              <div className="dropdown dropdown-ss mb-md-0 mb-2 d-md-inline d-flex justify-content-end">
                <div
                  role="button"
                  id="dropdownOption"
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
                  aria-labelledby="dropdownOption"
                >
                  <li
                    // onClick={() => onClickEdit(data)}
                    data-bs-toggle="modal"
                    data-bs-target="#modalTambahMateriRekap"
                  >
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
            </td>
          </tr>
          <tr>
            <td data-th="Nama">
              <span className="fw-semibold">Sikap Sosial</span>
            </td>
            <td data-th="Keterangan">
              <p className="fw-semibold mb-0">
                Peserta didik dinyatakan telah memahami pengetahuan mengenai
                persamaan dan pertidaksamaan nilai mutlak, SPLTV, SPtDV, Relasi
                dan Fungsi dengan baik. Perlu ditingkatkan mengenai
                pertidaksamaan rasional dan irrasional .
              </p>
            </td>
            <td>
              <div className="dropdown dropdown-ss mb-md-0 mb-2 d-md-inline d-flex justify-content-end">
                <div
                  role="button"
                  id="dropdownOption"
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
                  aria-labelledby="dropdownOption"
                >
                  <li
                    // onClick={() => onClickEdit(data)}
                    data-bs-toggle="modal"
                    data-bs-target="#modalTambahMateriRekap"
                  >
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
            </td>
          </tr>
        </tbody>
      </table>
      <a
        className="color-primary w-100 p-3 px-4 border-top-0 border-bottom-0 border-end-0 mb-1 fw-semibold d-flex align-items-center btn-tambah-table"
        style={{
          borderColor: `#92BFF5`,
          borderWidth: "10px",
          borderStyle: "solid",
        }}
        data-bs-toggle="modal"
        data-bs-target="#modalTambahSikapSpiritual"
      >
        <FaPlus className="me-2" /> Tambah Sikap Spiritual
      </a>
      <a
        className="color-primary w-100 p-3 px-4 border-top-0 border-bottom-0 border-end-0 mb-1 fw-semibold d-flex align-items-center btn-tambah-table"
        style={{
          borderColor: `#92BFF5`,
          borderWidth: "10px",
          borderStyle: "solid",
        }}
        data-bs-toggle="modal"
        data-bs-target="#modalTambahSikapSosial"
      >
        <FaPlus className="me-2" /> Tambah Sikap Sosial
      </a>
      <ModalTambahSikapSpiritual
      // handleChangeForm={handleChangeForm}
      // formData={formData}
      // _postProfilUser={_postProfilUser}
      />
      <ModalTambahSikapSosial
      // handleChangeForm={handleChangeForm}
      // formData={formData}
      // _postProfilUser={_postProfilUser}
      />
    </>
  );
};

export default TableSikap;
