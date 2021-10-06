import React from "react";
import TextareaAutosize from "react-textarea-autosize";

const SoalMenjodohkan = ({ soalSiswa }) => {
  return (
    <div
      className="container ujian-content-container py-md-4 py-3"
      style={{ marginTop: "83px" }}
    >
      <div className="row">
        <div className="col-md-12 mb-5">
          <div className="card card-ss p-4 mb-5">
            <h4 className="fw-bold color-dark mb-0">
              Jodohkan pertanyaan dengan jawaban yang tepat.
            </h4>
            <ul className="list-soal-menjodohkan list-group list-group-flush">
              {soalSiswa?.soal?.soalMenjodohkan?.map((soal, idx) => {
                return (
                  <li className="list-group-item">
                    <span
                      className="px-3 border border-primary-ss rounded-pill color-primary fs-14-ss fw-extrabold"
                      style={{ paddingTop: "2px", paddingBottom: "2px" }}
                    >
                      Soal {idx + 1}
                    </span>
                    <div className="row mt-3">
                      <div
                        className="col-md-6"
                        dangerouslySetInnerHTML={{ __html: soal?.soal }}
                      />
                      <div className="col-md-6 mt-md-0 mt-3">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          placeholder="Pilih jawaban"
                        >
                          <option hidden>Pilih jawaban</option>
                          {soalSiswa?.soal?.pilihanMenjodohkan?.map(
                            (pilihan, idx) => {
                              return <option value={idx}>{pilihan}</option>;
                            }
                          )}
                        </select>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoalMenjodohkan;
