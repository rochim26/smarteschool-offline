import { Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
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

const NavTypeKegiatan = ({ page, setPage, data }) => {
  const { user } = useUser();
  const { terdaftar } = usePPDB();
  const router = useRouter();

  const onSelect = (key) => {
    setPage(key);
  };

  const KegiatanItem = ({ type, judulMateri, judulTugas, active, id }) => {
    return (
      <div
        className={`step-ppdb position-relative`}
        key={id}
        itemID={id}
        onClick={() => setPage(id)}
      >
        {/* {tuntas ? (
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
        ) : null} */}
        <div
          className={`step-content d-flex align-items-center rounded-ss p-4 pointer me-3 ${
            active ? "active text-white" : ""
          }`}
          style={{
            width: "242px",
            // height: "125px",
          }}
        >
          <img
            src={`/img/icon-nav-kegiatan-${
              type == "tatap-maya"
                ? "tatap-maya"
                : type == "materi"
                ? "materi"
                : type == "tugas" || type == "tugas-kuis"
                ? "tugas"
                : ""
            }${active ? "-active" : ""}.svg`}
            alt="icon-kegiatan"
          />
          <div className="ms-4" style={{ width: "65%" }}>
            <h6 className="m-0 fw-bold text-truncate">
              {type == "tatap-maya"
                ? "Tatap Maya"
                : type == "materi"
                ? "Materi"
                : type == "tugas"
                ? "Tugas"
                : type == "tugas-kuis"
                ? "Tugas Kuis"
                : ""}
            </h6>
            {type != "tatap-maya" && (
              <Tooltip title={judulMateri || judulTugas}>
                <p
                  className={`fs-12-ss fw-bold  text-truncate mt-1 mb-0  ${
                    active ? "text-white" : "color-secondary"
                  }`}
                >
                  {type == "materi"
                    ? `${judulMateri}`
                    : type == "tugas"
                    ? `${judulTugas}`
                    : type == "tugas-kuis"
                    ? `${judulTugas}`
                    : ""}
                </p>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    );
  };

  const Kegiatan = (data) =>
    data?.map((d, idx) => {
      return (
        <KegiatanItem
          type={d.type}
          judulMateri={d.judulMateri}
          judulTugas={d.judulTugas}
          id={d.id}
          active={idx == 0 && !page ? true : page == d.id}
        />
      );
    });

  const kegiatan = Kegiatan(data);

  const Arrow = ({ text, className }) => {
    return <div className={className}>{text}</div>;
  };

  const ArrowLeft = Arrow({
    text: (
      <div
        className="bg-white rounded-circle shadow-dark-ss d-flex justify-content-center align-items-center p-1"
        style={{ height: "60px", width: "60px" }}
      >
        <img src={"/img/arrow-rekap-left.svg"} className="ms-1" />
      </div>
    ),
    className: "arrow-prev",
  });
  const ArrowRight = Arrow({
    text: (
      <div
        className="bg-white rounded-circle shadow-dark-ss d-flex justify-content-center align-items-center p-1"
        style={{ height: "60px", width: "60px" }}
      >
        <img src={"/img/arrow-rekap-right.svg"} className="me-1" />
      </div>
    ),
    className: "arrow-next",
  });

  return (
    <div>
      <div className="nav-kegiatan kelas-rekap card card-ss mb-4">
        <div className="card-body p-4 pt-3">
          <div className="d-flex justify-content-between align-items-stretch flex-wrap">
            <ScrollMenu
              hideArrows={true}
              hideSingleArrow={true}
              data={kegiatan}
              arrowLeft={ArrowLeft}
              arrowRight={ArrowRight}
              clickWhenDrag={false}
              selected={page}
              //   onSelect={onSelect}
              wheel={false}
              translate={2}
              scrollBy={1}
              alignCenter={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavTypeKegiatan;
