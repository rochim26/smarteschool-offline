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
import NilaiUjianNasional from "./NilaiUjianNasional";
import NilaiUjianSekolah from "./NilaiUjianSekolah";

const SectionDaftarNilai = ({ isBukuInduk }) => {
  return (
    <>
      <div className="pt-4">
        <div className="row text-center mb-4">
          <div className="col-md-12">
            <h6 className="fs-14-ss fw-bold text-uppercase mb-0">
              Daftar Nilai
            </h6>
          </div>
        </div>
        {/* <div className="mb-4">
          <NilaiUjianNasional />
        </div> */}
        <NilaiUjianSekolah />
      </div>
    </>
  );
};

export default SectionDaftarNilai;
