import { Tooltip } from "antd";
import Link from "next/link";
import React from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { FaPen } from "react-icons/fa";
import Avatar from "../Shared/Avatar/Avatar";
import { ssURL } from "../../client/clientAxios";
import {
  checkIconLihatRapor,
  checkLabelStatusLihatRapor,
  checkStatusLihatRapor,
  jumlahNilaiDibawah,
} from "../../utilities/RaporUtils";

const ScrollMenuPesertaUjian = ({ listPeserta, selectedId, rombel }) => {
  // console.log(listPeserta);
  const MenuItem = ({ id, data, active }) => {
    return (
      <Link href={`${ssURL}/peserta-ujian/${data.id}?subnav=detail-jawaban`}>
        <div
          className={`border border-1 border-light-secondary rounded-ss p-3 position-relative card-rapor-siswa pointer me-3 d-flex ${
            active && " bg-soft-primary"
          }`}
          style={{ width: "250px" }}
          key={id}
        >
          <Avatar
            src={data?.user?.avatar}
            name={data?.user?.nama}
            className="me-3 rounded-circle img-fit-cover"
            width="51px"
            height="51px"
            alt=""
          />
          <div className="w-75">
            <Tooltip title={data?.user?.nama}>
              {" "}
              <p className="fs-18-ss fw-extrabold mb-0 color-dark text-truncate">
                {data?.user?.nama}
              </p>
            </Tooltip>
            <p className="fs-14-ss fw-semi-bold mb-0 text-truncate">
              {rombel?.nama}
            </p>
          </div>
        </div>
      </Link>
    );
  };

  const Menu = (list, selected) =>
    list
      ?.sort((a, b) => ("" + a?.user?.nama).localeCompare(b?.user?.nama))
      ?.map((el, idx) => {
        return <MenuItem id={el.id} data={el} active={el.id == selected} />;
      });

  const menu = Menu(listPeserta, selectedId);

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
    <div className="col-12">
      <div className="card card-ss bg-white p-4 kelas-rekap slider-rapor slider-peserta-ujian">
        <ScrollMenu
          hideArrows={true}
          hideSingleArrow={true}
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          clickWhenDrag={false}
          // selected={selected}
          // onSelect={onSelect}
          wheel={false}
          translate={2}
          scrollBy={1}
          alignCenter={false}
        />
      </div>
    </div>
  );
};

export default ScrollMenuPesertaUjian;
