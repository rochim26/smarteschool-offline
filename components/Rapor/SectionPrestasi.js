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

const SectionPrestasi = ({ isReadOnly = false, prestasi }) => {
  return (
    <>
      <div className="card card-ss p-0 pb-4">
        <div className="p-4">
          <h4 className="fw-extrabold color-dark mb-0">D. Prestasi</h4>
        </div>
        <div className="table-responsive">
          <table className="table-ss">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>No</th>
                <th style={{ width: "30%" }}>Nama Prestasi</th>
                <th>Tingkat Prestasi</th>
              </tr>
            </thead>
            <tbody>
              {!prestasi?.length && (
                <td colSpan="3">
                  <div className="text-center">
                    <img src="/img/empty-state-data.svg" alt="" width="200" />
                    <h6 className="color-dark fw-bold mt-3">Tidak ada data</h6>
                  </div>
                </td>
              )}
              {prestasi?.map((d, idx) => {
                return (
                  <tr key={idx}>
                    <td data-th="No">{idx + 1}</td>
                    <td data-th="Nama Prestasi">
                      <span className="fw-semibold">
                        {!d?.nama ? `-` : `${d?.nama}`}
                      </span>
                    </td>
                    <td data-th="Tingkat Prestasi">
                      <p className="fw-semibold mb-0">
                        {!d?.tingkatPrestasi?.tingkat
                          ? `-`
                          : `${d?.tingkatPrestasi?.tingkat}`}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SectionPrestasi;
