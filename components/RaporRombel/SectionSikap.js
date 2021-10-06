import React from "react";
import { getDeskripsiSikapSosial } from "../../utilities/RaporUtils";

const SectionSikap = ({ muatan, sikapsosial, sikapspiritual }) => {
  const predikat = [];
  const finished = [];
  muatan?.map((item) => {
    item?.mapelRapor?.map((mapel, idx) => {
      if (mapel?.mataPelajaran?.sikapSiswa?.predikat?.predikat) {
        predikat.push(mapel?.mataPelajaran?.sikapSiswa?.predikat?.predikat);
      } else {
        finished.push(1);
      }
    });
  });
  const tuntas = !predikat.some((item) => ["C", "D"].includes(item));
  return (
    <>
      <div className="card card-ss p-0 pb-4">
        <div className="d-flex flex-column flex-md-row p-4">
          <h4 className="fw-extrabold color-dark mb-3 mb-md-0">
            Daftar Nilai Sikap{" "}
          </h4>
          <div>
            <span
              className={`label-ss bg-soft-${
                finished.length == 0
                  ? tuntas
                    ? "success"
                    : "danger"
                  : "warning"
              } rounded-pill color-${
                finished.length == 0
                  ? tuntas
                    ? "success"
                    : "danger"
                  : "warning"
              } fs-12-ss fw-semibold py-1 px-3 ms-0 ms-md-4`}
            >
              {finished.length == 0
                ? tuntas
                  ? "Sudah tuntas"
                  : "Belum Tuntas"
                : "Sedang Dikerjakan"}
            </span>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table-ss">
            <thead className="border-bottom border-3 border-end-0 border-top-0 border-start-0 border-white">
              <tr>
                <th>No</th>
                <th>Mata Pelajaran</th>
                <th>Predikat</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            {muatan?.map((item) => (
              <>
                <tr>
                  <td
                    colSpan="5"
                    className="bg-very-soft-secondary py-2 fs-18-ss fw-bold color-dark"
                  >
                    {item?.nama}
                  </td>
                </tr>
                <tbody>
                  {item?.mapelRapor?.map((mapel, idx) => {
                    return (
                      <tr>
                        <td>{idx + 1}</td>
                        <td>{mapel?.nama}</td>
                        <td
                          className={`fw-extrabold color-${
                            !["C", "D"].includes(
                              mapel?.mataPelajaran?.sikapSiswa?.predikat
                                ?.predikat
                            )
                              ? "dark"
                              : "danger"
                          }`}
                        >
                          {mapel?.mataPelajaran?.sikapSiswa?.predikat
                            ?.predikat || "-"}
                        </td>
                        <td className="fw-extrabold">
                          {getDeskripsiSikapSosial(
                            mapel?.mataPelajaran?.sikapSiswa,
                            mapel?.mataPelajaran?.templateDeskripsi,
                            sikapsosial
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default SectionSikap;
