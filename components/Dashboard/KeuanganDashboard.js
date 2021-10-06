import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { getRekeningSekolah } from "../../client/RekeningSekolahClient";
import { currencyFormatter } from "../../utilities/HelperUtils";
import ModalTambahRekening from "../Shared/ModalTambahRekening/ModalTambahRekening";
import MyJoyride from "../Shared/MyJoyride/MyJoyride";
import BerandaKeuanganSkeleton from "../Shared/Skeleton/BerandaKeuanganSkeleton";

const KeuanganDashboard = () => {
  const [rekeningSekolah, setRekeningSekolah] = useState(null);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { bank, nama, norek, saldo, pemasukan, pengeluaran } =
    rekeningSekolah || {};

  const _getRekeningSekolah = async () => {
    setLoading(true);
    const { data } = await getRekeningSekolah();
    if (data) {
      setRekeningSekolah(data.rekSekolah);
    }
    setLoading(false);
  };

  const onClickEdit = () => {
    setEditData({
      bank,
      nama,
      norek,
      saldo,
    });
  };

  useEffect(() => {
    _getRekeningSekolah();
  }, []);

  const steps = [
    {
      target: '[data-joyride="tambah-card-rekening"]',
      content: "Text 1",
      disableBeacon: true,
    },
    {
      target: '[data-joyride="card-rekening"]',
      content: "Text 1",
    },
    {
      target: '[data-joyride="total-saldo"]',
      content: "Text 1",
    },
    {
      target: '[data-joyride="total-pemasukan"]',
      content: "Text 1",
    },
    {
      target: '[data-joyride="total-pengeluaran"]',
      content: "Text 1",
    },
  ];

  return (
    <div>
      <MyJoyride steps={steps} />
      {loading && (
        <div>
          <BerandaKeuanganSkeleton />
        </div>
      )}
      {!loading && (
        <>
          <div className="row">
            <div className="col-lg-5 mb-lg-0 mb-4">
              {/* Add Kartu Rekening Start */}

              {!rekeningSekolah && (
                <div
                  className="rounded-ss bg-soft-primary border border-primary-ss d-flex justify-content-center align-items-center p-4 h-100 pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#modalTambahRekening"
                  data-joyride="tambah-card-rekening"
                >
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <img
                      src="/img/icon-kartu-rekening.svg"
                      alt="icon-kartu-rekening"
                      className="mb-3"
                    />
                    <h6 className="fs-18-ss fw-semibold text-center">
                      Tambahkan{" "}
                      <span className="color-primary">Rekening Sekolah</span>
                    </h6>
                  </div>
                </div>
              )}

              {/* Add Kartu Rekening End */}

              {/* Kartu Rekening Start */}

              {rekeningSekolah && (
                <div
                  className="card-rekening-keuangan rounded-ss bg-gradient-primary-2 h-100 p-4 d-flex flex-column justify-content-between text-white pointer dropdown dropdown-ss position-relative"
                  data-joyride="card-rekening"
                >
                  <div
                    className="rounded-circle shadow-primary-ss position-absolute pointer d-flex justify-content-center align-items-center bg-primary"
                    style={{
                      right: "4%",
                      top: "8%",
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
                      src="/img/icon-option-horizontal-bg-white.svg"
                      alt="icon-option-horizontal"
                      style={{ width: "45px", height: "45px" }}
                    />
                  </div>
                  <ul
                    className="dropdown-menu dropdown-menu-ss my-1"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li
                      data-bs-toggle="modal"
                      data-bs-target="#modalTambahRekening"
                      onClick={() => onClickEdit()}
                    >
                      <a className="dropdown-item">
                        <FaPen className="me-2" />
                        <span>Edit</span>
                      </a>
                    </li>
                  </ul>
                  <div className="d-flex align-items-center justify-content-between mb-5">
                    <img src="/img/icon-smartschool-putih.svg" alt="" />
                    <span className="fw-bold">{bank}</span>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-3">{norek}</h4>
                    <h6 className="fw-bold mb-0">{nama}</h6>
                  </div>
                </div>
              )}

              {/* Kartu Rekening End */}
            </div>
            <div className="col-lg-7">
              <div className="card card-ss card-overview-dashboard-keuangan p-4">
                <div className="d-flex justify-content-between">
                  <div data-joyride="total-saldo">
                    <h5 className="color-dark fw-bold mb-2">Total Saldo</h5>
                    <h1 className="fw-extrabold color-primary mb-0">
                      {currencyFormatter(
                        saldo + parseInt(pemasukan) - parseInt(pengeluaran)
                      ) || 0}
                    </h1>
                    <hr className="my-4" />
                  </div>
                  <div data-joyride="saldo-awal">
                    <h5 className="color-dark fw-bold mb-2">Saldo Awal</h5>
                    <h1 className="fw-extrabold color-primary mb-0">
                      {currencyFormatter(saldo) || 0}
                    </h1>
                    <hr className="my-4" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-md-0 mb-3">
                    <div className="d-flex">
                      <img src="/img/icon-pemasukan.svg" alt="icon-pemasukan" />
                      <div className="ms-3" data-joyride="total-pemasukan">
                        <h6 className="fw-bold fs-12-ss mb-2">
                          Total Pemasukan
                        </h6>
                        <h5 className="fw-extrabold color-dark">
                          {currencyFormatter(pemasukan) || 0}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex">
                      <img
                        src="/img/icon-pengeluaran.svg"
                        alt="icon-pengeluaran"
                      />
                      <div className="ms-3" data-joyride="total-pengeluaran">
                        <h6 className="fw-bold fs-12-ss mb-2">
                          Total Pengeluaran
                        </h6>
                        <h5 className="fw-extrabold color-dark">
                          {currencyFormatter(pengeluaran) || 0}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <ModalTambahRekening
        editData={editData}
        _getRekeningSekolah={_getRekeningSekolah}
      />
    </div>
  );
};

export default KeuanganDashboard;
