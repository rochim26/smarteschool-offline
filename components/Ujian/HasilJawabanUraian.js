import React from "react";
import useUser from "../../hooks/useUser";

const HasilJawabanUraian = () => {
  const { user } = useUser();
  return (
    <div className="detail-jawaban-peserta-pg card card-ss bg-white rounded-ss">
      <div className="card-header card-header-ss p-4 border-bottom border-light-secondary-ss">
        <span className="label-ss px-4 fw-bold bg-soft-secondary color-secondary rounded-pill">
          Belum Dinilai
        </span>
        {/* <span className="label-ss px-4 fw-bold bg-soft-success color-success rounded-pill">
          Benar
        </span> */}
        {/* <span className="label-ss px-4 fw-bold bg-soft-danger color-danger rounded-pill">
          Salah
        </span> */}
      </div>
      <div className="card-body p-4">
        {/* Info Soal Start */}

        <div className="d-flex align-items-md-center justify-content-between flex-md-row flex-column mb-4">
          <div className="d-flex align-items-center justify-content-md-start justify-content-between">
            <h6 className="fs-18-ss fw-bold color-dark me-4 mb-0">
              Soal 1 / 40
            </h6>
            {user?.role == "guru" && (
              <>
                <span className="label-ss rounded-pill bg-light-primary color-primary fs-12-ss fw-bold">
                  00 : 01 : 00 : 00
                </span>
              </>
            )}
          </div>
          <hr className="d-md-none hr-ss" />
          <div className="d-flex justify-content-center align-items-center justify-content-md-start justify-content-between">
            {user?.role == "guru" && (
              <>
                <span
                  className="outline-primary-ss rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "75px",
                    height: "25px",
                  }}
                >
                  KD 3.1
                </span>
                <span
                  className="outline-primary-ss rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center me-md-3 me-auto"
                  style={{
                    width: "75px",
                    height: "25px",
                  }}
                >
                  C1
                </span>
              </>
            )}

            <span
              className="bg-primary text-white rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center"
              style={{
                width: "75px",
                height: "25px",
              }}
            >
              4 Poin
            </span>
            {/* <span
              className="bg-danger text-white rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center"
              style={{
                width: "75px",
                height: "25px",
              }}
            >
              0 Poin
            </span> */}
          </div>
        </div>
        {/* Info Soal End */}

        {/* Konten Soal Start */}
        <div className="mb-4">
          <p className="m-0">
            Apa yang dimaksud dengan unsur intrinsik dan unsur ekstrinsik?
            Jelaskan!
          </p>
        </div>
        {/* Konten Soal End */}

        {/* Jawaban Soal Start */}
        <div className="mb-4">
          <h6 className="fs-18-ss fw-bold color-dark me-4 mb-4">Jawaban</h6>
          <div className="mb-3">
            <div className="row">
              <div className="col-md-6">
                <div className="list-jawaban-soal rounded-ss bg-soft-success border border-success-ss px-4 py-3 d-flex align-items-center mb-3">
                  <div className="konten-list-jawaban-soal">
                    <p className="mb-0">Ya</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="list-jawaban-soal rounded-ss border border-light-secondary-ss px-4 py-3 d-flex align-items-center mb-3">
                  <div className="konten-list-jawaban-soal">
                    <p className="mb-0">Tidak</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="konten-pembahasan-soal mb-2">
            <p>
              a. Unsur intrinsik: unsur yang membangun dari dalam karya
              tersebut, seperti tema, alur, penokohan, dan sebagainya
            </p>
            <p className="mb-0">
              b. Unsur ekstrinsik: unsur yang membangun di luar karya tersebut,
              seperti budaya dan latar belakang pengarangnya.
            </p>
          </div>
        </div>

        {/* Jawaban Soal End */}

        {/* Pembahasan Soal Start */}
        <div className="mb-4">
          <h6 className="fs-18-ss fw-bold color-dark me-4 mb-4">Pembahasan</h6>
          <div className="konten-pembahasan-soal">
            <p>
              Yang dimaksud dengan unsur Intrinsik dan unsur Ekstrinsik adalah
            </p>
            <p>
              a. Unsur Intrinsik: unsur yang membangun dari dalam karya
              tersebut, seperti tema, alur, penokohan, dan sebagainya
            </p>
            <p className="mb-0">
              b. Unsur Ekstrinsik: unsur yang membangun di luar karya tersebut,
              seperti budaya dan latar belakang pengarangnya.
            </p>
          </div>
        </div>
        {/* Pembahasan Soal End */}
        {/* Rubrik Start */}

        {user?.role == "guru" && (
          <>
            <h6 className="fs-18-ss fw-bold color-dark me-4 mb-4">Rubrik</h6>
            <div className="rubrik-container">
              <div className="rubrik-items form-check-ss d-flex mb-3">
                <input
                  className="form-check-input form-check-input-salah  me-3 p-2"
                  type="checkbox"
                  value=""
                  id="rubrikSalah"
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
                />
                <label
                  className="form-check form-check-label-salah p-4 rounded-ss border border-light-secondary-ss w-100"
                  htmlFor="rubrikSalah"
                >
                  <span
                    className="bg-danger text-white rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: "75px",
                      height: "25px",
                    }}
                  >
                    0 Poin
                  </span>
                  <p className="mb-0">Jawaban Salah</p>
                </label>
              </div>
              <div className="rubrik-items form-check-ss d-flex mb-3">
                <input
                  className="form-check-input me-3 p-2"
                  type="checkbox"
                  value=""
                  id="rubrik1"
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
                />
                <label
                  className="form-check-label p-4 rounded-ss border border-light-secondary-ss w-100"
                  htmlFor="rubrik1"
                >
                  <span
                    className="bg-primary text-white rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: "75px",
                      height: "25px",
                    }}
                  >
                    5 Poin
                  </span>
                  <p className="mb-0">Jelaskan unsur Intrinsik</p>
                </label>
              </div>
              <div className="rubrik-items form-check-ss d-flex mb-3">
                <input
                  className="form-check-input me-3 p-2"
                  type="checkbox"
                  value=""
                  id="rubrik2"
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
                />
                <label
                  className="form-check-label p-4 rounded-ss border border-light-secondary-ss w-100"
                  htmlFor="rubrik2"
                >
                  <span
                    className="bg-primary text-white rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: "75px",
                      height: "25px",
                    }}
                  >
                    5 Poin
                  </span>
                  <p className="mb-0">Jelaskan unsur Ekstrinsik</p>
                </label>
              </div>
            </div>
          </>
        )}

        {/* Rubrik End */}
      </div>
    </div>
  );
};

export default HasilJawabanUraian;
