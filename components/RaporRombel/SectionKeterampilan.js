import React from "react";
import { getStyleTableRow } from "../../utilities/RaporUtils";

const SectionKeterampilan = ({ muatan, detailNilaiMapel }) => {
  const dibawahKKM = [];
  const finished = [];
  muatan?.map((item) => {
    item?.mapelRapor?.map((mapel, idx) => {
      if (
        mapel?.mataPelajaran?.nilaiIndividu?.nilaiKeterampilan != null &&
        mapel?.mataPelajaran?.nilaiIndividu?.nilaiKeterampilan < mapel?.kkm2
      ) {
        dibawahKKM.push(1);
      } else if (!mapel?.mataPelajaran?.nilaiIndividu?.nilaiKeterampilan) {
        finished.push(1);
      }
    });
  });
  return (
    <>
      <div className="card card-ss p-0 pb-4 ">
        <div className="d-flex flex-column flex-md-row p-4">
          <h4 className="fw-extrabold color-dark mb-3 mb-md-0">
            Daftar Nilai Keterampilan{" "}
          </h4>
          <div>
            <span
              className={`label-ss ${
                finished.length == 0
                  ? dibawahKKM.length == 0
                    ? "bg-soft-success color-success"
                    : "bg-soft-danger color-danger"
                  : "bg-soft-warning color-warning"
              } rounded-pill fs-12-ss fw-semibold py-1 px-3 ms-0 ms-md-4`}
            >
              {finished.length == 0
                ? dibawahKKM.length == 0
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
                <th className="w-50">Mata Pelajaran</th>
                <th>KKM</th>
                <th>Nilai</th>
                <th>Detail</th>
              </tr>
            </thead>
            {muatan?.map((item, idx) => {
              return (
                <tbody>
                  <tr>
                    <td
                      colSpan="5"
                      className="bg-very-soft-secondary py-2 fs-18-ss fw-bold color-dark"
                    >
                      {!item?.nama ? `-` : `${item?.nama}`}
                    </td>
                  </tr>
                  {item?.mapelRapor?.map((mapel, idx) => {
                    return (
                      <tr
                        style={getStyleTableRow(
                          mapel?.mataPelajaran?.nilaiIndividu
                            ?.nilaiKeterampilan,
                          mapel?.kkm2
                        )}
                      >
                        <td data-th="No"> {idx + 1}</td>
                        <td data-th="Mata Pelajaran">{mapel?.nama}</td>
                        <td className="fw-extrabold" data-th="KKM">
                          {mapel?.kkm2}
                        </td>
                        <td className="fw-extrabold" data-th="Nilai">
                          {mapel?.mataPelajaran?.nilaiIndividu
                            ?.nilaiKeterampilan != null
                            ? mapel?.mataPelajaran?.nilaiIndividu
                                ?.nilaiKeterampilan
                            : "-"}
                        </td>
                        <td data-th="Detail">
                          <a
                            className="bg-primary rounded-pill text-white justify-content-center align-items-center fw-semibold px-4 py-1"
                            data-bs-toggle="modal"
                            data-bs-target="#modalDetailNilaiSiswa"
                            onClick={() => {
                              detailNilaiMapel(mapel?.mataPelajaran?.id);
                            }}
                          >
                            Lihat
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default SectionKeterampilan;
