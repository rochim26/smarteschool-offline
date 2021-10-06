import React from "react";
import { getFormatDate } from "../../utilities/HelperUtils";
import { FaFileDownload } from "react-icons/fa";
import dynamic from "next/dynamic";
const Pdf = dynamic(() => import("react-to-pdf"), { ssr: false });

const CardKartuPeserta = ({ ref, pendaftar }) => {
  return (
    <div className="card card-ss mb-4">
      <nav className="d-flex justify-content-between align-items-center p-4">
        <h5 className="fw-bold">Kartu Peserta</h5>
        <Pdf targetRef={ref} filename="Kartu Peserta.pdf">
          {({ toPdf }) => (
            <button className="btn btn-primary rounded-pill" onClick={toPdf}>
              <FaFileDownload /> Unduh Kartu Peserta
            </button>
          )}
        </Pdf>
      </nav>
      <div className="card-body p-0" ref={ref}>
        <div className="table-responsive">
          <table className="table-ss">
            <thead>
              <tr>
                <th>Jalur Masuk</th>
                <th>: {pendaftar?.gelombang?.nama}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>No Peserta</th>
                <th>: {pendaftar?.id}</th>
              </tr>
              <tr>
                <th>NISN</th>
                <th>: {pendaftar?.user?.profil?.nisn}</th>
              </tr>
              <tr>
                <th>Nama</th>
                <th>: {pendaftar?.user?.nama}</th>
              </tr>
              <tr>
                <th>Tgl Lahir</th>
                <th>: {getFormatDate(pendaftar?.user?.tanggalLahir)}</th>
              </tr>
              <tr>
                <th>Tempat</th>
                <th>: {pendaftar?.user?.tempatLahir}</th>
              </tr>
              <tr>
                <th>Asal Sekolah</th>
                <th>: {pendaftar?.user?.profil?.asalSekolah}</th>
              </tr>
              <tr>
                <th>Pilihan Jurusan 1</th>
                <th>: {pendaftar?.mJurusan1Id}</th>
              </tr>
              <tr>
                <th>Pilihan Jurusan 2</th>
                <th>: {pendaftar?.mJurusan2Id}</th>
              </tr>
              <tr>
                <th>Pilihan Jurusan 3</th>
                <th>: {pendaftar?.mJurusan3Id}</th>
              </tr>
              <tr>
                <th>Pilihan Jurusan 4</th>
                <th>: {pendaftar?.mJurusan4Id}</th>
              </tr>
              <tr>
                <th>Pilihan Jurusan 5</th>
                <th>: {pendaftar?.mJurusan5Id}</th>
              </tr>
            </tbody>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CardKartuPeserta;
