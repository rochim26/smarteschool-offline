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
      <div className="card card-ss p-0 pb-4">
        <div className="p-4">
          <h4 className="fw-extrabold color-dark mb-0">A. Sikap</h4>
        </div>
        <div className="table-responsive">
          <table className="table-ss">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>No</th>
                <th style={{ width: "30%" }}>Kompetensi Inti</th>
                <th>Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-th="No">1</td>
                <td data-th="Kompetensi Inti">
                  <span className="fw-semibold">Sikap Spiritual</span>
                </td>
                <td data-th="Deskripsi">
                  <p className="fw-semibold mb-0">
                    {!sikap?.mSikapSpiritualDitunjukkanId
                      ? `-`
                      : `${siswa} 
                        ${checkKeteranganSikap(
                          sikap?.mSikapSpiritualDitunjukkanId,
                          sikapspiritual
                        )}`}
                  </p>
                </td>
              </tr>
              <tr>
                <td data-th="No">2</td>
                <td data-th="Kompetensi Inti">
                  <span className="fw-semibold">Sikap Sosial</span>
                </td>
                <td data-th="Deskripsi">
                  <p className="fw-semibold mb-0">
                    {!sikap?.mSikapSosialDitunjukkanId
                      ? `-`
                      : `${siswa} 
                        ${checkKeteranganSikap(
                          sikap?.mSikapSosialDitunjukkanId,
                          sikapsosial
                        )}`}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SectionSikap;
