import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  FaAddressCard,
  FaAward,
  FaCheck,
  FaClipboard,
  FaMapSigns,
  FaMoneyCheckAlt,
  FaPencilRuler,
  FaUser,
} from "react-icons/fa";
import { ppdbURL } from "../../client/clientAxios";
import usePPDB from "../../hooks/usePPDB";
import useUser from "../../hooks/useUser";

const StepPPDB = () => {
  const { user } = useUser();
  const { terdaftar } = usePPDB();

  const steps = [
    {
      title: "Pilih Jalur PPDB",
      url: "gelombang-ppdb",
      icon: <FaMapSigns className="h3 mb-3" />,
      active: terdaftar?.terdaftar ? true : false,
    },
    {
      title: "Isi Biodata",
      url: "biodata",
      icon: <FaUser className="h3 mb-3" />,
      active: user?.profil?.dataBiodata,
    },
    // {
    //   title: "Isi Nilai Rapor",
    //   url: "nilai-rapor",
    //   icon: <FaClipboard className="h3 mb-3" />,
    //   active: user?.profil?.dataRapor,
    // },
    // {
    //   title: "Isi Data Prestasi",
    //   url: "prestasi",
    //   icon: <FaAward className="h3 mb-3" />,
    // },
    {
      title: "Pilih Jurusan",
      url: "pilih-jurusan",
      icon: <FaPencilRuler className="h3 mb-3" />,
      active: terdaftar?.gelombangAktif?.dataJurusan,
    },
    {
      title: "Bayar Pendaftaran",
      url: "bayar-pendaftaran",
      icon: <FaMoneyCheckAlt className="h3 mb-3" />,
      active: terdaftar?.gelombangAktif?.bayarPendaftar,
    },
    {
      title: "Cetak Kartu Peserta",
      url: "kartu-peserta",
      icon: <FaAddressCard className="h2 mb-3" />,
    },
  ];

  const router = useRouter();

  const [menuStep, setMenuStep] = useState();

  useEffect(() => {
    setMenuStep(
      steps.map((d, idx) => (
        <Link href={`${ppdbURL}/${d.url}`} key={idx}>
          <div
            className={`step-ppdb position-relative ${
              location.href.indexOf(d.url) > -1 ? "menu-active" : ""
            }
      `}
          >
            {d.active ? (
              <div
                className="step-check position-absolute rounded-circle bg-white align-items-center justify-content-center"
                style={{
                  width: "45px",
                  height: "45px",
                  right: "0",
                  top: "-10%",
                }}
              >
                <div
                  className="rounded-circle bg-success shadow-success-ss d-flex align-items-center justify-content-center text-white"
                  style={{ width: "35px", height: "35px" }}
                >
                  <FaCheck />
                </div>
              </div>
            ) : null}

            {/* <div
              className="step-content d-flex align-items-center justify-content-start flex-column text-center rounded-ss p-3 pointer me-3"
              style={{
                // width: "125px",
                height: "125px",
              }}
            > */}
            <div
              className="step-content d-flex align-items-center justify-content-center flex-column text-center rounded-ss p-3 pointer me-3"
              style={{
                // width: "125px",
                height: "125px",
              }}
            >
              {d.icon}
              <h6 className="m-0 fw-bold">{d.title}</h6>
            </div>
          </div>
        </Link>
      ))
    );
  }, []);

  return (
    <div>
      <div className="card card-ss mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-stretch flex-wrap">
            {menuStep}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepPPDB;
