import React from "react";
import useUser from "../../hooks/useUser";

const HasilJawabanPG = () => {
  const { user } = useUser();
  return (
    <div className="detail-jawaban-peserta-pg card card-ss bg-white rounded-ss">
      <div className="card-header card-header-ss p-4 border-bottom border-light-secondary-ss">
        <span className="label-ss px-4 fw-bold bg-soft-success color-success rounded-pill">
          Benar
        </span>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            maiores natus, officiis, fugiat, officia asperiores ratione adipisci
            aliquam delectus exercitationem assumenda accusamus molestiae.
            Voluptatum quos animi deserunt quisquam! Modi, a?
          </p>
        </div>
        {/* Konten Soal End */}

        {/* Jawaban Soal Start */}
        <div className="mb-4">
          <div className="list-jawaban-soal rounded-ss bg-soft-success border border-success-ss px-4 py-3 d-flex align-items-center mb-3">
            <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">A</h6>
            <div className="konten-list-jawaban-soal">
              <p className="mb-0">Jawaban A</p>
            </div>
          </div>
          <div className="list-jawaban-soal rounded-ss border border-light-secondary-ss px-4 py-3 d-flex align-items-center mb-3">
            <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">B</h6>
            <div className="konten-list-jawaban-soal">
              <p className="mb-0">Jawaban B</p>
            </div>
          </div>
          <div className="list-jawaban-soal rounded-ss border border-light-secondary-ss px-4 py-3 d-flex align-items-center mb-3">
            <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">C</h6>
            <div className="konten-list-jawaban-soal">
              <p className="mb-0">Jawaban C</p>
            </div>
          </div>
          <div className="list-jawaban-soal rounded-ss border border-light-secondary-ss px-4 py-3 d-flex align-items-center mb-3">
            <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">D</h6>
            <div className="konten-list-jawaban-soal">
              <p className="mb-0">Jawaban D</p>
            </div>
          </div>
        </div>

        {/* Jawaban Soal End */}

        {/* Pembahasan Soal Start */}
        <h6 className="fs-18-ss fw-bold color-dark me-4 mb-4">Pembahasan</h6>
        <div className="konten-pembahasan-soal mb-2">
          <p className="mb-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            optio maxime explicabo magni ullam cumque! Cum nam quibusdam
            aspernatur laborum facilis nostrum officia autem sequi deserunt
            quos, consectetur molestiae beatae.
          </p>
        </div>
        {/* Ini Harus Ada Buat yang PG !!! */}
        <p className="color-dark fw-bold mb-0">
          Jadi Jawaban yang tepat adalah A.
        </p>
        {/* Pembahasan Soal End */}
      </div>
    </div>
  );
};

export default HasilJawabanPG;
