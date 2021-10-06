import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { Tooltip } from "antd";
import Avatar from "react-avatar";
import useUser from "../../hooks/useUser";
import Link from "next/link";
import { ssURL } from "../../client/clientAxios";

const CardBukuInduk = ({ dataBukuInduk, isRapor, linkRedirect, count }) => {
  // const { user } = useUser();
  return (
    <>
      <div className="col-lg-9">
        <div className="row gy-4">
          {dataBukuInduk?.map((d, idx) => {
            return (
              <div className="col-md-4" key={idx}>
                <Link href={linkRedirect + `${d?.id}`}>
                  <div
                    className={`card-buku-induk card card-ss rounded-ss position-relative ${
                      isRapor ? "card-rapor" : null
                    }`}
                  >
                    <div className="card-body card-body-ss p-3">
                      <h4 className="fw-black color-dark fw-black mb-2">
                        {d?.nama}
                      </h4>
                      <p className="fs-14-ss fw-bold">
                        {count
                          ? count?.find((item) => item.rombelId == d?.id)
                              .count?.[0]?.total
                          : d?.meta?.total}{" "}
                        Mata Pelajaran
                      </p>
                      <img
                        src={`/img/label-buku-induk.svg`}
                        className="position-absolute label-buku-induk"
                        style={{ top: "-4px", right: "16px" }}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CardBukuInduk;
