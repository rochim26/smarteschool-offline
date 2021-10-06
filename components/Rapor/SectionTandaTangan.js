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
      <div className="card card-ss p-4">
        <div className="d-flex flex-sm-row flex-column align-items-sm-start align-items-center justify-content-sm-around justify-content-center mb-4">
          <div className="text-center">
            <h5 className="fw-semibold mb-2">Mengetahui</h5>
            <h5 className="fw-semibold" style={{ marginBottom: "85px" }}>
              Orang Tua / Wali
            </h5>
            <div
              className="w-100"
              style={{
                height: "1px",
                backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%2380849CFF' stroke-width='5' stroke-dasharray='3%2c 5' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
              }}
            ></div>
          </div>
          <div className="text-center">
            <h5 className="fw-semibold mb-2">
              {momentPackage().format("dddd, DD MMMM YYYY")}
            </h5>
            <h5 className="fw-semibold" style={{ marginBottom: "85px" }}>
              Wali Kelas
            </h5>
            <div
              className="w-100 mb-2"
              style={{
                height: "1px",
                backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%2380849CFF' stroke-width='5' stroke-dasharray='3%2c 5' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
              }}
            ></div>
            <h5 className="fw-semibold text-uppercase mb-0">
              NIP. {!walikelas?.user?.nip ? `-` : `${walikelas?.user?.nip}`}
            </h5>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h5 className="fw-semibold mb-2">Mengetahui,</h5>
            <h5 className="fw-semibold" style={{ marginBottom: "85px" }}>
              Kepala Sekolah
            </h5>
            <div
              className="w-100 mb-2"
              style={{
                height: "1px",
                backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%2380849CFF' stroke-width='5' stroke-dasharray='3%2c 5' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
              }}
            ></div>
            <h5 className="fw-semibold text-uppercase mb-0">
              NIP. {!ta?.nipKepsek ? `-` : `${ta?.nipKepsek}`}
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionTandaTangan;
