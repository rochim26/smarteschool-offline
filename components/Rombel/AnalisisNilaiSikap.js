import { FaCloudDownloadAlt } from "react-icons/fa";

const AnalisisNilaiSikap = ({ analisisNilai, judulTugas, downloadAnalisisNilai }) => {
  return (
    <div>
      <div className="card card-ss">
        <div className="card-body p-0">
          <div className="d-flex justify-content-between align-items-lg-center flex-lg-row flex-column p-4">
            <h4 className="mb-lg-0 mb-3 fw-extrabold color-dark">
              Nilai Sikap Siswa
            </h4>
            <div className="d-flex align-items-sm-center flex-sm-row flex-column">
              <div className="d-flex flex-column flex-lg-row align-items-lg-center fs-6">
                <button className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-sm-3 me-0 mb-sm-0 mb-3 fw-bold color-secondary fs-14-ss" onClick={() => downloadAnalisisNilai()}>
                  <FaCloudDownloadAlt className="me-2 fs-6" />
                  Unduh
                </button>
              </div>
              <input
                type="text"
                className="form-control form-search rounded-pill fs-14-ss fw-semibold py-2 border-secondary-ss h-100"
                style={{ height: "39px !important" }}
                id="exampleFormControlInput1"
                placeholder="Cari Nama Siswa"
              />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table-ss">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Penyelesaian Tugas</th>
                  <th>Keterlambatan Tugas</th>
                </tr>
              </thead>
              <tbody>
                {analisisNilai?.map((analisis, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{analisis?.nama}</td>
                      <td>{`0/${judulTugas?.length}`}</td>
                      <td>{`0/${judulTugas?.length}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalisisNilaiSikap;
