import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { getRekeningSekolah } from "../../client/RekeningSekolahClient";
import { currencyFormatter } from "../../utilities/HelperUtils";
import ModalTambahRekening from "../Shared/ModalTambahRekening/ModalTambahRekening";
import MyJoyride from "../Shared/MyJoyride/MyJoyride";

const AllertHelloDashboard = ({ greeting1, desc, greeting2, name, img }) => {
  const [rekeningSekolah, setRekeningSekolah] = useState(null);
  const [editData, setEditData] = useState(null);

  const { bank, nama, norek, saldo } = rekeningSekolah || {};

  const _getRekeningSekolah = async () => {
    const { data } = await getRekeningSekolah();
    if (data) {
      setRekeningSekolah(data.rekSekolah);
    }
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
    <div className="row mb-4">
      <div className="col-md-12">
        <div className="alert-hallo rounded-ss bg-soft-primary p-4 position-relative d-flex justify-content-between mb-4 d-lg-none flex-column flex-sm-row">
          <div className="alert-hallo-content order-sm-1 order-2">
            <h3 className="fw-extrabold color-dark text-capitalize mt-lg-0 mt-md-4 mt-0">
              {greeting1}
            </h3>
            <p className="color-secondary m-0">{desc}</p>
          </div>
          <div className="text-center order-sm-2 order-1">
            <img
              src={img}
              alt="illustrasi-dashboard"
              className="img-fluid"
              style={{
                width: "250px",
              }}
            />
          </div>
        </div>
        <div className="rounded-ss bg-soft-primary p-5 position-relative d-flex justify-content mb-4 d-none d-lg-block">
          <div className="alert-hallo-content-admin">
            <h1 className="fw-extrabold color-dark text-capitalize mb-1">
              {greeting2}
            </h1>
            <h1 className="fw-extrabold color-dark text-capitalize">{name}</h1>
            <h4 className="color-secondary m-0">{desc}</h4>
          </div>
          <img
            src={img}
            alt="illustrasi-dashboard"
            className="position-absolute"
            style={{
              height: "290px",
              top: "-8%",
              right: "3%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AllertHelloDashboard;
