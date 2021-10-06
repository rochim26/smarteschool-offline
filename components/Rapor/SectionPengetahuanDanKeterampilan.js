import { FaPen } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";
import ModalEditBio from "../Profil/ModalEditBio";
import { postProfilUser } from "../../client/AuthClient";
import useUser from "../../hooks/useUser";
import { useState } from "react";
import { toast } from "react-toastify";
import { hideModal } from "../../utilities/ModalUtils";
import {
  checkPredikatKeterampilan,
  checkPredikatPengetahuan,
} from "../../utilities/RaporUtils";

const SectionPengetahuanDanKeterampilan = ({
  isReadOnly = false,
  muatan,
  predikat,
}) => {
  return (
    <>
      <div className="card card-ss p-0 pb-4">
        <div className="p-4">
          <h4 className="fw-extrabold color-dark mb-0">
            B. Pengetahuan dan Keterampilan
          </h4>
        </div>
        <table className="table-ss">
          <thead>
            <tr>
              <th
                style={{ width: "5%" }}
                rowSpan="2"
                className="border border-white border-3 border-start-0 border-top-0 border-end-0"
              >
                No
              </th>
              <th
                style={{ width: "35%" }}
                rowSpan="2"
                className="border border-white border-3 border-start-0 border-top-0 border-end-0"
              >
                Nama
              </th>
              <th
                style={{ width: "30%", height: "40px" }}
                colSpan="3"
                className="text-center border border-white border-3 p-2"
              >
                Pengetahuan
              </th>
              <th
                style={{ width: "30%", height: "40px" }}
                colSpan="3"
                className="text-center border border-white border-3 p-2 border-end-0"
              >
                Keterampilan
              </th>
            </tr>
            <tr>
              <th
                className="text-center border border-white border-3 border-end-0 p-2"
                style={{ height: "40px" }}
              >
                KKM
              </th>
              <th
                className="text-center border border-white border-3 border-start-0 border-top-0 border-end-0 p-2"
                style={{ height: "40px" }}
              >
                Nilai
              </th>
              <th
                className="text-center border border-white border-3 border-start-0 p-2"
                style={{ height: "40px" }}
              >
                Predikat
              </th>
              <th
                className="text-center border border-white border-3  border-end-0 p-2"
                style={{ height: "40px" }}
              >
                KKM
              </th>
              <th
                className="text-center border border-white border-3 border-start-0 border-top-0 border-end-0 p-2"
                style={{ height: "40px" }}
              >
                Nilai
              </th>
              <th
                className="text-center border border-white border-3 p-2 border-start-0 border-end-0"
                style={{ height: "40px" }}
              >
                Predikat
              </th>
            </tr>
          </thead>
          {muatan?.map((d, idx) => {
            return (
              <tbody>
                <tr>
                  <td
                    colSpan="8"
                    className="bg-very-soft-secondary py-2 fs-18-ss fw-bold color-dark"
                  >
                    {!d?.nama ? `-` : `${d?.nama}`}
                  </td>
                </tr>
                {d?.mapelRapor?.map((data, idx) => {
                  return (
                    <tr>
                      <td data-th="No">{idx + 1}</td>
                      <td data-th="Kompetensi Inti">
                        <span className="fw-semibold">
                          {!data?.nama ? `-` : `${data?.nama}`}
                        </span>
                      </td>
                      <td data-th="KKM" className="text-md-center text-start">
                        <span className="fw-semibold color-dark">
                          {!data?.mataPelajaran?.kkm
                            ? `-`
                            : `${data?.mataPelajaran?.kkm}`}
                        </span>
                      </td>
                      <td data-th="Nilai" className="text-md-center text-start">
                        <span className="fw-semibold color-dark">
                          {!data?.mataPelajaran?.nilaiIndividu?.nilai
                            ? `-`
                            : `${data?.mataPelajaran?.nilaiIndividu?.nilai}`}
                        </span>
                      </td>
                      <td
                        data-th="Predikat"
                        className="text-md-center text-start"
                      >
                        <span className="fw-semibold color-dark text-uppercase">
                          {!data?.mataPelajaran?.nilaiIndividu?.nilai ||
                          !predikat
                            ? `-`
                            : `
                     ${checkPredikatPengetahuan(
                       data?.mataPelajaran?.nilaiIndividu?.nilai,
                       predikat
                     )}`}
                        </span>
                      </td>
                      <td data-th="KKM" className="text-md-center text-start">
                        <span className="fw-semibold color-dark">
                          {!data?.kkm2 ? `-` : `${data?.kkm2}`}
                        </span>
                      </td>
                      <td data-th="Nilai" className="text-md-center text-start">
                        <span className="fw-semibold color-dark">
                          {!data?.mataPelajaran?.nilaiIndividu
                            ?.nilaiKeterampilan
                            ? `-`
                            : `${data?.mataPelajaran?.nilaiIndividu?.nilaiKeterampilan}`}
                        </span>
                      </td>
                      <td
                        data-th="Predikat"
                        className="text-md-center text-start"
                      >
                        <span className="fw-semibold color-dark text-uppercase">
                          {!data?.mataPelajaran?.nilaiIndividu
                            ?.nilaiKeterampilan || !predikat
                            ? `-`
                            : `
                     ${checkPredikatKeterampilan(
                       data?.mataPelajaran?.nilaiIndividu?.nilaiKeterampilan,
                       predikat
                     )}`}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default SectionPengetahuanDanKeterampilan;
