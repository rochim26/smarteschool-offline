import React from "react";
import { FaBuilding, FaPen } from "react-icons/fa";

const FormTingkatKerusakanBangunan = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary bg-gradient rounded-pill"
        data-bs-toggle="modal"
        data-bs-target="#kerusakanBangunan"
      >
        <FaBuilding />
      </button>

      <div
        className="modal fade"
        id="kerusakanBangunan"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Input Tingkat Kerusakan Bangunan
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Kerusakan pondasi (%)
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Kerusakan sloop, kolom, dan balok (%)
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Kerusakan plester struktur (%)
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Kerusakan kuda-kuda atap (%)
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Kerusakan kaso atap (%)
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Kerusakan reng atap (%)
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Kerusakan tutup atap (%)
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Keterangan pondasi
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Keterangan sloop, kolom, dan balok
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Keterangan plester struktur
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Keterangan kuda-kuda atap
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Keterangan kaso atap
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Keterangan reng atap
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Keterangan tutup atap
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormTingkatKerusakanBangunan;
