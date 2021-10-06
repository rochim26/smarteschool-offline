import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { toast } from "react-toastify";
import { editStudentFoto } from "../../client/StudentClient";
import { momentPackage } from "../../utilities/HelperUtils";
import { hideModal } from "../../utilities/ModalUtils";
import ModalUbahFotoProfil from "../Rombel/ModalUbahFotoProfil";

const SectionIndetitasPesertaDidik = ({
  isReadOnly = false,
  siswa,
  sekolah,
  ta,
  setFormData,
  formData,
}) => {
  return (
    <>
      <div className="card card-ss">
        <div className="p-4 pb-5">
          <div className="text-center mb-5">
            <h4 className="fw-extrabold color-dark text-uppercase mb-0">
              Identitas Peserta Didik
            </h4>
          </div>
          <table className="w-100 mb-5">
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  1.
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Nama
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.nama ? `-` : `${siswa?.nama}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  2.
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "45%" }}>
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  NISN / NIS
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.nisn ? `-` : `${siswa?.profil?.nisn}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  3.
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Tempat, Tanggal Lahir
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.tempatLahir || !siswa?.profil?.tanggalLahir
                    ? `-`
                    : `${siswa?.profil?.tempatLahir}, ${momentPackage(
                        siswa?.profil?.tanggalLahir
                      ).format("DD MMMM YYYY")}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  4.
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Jenis Kelamin
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.genderText ? `-` : `${siswa?.genderText}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  5.
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Agama
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.agama ? `-` : `${siswa?.profil?.agama}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  6.
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Status dalam Keluarga
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.statusKeluarga
                    ? `-`
                    : `${siswa?.profil?.statusKeluarga}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  7.
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Anak ke
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.anakKe ? `-` : `${siswa?.profil?.anakKe}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  8.
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Alamat Peserta Didik
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.alamat ? `-` : `${siswa?.profil?.alamat}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  9.
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Nomor Telepon
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.whatsapp ? `-` : `${siswa?.whatsapp}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  10.
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Sekolah Asal
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.asalSekolah
                    ? `-`
                    : `${siswa?.profil?.asalSekolah}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  11.
                </div>{" "}
              </td>
              <td className="align-text-top" coldiv="3">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Diterima di sekolah ini
                </div>{" "}
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}></td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Di kelas
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.kelasDiterima
                    ? `-`
                    : `${siswa?.profil?.kelasDiterima}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}></td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Pada tanggal
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.tanggalMasuk
                    ? `-`
                    : `${momentPackage(siswa?.profil?.tanggalMasuk).format(
                        "DD MMMM YYYY"
                      )}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  12.
                </div>{" "}
              </td>
              <td className="align-text-top" coldiv="3">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Nama Orang Tua
                </div>{" "}
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}></td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  a. Ayah
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.namaAyah
                    ? `-`
                    : `${siswa?.profil?.namaAyah}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}></td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  b. Ibu
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.namaIbu ? `-` : `${siswa?.profil?.namaIbu}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  13.
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Alamat Orang Tua
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.alamatAyah
                    ? `-`
                    : `${siswa?.profil?.alamatAyah}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                <div className="fs-18-ss fw-bold color-dark mb-md-3">14.</div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Nomor Telepon Rumah
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.telpRumah
                    ? `-`
                    : `${siswa?.profil?.telpRumah}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  15.
                </div>{" "}
              </td>
              <td className="align-text-top" coldiv="3">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Pekerjaan Orang Tua
                </div>{" "}
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}></td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  a. Ayah
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.pekerjaanAyah
                    ? `-`
                    : `${siswa?.profil?.pekerjaanAyah}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}></td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  b. Ibu
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.pekerjaanIbu
                    ? `-`
                    : `${siswa?.profil?.pekerjaanIbu}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  16.
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Nama Wali Peserta Didik
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.namaWali
                    ? `-`
                    : `${siswa?.profil?.namaWali}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  17.
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Nomor Telpon Wali Peserta Didik
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.telpWali
                    ? `-`
                    : `${siswa?.profil?.telpWali}`}
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top" style={{ width: "3%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  18.
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "45%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">
                  Pekerjaan Wali Peserta Didik
                </div>{" "}
              </td>
              <td className="align-text-top" style={{ width: "7%" }}>
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3">:</div>
              </td>
              <td className="align-text-top">
                {" "}
                <div className="fs-18-ss fw-bold color-dark mb-md-3 text-uppercase">
                  {!siswa?.profil?.pekerjaanWali
                    ? `-`
                    : `${siswa?.profil?.pekerjaanWali}`}
                </div>
              </td>
            </tr>
          </table>

          <div className="row align-items-center justify-content-around">
            <div className="col-md-3 mb-md-0 mb-4">
              <div
                className="position-relative img-fluid"
                style={{ width: "175px", height: "240px" }}
              >
                <img
                  src={siswa?.avatar || "/img/cover-sma-smk.svg"}
                  alt="cover-foto-rapor"
                  className="img-fluid img-fit-cover rounded-ss"
                  style={{ width: "175px", height: "240px" }}
                />
                <div
                  className="rounded-circle bg-primary d-flex justify-content-center align-items-center text-white position-absolute pointer"
                  style={{
                    width: "40px",
                    height: "40px",
                    top: "10px",
                    right: "10px",
                    boxShadow: "0 5px 15px rgba(58,65,102,.2)",
                  }}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      userId: siswa?.id,
                      avatar: siswa?.avatar,
                    })
                  }
                  data-bs-toggle="modal"
                  data-bs-target="#modalUbahFotoProfil"
                >
                  <FaPen className="fs-5" />
                </div>
                <input
                  accept="image/*"
                  className="form-control d-none"
                  type="file"
                  id="inputFileFoto"
                  // name={name}
                  // onChange={uploadFileToServer}
                ></input>
              </div>
            </div>
            <div className="col-md-3 d-flex align-items-center">
              <div>
                <h5 className="fs-18-ss color-dark fw-bold mb-2">
                  {sekolah?.provinsi}, {momentPackage().format("DD MMMM YYYY")}
                </h5>
                <h5
                  className="fs-18-ss color-dark fw-bold"
                  style={{ marginBottom: "85px" }}
                >
                  Kepala Sekolah
                </h5>
                <h5 className="fs-18-ss color-dark fw-bold text-uppercase mb-1">
                  {ta?.namaKepsek}
                </h5>
                <h5 className="fs-18-ss color-dark fw-bold text-uppercase">
                  NIP. {ta?.nipKepsek}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionIndetitasPesertaDidik;
