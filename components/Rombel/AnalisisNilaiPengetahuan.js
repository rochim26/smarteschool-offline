import { useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";

const AnalisisNilaiPengetahuan = ({
  analisisNilai,
  downloadAnalisisNilai,
  jadwalMengajar,
}) => {
  const [tugasNumber, setTugasNumber] = useState(0);

  let tugasData = [];

  for (let i = 1; i <= tugasNumber; i++) {
    tugasData.push("data");
  }

  return (
    <div>
      <div className="card card-ss">
        <div className="card-body p-0">
          <div className="d-flex justify-content-between align-items-lg-center flex-lg-row flex-column p-4">
            <h4 className="mb-lg-0 mb-3 fw-extrabold color-dark">
              Nilai Pengetahuan Siswa
            </h4>
            <div className="d-flex align-items-sm-center flex-sm-row flex-column">
              <div className="d-flex flex-column flex-lg-row align-items-lg-center fs-6">
                <button
                  className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-sm-3 me-0 mb-sm-0 mb-3 fw-bold color-secondary fs-14-ss"
                  onClick={() => downloadAnalisisNilai()}
                >
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
                  <th>Rata Rata</th>
                  <th>Dibawah KKM</th>
                  {tugasData?.map((tugas, idx) => (
                    <th>Tugas {idx + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {analisisNilai?.map((analisis, idx) => {
                  if (analisis?.tugas?.length > tugasNumber) {
                    setTugasNumber(analisis?.tugas?.length);
                  }
                  const dibawahKKM =
                    analisis?.tugas.filter(
                      (tugas) =>
                        tugas.nilai < jadwalMengajar?.mataPelajaran?.kkm
                    )?.length || 0;

                  return (
                    <tr>
                      <td>{idx + 1}</td>
                      <td>{analisis?.nama}</td>
                      <td>
                        {(
                          parseInt(
                            analisis?.tugas?.reduce(
                              (a, b) => a + b.nilai || 0,
                              0
                            )
                          ) / analisis?.tugas?.length
                        ).toFixed(2) || 0}
                      </td>
                      <td>{dibawahKKM || 0} Tugas</td>
                      {analisis?.tugas?.map((tugasData) => (
                        <td>{tugasData?.nilai || 0}</td>
                      ))}
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

export default AnalisisNilaiPengetahuan;
