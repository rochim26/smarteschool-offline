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

const SectionKetidakhadiran = ({
  isReadOnly = false,
  totalAlpa,
  totalIzin,
  totalSakit,
}) => {
  return (
    <>
      <h6 className="fs-14-ss fw-bold text-uppercase mb-4 ms-4 pt-4">
        F. Ketidakhadiran
      </h6>
      <table className="w-100 table">
        <tbody>
          <tr>
            <td
              className="align-text-top fs-12-ss text-center"
              style={{ width: "5%", paddingTop: "19px", paddingBottom: "19px" }}
            >
              1
            </td>
            <td
              className="align-text-top fs-12-ss"
              style={{
                width: "30%",
              }}
            >
              Sakit
            </td>
            <td
              className="align-text-top fs-12-ss"
              style={{
                width: "65%",
              }}
            >
              {totalSakit?.[0]?.total} hari
            </td>
          </tr>
          <tr>
            <td
              className="align-text-top fs-12-ss text-center"
              style={{ width: "5%", paddingTop: "19px", paddingBottom: "19px" }}
            >
              2
            </td>
            <td
              className="align-text-top fs-12-ss"
              style={{
                width: "30%",
              }}
            >
              Ijin
            </td>
            <td
              className="align-text-top fs-12-ss"
              style={{
                width: "65%",
              }}
            >
              {totalIzin?.[0]?.total} hari
            </td>
          </tr>
          <tr>
            <td
              className="align-text-top fs-12-ss text-center"
              style={{ width: "5%", paddingTop: "19px", paddingBottom: "19px" }}
            >
              3
            </td>
            <td
              className="align-text-top fs-12-ss"
              style={{
                width: "30%",
              }}
            >
              Tanpa Keterangan
            </td>
            <td
              className="align-text-top fs-12-ss"
              style={{
                width: "65%",
              }}
            >
              {totalAlpa} hari
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default SectionKetidakhadiran;
