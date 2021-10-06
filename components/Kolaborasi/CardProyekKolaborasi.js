import { Tooltip } from "antd";
import Link from "next/link";
import React from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { ssURL } from "../../client/clientAxios";
import useUser from "../../hooks/useUser";

const CardProyekKolaborasi = ({
  data,
  status,
  isPrivat,
  isUndangan = false,
  isCariProyek = false,
  handleClickEdit,
  _deleteProyek,
  handleSubmit,
}) => {
  const { user } = useUser();
  const sekolah = data?.anggota
    ?.filter(
      (item, index, self) =>
        index ===
        self.findIndex((t) => {
          return item.user.sekolah.nama == t.user.sekolah.nama;
        })
    )
    .map((item) => item.user.sekolah);
  console.log(sekolah);
  return (
    <>
      <div className="card-buku-perpustakaan dropdown dropdown-ss position-relative">
        {!isUndangan && !isCariProyek && user.id === data?.mUserId && (
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
                data-bs-target="#modalBuatProyek"
                onClick={() => handleClickEdit(data)}
              >
                <a className="dropdown-item">
                  <FaPen className="me-2" />
                  <span>Edit</span>
                </a>
              </li>
              <li onClick={() => _deleteProyek(data?.id)}>
                <a className="dropdown-item color-danger">
                  <FaTrashAlt className="me-2" />
                  <span>Hapus</span>
                </a>
              </li>
            </ul>
          </>
        )}

        <div className="card card-ss pointer">
          <Link
            href={`${ssURL}/proyek/[id]`}
            as={`${ssURL}/proyek/${data?.id}`}
          >
            <a className="text-decoration-none">
              <div className="position-relative mb-3">
                <img
                  src={data?.banner || "/img/background-default.jpeg"}
                  className="card-img-top card-header-ss img-fit-cover bg-proyek-kolaborasi"
                />
                <div
                  className={`position-absolute rounded-pill px-4 py-1 fs-12-ss fw-semibold shadow-dark-ss
                  ${
                    status == "perencanaan-produk" &&
                    "bg-light-secondary text-secondary"
                  }
                  ${status == "menyusun-jadwal" && "bg-danger text-white"}
                  ${status == "pengembangan-produk" && "bg-warning text-white"}
                  ${status == "menguji-hasil" && "bg-primary text-white"}
                  ${
                    status == "evaluasi-pengalaman-belajar" &&
                    "bg-success-proyek text-white"
                  }
                    `}
                  style={{
                    left: "7%",
                    bottom: "-10%",
                  }}
                >
                  {status == "perencanaan-produk" && "Perencanaan Produk"}
                  {status == "menyusun-jadwal" && "Menyusun Jadwal"}
                  {status == "pengembangan-produk" && "Pengembangan Produk"}
                  {status == "menguji-hasil" && "Menguji Hasil"}
                  {status == "evaluasi-pengalaman-belajar" &&
                    "Evaluasi Pengalaman Belajar"}
                </div>
              </div>
              {/* {isDraf && (
                <div className="card-img-overlay p-3">
                  <span className="rounded-pill bg-light-secondary px-4 py-1 color-dark fs-14-ss fw-bold">
                    Draf
                  </span>
                </div>
              )} */}
              <div className="card-body w-100 p-3">
                <Tooltip title="Proyek Aplikasi Smartschool">
                  <h6 className="fw-black color-dark mb-1 text-truncate">
                    {data?.nama}
                  </h6>
                </Tooltip>
                <div className="d-flex align-items-center color-primary fs-12-ss fw-bolder mb-3">
                  <div className="d-flex align-items-center me-4">
                    <img
                      src={`${
                        isPrivat
                          ? "/img/icon-proyek-privat.svg"
                          : "/img/icon-proyek-publik.svg"
                      } `}
                      alt="icon-dibaca"
                      className="me-2"
                    />
                    {isPrivat ? "Proyek Privasi" : "Proyek Publik"}
                  </div>
                  <div className="d-flex align-items-center">
                    <img
                      src="/img/icon-anggota.svg"
                      alt="icon-komentar"
                      className="me-2"
                    />
                    {data?.meta?.anggotaCount} Anggota
                  </div>
                </div>
                <Tooltip title="">
                  <p
                    className="mb-0 fw-semibold color-secondary fs-12-ss"
                    style={{ height: "54px", overflow: "hidden" }}
                  >
                    {data?.deskripsi}
                  </p>
                </Tooltip>
              </div>
            </a>
          </Link>
          <div className="card-footer card-footer-ss w-100 p-0 pb-3">
            <hr className="mt-0 mb-3" />
            <div className="d-flex align-items-center justify-content-between w-100 px-3">
              <Link
                href={`${ssURL}/proyek/[id]`}
                as={`${ssURL}/proyek/${data?.id}`}
              >
                <a className="text-decoration-none">
                  <Tooltip title={sekolah?.map((item) => item.nama).join(", ")}>
                    <div className="d-flex align-items-center">
                      {sekolah?.length >= 1 && (
                        <img
                          src={
                            sekolah?.[0].logoSs ||
                            "/img/empty-state-sekolah-kolaborasi.svg"
                          }
                          alt=""
                          className="rounded-circle img-fit-cover"
                          style={{ width: "24px", height: "24px" }}
                        />
                      )}
                      {sekolah?.length >= 2 && (
                        <img
                          src={
                            sekolah?.[1].logoSs ||
                            "/img/empty-state-sekolah-kolaborasi.svg"
                          }
                          alt=""
                          className="rounded-circle img-fit-cover"
                          style={{
                            width: "24px",
                            height: "24px",
                            marginLeft: "-4px",
                          }}
                        />
                      )}
                      {sekolah?.length > 2 && (
                        <div
                          className="rounded-circle bg-white shadow-primary-ss d-flex justify-content-center align-items-center color-primary fw-bold fs-12-ss position-relative"
                          style={{
                            width: "24px",
                            height: "24px",
                            marginLeft: "-4px",
                            zIndex: "1",
                          }}
                        >
                          +{sekolah?.length - 2}
                        </div>
                      )}
                    </div>
                  </Tooltip>
                </a>
              </Link>
              {isUndangan ? (
                <>
                  <button
                    className="btn btn-danger-ss rounded-pill px-3 py-1 fs-12-ss"
                    onClick={() =>
                      handleSubmit({
                        anggotaId: data.anggotaId,
                        status: "menolak",
                        proyekId: data.id,
                      })
                    }
                  >
                    Tolak
                  </button>
                  <button
                    className="btn btn-primary-ss rounded-pill px-3 py-1 fs-12-ss"
                    onClick={() =>
                      handleSubmit({
                        anggotaId: data.anggotaId,
                        status: "menerima",
                        proyekId: data.id,
                      })
                    }
                  >
                    Terima
                  </button>
                </>
              ) : (
                <Link
                  href={`${ssURL}/proyek/[id]`}
                  as={`${ssURL}/proyek/${data?.id}`}
                >
                  <a className="btn btn-primary-ss rounded-pill px-3 py-1 text-decoration-none fs-12-ss">
                    {isCariProyek && !isPrivat
                      ? "Gabung ke Proyek"
                      : "Lihat Proyek"}
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

export default CardProyekKolaborasi;
