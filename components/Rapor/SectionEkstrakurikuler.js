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

const SectionEkstrakurikuler = ({ isReadOnly = false, ekskul }) => {
  return (
    <>
      <div className="card card-ss p-0 pb-4">
        <div className="p-4">
          <h4 className="fw-extrabold color-dark mb-0">C. Ekstrakurikuler</h4>
        </div>
        <div className="table-responsive">
          <table className="table-ss">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>No</th>
                <th style={{ width: "30%" }}>Kegiatan Ekstrakurikuler</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {!ekskul?.length && (
                <td colSpan="3">
                  <div className="text-center">
                    <img src="/img/empty-state-data.svg" alt="" width="200" />
                    <h6 className="color-dark fw-bold mt-3">Tidak ada data</h6>
                  </div>
                </td>
              )}
              {ekskul?.map((d, idx) => {
                return (
                  <tr key={idx}>
                    <td data-th="No">{idx + 1}</td>
                    <td data-th="Kegiatan Ekstrakurikuler">
                      <span className="fw-semibold">
                        {!d?.rombel?.nama ? `-` : `${d?.rombel?.nama}`}
                      </span>
                    </td>
                    <td data-th="Keterangan">
                      <p className="fw-semibold mb-0">
                        {!d?.keterangan ? `-` : `${d?.keterangan}`}
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

export default SectionEkstrakurikuler;
