import { FaPen, FaPlus } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";
import ModalTambahKeahlian from "../Profil/ModalTambahKeahlian";
import useUser from "../../hooks/useUser";
import { momentPackage } from "../../utilities/HelperUtils";
import { bubble } from "react-burger-menu";
import useSekolah from "../../hooks/useSekolah";

const SectionKartuPelajar = ({ isReadOnly = false }) => {
  const { user, setUser } = useUser();
  const { sekolah } = useSekolah();
  return (
    <>
      <div className="card card-ss p-4">
        <div className="container p-0 p-sm-4 pt-sm-0">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 pb-4 pt-0 mb-4">
              <div className="d-flex justify-content-center">
                <p className="btn-ss btn bg-white rounded-pill fw-bold border-2 border-primary-ss color-primary cursor-default ">
                  Tampak depan
                </p>
              </div>
              <div className="border rounded-ss border-light-secondary-ss">
                <div
                  className="card-header-ss bg-soft-primary p-4 fw-extrabold color-dark d-flex justify-content-between flex-column flex-sm-row"
                  style={{
                    borderBottom: "2px solid #2680eb",
                  }}
                >
                  <div className="d-flex d-sm-none justify-content-around mb-3">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/smart-school-300211.appspot.com/o/1622802909890-ic-icon.png?alt=media&token=88700cba-717c-4e9a-a946-606bedea380f"
                      alt=""
                      height="65"
                    />
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/smart-school-300211.appspot.com/o/1622802909890-ic-icon.png?alt=media&token=88700cba-717c-4e9a-a946-606bedea380f"
                      alt=""
                      height="65"
                    />
                  </div>
                  <div className="logo-kartu-pelajar d-none d-sm-flex">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/smart-school-300211.appspot.com/o/1622802909890-ic-icon.png?alt=media&token=88700cba-717c-4e9a-a946-606bedea380f"
                      alt=""
                      height="65"
                    />
                  </div>
                  <div className="text-center">
                    <h6 className="fs-10-ss text-uppercase fw-semibold">
                      PEMERINTAH PROVINSI DKI JAKARTA
                    </h6>
                    <h6 className="fs-10-ss text-uppercase fw-extrabold">
                      DINAS PENDIDIKAN
                    </h6>
                    <h6
                      className="text-uppercase fw-bold color-primary"
                      style={{
                        fontSize: "17px",
                        fontFamily: "times",
                      }}
                    >
                      {sekolah?.nama}
                    </h6>
                    <h6
                      className="text-capitalize fw-bold "
                      style={{
                        fontSize: "8px",
                        lineHeight: "12px",
                      }}
                    >
                      Jl. Balai Pustaka Baru 1 Rawamangun Telp. 4720310 Fax.
                      47866889 Jakarta 13220
                    </h6>
                  </div>
                  <div className="logo-kartu-pelajar d-none d-sm-flex">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/smart-school-300211.appspot.com/o/1622802909890-ic-icon.png?alt=media&token=88700cba-717c-4e9a-a946-606bedea380f"
                      alt=""
                      height="65"
                    />
                  </div>
                </div>
                <div className="card-body p-4 bg-depan-kartu-pelajar">
                  <div className="d-flex row">
                    <div className="col-md-3 foto-kartu-pelajar">
                      <div style={{ width: 142, height: 188 }}>
                        <img src={user?.avatar} alt="" style={{ width: "100%" }} />
                      </div>
                    </div>
                    <div
                      style={{ width: "100%", marginTop: "12%" }}
                      className="ms-0 ms-md-4 text-center col nama-kartu-pelajar"
                    >
                      <div>
                        <h5
                          style={{
                            fontSize: "19px",
                          }}
                          className="text-uppercase fw-black color-dark"
                        >
                          {user?.nama || "-"}
                        </h5>
                        <h6
                          style={{
                            fontSize: "15px",
                          }}
                          className="text-uppercase fw-bold color-primary"
                        >
                          NIS : {user?.nis || "-"}
                        </h6>
                      </div>
                      <div className="d-flex justify-content-center justify-content-lg-end">
                        <img
                          src="/img/barcode-kartu-pelajar.svg"
                          alt="barcode"
                          // width="54px"
                          // height="54px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8 ">
              <div className="d-flex justify-content-center">
                <p className="btn-ss btn bg-white rounded-pill fw-bold border-2 border-primary-ss color-primary cursor-default ">
                  Tampak Belakang
                </p>
              </div>
              <div className="border rounded-ss border-light-secondary-ss position-relative">
                <div
                  className="card-body p-4 bg-belakang-kartu-pelajar d-flex flex-column justify-content-between"
                  style={{
                    minHeight: "366px",
                  }}
                >
                  <div className="d-flex row z-index-2">
                    <div>
                      <h6 className="fw-black color-dark text-center">
                        DATA IDENTITAS SISWA
                      </h6>
                      <table
                        style={{
                          width: "100%",
                        }}
                      >
                        <tr>
                          <td
                            className="align-text-top"
                            style={{ width: "33%" }}
                          >
                            <p className="mb-0 fs-10-ss fw-bold color-dark">
                              Nama Lengkap
                            </p>
                          </td>
                          <td
                            className="align-text-top"
                            style={{ width: "5%" }}
                          >
                            <p className="mb-0 fs-10-ss  fw-bold color-dark">
                              :
                            </p>
                          </td>
                          <td className="align-text-top">
                            <p className="mb-0 fs-10-ss fw-black color-dark text-uppercase">
                              {/* {!buku?.nama ? `-` : `${buku?.nama}`} */}
                              {user?.nama || "-"}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="align-text-top"
                            style={{ width: "33%" }}
                          >
                            <p className="mb-0 fs-10-ss fw-bold color-dark">
                              NIS
                            </p>
                          </td>
                          <td
                            className="align-text-top"
                            style={{ width: "5%" }}
                          >
                            <p className="mb-0 fs-10-ss  fw-bold color-dark">
                              :
                            </p>
                          </td>
                          <td className="align-text-top">
                            <p className="mb-0 fs-10-ss fw-bold color-dark ">
                              {/* {!buku?.nama ? `-` : `${buku?.nama}`} */}
                              {user?.nis || "-"}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="align-text-top"
                            style={{ width: "33%" }}
                          >
                            <p className="mb-0 fs-10-ss fw-bold color-dark">
                              No. Telpon
                            </p>
                          </td>
                          <td
                            className="align-text-top"
                            style={{ width: "5%" }}
                          >
                            <p className="mb-0 fs-10-ss  fw-bold color-dark">
                              :
                            </p>
                          </td>
                          <td className="align-text-top">
                            <p className="mb-0 fs-10-ss fw-bold color-dark ">
                              {/* {!buku?.nama ? `-` : `${buku?.nama}`} */}
                              {user?.whatsapp || "-"}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="align-text-top"
                            style={{ width: "33%" }}
                          >
                            <p className="mb-0 fs-10-ss fw-bold color-dark">
                              Tempat/Tanggal Lahir
                            </p>
                          </td>
                          <td
                            className="align-text-top"
                            style={{ width: "5%" }}
                          >
                            <p className="mb-0 fs-10-ss  fw-bold color-dark">
                              :
                            </p>
                          </td>
                          <td className="align-text-top">
                            <p className="mb-0 fs-10-ss fw-bold color-dark ">
                              {/* {!buku?.nama ? `-` : `${buku?.nama}`} */}
                              {user?.tempatLahir} {user?.tanggalLahir}
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td
                            className="align-text-top"
                            style={{ width: "33%" }}
                          >
                            <p className="mb-0 fs-10-ss fw-bold color-dark">
                              Agama
                            </p>
                          </td>
                          <td
                            className="align-text-top"
                            style={{ width: "5%" }}
                          >
                            <p className="mb-0 fs-10-ss  fw-bold color-dark">
                              :
                            </p>
                          </td>
                          <td className="align-text-top">
                            <p className="mb-0 fs-10-ss fw-bold color-dark ">
                              {/* {!buku?.nama ? `-` : `${buku?.nama}`} */}
                              {user?.profil?.agama || "-"}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="align-text-top"
                            style={{ width: "33%" }}
                          >
                            <p className="mb-0 fs-10-ss fw-bold color-dark">
                              Alamat
                            </p>
                          </td>
                          <td
                            className="align-text-top"
                            style={{ width: "5%" }}
                          >
                            <p className="mb-0 fs-10-ss  fw-bold color-dark">
                              :
                            </p>
                          </td>
                          <td className="align-text-top">
                            <p className="mb-0 fs-10-ss fw-bold color-dark ">
                              {/* {!buku?.nama ? `-` : `${buku?.nama}`} */}
                              {/* Jl. Kober Kecil RT. 003 / RW. 008 No.20, Kel. Rawa
                              Bunga, Kec. Jatingera, Kota Jakarta Timur, DKI
                              Jakarta 13350 */}
                              -
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="align-text-top"
                            style={{ width: "33%" }}
                          >
                            <p className="mb-0 fs-10-ss fw-bold color-dark">
                              Jenis Kelamin
                            </p>
                          </td>
                          <td
                            className="align-text-top"
                            style={{ width: "5%" }}
                          >
                            <p className="mb-0 fs-10-ss  fw-bold color-dark">
                              :
                            </p>
                          </td>
                          <td className="align-text-top">
                            <p className="mb-0 fs-10-ss fw-bold color-dark ">
                              {/* {!buku?.nama ? `-` : `${buku?.nama}`} */}
                              {user?.genderText || "-"}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="align-text-top"
                            style={{ width: "33%" }}
                          >
                            <p className="mb-0 fs-10-ss fw-bold color-dark">
                              Gol. Darah
                            </p>
                          </td>
                          <td
                            className="align-text-top"
                            style={{ width: "5%" }}
                          >
                            <p className="mb-0 fs-10-ss  fw-bold color-dark">
                              :
                            </p>
                          </td>
                          <td className="align-text-top">
                            <p className="mb-0 fs-10-ss fw-bold color-dark text-uppercase">
                              {/* {!buku?.nama ? `-` : `${buku?.nama}`} */}
                              {user?.profil?.golDarah || "-"}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div className="d-flex mt-auto justify-content-between z-index-2">
                    <div className=" mt-auto">
                      <div
                        className="bg-white rounded-ss "
                        style={{
                          width: "122px",
                          border: "1px solid #C3C3C8",
                        }}
                      >
                        <p
                          className="mb-0 fw-bold color-danger p-1 px-2"
                          style={{
                            fontSize: "8px",
                          }}
                        >
                          Kartu ini berlaku selama menjadi siswa di sekolah ini
                        </p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center justify-content-lg-end position-relative order-1 order-md-2">
                      <div className="text-center">
                        <p
                          className="mb-0 fw-bold color-dark"
                          style={{
                            fontSize: "8px",
                          }}
                        >
                          {momentPackage().format("dddd, DD MMMM YYYY")}
                        </p>
                        <p
                          className="mb-0 fw-bold color-dark"
                          style={{
                            fontSize: "8px",
                          }}
                        >
                          Kepala Sekolah,
                        </p>
                        <div
                          style={{
                            height: "33px",
                            background: "transparent",
                          }}
                        ></div>
                        <p
                          className="mb-0 fw-black color-dark"
                          style={{
                            fontSize: "8px",
                            textDecoration: "underline",
                          }}
                        >
                          PURWOSUSILO, M.Pd
                        </p>
                        <p
                          className="mb-0 fw-bold color-dark"
                          style={{
                            fontSize: "8px",
                          }}
                        >
                          NIP : 196707241997031005
                        </p>
                      </div>
                      <div className="position-absolute">
                        <img
                          src="/img/contoh-ttd-kartu-pelajar.svg"
                          alt=""
                          height="70"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/smart-school-300211.appspot.com/o/1622802909890-ic-icon.png?alt=media&token=88700cba-717c-4e9a-a946-606bedea380f"
                  alt=""
                  width="201"
                  style={{
                    opacity: "4%",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  className="position-absolute"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-ss mt-4">
        <div className="card-body p-4">
          <h4 className="fw-extrabold color-dark title-border mb-5">
            Cetak Kartu Pelajar
          </h4>
          {/* <p className="fw-bold color-dark text-center mb-4">
            Silahkan mencetak kartu peserta dan kartu pendaftaran, lalu simpan
            untuk melihat hasil pendaftaran
          </p> */}
          <div className="row justify-content-center">
            <div className="col-md-6">
              {/* <Pdf
                      options={options}
                      targetRef={kartuRef}
                      filename="Kartu Peserta.pdf"
                    >
                      {({ toPdf }) => ( */}
              <div
                className="w-100 rounded-ss bg-soft-primary p-3 d-flex align-items-center justify-content-center pointer"
                // onClick={() => {
                //   setUserView(false);
                //   setTimeout(() => {
                //     toPdf();
                //     setUserView(true);
                //   }, 1);
                // }}
              >
                <img src="/img/icon-print.svg" alt="" />
                <h6 className="color-dark fw-bold ms-4 mb-0">
                  Cetak Kartu Pelajar
                </h6>
              </div>
              {/* )}
                    </Pdf> */}
            </div>
          </div>

          {/* formulir peserta */}
        </div>
      </div>
    </>
  );
};

export default SectionKartuPelajar;
