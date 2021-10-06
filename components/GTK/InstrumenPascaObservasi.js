import React from "react";
import { hideModal } from "../../utilities/ModalUtils";

const InstrumenPascaObservasi = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary bg-gradient"
        data-bs-toggle="modal"
        data-bs-target="#pascaObservasi"
      >
        Instrumen Pasca Observasi
      </button>

      <div
        className="modal fade"
        id="pascaObservasi"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Instrumen Pasca Observasi
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => hideModal("pascaObservasi")}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table table-hover table-striped table-responsive">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Komponen Pemantau</th>
                    <th scope="col">Skor</th>
                    <th scope="col">Catatan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>KEHADIRAN DAN PARTISIPASI AKTIF</td>
                    <td>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          autoComplete="off"
                          id="floatingInput"
                          placeholder="0"
                        />
                        <label htmlFor="floatingInput">Skor</label>
                      </div>
                    </td>
                    <td>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          autoComplete="off"
                          id="floatingInput"
                          placeholder="0"
                        />
                        <label htmlFor="floatingInput">Catatan</label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>REFLEKSI</td>
                    <td>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          autoComplete="off"
                          id="floatingInput"
                          placeholder="0"
                        />
                        <label htmlFor="floatingInput">Skor</label>
                      </div>
                    </td>
                    <td>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          autoComplete="off"
                          id="floatingInput"
                          placeholder="0"
                        />
                        <label htmlFor="floatingInput">Catatan</label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>KESIMPULAN</td>
                    <td>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          autoComplete="off"
                          id="floatingInput"
                          placeholder="0"
                        />
                        <label htmlFor="floatingInput">Skor</label>
                      </div>
                    </td>
                    <td>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          autoComplete="off"
                          id="floatingInput"
                          placeholder="0"
                        />
                        <label htmlFor="floatingInput">Catatan</label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colSpan="2">
                      Rerata Nilai Skor
                    </th>
                    <th>0</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row" colSpan="2">
                      Nilai Komponen Telaah RPP
                    </th>
                    <th>0</th>
                    <td></td>
                  </tr>
                </tbody>
              </table>
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

export default InstrumenPascaObservasi;
