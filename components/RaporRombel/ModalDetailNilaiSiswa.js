import React from "react";
import {
  checkLabelStatusTuntas,
  checkStatusTuntas,
  getWarnaNilai,
} from "../../utilities/RaporUtils";
import NewModal from "../Shared/NewModal/NewModal";

const ModalDetailNilaiSiswa = ({ data, page }) => {
  return (
    <div>
      <NewModal
        modalId="modalDetailNilaiSiswa"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Detail Nilai Pengetahuan</h4>
            <span className="fs-6 fw-normal">{data?.siswa?.nama}</span>
          </>
        }
        content={
          <>
            <h5 className="fs-18-ss color-dark fw-bold">{data?.mapel?.nama}</h5>
            <span
              className={
                page != "keterampilan"
                  ? checkLabelStatusTuntas(data?.nilaiAkhir, data?.mapel?.kkm)
                  : checkLabelStatusTuntas(data?.rataData, data?.mapel?.kkm)
              }
            >
              {page != "keterampilan"
                ? checkStatusTuntas(data?.nilaiAkhir, data?.mapel?.kkm)
                : checkStatusTuntas(data?.rataData, data?.mapel?.kkm)}
            </span>

            {page != "keterampilan" ? (
              <>
                <div className="">
                  <div className="pt-2">
                    <h5 className="fs-18-ss color-dark fw-bold title-border my-4">
                      Rata-rata
                    </h5>
                  </div>
                  <div className="row gy-3">
                    <div className="col-md-6">
                      <div
                        className="p-3 text-center rounded-ss"
                        style={{ background: "#f8f8fb" }}
                      >
                        <p className="fs-16-ss fw-bold mb-1">Tugas</p>
                        <h5
                          className={`color-${getWarnaNilai(
                            data?.rata?.toFixed(2),
                            parseInt(data?.mapel?.kkm)
                          )} fw-extrabold mb-0`}
                        >
                          {data?.rata?.toFixed(2) || 0}
                        </h5>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="p-3 text-center rounded-ss"
                        style={{ background: "#f8f8fb" }}
                      >
                        <p className="fs-16-ss fw-bold mb-1 ">
                          Penilaian Harian
                        </p>
                        <h5
                          className={`color-${getWarnaNilai(
                            data?.rataUjian?.toFixed(2),
                            parseInt(data?.mapel?.kkm)
                          )} fw-extrabold mb-0`}
                        >
                          {data?.rataUjian?.toFixed(2) || 0}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="pt-2">
                    <h5 className="fs-18-ss color-dark fw-bold title-border my-4">
                      Nilai Penilaian
                    </h5>
                  </div>
                  <div className="row gy-3">
                    <div className="col-md-6">
                      <div
                        className="p-3 text-center rounded-ss"
                        style={{ background: "#f8f8fb" }}
                      >
                        <p className="fs-16-ss fw-bold mb-1">Tengah Semester</p>
                        <h5
                          className={`color-${getWarnaNilai(
                            data?.ujian?.nilaiUTS?.nilai?.toFixed(2),
                            parseInt(data?.mapel?.kkm)
                          )} fw-extrabold mb-0`}
                        >
                          {data?.ujian?.nilaiUTS?.nilai?.toFixed(2) || 0}
                        </h5>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="p-3 text-center rounded-ss"
                        style={{ background: "#f8f8fb" }}
                      >
                        <p className="fs-16-ss fw-bold mb-1">Akhir Semester</p>
                        <h5
                          className={`color-${getWarnaNilai(
                            data?.ujian?.nilaiUAS?.nilai?.toFixed(2),
                            parseInt(data?.mapel?.kkm)
                          )} fw-extrabold mb-0`}
                        >
                          {data?.ujian?.nilaiUAS?.nilai?.toFixed(2) || 0}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="pt-2">
                    <h5 className="fs-18-ss color-dark fw-bold title-border my-4">
                      Hasil Pengolahan
                    </h5>
                  </div>
                  <div className="row gy-3">
                    <div className="col-md-6">
                      <div
                        className="p-3 text-center rounded-ss"
                        style={{ background: "#f8f8fb" }}
                      >
                        <p className="fs-16-ss fw-bold mb-1">KKM</p>
                        <h5 className={`color-primary fw-extrabold mb-0`}>
                          {data?.mapel?.kkm || 0}
                        </h5>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="p-3 text-center rounded-ss"
                        style={{ background: "#f8f8fb" }}
                      >
                        <p className="fs-16-ss fw-bold mb-1">Nilai Akhir</p>
                        <h5
                          className={`color-${getWarnaNilai(
                            data?.nilaiAkhir?.toFixed(2),
                            parseInt(data?.mapel?.kkm)
                          )} fw-extrabold mb-0`}
                        >
                          {data?.nilaiAkhir?.toFixed(2) || 0}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="">
                  <div className="pt-2">
                    <h5 className="fs-18-ss color-dark fw-bold title-border my-4">
                      Nilai Keterampilan
                    </h5>
                  </div>
                  <div className="row gy-3">
                    <div className="col-md-6">
                      <div
                        className="p-3 text-center rounded-ss"
                        style={{ background: "#f8f8fb" }}
                      >
                        <p className="fs-16-ss fw-bold mb-1">Praktik</p>
                        <h5
                          className={`color-${getWarnaNilai(
                            data?.praktik?.toFixed(2),
                            parseInt(data?.mapel?.kkm)
                          )} fw-extrabold mb-0`}
                        >
                          {data?.praktik?.toFixed(2) || 0}
                        </h5>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="p-3 text-center rounded-ss"
                        style={{ background: "#f8f8fb" }}
                      >
                        <p className="fs-16-ss fw-bold mb-1">Produk</p>
                        <h5
                          className={`color-${getWarnaNilai(
                            data?.produk?.toFixed(2),
                            parseInt(data?.mapel?.kkm)
                          )} fw-extrabold mb-0`}
                        >
                          {data?.produk?.toFixed(2) || 0}
                        </h5>
                      </div>
                    </div>
                    <div className="col-md-6 mt-3">
                      <div
                        className="p-3 text-center rounded-ss"
                        style={{ background: "#f8f8fb" }}
                      >
                        <p className="fs-16-ss fw-bold mb-1">Proyek</p>
                        <h5
                          className={`color-${getWarnaNilai(
                            data?.proyek?.toFixed(2),
                            parseInt(data?.mapel?.kkm)
                          )} fw-extrabold mb-0`}
                        >
                          {data?.proyek?.toFixed(2) || 0}
                        </h5>
                      </div>
                    </div>
                    <div className="col-md-6 mt-3">
                      <div
                        className="p-3 text-center rounded-ss"
                        style={{ background: "#f8f8fb" }}
                      >
                        <p className="fs-16-ss fw-bold mb-1">Portofolio</p>
                        <h5
                          className={`color-${getWarnaNilai(
                            data?.portofolio?.toFixed(2),
                            parseInt(data?.mapel?.kkm)
                          )} fw-extrabold mb-0`}
                        >
                          {data?.portofolio?.toFixed(2) || 0}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="pt-2">
                    <h5 className="fs-18-ss color-dark fw-bold title-border my-4">
                      Rata-rata
                    </h5>
                  </div>
                  <div className="row gy-3">
                    <div className="col-md-6">
                      <div
                        className="p-3 text-center rounded-ss"
                        style={{ background: "#f8f8fb" }}
                      >
                        <p className="fs-16-ss fw-bold mb-1">KKM</p>
                        <h5 className={`color-primary fw-extrabold mb-0`}>
                          {data?.mapel?.kkm || 0}
                        </h5>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="p-3 text-center rounded-ss"
                        style={{ background: "#f8f8fb" }}
                      >
                        <p className="fs-16-ss fw-bold mb-1">Nilai Akhir</p>
                        <h5
                          className={`color-${getWarnaNilai(
                            data?.rataData?.toFixed(2),
                            parseInt(data?.mapel?.kkm)
                          )} fw-extrabold mb-0`}
                        >
                          {data?.rataData?.toFixed(2) || 0}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        }
        removeFooter={true}
      />
    </div>
  );
};

export default ModalDetailNilaiSiswa;
