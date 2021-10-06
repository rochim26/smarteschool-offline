import React from "react";
import { FaBuilding, FaPen } from "react-icons/fa";

const FormTingkatKerusakanRuang = () => {
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
                Input Tingkat Kerusakan Ruang
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
                      Kerusakan rangka plafon (%)
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Kerusakan tutup plafon (%)
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Kerusakan bata/dinding (%)
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Kerusakan plester dinding (%)
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Kerusakan daun jendela (%)
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Kerusakan daun pintu (%)
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Kerusakan kusen (%)
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Kerusakan penutup lantai (%)
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
                      Keterangan rangka plafon
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Keterangan tutup plafon
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Keterangan bata/dinding
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Keterangan plester dinding
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Keterangan daun jendela
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Keterangan daun pintu
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="tahun"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tahun" className="form-label">
                      Keterangan kusen
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
                Tutup
              </button>
              <button type="button" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormTingkatKerusakanRuang;
