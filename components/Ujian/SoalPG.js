import React, { useEffect } from "react";
import { alphabet, shuffle } from "../../utilities/HelperUtils";
import AudioPlayer from "../Shared/AudioPlayer/AudioPlayer";

const SoalPG = ({ soalSiswa, handlePutJawabanSiswa }) => {
  const soalAcak = [
    (opsi) => (
      <div className="form-check-exam-ss">
        <input
          className="form-check-input form-check-radio d-none"
          type="radio"
          name="flexRadioDefault"
          id="radioJawabanA"
          checked={soalSiswa?.jawabanPg == "A"}
        />
        <label
          className="list-jawaban-soal form-check-label rounded-ss border px-4 py-3 d-flex align-items-center mb-3 pointer"
          htmlFor="radioJawabanA"
          onClick={() => handlePutJawabanSiswa({ jawabanPg: "A" })}
        >
          <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">{opsi}</h6>
          <div className="konten-list-jawaban-soal">
            <p
              className="mb-0 dangerous-html"
              dangerouslySetInnerHTML={{
                __html: soalSiswa?.soal?.jawabanA,
              }}
            />
          </div>
        </label>
      </div>
    ),
    (opsi) => (
      <div className="form-check-exam-ss">
        <input
          className="form-check-input form-check-radio d-none"
          type="radio"
          name="flexRadioDefault"
          id="radioJawabanB"
          checked={soalSiswa?.jawabanPg == "B"}
        />
        <label
          className="list-jawaban-soal form-check-label rounded-ss border px-4 py-3 d-flex align-items-center mb-3 pointer"
          htmlFor="radioJawabanB"
          onClick={() => handlePutJawabanSiswa({ jawabanPg: "B" })}
        >
          <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">{opsi}</h6>
          <div className="konten-list-jawaban-soal">
            <p
              className="mb-0 dangerous-html"
              dangerouslySetInnerHTML={{
                __html: soalSiswa?.soal?.jawabanB,
              }}
            />
          </div>
        </label>
      </div>
    ),
    (opsi) => (
      <div className="form-check-exam-ss">
        <input
          className="form-check-input form-check-radio d-none"
          type="radio"
          name="flexRadioDefault"
          id="radioJawabanC"
          checked={soalSiswa?.jawabanPg == "C"}
        />
        <label
          className="list-jawaban-soal form-check-label rounded-ss border px-4 py-3 d-flex align-items-center mb-3 pointer"
          htmlFor="radioJawabanC"
          onClick={() => handlePutJawabanSiswa({ jawabanPg: "C" })}
        >
          <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">{opsi}</h6>
          <div className="konten-list-jawaban-soal">
            <p
              className="mb-0 dangerous-html"
              dangerouslySetInnerHTML={{
                __html: soalSiswa?.soal?.jawabanC,
              }}
            />
          </div>
        </label>
      </div>
    ),
    (opsi) => (
      <div className="form-check-exam-ss">
        <input
          className="form-check-input form-check-radio d-none"
          type="radio"
          name="flexRadioDefault"
          id="radioJawabanD"
          checked={soalSiswa?.jawabanPg == "D"}
        />
        <label
          className="list-jawaban-soal form-check-label rounded-ss border px-4 py-3 d-flex align-items-center mb-3 pointer"
          htmlFor="radioJawabanD"
          onClick={() => handlePutJawabanSiswa({ jawabanPg: "D" })}
        >
          <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">{opsi}</h6>
          <div className="konten-list-jawaban-soal">
            <p
              className="mb-0 dangerous-html"
              dangerouslySetInnerHTML={{
                __html: soalSiswa?.soal?.jawabanD,
              }}
            />
          </div>
        </label>
      </div>
    ),
    (opsi) => (
      <div className="form-check-exam-ss">
        <input
          className="form-check-input form-check-radio d-none"
          type="radio"
          name="flexRadioDefault"
          id="radioJawabanE"
          checked={soalSiswa?.jawabanPg == "E"}
        />
        <label
          className="list-jawaban-soal form-check-label rounded-ss border px-4 py-3 d-flex align-items-center mb-3 pointer"
          htmlFor="radioJawabanE"
          onClick={() => handlePutJawabanSiswa({ jawabanPg: "E" })}
        >
          <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">{opsi}</h6>
          <div className="konten-list-jawaban-soal">
            <p
              className="mb-0 dangerous-html"
              dangerouslySetInnerHTML={{
                __html: soalSiswa?.soal?.jawabanE,
              }}
            />
          </div>
        </label>
      </div>
    ),
  ];

  return (
    <div
      className="container ujian-content-container py-md-4 py-3"
      style={{ marginTop: "83px" }}
    >
      <div className="row">
        <div className="col-md-12">
          <div className="card card-ss p-4 mb-5">
            {/* Konten Soal Start */}
            <div className="mb-4">
              {soalSiswa?.soal?.audio && (
                <div>
                  <AudioPlayer src={soalSiswa?.soal?.audio} />
                </div>
              )}
              <p
                className="m-0 dangerous-html"
                dangerouslySetInnerHTML={{
                  __html: soalSiswa?.soal?.pertanyaan?.replace("b&", "..."),
                }}
              />
            </div>

            {soalAcak?.map((d, idx) => {
              return d(alphabet[idx]);
            })}

            {/* Konten Soal End */}

            {/* Jawaban Soal Start */}
            <div className="mb-4"></div>
            {/* Jawaban Soal End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoalPG;
