import React from "react";
import { hideModal } from "../../utilities/ModalUtils";

const InstrumenTelaahRPP = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary bg-gradient"
        data-bs-toggle="modal"
        data-bs-target="#telaahRPP"
      >
        Instrumen Telaah RPP
      </button>

      <div
        className="modal fade"
        id="telaahRPP"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Instrumen Telaah RPP
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => hideModal("telaahRPP")}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table table-hover table-striped table-responsive">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Komponen RPP</th>
                    <th scope="col">Skor</th>
                    <th scope="col">Catatan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>
                      Identitas RPP (1.Nama Sekolah, 2.Mata Pelajaran, 3.Kelas/
                      Semester, 4.Materi Pokok, 5. Alokasi Waktu/Jumlah
                      pertemuan)
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
                    <td>
                      Tujuan pembelajaran dirumuskan berdasarkan KD (1) , memuat
                      ABCD dengan menggunakan kata kerja operasional (2) yang
                      dapat diamati dan diukur (3), menggambarkan proses(4) dan
                      hasil belajar yang mencakup sikap, pengetahuan, dan
                      keterampilan (5).
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
                    <td>
                      Memilih model, metode/pendekatan yang sesuai dengan KD
                      (1), karakteristik peserta didik(2) , dan tujuan
                      pembelajaran (3).
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
                    <td>
                      Langkah-langkah pembelajaran: 1) memuat integrasi
                      literasi, 2)PPK, 3) kompetensi abad 21 (4C), 4) dan HOTS
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
                    <td>
                      a. Pendahuluan : 1) Menyiapkan peserta didik, 2)
                      Apersepsi, 3) Motivasi 4) Menyampaikan KD/IPK, 5) tujuan
                      pembelajaran dan penilaian.
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
                    <td>
                      b. Kegiatan Inti sesuai sintaks model pembelajaran yang
                      dipilih.
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
                    <th scope="row">7</th>
                    <td>
                      c. Penutup : 1)Kesimpulan, 2)evaluasi, 3)refleksi dan
                      Tindak lanjut 4)Rencana Kegiatan Pembelajaran berikutnya
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
                    <th scope="row">8</th>
                    <td>
                      Penilaian mencakup sikap, pengetahuan, dan keterampilan a.
                      Teknik/Bentuk penilaian, b. Instrumen, c. Pedoman
                      penskoran
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
                    <th scope="row">9</th>
                    <td>
                      Perencanaan pelaksanaan Pembelajaran Remedial dan
                      Pengayaan
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

export default InstrumenTelaahRPP;
