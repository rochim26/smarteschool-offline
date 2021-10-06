import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { Tooltip } from "antd";
import useUser from "../../hooks/useUser";
import Link from "next/link";
import { rppMapelRpp, ssURL, userRpp } from "../../client/clientAxios";
import Avatar from "../Shared/Avatar/Avatar";
import axios from "axios";

const CardRPP = ({
  data,
  isRppSaya,
  mode,
  rpp,
  isRppKemdikbud = false,
  dataDb,
  _deleteRpp,
  jenjangData = [],
  handleClickEdit,
  isReadOnly,
  isReadOnlyTingkat,
  isReadOnlyUserAuthor,
}) => {
  const { user } = useUser();
  const [checkUndangan, setcheckUndangan] = useState(false);

  const [mapel, setMapel] = useState([]);
  const [jenjang, setJenjang] = useState(jenjangData);
  const [author, setAuthor] = useState({});

  const getMapel = async () => {
    const { data } = await axios.get(rppMapelRpp(rpp?.id));
    if (data) {
      setMapel(data);
      setJenjang(data?.map((d) => d.slug));
    }
  };

  const getUser = async () => {
    const { data } = await axios.get(userRpp(rpp?.author));
    if (data) {
      setAuthor(data);
    }
  };

  useEffect(() => {
    if (isRppKemdikbud) {
      getMapel();
      getUser();
    }
  }, []);

  return (
    <>
      <div className="card-buku-perpustakaan card-rpp dropdown dropdown-ss position-relative">
        {isRppSaya && (
          <>
            <div
              className="rounded-circle shadow-primary-ss position-absolute pointer d-flex justify-content-center align-items-center bg-primary"
              style={{
                right: "5%",
                top: "4%",
                width: "40px",
                height: "40px",
                zIndex: 1,
              }}
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="/img/icon-option-horizontal-bg-primary.svg"
                alt="icon-option-vertical"
                style={{ height: "5px" }}
              />
            </div>
            <ul
              className="dropdown-menu dropdown-menu-ss my-1"
              aria-labelledby="dropdownMenuLink"
            >
              <li
                data-bs-toggle="modal"
                data-bs-target="#modalTambahRPP"
                onClick={() => handleClickEdit(dataDb)}
              >
                <a className="dropdown-item">
                  <FaPen className="me-2" />
                  <span>Edit</span>
                </a>
              </li>
              <li onClick={() => _deleteRpp(dataDb?.id)}>
                <a className="dropdown-item color-danger">
                  <FaTrashAlt className="me-2" />
                  <span>Hapus</span>
                </a>
              </li>
            </ul>
          </>
        )}

        <div
          className={`card card-ss card-partner-kolaborasi ${
            checkUndangan && "checked"
          } pointer`}
        >
          {/* <Link href={`${ssURL}/rpp/[id]`} as={`${ssURL}/rpp/1`}> */}

          <a
            href={
              rpp?.guid?.rendered
                ? `${rpp?.guid?.rendered}`
                : isReadOnly
                ? `${ssURL}/gtk/${isReadOnlyUserAuthor.id}/${dataDb?.id}`
                : `${ssURL}/rpp/${dataDb?.id}`
            }
            target={rpp?.guid?.rendered ? "_blank" : "_self"}
            className="text-decoration-none"
          >
            <div className="position-relative mb-4 d-flex justify-content-center">
              <img
                src={
                  jenjang?.find((d) => d?.toLowerCase() == "paud")
                    ? "/img/bg-tk.svg"
                    : jenjang?.find((d) => d?.toLowerCase() == "sd")
                    ? "/img/bg-sd.svg"
                    : jenjang?.find((d) => d?.toLowerCase() == "smp")
                    ? "/img/bg-smp.svg"
                    : jenjang?.find((d) => d?.toLowerCase() == "sma")
                    ? "/img/bg-sma-smk.svg"
                    : jenjang?.find((d) => d?.toLowerCase() == "slb")
                    ? "/img/bg-slb.svg"
                    : jenjang?.find((d) => d?.toLowerCase() == "smk")
                    ? "/img/bg-sma-smk.svg"
                    : null
                }
                className="card-img-top card-header-ss img-fit-cover"
                style={{ height: "125px" }}
              />
              <div className="card-img-overlay">
                <span className="py-1 px-4 border border-white border-1 rounded-pill bg-warning text-white fs-14-ss fw-bold shadow-dark-ss">
                  {mode == "luring" && "Luring"}
                  {mode == "daring" && "Daring"}
                  {mode == "kombinasi" && "Kombinasi"}
                </span>
              </div>
              <div
                className="position-absolute rounded-circle border border-5 border-white bg-white"
                style={{
                  bottom: "-2.5em",
                }}
              >
                <img
                  src={
                    jenjang.find((d) => d?.toLowerCase() == "paud")
                      ? "/img/icon-tk.svg"
                      : jenjang.find((d) => d?.toLowerCase() == "sd")
                      ? "/img/icon-sd.svg"
                      : jenjang.find((d) => d?.toLowerCase() == "smp")
                      ? "/img/icon-smp.svg"
                      : jenjang.find((d) => d?.toLowerCase() == "sma")
                      ? "/img/icon-sma-smk.svg"
                      : jenjang.find((d) => d?.toLowerCase() == "slb")
                      ? "/img/icon-slb.svg"
                      : jenjang.find((d) => d?.toLowerCase() == "smk")
                      ? "/img/icon-sma-smk.svg"
                      : null
                  }
                  alt="icon-sekolah"
                  style={{
                    width: "70px",
                    height: "70px",
                  }}
                />
              </div>
            </div>
            <div className="card-body w-100 p-0 mt-3">
              <div className="text-truncate px-3 pt-4">
                <Tooltip title={rpp?.title?.rendered || dataDb?.judul}>
                  <h6 className="fw-black color-dark mb-1 text-truncate fs-18-ss text-uppercase">
                    {rpp?.title?.rendered || dataDb?.judul}
                  </h6>
                </Tooltip>
                {isReadOnly ? (
                  <>
                    <Tooltip title={author?.name || dataDb?.user?.nama}>
                      <span className="fs-14-ss text-uppercase fw-bold color-secondary text-truncate">
                        {isReadOnlyUserAuthor.nama || "-"}
                      </span>
                    </Tooltip>
                  </>
                ) : (
                  <Tooltip title={author?.name || dataDb?.user?.nama}>
                    <span className="fs-14-ss text-uppercase fw-bold color-secondary text-truncate">
                      {author?.name || dataDb?.user?.nama}
                    </span>
                  </Tooltip>
                )}

                {/* <div className="d-flex align-items-center color-primary fs-14-ss fw-bolder my-3">
                    <div className="d-flex align-items-center me-4">
                      <img
                        src="/img/icon-love-primary.svg"
                        alt="icon-love"
                        className="me-2"
                      />
                      100
                    </div>
                    <div className="d-flex align-items-center me-4">
                      <img
                        src="/img/icon-download-primary.svg"
                        alt="icon-download"
                        className="me-2"
                      />
                      100
                    </div>
                    <div className="d-flex align-items-center">
                      <img
                        src="/img/icon-lihat.svg"
                        alt="icon-dibaca"
                        className="me-2"
                      />
                      100
                    </div>
                  </div> */}
              </div>
              <div className="px-3 py-4">
                <Tooltip title={data?.sekolah}>
                  <p
                    className="fs-14-ss fw-semibold color-secondary mb-0 dangerous-html excerpt"
                    dangerouslySetInnerHTML={{
                      __html: rpp?.excerpt?.rendered || dataDb?.deskripsi,
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          </a>
          {/* </Link> */}
          <div className="card-footer card-footer-ss w-100 p-0 pb-3">
            <hr className="mt-0 mb-3" />
            <div className="d-flex align-items-center justify-content-between w-100 px-3">
              {isReadOnly ? (
                <Link
                  href={`${ssURL}/gtk/[id]/[rpp]`}
                  as={`${ssURL}/gtk/${isReadOnlyUserAuthor?.id}/${dataDb?.id}`}
                >
                  <a className="text-decoration-none">
                    {/* <Tooltip title="  SD/MI, 2, Guru Kelas Rendah"> */}
                    <span className="fw-bold color-dark fs-14-ss">
                      <span>{dataDb?.tingkat}</span>,
                      <span>{dataDb?.mataPelajaran?.nama || "-"}</span>,
                      <span>{isReadOnlyTingkat}</span>
                    </span>
                    {/* </Tooltip> */}
                  </a>
                </Link>
              ) : (
                <Link
                  href={`${ssURL}/rpp/[id]`}
                  as={`${ssURL}/rpp/${dataDb?.id}`}
                >
                  <a className="text-decoration-none">
                    {/* <Tooltip title="  SD/MI, 2, Guru Kelas Rendah"> */}
                    <span className="fw-bold color-dark fs-14-ss">
                      {isRppSaya ? (
                        <>
                          <span>{dataDb?.tingkat}</span>,
                          <span>{dataDb?.mataPelajaran?.nama || "-"}</span>,
                          <span>{dataDb?.sekolah?.tingkat}</span>
                        </>
                      ) : (
                        mapel?.map((data, idx) => {
                          if (idx == mapel.length - 1) {
                            return <span>{data?.name}</span>;
                          }
                          return <span>{data?.name}, </span>;
                        })
                      )}
                    </span>
                    {/* </Tooltip> */}
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardRPP;
