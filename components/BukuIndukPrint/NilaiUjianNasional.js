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

const NilaiUjianNasional = ({ isReadOnly = false }) => {
  return (
    <>
      <h6 className="fs-14-ss fw-bold text-uppercase mb-4 ms-4">
        I. Ujian Nasional
      </h6>
      <table className="w-100 table">
        <thead>
          <tr>
            <th
              className="text-center fw-bold fs-12-ss"
              style={{ width: "5%", paddingTop: "19px", paddingBottom: "19px" }}
            >
              No
            </th>
            <th
              className="fw-bold fs-12-ss"
              style={{
                paddingTop: "19px",
                paddingBottom: "19px",
              }}
            >
              Mata Pelajaran
            </th>
            <th
              className="fw-bold fs-12-ss text-center"
              style={{
                width: "10%",
                paddingTop: "19px",
                paddingBottom: "19px",
              }}
            >
              Nilai
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="align-text-top fs-12-ss text-center">1</td>
            <td className="align-text-top fs-12-ss">Bahasa Indonesia</td>
            <td className="align-text-top fs-12-ss text-center">85</td>
          </tr>
          <tr>
            <td className="align-text-top fs-12-ss text-center">2</td>
            <td className="align-text-top fs-12-ss">Bahasa Inggris</td>
            <td className="align-text-top fs-12-ss text-center">85</td>
          </tr>
          <tr>
            <td className="align-text-top fs-12-ss text-center">3</td>
            <td className="align-text-top fs-12-ss">Matamatika</td>
            <td className="align-text-top fs-12-ss text-center">85</td>
          </tr>
          <tr>
            <td className="align-text-top fs-12-ss text-center">4</td>
            <td className="align-text-top fs-12-ss">
              Kompetensi Kejuruan / Keahlian
            </td>
            <td className="align-text-top fs-12-ss text-center">85</td>
          </tr>
          <tr>
            <td className="align-text-top fs-12-ss text-center border-end-0"></td>
            <td className="align-text-top fs-12-ss border-start-0">
              Rata - rata
            </td>
            <td className="align-text-top fs-12-ss text-center">85</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default NilaiUjianNasional;
