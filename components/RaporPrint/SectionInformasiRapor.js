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

const SectionInformasiRapor = ({ isBukuInduk, sekolah, siswa, ta, kelas }) => {
  return (
    <>
      <div>
        {isBukuInduk && (
          <div className="row text-center mb-4">
            <div className="col-md-12">
              <h6 className="fs-14-ss fw-bold text-uppercase mb-0">
                Buku Induk Siswa
              </h6>
            </div>
          </div>
        )}
        <div
          className="border border-dark border-2 p-3"
          style={{ borderColor: "#000000" }}
        >
          <div className="row">
            <div className="col-7">
              <table className="w-100">
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-12-ss mb-2">Nama Sekolah</div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-12-ss mb-2">:</div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-12-ss mb-2 text-uppercase">
                      {!sekolah?.nama ? `-` : `${sekolah?.nama}`}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div className="col-5">
              <table className="w-100">
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-12-ss mb-2">Kelas</div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-12-ss mb-2">:</div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-12-ss mb-2 text-uppercase">
                      {!kelas ? `-` : `${kelas}`}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-7">
              <table className="w-100">
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-12-ss mb-2">Alamat</div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-12-ss mb-2">:</div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-12-ss mb-2 text-uppercase">
                      {!sekolah?.alamat ? `-` : `${sekolah?.alamat}`}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div className="col-5">
              <table className="w-100">
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-12-ss mb-2">Semester</div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-12-ss mb-2">:</div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-12-ss mb-2 text-uppercase">
                      {!ta?.semester ? `-` : `${ta?.semester}`}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-7">
              <table className="w-100">
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-12-ss mb-2">Nama</div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-12-ss mb-2">:</div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-12-ss mb-2 text-uppercase">
                      {!siswa?.nama ? `-` : `${siswa?.nama}`}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div className="col-5">
              <table className="w-100">
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-12-ss mb-2">Tahun Ajaran</div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-12-ss mb-2">:</div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-12-ss mb-2 text-uppercase">
                      {!ta?.tahun ? `-` : `${ta?.tahun}`}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-7">
              <table className="w-100">
                <tr>
                  <td className="align-text-top" style={{ width: "47%" }}>
                    <div className="fs-12-ss">Nomor Induk / NISN</div>
                  </td>
                  <td className="align-text-top" style={{ width: "3%" }}>
                    <div className="fs-12-ss">:</div>
                  </td>
                  <td className="align-text-top">
                    <div className="fs-12-ss text-uppercase">
                      {!siswa?.profil?.nisn ? `-` : `${siswa?.profil?.nisn}`}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            {isBukuInduk && (
              <div className="col-5">
                <table className="w-100">
                  <tr>
                    <td className="align-text-top" style={{ width: "47%" }}>
                      <div className="fs-12-ss">Peringkat</div>
                    </td>
                    <td className="align-text-top" style={{ width: "3%" }}>
                      <div className="fs-12-ss">:</div>
                    </td>
                    <td className="align-text-top">
                      {/* <div className="fs-12-ss text-uppercase">10 dari 36</div> */}
                      <div className="fs-12-ss text-uppercase">
                        {!ta?.peringkat ? `-` : `${ta?.peringkat}`}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionInformasiRapor;
