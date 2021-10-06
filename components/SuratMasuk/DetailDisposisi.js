import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  FaBook,
  FaCalendarDay,
  FaCheck,
  FaChevronLeft,
  FaClock,
  FaExclamation,
  FaFile,
  FaGlobeAmericas,
  FaLink,
  FaPaperclip,
  FaPen,
  FaPlus,
  FaPrint,
  FaTimes,
  FaTrashAlt,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa";
import { DatePicker } from "antd";
import Avatar from "react-avatar";
import useUser from "../../hooks/useUser";
import Link from "next/link";
import { ssURL } from "../../client/clientAxios";
import { momentPackage } from "../../utilities/HelperUtils";
import ModalTambahSuratMasuk from "./ModalTambahSuratMasuk";
import ModalDisposisi from "./ModalDisposisi";
import TextareaAutosize from "react-textarea-autosize";
import EmptyStateFile from "../Shared/EmptyState/EmptyStateFile";
const { RangePicker } = DatePicker;

const DetailDisposisi = ({ dataBukuInduk, isPetugasDisposisi }) => {
  // const { user } = useUser();
  return (
    <>
      <div className="card card-ss p-4 pb-5 mt-3 mb-4">
        {/* hanya muncul di role kepsek */}
        {/* start element */}
        <div className="d-flex mb-4 justify-content-between">
          <div className="d-flex mb-4 mb-md-0 rounded-pill bg-soft-danger py-1 px-3">
            <span
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center p-1"
              style={{
                width: "22px",
                height: "22px",
              }}
            >
              <FaExclamation color="white" />
            </span>
            <span className="rounded-pill color-danger fs-6 fw-bold  ps-3">
              Belum Selesai
            </span>
          </div>
          {/* ketika sudah selesai */}
          {/* <div className="d-flex mb-4 mb-md-0 rounded-pill bg-soft-primary py-1 px-3">
                  <span
                    className="rounded-circle bg-primary d-flex justify-content-center align-items-center p-1"
                    style={{
                      width: "22px",
                      height: "22px",
                    }}
                  >
                    <FaCheck color="white" />
                  </span>
                  <span className="rounded-pill color-primary fs-6 fw-bold  ps-3">
                    Selesai
                  </span>
                </div> */}
          {/* Dropdown Option Start */}
          <div className="dropdown dropdown-ss mb-md-0 mb-2 d-md-inline d-flex justify-content-end">
            <div
              role="button"
              id="dropdownOption"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={`/img/icon-dropdown-option.svg`} alt="icon-option" />
            </div>
            <ul
              className="dropdown-menu dropdown-menu-ss my-1"
              aria-labelledby="dropdownOption"
            >
              <li
                //   onClick={() => onClickEdit(d)}
                data-bs-toggle="modal"
                data-bs-target="#modalTambahMateriRekap"
              >
                <a className="dropdown-item">
                  <FaPen className="me-2" />
                  <span>Edit</span>
                </a>
              </li>
              <li
              //  onClick={() => handleDeleteRekapTugas(idRekap, d?.id)}
              >
                <a className="dropdown-item color-danger">
                  <FaTrashAlt className="me-2" />
                  <span>Hapus</span>
                </a>
              </li>
            </ul>
          </div>
          {/* Dropdown Option End */}
        </div>
        {/* end element */}

        <div className="d-flex justify-content-md-between flex-md-row flex-column">
          <div className="order-2 order-md-1">
            <h2 className="fw-extrabold color-dark mb-1">Undangan Rapat</h2>
            <h6 className="fw-bold m-0 mb-4">
              SM.1.12.2021 - 20 Desember 2021
            </h6>
            <div className="d-flex justify-content-between align-items-stretch align-items-md-center flex-column flex-md-row mb-4">
              <div className="d-flex flex-column flex-md-row mb-4 mb-md-0">
                <div>
                  <FaClock color="#FC544B" />
                  <span className="color-danger fs-6 fw-semibold ms-2 ">
                    Sangat Segera
                  </span>
                </div>
                {/* ketika Segera */}
                {/* <div>
                        <FaClock color="#FC544B" />
                        <span className="color-danger fs-6 fw-semibold ms-2 ">
                          Segera
                        </span>
                      </div> */}
                {/* ketika Biasa */}
                {/* <div>
                        <FaClock color="#2680EB" />
                        <span className="color-primary fs-6 fw-semibold ms-2 ">
                          Biasa
                        </span>
                      </div> */}
                <div className="ms-0 ms-md-4">
                  <FaCalendarDay color="#2680EB" />
                  <span className="color-primary fs-6 fw-semibold ms-2 ">
                    Dikembalikan pada 22 Desember 2021
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex order-1 order-md-2 mb-4 mb-md-0">
            <span
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center p-1"
              style={{
                width: "22px",
                height: "22px",
              }}
            >
              <FaExclamation color="white" className="fs-6" />
            </span>
            <span className="rounded-pill color-danger fs-6 fw-bold  ps-3">
              Belum Selesai
            </span>
            {/* ketika sudah selesai */}
            {/* <span
                    className="rounded-circle bg-primary d-flex justify-content-center align-items-center p-1"
                    style={{
                      width: "22px",
                      height: "22px",
                    }}
                  >
                    <FaCheck color="white" />
                  </span>
                  <span className="rounded-pill color-primary fs-6 fw-bold  ps-3">
                    Selesai
                  </span> */}
          </div>
        </div>
        <div className="mb-4">
          <div
            className="p-4"
            style={{
              background: "rgba(237,237,244,.45)",
              borderRadius: "5px 5px 0 0",
            }}
          >
            <h5 className="m-0 fw-extrabold color-dark">Informasi Surat</h5>
          </div>
          <div
            className="p-4 mb-4"
            style={{
              background: "rgba(244,244,247,.25)",
              borderRadius: "0 0 5px 5px",
            }}
          >
            <div className="mb-4">
              <h6 className="fs-18-ss fw-bold color-dark">Dari</h6>
              <h6 className="fw-regular color-dark">Dinas Pendidikan</h6>
            </div>
            <div className="mb-4">
              <h6 className="fs-18-ss fw-bold color-dark">Nomor Surat</h6>
              <h6 className="fw-regular color-dark">
                842.3 / 01 / UPTP-XVII / IV / 2014
              </h6>
            </div>
            <div className="mb-4">
              <h6 className="fs-18-ss fw-bold color-dark">Tanggal Surat</h6>
              <h6 className="fw-regular color-dark">19 Desember 2021</h6>
            </div>
            <div className="mb-4">
              <h6 className="fs-18-ss fw-bold color-dark">Tingkat Keamanan</h6>
              <h6 className="fw-regular color-dark">Rahasia</h6>
            </div>
            <div className="mb-4">
              <h6 className="fs-18-ss fw-bold color-dark">Isi Ringkasan</h6>
              <h6 className="fw-regular color-dark">
                Undangan rapat rutin di hotel Hargawangsa Bandung Tanggal 25
                Desember 2021.
              </h6>
            </div>
            <div className="">
              <h6 className="fs-18-ss fw-bold color-dark">File Surat</h6>
              <div className="card-lampiran-materi border-0 bg-soft-primary rounded-ss py-3">
                <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-row">
                  <div className="d-flex align-items-center flex-wrap">
                    <img src="/img/icon-upload-link.svg" alt="" />
                    <div className="px-4">
                      <p className="fw-bold color-dark mb-0 ">File PDF.pdf</p>
                      <span className="fs-12-ss color-secondary fs-12-ss fw-bold">
                        PDF
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4">
          <div
            className="p-4"
            style={{
              background: "rgba(237,237,244,.45)",
              borderRadius: "5px 5px 0 0",
            }}
          >
            <h5 className="m-0 fw-extrabold color-dark">Informasi Disposisi</h5>
          </div>
          <div
            className="p-4 mb-4"
            style={{
              background: "rgba(244,244,247,.25)",
              borderRadius: "0 0 5px 5px",
            }}
          >
            <div className="mb-4">
              <h6 className="fs-18-ss fw-bold color-dark">Penanganan</h6>
              <h6 className="fw-regular color-dark">Segera</h6>
            </div>
            <div className="mb-4">
              <h6 className="fs-18-ss fw-bold color-dark">
                Didisposisikan Kepada
              </h6>
              <h6 className="fw-regular color-dark">
                1. Wakil Kepala Kurikulum
              </h6>
            </div>
            <div className="mb-4">
              <h6 className="fs-18-ss fw-bold color-dark">Isi Disposisi</h6>
              <h6 className="fw-regular color-dark">
                Cek kaji dan pertimbangkan
              </h6>
            </div>
            <img
              src="https://i2.wp.com/bagiinfo.com/wp-content/uploads/2017/01/tanda-tangan-elizato.jpg"
              alt="tanda tangan"
              className="w-100 img-fit-contain rounded-ss"
              style={{
                height: "80px",
                background: "rgba(244,244,247,.35)",
              }}
            />
          </div>
        </div>
        <div className="card-lampiran-materi border-0 bg-soft-primary rounded-ss py-3">
          <div className="d-flex justify-content-center align-items-md-center flex-wrap flex-row">
            <div className="d-flex align-items-center flex-wrap">
              <img src="/img/icon-print.svg" alt="" />
              <div className="px-4">
                <p className="fw-bold color-dark mb-0 ">
                  Cetak Lembar Disposisi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-ss p-4 pb-4 mt-3 mb-4">
        <h4 className="fw-extrabold color-dark mb-4">Undangan Rapat</h4>
        <div className="mb-4">
          <h6 className="fs-18-ss fw-bold color-dark">Keterangan</h6>
          <h6 className="fw-regular color-dark">
            Kegiatan seminar mengenai pelatihan sistem e learning sekolah.
          </h6>
        </div>
        <div className="">
          <h6 className="fs-18-ss fw-bold color-dark">Lampiran</h6>
          <div className="card-lampiran-materi border-0 bg-soft-primary rounded-ss py-3">
            <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-row">
              <div className="d-flex align-items-center flex-wrap">
                <img src="/img/icon-upload-link.svg" alt="" />
                <div className="px-4">
                  <p className="fw-bold color-dark mb-0 ">File PDF.pdf</p>
                  <span className="fs-12-ss color-secondary fs-12-ss fw-bold">
                    PDF
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPetugasDisposisi && (
        <div className="card card-ss p-4 pb-5 mt-3 mb-4">
          <h4 className="fw-extrabold color-dark mb-4">
            Lembar Pelaporan Disposisi
          </h4>
          <div className="mb-4">
            <label className="form-label">Keterangan</label>
            <TextareaAutosize
              className="form-control"
              autoComplete="off"
              style={{
                resize: "none",
                width: "100%",
              }}
              placeholder="Tuliskan keterangan laporan"
              minRows={3}
              name="judul"
              // value={formData.judul}
              // onChange={handleChangeForm}
            />
          </div>
          <div className="d-flex justify-content-between align-items-sm-center flex-sm-row flex-column mb-4">
            <h6 className="color-dark fw-bold fs-18-ss">Lampiran Materi</h6>
            <div className="d-flex align-items-sm-center flex-sm-row flex-column">
              <label
                htmlFor="formFileMultiple"
                className="d-flex align-items-center justify-content-center form-label m-0 fs-12-ss fw-bold btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-sm-3 mb-sm-0 mb-3"
              >
                <FaPaperclip className="me-2" />
                <p className="mb-0">Unggah File</p>
              </label>

              {/* </label> */}
              <input
                className="form-control d-none"
                type="file"
                name="formFileMultiple"
                id="formFileMultiple"
                // onChange={uploadFileToServer}
              />
              {/* <!-- Button Trigger Modal Tautan Link Start --> */}

              <button
                type="button"
                className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fs-12-ss fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#modalTautanLink"
              >
                <FaLink className="me-2" />
                Tautan Link
              </button>

              {/* <!-- Button Trigger Modal Tautan Link End --> */}
            </div>
          </div>
          <EmptyStateFile
            type="file"
            pesan="Tidak ada file atau link yang dilampirkan"
          />
          <div className="card-lampiran-materi border-0 bg-soft-primary rounded-ss py-3">
            <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-row">
              <div className="d-flex align-items-center flex-wrap">
                <img src="/img/icon-upload-link.svg" alt="" />
                <div className="px-4">
                  <p className="fw-bold color-dark mb-0 ">File PDF.pdf</p>
                  <span className="fs-12-ss color-secondary fs-12-ss fw-bold">
                    PDF
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <h6 className="color-dark fw-bold">
              Pastikan laporan yang diberikan sesuai dengan isi disposisi.
            </h6>
            <div
              className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold ms-lg-3 ms-0 mt-lg-0 mt-3"
              data-bs-toggle="modal"
              data-bs-target="#modalTambahSuratMasuk"
            >
              Kirim Lampiran
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailDisposisi;
