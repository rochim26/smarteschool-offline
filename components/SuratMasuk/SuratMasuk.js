import { DatePicker } from "antd";
import React from "react";
import { FaPlus } from "react-icons/fa";
import useUser from "../../hooks/useUser";
const { RangePicker } = DatePicker;

const SuratHeader = ({ dataSurat, formData, handleChangeForm, isKeluar }) => {
  const { user } = useUser();
  return (
    <>
      <div className="row mb-4">
        <div className="card card-ss">
          <div className="card-header-ss py-4 px-0">
            <div className="d-flex justify-content-between align-items-md-center flex-md-row flex-column px-4">
              <h4 className="fw-extrabold m-0 color-dark mb-md-0 mb-4">
                Agenda Surat {isKeluar ? "Keluar" : "Masuk"} (
                {dataSurat?.total || 0})
              </h4>
              {user?.role == "admin" && (
                <div
                  className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold ms-lg-3 ms-0 mt-lg-0 mt-3"
                  data-bs-toggle="modal"
                  data-bs-target="#modalTambahSuratMasuk"
                >
                  <FaPlus className="me-2" />
                  Buat Agenda
                </div>
              )}
            </div>
            <hr className="my-3" />
            <div className="row px-4">
              <div className="col-lg-7 col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control form-search form-search-mutasi rounded-pill fw-semibold border-secondary-ss w-100"
                  style={{ height: "42px", width: "100%" }}
                  id="exampleFormControlInput1"
                  placeholder="Cari Transaksi"
                  // value={searchTransaksi}
                  // onChange={(e) => setSearchTransaksi(e.target.value)}
                />
              </div>
              <div className="col-lg-5 col-md-6 col-md-3 mb-3">
                <RangePicker
                  className="rounded-pill d-flex align-items-center w-100 date-picker-mutasi"
                  style={{
                    height: "42px",
                    paddingLeft: "14px",
                    paddingRight: "14px",
                  }}
                  placeholder={["Tanggal Mulai", "Tanggal Selesai"]}
                  onChange={(date) =>
                    handleChangeForm({
                      target: { name: "filterTanggal", value: date },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuratHeader;
