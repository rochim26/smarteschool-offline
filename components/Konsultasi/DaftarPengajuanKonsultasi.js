import { useRouter } from "next/router";
import { ssURL } from "../../client/clientAxios";
import AnimatePage from "../Shared/AnimatePage/AnimatePage";

const DaftarPengajuanKonsultasi = () => {

  const router = useRouter();

  const { query } = router;
  const { filter } = query || "";

  const showDetail = () => {
    const path = `${ssURL}/konsultasi?menu=buku-kunjungan&filter=${!filter ? "pengajuan" : filter}&detail=amirullah`; // if no filter set to default filter to pengajuan;
    router.push(path);
  }

  const getTitle = () => {
    if (!filter || filter === "pengajuan") {
      return "Pengajuan Konsultasi"
    } else if (filter === "diterima") {
      return "Konsultasi Diterima"
    } else if (filter === "ditolak") {
      return "Konsultasi Ditolak"
    } else {
      return "Konsultasi Selesai"
    }
  }

  return (
    <AnimatePage>
      <div className="card card-ss mt-4">
        <div className="card-header card-header-ss p-0 pt-4">
          <div className="d-flex justify-content-between align-items-sm-center flex-md-row flex-column px-4">
            <h4 className="fw-extrabold color-dark mb-sm-0 mb-3">
              {getTitle()}
            </h4>
            <section className="d-flex flex-md-row flex-column">
              <input
                type="text"
                className="form-control form-search form-search-mutasi rounded-pill fw-semibold border-secondary-ss w-100 mb-3 mb-md-0  me-0 me-md-4"
                style={{ height: "42px", width: "100%" }}
                id="exampleFormControlInput1"
                placeholder="Cari Guru"
              />
            </section>
          </div>
        </div>

        <div className="table-responsive mt-3">
          <table className="table-ss" data-joyride="table-prestasi">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Siswa</th>
                <th>Tanggal Pengajuan</th>
                <th>Keperluan</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-th="No">1</td>
                <td data-th="Nama Guru BK">Ashandi Leonadi</td>
                <td data-th="Tanggal Pengajuan">14 Juli 2021</td>
                <td data-th="Keperluan">Curhat masalah pribadi</td>
                <td data-th="Detaill">
                  <button className="btn btn-primary-ss rounded-pill px-3 py-1 text-decoration-none fs-12-ss shadow-primary-ss" onClick={() => showDetail()}>
                    Proses
                  </button>
                </td>
              </tr>
              <tr>
                <td data-th="No">1</td>
                <td data-th="Nama Guru BK">Ashandi Leonadi</td>
                <td data-th="Tanggal Pengajuan">14 Juli 2021</td>
                <td data-th="Keperluan">Curhat masalah pribadi</td>
                <td data-th="Detaill">
                  <button className="btn btn-primary-ss rounded-pill px-3 py-1 text-decoration-none fs-12-ss shadow-primary-ss" onClick={() => showDetail()}>
                    Proses
                  </button>
                </td>
              </tr>
              <tr>
                <td data-th="No">1</td>
                <td data-th="Nama Guru BK">Ashandi Leonadi</td>
                <td data-th="Tanggal Pengajuan">14 Juli 2021</td>
                <td data-th="Keperluan">Curhat masalah pribadi</td>
                <td data-th="Detaill">
                  <button className="btn btn-primary-ss rounded-pill px-3 py-1 text-decoration-none fs-12-ss shadow-primary-ss" onClick={() => showDetail()}>
                    Proses
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AnimatePage>
  )
}

export default DaftarPengajuanKonsultasi;