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

const SectionCover = ({ isReadOnly = false, sekolah, siswa }) => {
  return (
    <>
      <div className="card card-ss" style={{ minHeight: "1537px" }}>
        <div className="card-body p-4 pb-5 text-center">
          <div style={{ marginTop: "150px" }}>
            <h2 className="color-dark fw-black mb-2 text-uppercase">
              RAPOR PESERTA DIDIK
            </h2>
            <h2 className="color-dark fw-black mb-2 text-uppercase">
              {!sekolah?.tingkatFormat ? `-` : `${sekolah?.tingkatFormat}`}
            </h2>
            <h2 className="color-dark fw-black mb-0 text-uppercase">
              {!sekolah?.nama ? `-` : `${sekolah?.nama}`}
            </h2>
          </div>
          <div style={{ margin: "150px 0" }}>
            <img src="/img/logo-tutwurihadayani-rapor.png" alt="" />
          </div>
          <div style={{ marginBottom: "150px" }}>
            <div className="row text-center justify-content-center">
              <div className="col-md-6">
                <div className="mb-5">
                  <h5 className="color-dark fs-18-ss fw-bold mb-2">
                    Nama Peserta Didik :
                  </h5>
                  <div
                    className="w-100 border border-dark border-3 p-3 text-center fs-18-ss fw-black color-dark"
                    style={{ borderColor: "##3A4166" }}
                  >
                    {!siswa?.nama ? `-` : `${siswa?.nama}`}
                  </div>
                </div>
                <h5 className="color-dark fs-18-ss fw-bold mb-2">N I S N :</h5>
                <div
                  className="w-100 border border-dark border-3 p-3 text-center fs-18-ss fw-black color-dark"
                  style={{ borderColor: "##3A4166" }}
                >
                  {!siswa?.profil?.nisn ? `-` : `${siswa?.profil?.nisn}`}
                </div>
              </div>
            </div>
          </div>
          <h2 className="color-dark fw-black mb-2 text-uppercase">
            KEMENTERIAN PENDIDIKAN DAN KEBUDAYAAN
          </h2>
          <h2 className="color-dark fw-black mb-0 text-uppercase">
            REPUBLIK INDONESIA
          </h2>
        </div>
      </div>
    </>
  );
};

export default SectionCover;
