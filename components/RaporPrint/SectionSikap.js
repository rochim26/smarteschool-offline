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
import { checkKeteranganSikap } from "../../utilities/RaporUtils";

const SectionSikap = ({
  isReadOnly = false,
  sikap,
  siswa,
  sikapsosial,
  sikapspiritual,
}) => {
  return (
    <>
      <h6 className="fs-14-ss fw-bold text-uppercase mb-4 ms-4">A. Sikap</h6>
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
                width: "30%",
                paddingTop: "19px",
                paddingBottom: "19px",
              }}
            >
              Kompetensi Inti
            </th>
            <th
              className="fw-bold fs-12-ss"
              style={{
                width: "52%",
                paddingTop: "19px",
                paddingBottom: "19px",
              }}
            >
              Deskripsi
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="align-text-top fs-12-ss text-center">1</td>
            <td className="align-text-top fs-12-ss">Sikap Spiritual</td>
            <td className="align-text-top fs-12-ss">
              {!sikap?.mSikapSpiritualDitunjukkanId
                ? `-`
                : `${siswa} 
                        ${checkKeteranganSikap(
                          sikap?.mSikapSpiritualDitunjukkanId,
                          sikapspiritual
                        )}`}
            </td>
          </tr>
          <tr>
            <td className="align-text-top fs-12-ss text-center">2</td>
            <td className="align-text-top fs-12-ss">Sikap Sosial</td>
            <td className="align-text-top fs-12-ss">
              {!sikap?.mSikapSosialDitunjukkanId
                ? `-`
                : `${siswa} 
                        ${checkKeteranganSikap(
                          sikap?.mSikapSosialDitunjukkanId,
                          sikapsosial
                        )}`}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default SectionSikap;
