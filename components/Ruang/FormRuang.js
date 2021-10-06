import React from "react";
import { FaPen } from "react-icons/fa";

const FormRuang = ({ form }) => {
  return (
    <>
      <button
        type="button"
        className={
          form == "Ubah"
            ? "btn btn-primary bg-gradient rounded-circle"
            : "btn btn-primary bg-gradient rounded-pill"
        }
        data-bs-toggle="modal"
        data-bs-target={`#${form}`}
      >
        {form == "Ubah" ? <FaPen /> : "Tambah"}
      </button>

      <div
        className="modal fade"
        id={form}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {form}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="tahun" className="form-label">
                  Jenis prasarana
                </label>
                <input className="form-control" autoComplete="off" id="tahun" />
              </div>
              <div className="mb-3">
                <label htmlFor="tahun" className="form-label">
                  Bangunan
                </label>
                <input className="form-control" autoComplete="off" id="tahun" />
              </div>
              <div className="mb-3">
                <label htmlFor="tahun" className="form-label">
                  Kode Ruang
                </label>
                <input className="form-control" autoComplete="off" id="tahun" />
              </div>
              <div className="mb-3">
                <label htmlFor="tahun" className="form-label">
                  Nama Ruang
                </label>
                <input className="form-control" autoComplete="off" id="tahun" />
              </div>
              <div className="mb-3">
                <label htmlFor="tahun" className="form-label">
                  Lantai Ke
                </label>
                <input className="form-control" autoComplete="off" id="tahun" />
              </div>
              <div className="mb-3">
                <label htmlFor="tahun" className="form-label">
                  Panjang (m)
                </label>
                <input className="form-control" autoComplete="off" id="tahun" />
              </div>
              <div className="mb-3">
                <label htmlFor="tahun" className="form-label">
                  Lebar (m)
                </label>
                <input className="form-control" autoComplete="off" id="tahun" />
              </div>
              <div className="mb-3">
                <label htmlFor="tahun" className="form-label">
                  Luas (m<sup>2</sup>)
                </label>
                <input className="form-control" autoComplete="off" id="tahun" />
              </div>
              <div className="mb-3">
                <label htmlFor="tahun" className="form-label">
                  Luas Lahan Tersedia (m<sup>2</sup>)
                </label>
                <input className="form-control" autoComplete="off" id="tahun" />
              </div>
              <div className="mb-3">
                <label htmlFor="tahun" className="form-label">
                  Kepemilikan
                </label>
                <input className="form-control" autoComplete="off" id="tahun" />
              </div>
              <div className="mb-3">
                <label htmlFor="tahun" className="form-label">
                  Ket. Tanah
                </label>
                <input className="form-control" autoComplete="off" id="tahun" />
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

export default FormRuang;
