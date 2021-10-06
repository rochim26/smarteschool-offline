import React from "react";
import { FaPen } from "react-icons/fa";
import { hideModal } from "../../utilities/ModalUtils";

const FormWaktuSekolah = ({ form }) => {
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
                onClick={() => hideModal(form)}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="tahun" className="form-label">
                  Hari
                </label>
                <input className="form-control" autoComplete="off" id="tahun" />
              </div>
              <div className="row">
                <div className="col-4">
                  <div className="mb-3">
                    <label htmlFor="nama" className="form-label">
                      Jam
                    </label>
                    <input
                      readOnly
                      className="form-control"
                      autoComplete="off"
                      id="nama"
                    />
                  </div>
                </div>
                <div className="col-8">
                  <div className="mb-3">
                    <label htmlFor="nama" className="form-label">
                      Waktu
                    </label>
                    <input
                      className="form-control"
                      autoComplete="off"
                      id="nama"
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

export default FormWaktuSekolah;
