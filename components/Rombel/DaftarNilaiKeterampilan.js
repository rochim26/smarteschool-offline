import Link from "next/link";
import React from "react";
import { FaClone, FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { ssURL } from "../../client/clientAxios";
import useUser from "../../hooks/useUser";
import {
  checkLabelStatusTuntas,
  checkStatusTuntas,
} from "../../utilities/RaporUtils";

const DaftarNilaiKeterampilan = ({ keterangan, rombel_id, kkm, mapelId }) => {
  const { user } = useUser();

  return (
    <>
      <div className="card card-ss">
        <div className="card-header p-4 card-header-ss">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="fw-extrabold color-dark mb-sm-0 mb-3">
              Daftar Nilai Keterampilan Siswa
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
                  <th>KKM</th>
                  <th>Nilai</th>
                  <th className="text-md-center text-start">Status</th>
                  <th className="text-md-center text-start">Rekap</th>
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
                      <td data-th="KKM">
                        <span className="color-dark fw-semibold">{kkm}</span>
                      </td>
                      <td data-th="Nilai">
                        <span className="color-dark fw-semibold">
                          {!d?.user?.nilaiUjian?.nilaiKeterampilan
                            ? `-`
                            : `${d?.user?.nilaiUjian?.nilaiKeterampilan}`}
                        </span>
                      </td>
                      <td
                        data-th="Status"
                        className="text-md-center text-start"
                      >
                        <span
                          className={checkLabelStatusTuntas(
                            d?.user?.nilaiUjian?.nilaiKeterampilan,
                            kkm
                          )}
                        >
                          {checkStatusTuntas(
                            d?.user?.nilaiUjian?.nilaiKeterampilan,
                            kkm
                          )}
                        </span>
                      </td>
                      <td className="text-md-center text-start">
                        <Link
                          href={`${ssURL}/rapor-nilai/${d?.user?.id}?mapelId=${mapelId}&jadwalId=${rombel_id}&nilai=keterampilan`}
                        >
                          <a className="bg-primary rounded-pill text-white justify-content-center align-items-center fw-semibold px-4 py-1 fs-14-ss shadow-primary-ss hover-shadow-none">
                            Lihat
                          </a>
                        </Link>
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

export default DaftarNilaiKeterampilan;
