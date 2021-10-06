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
      <h6 className="fs-14-ss fw-bold text-uppercase mb-4 ms-4">
        B. Pengetahuan dan Keterampilan
      </h6>
      <table className="w-100 table">
        <thead>
          <tr>
            <th
              className="text-center align-middle fw-bold fs-12-ss"
              style={{ width: "5%" }}
              rowSpan="2"
            >
              No
            </th>
            <th
              className="fw-bold fs-12-ss align-middle"
              style={{ width: "30%" }}
              rowSpan="2"
            >
              Mata Pelajaran
            </th>
            <th
              className="fw-bold fs-12-ss py-1 text-center"
              style={{ width: "30%" }}
              colSpan="3"
            >
              Pengetahuan
            </th>
            <th
              className="fw-bold fs-12-ss py-1 text-center"
              style={{ width: "30%" }}
              colSpan="3"
            >
              Keterampilan
            </th>
          </tr>
          <tr>
            <th
              className="fw-bold fs-12-ss py-1 text-center"
              style={{ width: "8%" }}
            >
              KKM
            </th>
            <th
              className="fw-bold fs-12-ss py-1 text-center"
              style={{ width: "8%" }}
            >
              Nilai
            </th>
            <th
              className="fw-bold fs-12-ss py-1 text-center"
              style={{ width: "8%" }}
            >
              Predikat
            </th>
            <th
              className="fw-bold fs-12-ss py-1 text-center"
              style={{ width: "8%" }}
            >
              KKM
            </th>
            <th
              className="fw-bold fs-12-ss py-1 text-center"
              style={{ width: "8%" }}
            >
              Nilai
            </th>
            <th
              className="fw-bold fs-12-ss py-1 text-center"
              style={{ width: "8%" }}
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
                  className="align-text-top fs-12-ss fw-bold py-1"
                  colSpan="8"
                >
                  {!d?.nama ? `-` : `${d?.nama}`}
                </td>
              </tr>
              {d?.mapelRapor?.map((data, idx) => {
                return (
                  <tr>
                    <td className="align-text-top fs-12-ss text-center">
                      {idx + 1}
                    </td>
                    <td className="align-text-top fs-12-ss">
                      {!data?.nama ? `-` : `${data?.nama}`}
                    </td>
                    <td className="align-text-top fs-12-ss text-center text-uppercase">
                      {!data?.mataPelajaran?.kkm
                        ? `-`
                        : `${data?.mataPelajaran?.kkm}`}
                    </td>
                    <td className="align-text-top fs-12-ss text-center text-uppercase">
                      {!data?.mataPelajaran?.nilaiIndividu?.nilai
                        ? `-`
                        : `${data?.mataPelajaran?.nilaiIndividu?.nilai}`}
                    </td>
                    <td className="align-text-top fs-12-ss text-center text-uppercase">
                      {!data?.mataPelajaran?.nilaiIndividu?.nilai || !predikat
                        ? `-`
                        : `
                     ${checkPredikatPengetahuan(
                       data?.mataPelajaran?.nilaiIndividu?.nilai,
                       predikat
                     )}`}
                    </td>
                    <td className="align-text-top fs-12-ss text-center text-uppercase">
                      {!data?.kkm2 ? `-` : `${data?.kkm2}`}
                    </td>
                    <td className="align-text-top fs-12-ss text-center text-uppercase">
                      {!data?.mataPelajaran?.nilaiIndividu?.nilaiKeterampilan
                        ? `-`
                        : `${data?.mataPelajaran?.nilaiIndividu?.nilaiKeterampilan}`}
                    </td>
                    <td className="align-text-top fs-12-ss text-center text-uppercase">
                      {!data?.mataPelajaran?.nilaiIndividu?.nilaiKeterampilan ||
                      !predikat
                        ? `-`
                        : `
                     ${checkPredikatKeterampilan(
                       data?.mataPelajaran?.nilaiIndividu?.nilaiKeterampilan,
                       predikat
                     )}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          );
        })}
      </table>
    </>
  );
};

export default SectionPengetahuanDanKeterampilan;
