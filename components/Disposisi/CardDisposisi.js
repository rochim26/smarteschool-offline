import React from "react";
import {
  FaCalendarDay,
  FaCheckCircle,
  FaClock,
  FaExclamation,
  FaPen,
  FaTrashAlt,
} from "react-icons/fa";
import { momentPackage } from "../../utilities/HelperUtils";

const CardDisposisi = ({ dataBukuInduk, _deleteDisposisi, setFormData }) => {
  const handleEdit = (data) => {
    setFormData({
      id: data.id,
      userId: data.mUserId,
      penanganan: data.penanganan,
      tanggal: momentPackage(data.tanggalPengembalian),
      file: data.ttd,
      ttd: [data.ttd],
    });
  };
  // const { user } = useUser();
  return (
    <>
      {dataBukuInduk?.map((d, idx) => {
        return (
          <div className="row">
            {/* <Link href={linkRedirect + `${d?.id}`}> */}
            <div className={`card card-ss rounded-ss mb-4`}>
              <div className="card-body card-body-ss p-4">
                {/* hanya muncul di role kepsek */}
                {/* start element */}
                <div className="d-flex mb-4 justify-content-between">
                  <div className="d-flex mb-4 mb-md-0 rounded-pill bg-soft-danger py-1 px-3">
                    {d?.pelaporanDisposisi ? (
                      <span
                        className="rounded-circle bg-primary d-flex justify-content-center align-items-center p-1"
                        style={{
                          width: "19px",
                          height: "19px",
                        }}
                      >
                        <FaCheckCircle color="blue" className="fs-14-ss" />
                      </span>
                    ) : (
                      <span
                        className="rounded-circle bg-danger d-flex justify-content-center align-items-center p-1"
                        style={{
                          width: "19px",
                          height: "19px",
                        }}
                      >
                        <FaExclamation color="white" className="fs-14-ss" />
                      </span>
                    )}
                    <span
                      className={`rounded-pill color-${
                        d?.pelaporanDisposisi ? "primary" : "danger"
                      } fs-14-ss fw-bold  ps-3`}
                    >
                      {d?.pelaporanDisposisi ? "Selesai" : "Belum Selesai"}
                    </span>
                    {/* ketika sudah selesai */}
                    {/* <span
                        className="rounded-circle bg-primary d-flex justify-content-center align-items-center p-1"
                        style={{
                          width: "19px",
                          height: "19px",
                        }}
                      >
                        <FaCheck color="white" />
                      </span>
                      <span className="rounded-pill color-primary fs-12-ss fw-bold  ps-3">
                        Selesai
                      </span> */}
                  </div>
                  {/* Dropdown Option Start */}

                  <div className="dropdown dropdown-ss mb-md-0 mb-2 d-md-inline d-flex justify-content-end">
                    <div
                      role="button"
                      id="dropdownOption"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={`/img/icon-dropdown-option.svg`}
                        alt="icon-option"
                      />
                    </div>
                    <ul
                      className="dropdown-menu dropdown-menu-ss my-1"
                      aria-labelledby="dropdownOption"
                    >
                      <li
                        onClick={() => handleEdit(d)}
                        data-bs-toggle="modal"
                        data-bs-target="#modalDisposisi"
                      >
                        <a className="dropdown-item">
                          <FaPen className="me-2" />
                          <span>Edit</span>
                        </a>
                      </li>
                      <li onClick={() => _deleteDisposisi(d?.id)}>
                        <a className="dropdown-item color-danger">
                          <FaTrashAlt className="me-2" />
                          <span>Hapus</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* Dropdown Option End */}
                </div>
                {/* end element */}
                <div className="d-flex justify-content-between mb-4 mb-md-5 flex-column flex-md-row ">
                  <div className="order-2 order-md-1">
                    <h4 className="fw-extrabold color-dark">
                      {d?.surat?.perihal}
                    </h4>
                    <h6 className="fw-bold m-0 fs-5">
                      {d?.surat?.kode || "-"}
                    </h6>
                  </div>
                  <div className="d-flex order-1 order-md-2 mb-4 mb-md-0">
                    {/* <span
                      className="rounded-circle bg-danger d-flex justify-content-center align-items-center p-1"
                      style={{
                        width: "19px",
                        height: "19px",
                      }}
                    >
                      <FaExclamation color="white" className="fs-12-ss" />
                    </span> */}
                    {/* <span className="rounded-pill color-danger fs-12-ss fw-bold  ps-3">
                      {d?.pelaporanDisposisi ? "Selesai" : "Belum Selesai"}
                    </span> */}
                    {/* ketika sudah selesai */}
                    {/* <span
                        className="rounded-circle bg-primary d-flex justify-content-center align-items-center p-1"
                        style={{
                          width: "19px",
                          height: "19px",
                        }}
                      >
                        <FaCheck color="white" />
                      </span>
                      <span className="rounded-pill color-primary fs-12-ss fw-bold  ps-3">
                        Selesai
                      </span> */}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-stretch align-items-md-center flex-column flex-md-row">
                  <div className="d-flex flex-column flex-md-row mb-4 mb-md-0">
                    <div>
                      <FaClock color="#FC544B" />
                      <span className="color-danger fs-14-ss fw-semibold ms-2 ">
                        {d?.penanganan}
                      </span>
                    </div>
                    {/* ketika Biasa */}
                    {/* <div>
                        <FaClock color="#2680EB" />
                        <span className="color-primary fs-14-ss fw-semibold ms-2 ">
                          Biasa
                        </span>
                      </div> */}
                    <div className="ms-0 ms-md-4">
                      <FaCalendarDay color="#2680EB" />
                      <span className="color-primary fs-14-ss fw-semibold ms-2 ">
                        Dikembalikan pada{" "}
                        {momentPackage(d?.tanggalPengembalian || "")
                          .locale("id")
                          .format("DD MMMM YYYY")}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-column flex-md-row">
                    <span className="btn btn-ss shadow-primary-ss bg-primary rounded-pill text-white fs-12-ss fw-semibold py-1 px-4 pointer">
                      Lihat Disposisi
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* </Link> */}
          </div>
        );
      })}
    </>
  );
};

export default CardDisposisi;
