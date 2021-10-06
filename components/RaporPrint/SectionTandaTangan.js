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
import { momentPackage } from "../../utilities/HelperUtils";

const SectionTandaTangan = ({ isReadOnly = false, walikelas, ta }) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center px-4 mb-4">
        <div className="text-center">
          <h6 className="fs-12-ss mb-2">Mengetahui</h6>
          <h6 className="fs-12-ss" style={{ marginBottom: "85px" }}>
            Orang Tua / Wali
          </h6>
          <div
            className="w-100 mb-1"
            style={{
              height: "1px",
              borderTop: "1.35px dashed #000000",
            }}
          ></div>
        </div>
        <div className="text-center">
          <h6 className="fs-12-ss mb-2">
            {momentPackage().format("dddd, DD MMMM YYYY")}
          </h6>
          <h6 className="fs-12-ss" style={{ marginBottom: "85px" }}>
            Wali Kelas
          </h6>
          <div
            className="w-100 mb-1"
            style={{
              height: "1px",
              borderTop: "1.35px dashed #000000",
            }}
          ></div>
          <h6 className="fs-12-ss text-uppercase mb-0">
            NIP.
            {!walikelas?.user?.nip ? `-` : `${walikelas?.user?.nip}`}
          </h6>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center px-4">
        <div className="text-center">
          <h6 className="fs-12-ss mb-2">Mengetahui</h6>
          <h6 className="fs-12-ss" style={{ marginBottom: "85px" }}>
            Kepala Sekolah
          </h6>
          <div
            className="w-100 mb-1"
            style={{
              height: "1px",
              borderTop: "1.35px dashed #000000",
            }}
          ></div>
          <h6 className="fs-12-ss text-uppercase mb-0">
            NIP.
            {!ta?.nipKepsek ? `-` : `${ta?.nipKepsek}`}
          </h6>
        </div>
      </div>
    </>
  );
};

export default SectionTandaTangan;
