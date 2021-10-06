import { useRouter } from "next/router";
import Link from "next/link";
import CardDataSiswa from "../Kesiswaan/CardDataSiswa";
import AnalisisJumlahPesertaDidik from "../Analisis/AnalisisJumlahPesertaDidik";
import AnalisisJumlahPesertaDidikPerJurusan from "../Analisis/AnalisisJumlahPesertaDidikPerJurusan";
import { getStudent } from "../../client/StudentClient";
import { useEffect, useState } from "react";
import LabelStatus from "../Shared/LabelStatus/LabelStatus";

const KesiswaanDashboard = () => {
  const router = useRouter();

  const filter = router.query.filter;

  const [siswaData, setSiswaData] = useState({});
  const { siswa, integrasi, jumlahLaki, jumlahPerempuan, jurusanData, total } =
    siswaData;

  const listFilter = [
    {
      text: "Hari",
      url: "smartschool?filter=hari",
      isActive: !filter || filter === "hari",
    },
    {
      text: "Minggu",
      url: "smartschool?filter=minggu",
      isActive: filter === "minggu",
    },
    {
      text: "Bulan",
      url: "smartschool?filter=bulan",
      isActive: filter === "bulan",
    },
  ];

  const getSiswaData = async () => {
    const params = {
      page: 1,
    };

    const { data } = await getStudent(params);
    if (data) {
      setSiswaData({
        ...data,
        siswa: data?.siswa?.data,
        total: data?.siswa?.total,
      });
    }
  };

  useEffect(() => {
    getSiswaData();
  }, []);

  return (
    <div>
      {/* <div className="d-flex justify-content-between">
        <h2 className="fw-bold color-dark">Data Siswa</h2>
        <div>
          {listFilter.map(({ url, text, isActive }, index) => (
            <Link href={url} key={index}>
              <a
                className={`btn btn-ss btn-outline-secondary rounded-pill me-4 ms-4 ${
                  isActive ? "label-light-primary-ss" : ""
                }`}
              >
                {text}
              </a>
            </Link>
          ))}
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <CardDataSiswa imageRight="/img/bg-kasus-melanggar.png">
            <div>
              <h2 className="color-primary fw-bold mb-0">18</h2>
              <p className="color-secondary">Kasus Pelanggaran</p>
            </div>
          </CardDataSiswa>
        </div>
        <div className="col-md-3">
          <CardDataSiswa imageRight="/img/bg-siswa-melanggar.png">
            <div>
              <h2 className="color-primary fw-bold mb-0">16</h2>
              <p className="color-secondary">Siswa Melanggar</p>
            </div>
          </CardDataSiswa>
        </div>
        <div className="col-md-3">
          <CardDataSiswa imageRight="/img/bg-prestasi.png">
            <div>
              <h2 className="color-primary fw-bold mb-0">18</h2>
              <p className="color-secondary">Jumlah Prestasi</p>
            </div>
          </CardDataSiswa>
        </div>
        <div className="col-md-3">
          <CardDataSiswa imageRight="/img/bg-siswa-berprestasi.png">
            <div>
              <h2 className="color-primary fw-bold mb-0">18</h2>
              <p className="color-secondary">Siswa Berprestasi</p>
            </div>
          </CardDataSiswa>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <CardDataSiswa header={"Jumlah Peserta Didik"} imageRight="/img/bg-jumlah-peserta-didik.png">
            <div style={{ marginLeft: -90  }}>
              <AnalisisJumlahPesertaDidik
                jumlahLaki={jumlahLaki}
                jumlahPerempuan={jumlahPerempuan}
                withTitle={false}
                maintainAspectRatio={false}
              />
            </div>
          </CardDataSiswa>
        </div>
        <div className="col-md-6">
          <CardDataSiswa header="Jumlah Peserta Didik per Angkatan" imageRight="/img/bg-jumlah-peserta-didik-angkatan.png">
            <div className="d-block">
              <AnalisisJumlahPesertaDidikPerJurusan
                jurusanData={jurusanData}
                withTitle={false}
                maintainAspectRatio={false}
              />
            </div>
          </CardDataSiswa>
        </div>
        <div className="col-md-6 mt-3">
          <CardDataSiswa header="Pelanggaran yang sering dilakukan" imageRight="/img/bg-pelanggaran-sering-dilakukan.png" >
            <div className="d-flex align-items-center w-100 mb-3">
              <div className="w-50">
                <h6 className="color-dark fw-bold mb-0">Pelanggaran</h6>
              </div>
              <div>
                <h6 className="color-dark fw-bold mb-0">Jumlah</h6>
              </div>
            </div>

            <div className="d-flex align-items-center w-100 mb-3">
              <div className="w-50">
                <h6 className="color-secondar mb-0">Terlambat</h6>
              </div>
              <div>
                <h6 className="color-primary mb-0">15</h6>
              </div>
            </div>

            <div className="d-flex align-items-center w-100 mb-3">
              <div className="w-50">
                <h6 className="color-secondar mb-0">Tidak membawa dasi</h6>
              </div>
              <div>
                <h6 className="color-primary mb-0">10</h6>
              </div>
            </div>

            <div className="d-flex align-items-center w-100">
              <div className="w-50">
                <h6 className="color-secondar mb-0">Tidak membawa gesper</h6>
              </div>
              <div>
                <h6 className="color-primary mb-0">2</h6>
              </div>
            </div>
          </CardDataSiswa>
        </div>
        <div className="col-md-6 mt-3">
          <CardDataSiswa header="Siswa Paling Berprestasi" imageRight="/img/bg-siswa-paling-berprestasi.png" >
            <div className="d-flex align-items-center w-100 mb-3">
              <div className="w-50">
                <h6 className="color-dark fw-bold mb-0">Nama</h6>
              </div>
              <div>
                <h6 className="color-dark fw-bold mb-0">Jumlah</h6>
              </div>
            </div>

            <div className="d-flex align-items-center w-100 mb-3">
              <div className="w-50">
                <h6 className="color-secondar mb-0">Elizabet Swann</h6>
              </div>
              <div>
                <h6 className="color-primary mb-0">3</h6>
              </div>
            </div>

            <div className="d-flex align-items-center w-100 mb-3">
              <div className="w-50">
                <h6 className="color-secondar mb-0">Jack</h6>
              </div>
              <div>
                <h6 className="color-primary mb-0">2</h6>
              </div>
            </div>

            <div className="d-flex align-items-center w-100">
              <div className="w-50">
                <h6 className="color-secondar mb-0">Hector</h6>
              </div>
              <div>
                <h6 className="color-primary mb-0">2</h6>
              </div>
            </div>
          </CardDataSiswa>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12">
          <CardDataSiswa header="Siswa yang Mendapatkan Sanksi" noPadding imageRight="/img/bg-siswa-mendapatkan-sanksi.png" minHeightHeader={109}>
            <table className="table-ss">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Sanksi</th>
                  <th>Poin</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-th="No">1</td>
                  <td data-th="Nama">Armando Salazar</td>
                  <td data-th="Sanksi">Sanksi 1 - Pembinaan oleh Wali Kelas </td>
                  <td data-th="Poin"><h6 className="color-primary mb-0">2</h6></td>
                  <td data-th="Status">
                    <LabelStatus status="soft-danger">
                      Perlu Diberikan Sanksi
                    </LabelStatus>
                  </td>
                  <td data-th="Aksi">
                    <button className="btn btn-primary-ss rounded-pill px-3 py-1 text-decoration-none fs-12-ss shadow-primary-ss">
                      Tindak Lanjut
                    </button>
                  </td>
                </tr>
                <tr>
                  <td data-th="No">1</td>
                  <td data-th="Nama">Armando Salazar</td>
                  <td data-th="Sanksi">Sanksi 1 - Pembinaan oleh Wali Kelas </td>
                  <td data-th="Poin"><h6 className="color-primary mb-0">2</h6></td>
                  <td data-th="Status">
                    <LabelStatus status="warning">
                      Mendapatkan Sanksi
                    </LabelStatus>
                  </td>
                  <td data-th="Aksi">
                    <button className="btn btn-primary-ss rounded-pill px-3 py-1 text-decoration-none fs-12-ss shadow-primary-ss">
                      Detail
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardDataSiswa>
        </div>
      </div> */}
    </div>
  );
};

export default KesiswaanDashboard;
