import React from "react";
import TextareaAutosize from "react-textarea-autosize";

const SoalUraian = ({ soalSiswa }) => {
  return (
    <div
      className="container ujian-content-container py-md-4 py-3"
      style={{ marginTop: "83px" }}
    >
      <div className="row">
        <div className="col-md-12 mb-5">
          <div className="card card-ss p-4 mb-5">
            {/* Konten Soal Start */}
            <div className="mb-4">
              <p
                className="m-0 dangerous-html"
                dangerouslySetInnerHTML={{
                  __html: soalSiswa?.soal?.pertanyaan,
                }}
              />
            </div>
            {/* Konten Soal End */}

            {/* Jawaban Soal Start */}
            <div className="row mb-4">
              <div className="form-check-exam-ss col-md-6 position-relative">
                <input
                  className="form-check-input form-check-radio position-absolute d-none"
                  type="radio"
                  name="flexRadioDefault"
                  id="radioYa"
                  style={{
                    top: "36%",
                    left: "2em",
                    // height: "20px",
                  }}
                />
                <label
                  className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                  htmlFor="radioYa"
                >
                  <span>Ya</span>
                </label>
              </div>
              <div className="form-check-exam-ss col-md-6 position-relative">
                <input
                  className="form-check-input form-check-radio form-check-input-salah position-absolute rounded-pill d-none"
                  type="radio"
                  name="flexRadioDefault"
                  id="radioTidak"
                  style={{
                    top: "36%",
                    left: "2em",
                  }}
                />
                <label
                  className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                  htmlFor="radioTidak"
                >
                  <span>Tidak</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <TextareaAutosize
                className="form-control"
                autoComplete="off"
                style={{
                  resize: "none",
                  width: "100%",
                }}
                placeholder="Tuliskan alasanmu disini"
                minRows={4}
              />
            </div>
            {/* Jawaban Soal End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoalUraian;
