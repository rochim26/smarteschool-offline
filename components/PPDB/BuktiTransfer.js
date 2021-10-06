import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { Tooltip } from "antd";
import Avatar from "react-avatar";
import useUser from "../../hooks/useUser";
import Link from "next/link";
import { ssURL } from "../../client/clientAxios";

const BuktiTransfer = ({ data, isTerkonfirmasi }) => {
  const { user } = useUser();
  return (
    <>
      <div className="bukti-transfer mb-4">
        <div
          className="bukti-transfer-header p-4 d-flex align-items-center justify-content-between card-header-ss"
          style={{ background: `rgba(237, 237, 244, .45)` }}
        >
          <h6 className="color-dark fw-bold mb-0">
            Mandiri - 164000123321 a/n Alif Pramana
          </h6>
          <span
            className={`label-ss rounded-pill fs-14-ss text-white ${
              isTerkonfirmasi ? "bg-success-proyek" : "bg-primary"
            }`}
          >
            {isTerkonfirmasi ? "Terkonfirmasi" : "Menunggu Konfirmasi"}
          </span>
        </div>
        <div
          className="card-footer-ss p-4"
          style={{ background: `rgba(244, 244, 247, .45)` }}
        >
          <h6 className="color-secondary fw-semibold mb-2">Waktu Terkirim</h6>
          <h6 className="color-dark fw-bold mb-0">05 Mei 2021, 23 : 43 WIB</h6>
          <div
            className="w-100 my-4"
            style={{
              height: "1px",
              backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23D8D8DEFF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='4' stroke-linecap='round'/%3e%3c/svg%3e")`,
            }}
          ></div>
          <div className="text-center">
            <h2 className="m-0 fw-black color-primary">Rp.200.001</h2>
          </div>
        </div>
      </div>
      <div className="drop-file bg-soft-primary rounded d-flex rounded-ss justify-content-center align-items-center flex-column pointer w-100 p-4 pointer">
        <div className="label-input d-flex align-items-center m-3 m-md-0 flex-sm-row flex-column">
          <img src={`/img/icon-download-dropfile.svg`} />
          <span className="fs-18-ss fw-bold color-primary text-center ms-sm-3 ms-0 mt-sm-0 mt-2">
            Unduh Bukti Transfer
          </span>
        </div>
      </div>
    </>
  );
};

export default BuktiTransfer;
