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

const SectionPraktikKerjaLapangan = ({ isReadOnly = false, keteranganPkl }) => {
  return (
    <>
      <h6 className="fs-14-ss fw-bold text-uppercase mb-4 ms-4">
        C. Pratik Kerja Lapangan
      </h6>
      <table className="w-100 table">
        <thead>
          <tr>
            <th
              className="text-center fw-bold fs-12-ss"
              style={{ width: "6%", paddingTop: "19px", paddingBottom: "19px" }}
            >
              No
            </th>
            <th
              className="fw-bold fs-12-ss"
              style={{
                width: "20%",
                paddingTop: "19px",
                paddingBottom: "19px",
              }}
            >
              Mitra DU / DI
            </th>
            <th
              className="fw-bold fs-12-ss"
              style={{
                width: "30%",
                paddingTop: "19px",
                paddingBottom: "19px",
              }}
            >
              Lokasi
            </th>
            <th
              className="fw-bold fs-12-ss text-center"
              style={{
                width: "14%",
                paddingTop: "19px",
                paddingBottom: "19px",
              }}
            >
              Lamanya
            </th>
            <th
              className="fw-bold fs-12-ss"
              style={{
                width: "30%",
                paddingTop: "19px",
                paddingBottom: "19px",
              }}
            >
              Keterangan
            </th>
          </tr>
        </thead>
        <tbody>
          {!keteranganPkl?.length && (
            <tr>
              <td className="align-text-top fs-12-ss text-center">-</td>
              <td className="align-text-top fs-12-ss">-</td>
              <td className="align-text-top fs-12-ss">-</td>
              <td className="align-text-top fs-12-ss">-</td>
              <td className="align-text-top fs-12-ss">-</td>
            </tr>
          )}
          {keteranganPkl?.map((d, idx) => {
            return (
              <tr>
                <td className="align-text-top fs-12-ss text-center">
                  {idx + 1}
                </td>
                <td className="align-text-top fs-12-ss">
                  {!d?.namamitra ? `-` : `${d?.namamitra}`}
                </td>
                <td className="align-text-top fs-12-ss">
                  {!d?.alamat ? `-` : `${d?.alamat}`}
                </td>
                <td className="align-text-top fs-12-ss text-center">
                  {!d?.lamanya ? `-` : `${d?.lamanya} `} Bulan
                </td>
                <td className="align-text-top fs-12-ss">
                  {!d?.keterangan ? `-` : `${d?.keterangan}`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SectionPraktikKerjaLapangan;
