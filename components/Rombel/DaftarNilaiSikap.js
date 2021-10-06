import Link from "next/link";
import React from "react";
import { FaClone, FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { ssURL } from "../../client/clientAxios";
import useUser from "../../hooks/useUser";
import { checkKeteranganSikap } from "../../utilities/RaporUtils";

const DaftarNilaiSikap = ({ keterangan, sikapsosial, sikapspiritual }) => {
  const { user } = useUser();
  return (
    <>
      <div className="card card-ss">
        <div className="card-header p-4 card-header-ss">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="fw-extrabold color-dark mb-sm-0 mb-3">
              Daftar Nilai Sikap Siswa
            </h4>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table-ss">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Predikat</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              {keterangan?.map((d, idx) => {
                return (
                  <tbody>
                    <tr>
                      <td data-th="No">{idx + 1}</td>
                      <td data-th="Nama">
                        <span className="fw-semibold">{d?.user?.nama}</span>
                      </td>
                      <td data-th="Nama">
                        <span className="fw-semibold">
                          {d?.user?.rekapSikap?.predikat?.predikat || "-"}
                        </span>
                      </td>
                      <td data-th="Keterangan">
                        <p className="fw-semibold mb-0">
                          {!d?.user?.rekapSikap?.mSikapDitunjukkanId ||
                          !d?.user?.rekapSikap?.mSikapDitingkatkanId
                            ? `-`
                            : `
                          Peserta didik telah menunjukkan sikap
                          ${checkKeteranganSikap(
                            d?.user?.rekapSikap?.mSikapDitunjukkanId,
                            sikapsosial
                          )}. Namun sikap ${checkKeteranganSikap(
                                d?.user?.rekapSikap?.mSikapDitingkatkanId,
                                sikapsosial
                              )} masih perlu ditingkatkan`}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DaftarNilaiSikap;
