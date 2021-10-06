import Link from "next/link";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { toast } from "react-toastify";
import { ssURL } from "../../client/clientAxios";
import { editStudentFoto } from "../../client/StudentClient";
import { hideModal } from "../../utilities/ModalUtils";
import {
  checkIconLihatRapor,
  checkLabelStatusLihatRapor,
  checkStatusLihatRapor,
  jumlahNilaiDibawah,
} from "../../utilities/RaporUtils";
import ModalUbahFotoProfil from "./ModalUbahFotoProfil";

const DaftarRapor = ({
  rombel_id,
  jadwalMengajar,
  keterangan,
  totalMapel,
  kkm,
}) => {
  const initialFormData = {
    avatar: "",
    userId: 0,
    button: "idle",
  };
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState(initialFormData);

  const listKKM = [];
  kkm?.map((item) => {
    item?.mapelRapor?.map((mapel) => {
      listKKM.push({
        mMataPelajaranId: mapel?.mMataPelajaranId,
        kkm2: mapel?.kkm2,
        kkm: mapel.mataPelajaran.kkm,
      });
    });
  });

  const changeFoto = (event, url) => {
    setFormData({ ...formData, avatar: url });
  };

  const putFoto = async () => {
    const { data, error } = await editStudentFoto(formData.userId, {
      avatar: formData.avatar,
    });

    if (data) {
      toast.success(data?.message);
      keterangan.find((item) => item?.user?.id == formData.userId).user.avatar =
        formData.avatar;
      setFormData(initialFormData);
      hideModal("modalUbahFotoProfil");
    } else {
      toast.error(error?.message);
    }
  };

  return (
    <>
      <div className="card card-ss">
        <div className="card-header p-4 card-header-ss">
          <div className="row d-flex justify-content-between align-items-center">
            <div className="col-lg-3 col-md-6 mb-3">
              <h4 className="fw-extrabold color-dark mb-sm-0 mb-3">
                Daftar Rapor Siswa
              </h4>
            </div>
            <div className="col-lg-6 col-md-6 mb-3">
              <input
                type="text"
                className="form-control form-search form-search-mutasi rounded-pill fw-semibold border-secondary-ss w-100"
                style={{ height: "42px", width: "100%" }}
                id="exampleFormControlInput1"
                placeholder="Cari nama siswa.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="row gy-3 px-4 pb-4">
            {keterangan
              ?.filter((item) => item?.user?.nama.includes(search))
              ?.map((d, idx) => {
                return (
                  <div className="col-md-4">
                    <div className="border border-1 border-light-secondary rounded-ss p-3 position-relative card-rapor-siswa pointer">
                      <div
                        className="position-absolute icon-edit-rapor-siswa"
                        style={{
                          top: "10px",
                          right: "10px",
                        }}
                      >
                        <div
                          className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white"
                          style={{
                            width: "30px",
                            height: "30px",
                            boxShadow: "0 5px 15px rgba(58,65,102,.2)",
                          }}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              userId: d?.user?.id,
                              avatar: d?.user?.avatar,
                            })
                          }
                          data-bs-toggle="modal"
                          data-bs-target="#modalUbahFotoProfil"
                        >
                          <FaPen />
                        </div>
                      </div>
                      <Link
                        href={`${ssURL}/rapor/${d?.user?.id}?rombel=${rombel_id}&jadwal_mengajar=${jadwalMengajar}`}
                      >
                        <div className="d-flex">
                          <img
                            src={d?.user?.avatar || "/img/cover-sma-smk.svg"}
                            className="me-3 rounded-ss img-fit-cover"
                            width="75px"
                            height="100px"
                            alt=""
                          />
                          <div>
                            <div>
                              <p className="fs-18-ss fw-extrabold mb-0 color-dark">
                                {d?.user?.nama}
                              </p>
                              {/* <p className="fs-14-ss fw-semi-bold ">
                            Tidak ada dibawah KKM
                          </p> */}
                              <p className="fs-14-ss fw-semi-bold">
                                <span className="fw-semibold">
                                  {" "}
                                  Dibawah KKM :
                                </span>
                                <span className="fw-bold">
                                  {/* {checkDibawahKKM(
                                d?.user?.meta?.kkmKeterampilan,
                                d?.user?.meta?.kkmPengetahuan
                              )}{" "} */}
                                  {jumlahNilaiDibawah(d, listKKM)}
                                </span>
                              </p>
                            </div>
                            <div className="d-flex align-items-center mt-4">
                              {checkIconLihatRapor(d, listKKM, totalMapel)}
                              <span
                                className={checkLabelStatusLihatRapor(
                                  d,
                                  listKKM,
                                  totalMapel
                                )}
                              >
                                {checkStatusLihatRapor(d, listKKM, totalMapel)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <ModalUbahFotoProfil
        formData={formData}
        onSubmit={putFoto}
        changeFoto={changeFoto}
      />
    </>
  );
};

export default DaftarRapor;
