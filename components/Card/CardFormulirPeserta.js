import React from "react";
import dynamic from "next/dynamic";
import { getFormatDate } from "../../utilities/HelperUtils";
import { FaFileDownload } from "react-icons/fa";
import useSekolah from "../../hooks/useSekolah";
const Pdf = dynamic(() => import("react-to-pdf"), { ssr: false });

const CardFormulirPeserta = ({ pendaftar, ref }) => {
  const { sekolah } = useSekolah();
  return (
    <div className="card card-ss mb-4">
      <nav className="d-flex justify-content-between align-items-center p-4">
        <h5 className="fw-bold">Formulir Peserta</h5>
        <Pdf targetRef={ref} filename="code-example.pdf">
          {({ toPdf }) => (
            <button className="btn btn-primary rounded-pill" onClick={toPdf}>
              <FaFileDownload /> Unduh Kartu Peserta
            </button>
          )}
        </Pdf>
      </nav>
      <div className="card-body p-0" ref={ref}>
        <div className="pdf-page-1-formulir">
          <h5 className="fw-bold text-center text-uppercase">
            Formulir Pendaftaran
            <br />
            Calon Siswa Baru {sekolah?.nama}
          </h5>
          <h5 className="fw-bold text-center text-uppercase">
            Jalur Seleksi
            <br />
            {pendaftar?.gelombang?.nama}
          </h5>
          <h5 className="fw-bold text-center text-uppercase">
            Nama : {pendaftar?.user?.nama}
            <br />
            No Peserta : {pendaftar?.id}
            <br />
            Pilihan Jurusan 1 : {pendaftar?.mJurusan1Id}
            <br />
            Pilihan Jurusan 2 : {pendaftar?.mJurusan2Id}
            <br />
            Pilihan Jurusan 3 : {pendaftar?.mJurusan3Id}
            <br />
            Pilihan Jurusan 4 : {pendaftar?.mJurusan4Id}
            <br />
            Pilihan Jurusan 5 : {pendaftar?.mJurusan5Id}
          </h5>
        </div>
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

export default CardFormulirPeserta;
