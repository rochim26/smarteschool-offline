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

const SectionInformasiSiswa = ({
  isReadOnly = false,
  sekolah,
  siswa,
  ta,
  kelas,
}) => {
  return (
    <>
      <div className="card card-ss">
        <div className="p-4">
          <div className="row d-md-flex d-none">
            <div className="col-md-6">
              <table className="w-100">
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      Nama Sekolah
                    </div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      :
                    </div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-18-ss fw-semibold color-dark mb-3 text-uppercase">
                      {!sekolah?.nama ? `-` : `${sekolah?.nama}`}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div className="col-md-6">
              <table className="w-100">
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      Kelas
                    </div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      :
                    </div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-18-ss fw-semibold color-dark mb-3 text-uppercase">
                      {!kelas ? `-` : `${kelas}`}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="row d-md-flex d-none">
            <div className="col-md-6">
              <table className="w-100">
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      Alamat
                    </div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      :
                    </div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-18-ss fw-semibold color-dark mb-3 text-uppercase">
                      {!sekolah?.alamat ? `-` : `${sekolah?.alamat}`}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div className="col-md-6">
              <table className="w-100">
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      Semester
                    </div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      :
                    </div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-18-ss fw-semibold color-dark mb-3 text-uppercase">
                      {!ta?.semester ? `-` : `${ta?.semester}`}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="row d-md-flex d-none">
            <div className="col-md-6">
              <table className="w-100">
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      Nama
                    </div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      :
                    </div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-18-ss fw-semibold color-dark mb-3 text-uppercase">
                      {!siswa?.nama ? `-` : `${siswa?.nama}`}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div className="col-md-6">
              <table className="w-100">
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      Tahun Ajaran
                    </div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      :
                    </div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-18-ss fw-semibold color-dark mb-3 text-uppercase">
                      {!ta?.tahun ? `-` : `${ta?.tahun}`}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="row d-md-flex d-none">
            <div className="col-md-6">
              <table className="w-100">
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-18-ss fw-semibold color-dark">
                      Nomor Induk / NISN
                    </div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-18-ss fw-semibold color-dark">:</div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-18-ss fw-semibold color-dark text-uppercase">
                      {!siswa?.profil?.nisn ? `-` : `${siswa?.profil?.nisn}`}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="row d-md-none d-flex">
            <div className="col-md-6">
              <table className="w-100">
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      Nama Sekolah
                    </div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      :
                    </div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-18-ss fw-semibold color-dark mb-3 text-uppercase">
                      {!sekolah?.nama ? `-` : `${sekolah?.nama}`}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      Alamat
                    </div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      :
                    </div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-18-ss fw-semibold color-dark mb-3 text-uppercase">
                      {!sekolah?.alamat ? `-` : `${sekolah?.alamat}`}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      Nama
                    </div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      :
                    </div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-18-ss fw-semibold color-dark mb-3 text-uppercase">
                      {!siswa?.nama ? `-` : `${siswa?.nama}`}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-md-0 md-3">
                      Nomor Induk / NISN
                    </div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-md-0 md-3">
                      :
                    </div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-18-ss fw-semibold color-dark mb-md-0 md-3 text-uppercase">
                      {!siswa?.profil?.nisn ? `-` : `${siswa?.profil?.nisn}`}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div className="col-md-6">
              <table className="w-100">
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      Kelas
                    </div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      :
                    </div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-18-ss fw-semibold color-dark mb-3 text-uppercase">
                      {!kelas ? `-` : `${kelas}`}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      Semester
                    </div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      :
                    </div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-18-ss fw-semibold color-dark mb-3 text-uppercase">
                      {!ta?.semester ? `-` : `${ta?.semester}`}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      Tahun Ajaran
                    </div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-18-ss fw-semibold color-dark mb-3">
                      :
                    </div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-18-ss fw-semibold color-dark mb-3 text-uppercase">
                      {!ta?.tahun ? `-` : `${ta?.tahun}`}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionInformasiSiswa;
