import { Tooltip } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { ssURL } from "../../client/clientAxios";
import useUser from "../../hooks/useUser";
import Avatar from "../Shared/Avatar/Avatar";

const CardPartnerKolaborasi = ({
  data,
  status,
  isPrivat,
  isUndangan,
  isInvited,
  isPermintaan,
  isCheckPermintaan,
  handleChangeFormCheck,
  putRoleTerima,
  putRoleTolak,
  formData,
}) => {
  const { user } = useUser();
  // console.log(data.profil?.keahlian);
  const [checkUndangan, setcheckUndangan] = useState(
    formData?.userId?.findIndex((d) => d.id == data.id) >= 0
  );
  return (
    <>
      <div
        className={`card card-ss card-partner-kolaborasi ${
          checkUndangan && "checked"
        } pointer`}
      >
        {/* <Link href={`${ssURL}/proyek/[id]`} as={`${ssURL}/proyek/1`}> */}
        <a className="text-decoration-none">
          <div className="position-relative mb-4 d-flex justify-content-center">
            <img
              src="https://picsum.photos/1920/1080"
              className="card-img-top card-header-ss img-fit-cover bg-partner-kolaborasi"
            />
            <div
              className="position-absolute rounded-circle border border-4 border-white"
              style={{
                bottom: "-1.75em",
              }}
            >
              <Avatar name={data?.nama} size={50} />
            </div>
          </div>
          <div className="card-body w-100 p-0">
            <div className="text-center text-truncate p-3">
              <Tooltip title={data?.nama}>
                <h6 className="fw-black color-dark mb-1 text-truncate">
                  {data?.nama}
                </h6>
              </Tooltip>
              <Tooltip title={data?.sekolah?.nama}>
                <h6 className="fs-12-ss fw-bold color-secondary mb-2 text-truncate">
                  {data?.sekolah?.nama}
                </h6>
              </Tooltip>
              <Tooltip
                title={
                  data?.role == "siswa"
                    ? data?.anggotaRombel?.rombel?.jurusan?.nama ||
                      "Tidak Ada Jurusan"
                    : data?.role.toUpperCase()
                }
              >
                <div className="div">
                  <span className="px-4 py-0 border border-primary-ss rounded-pill color-primary fw-bold text-uppercase fs-12-ss">
                    {data?.role == "siswa"
                      ? data?.anggotaRombel?.rombel?.jurusan?.kode || "-"
                      : data?.role.toUpperCase()}
                  </span>
                </div>
              </Tooltip>
            </div>
            <hr className="m-0 bg-secondary" />
            <div
              className="d-flex flex-wrap align-items-start"
              style={{ height: "118px", padding: "14px" }}
            >
              {data?.profil?.keahlian?.length > 0 &&
                data?.profil?.keahlian.map((item) => (
                  <span
                    className="label-ss fs-12-ss fw-bold bg-very-soft-secondary color-secondary rounded-pill"
                    style={{ margin: "2px" }}
                  >
                    {item}
                  </span>
                ))}
              {/* <span
                className="label-ss fs-12-ss fw-bold bg-very-soft-secondary color-secondary rounded-pill"
                style={{ margin: "2px" }}
              >
                Illustration
              </span>
              <span
                className="label-ss fs-12-ss fw-bold bg-very-soft-secondary color-secondary rounded-pill"
                style={{ margin: "2px" }}
              >
                User Experience Design
              </span>
              <span
                className="label-ss fs-12-ss fw-bold bg-very-soft-secondary color-secondary rounded-pill"
                style={{ margin: "2px" }}
              >
                HTML 5
              </span>
              <span
                className="label-ss fs-12-ss fw-bold bg-very-soft-secondary color-secondary rounded-pill"
                style={{ margin: "2px" }}
              >
                CSS 3
              </span>
              <span
                className="label-ss fs-12-ss fw-bold bg-very-soft-secondary color-secondary rounded-pill"
                style={{ margin: "2px" }}
              >
                React JS
              </span> */}
            </div>
          </div>
        </a>
        {/* </Link> */}
        <div className="card-footer card-footer-ss w-100 p-0 pb-3">
          <hr className="mt-0 mb-3" />
          <div className="d-flex align-items-center justify-content-between w-100 px-3">
            {/* <Link href={`${ssURL}/proyek/[id]`} as={`${ssURL}/proyek/1`}> */}
            <a className="text-decoration-none">
              <span className="fw-bold color-secondary fs-14-ss">
                {data?.jumlahProyek} Proyek
              </span>
            </a>
            {/* </Link> */}
            {isUndangan ? (
              <div className="form-check-undang-anggota-proyek position-relative d-flex">
                <input
                  className="form-check-input form-check-input-salah me-3 p-2 rounded-circle position-absolute"
                  type="checkbox"
                  value={JSON.stringify(data)}
                  name="userId"
                  id={data?.id}
                  style={{
                    width: "15px",
                    height: "15px",
                    top: "-5%",
                    left: ".5em",
                  }}
                  onChange={handleChangeFormCheck}
                  checked={
                    formData?.userId?.findIndex((d) => d.id == data.id) >= 0 ||
                    isInvited?.indexOf(data?.id) >= 0
                  }
                  disabled={isInvited?.indexOf(data?.id) >= 0}
                  onClick={() => setcheckUndangan(!checkUndangan)}
                />
                <label
                  className="form-check-label btn btn-primary btn-primary-ss rounded-pill p-0 d-flex  justify-content-center align-items-center fw-bold ps-3 fs-12-ss"
                  style={{ width: "100px", height: "24px" }}
                  htmlFor={data?.id}
                >
                  {formData?.userId?.findIndex((d) => d.id == data.id) >= 0 ||
                  isInvited?.indexOf(data?.id) >= 0
                    ? "Diundang"
                    : "Undang"}
                </label>
              </div>
            ) : isPermintaan ? (
              <>
                {isCheckPermintaan && (
                  <div>
                    <span
                      className="btn btn-outline-danger-ss fw-semibold color-white rounded-pill fs-12-ss py-1 px-3 me-3"
                      onClick={() => {
                        putRoleTolak();
                      }}
                    >
                      Tolak
                    </span>
                    <span
                      className="btn btn-primary-ss rounded-pill fw-semibold color-white fs-12-ss py-1 px-3"
                      onClick={() => {
                        putRoleTerima();
                      }}
                    >
                      Terima
                    </span>
                  </div>
                )}
              </>
            ) : (
              <Link
                href={`${ssURL}/partner/[id]`}
                as={`${ssURL}/partner/${data?.id}`}
              >
                <a className="btn btn-primary-ss rounded-pill px-3 py-1 text-decoration-none fs-12-ss">
                  Lihat Profil
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPartnerKolaborasi;
