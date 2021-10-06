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

const SectionCatatanWaliKelas = ({ isReadOnly = false, catatan }) => {
  return (
    <>
      <h6 className="fs-14-ss fw-bold text-uppercase mb-4 ms-4">
        G. Catatan Wali Kelas
      </h6>
      <div
        className="border border-dark border-2 p-4"
        style={{ borderColor: "#000000" }}
      >
        <p className="mb-0 fs-12-ss">
          {!catatan?.catatan ? `-` : `${catatan?.catatan}`}
        </p>
      </div>
    </>
  );
};

export default SectionCatatanWaliKelas;
