import React from "react";
import { hideModal } from "../../utilities/ModalUtils";

const InstrumenPraObservasi = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary bg-gradient"
        data-bs-toggle="modal"
        data-bs-target="#praObservasi"
      >
        Instrumen Pra Observasi
      </button>

      <div
        className="modal fade"
        id="praObservasi"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Instrumen Pra Observasi
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => hideModal("praObservasi")}
                data-bs-dismiss="modal"
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
                    <td>Persiapan Perangkat Pembelajaran</td>
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
                    <td>Konsep Pembelajaran</td>
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
                    <td>Sarana belajar</td>
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
                    <th scope="row">4</th>
                    <td>Aplikasi yang digunakan</td>
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
                    <th scope="row">5</th>
                    <td>Proses Pembelajaran yang dilakukan</td>
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
                    <th scope="row">6</th>
                    <td>Bahan Ajar yang digunakan</td>
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

export default InstrumenPraObservasi;
