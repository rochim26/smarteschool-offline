import React from "react";
import { FaPen } from "react-icons/fa";
import { hideModal } from "../../utilities/ModalUtils";

const FormRombel = ({ form }) => {
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
              <h5>Atur Rombel</h5>
              <div className="input-group mb-3">
                <select className="form-select" id="inputGroupSelect01">
                  <option selected>Pilih Tingkat</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <select className="form-select" id="inputGroupSelect01">
                  <option selected>Pilih Jurusan</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <select className="form-select" id="inputGroupSelect01">
                  <option selected>Pilih Kode</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <h5>Atur Wali Kelas</h5>
              <div className="mb-3">
                <select className="form-select" id="inputGroupSelect01">
                  <option selected>Pilih Wali Kelas</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
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

export default FormRombel;
