import {
  checkPredikatKeterampilan,
  checkPredikatPengetahuan,
  getDeskripsiKeterampilan,
  getDeskripsiPengetahuan,
  getDeskripsiSikapSosial,
} from "../../utilities/RaporUtils";

const SectionPengetahuanDanKeterampilanBukuInduk = ({ data, sikapsosial }) => {
  const predikat = data?.predikat;
  const nilaiMentah = data?.dataNilaiMentah;
  const filtered = nilaiMentah?.filter((item) => item?.rekapRombel?.rekap);
  let totalNilaiUS = 0;
  let jumlahNilaiUS = 0;
  // console.log(filtered);
  return (
    <>
      <h6 className="fs-14-ss fw-bold text-uppercase mb-4 ms-4">
        B. Pengetahuan dan Keterampilan
      </h6>
      <table className="w-100 table">
        <thead>
          <tr>
            <th
              className="text-center align-middle fw-bold fs-10-ss"
              style={{ width: "5%" }}
              rowSpan="2"
            >
              No
            </th>
            <th
              className="fw-bold fs-10-ss align-middle"
              style={{ width: "22%" }}
              rowSpan="2"
            >
              Mata Pelajaran
            </th>
            <th
              className="fw-bold fs-10-ss py-1 text-center"
              style={{ width: "25%" }}
              colSpan="2"
            >
              Pengetahuan
            </th>
            <th
              className="fw-bold fs-10-ss py-1 text-center"
              style={{ width: "25%" }}
              colSpan="2"
            >
              Keterampilan
            </th>
            <th
              className="fw-bold fs-10-ss py-1 text-center"
              style={{ width: "25%" }}
              colSpan="2"
            >
              Sikap
            </th>
          </tr>
          <tr>
            <th
              className="fw-bold fs-10-ss py-1 text-center"
              style={{ width: "22%" }}
            >
              Deskripsi
            </th>
            <th
              className="fw-bold fs-10-ss py-1 text-center"
              style={{ width: "3%" }}
            >
              Predikat
            </th>
            <th
              className="fw-bold fs-10-ss py-1 text-center"
              style={{ width: "22%" }}
            >
              Deskripsi
            </th>
            <th
              className="fw-bold fs-10-ss py-1 text-center"
              style={{ width: "3%" }}
            >
              Predikat
            </th>
            <th
              className="fw-bold fs-10-ss py-1 text-center"
              style={{ width: "22%" }}
            >
              Deskripsi
            </th>
            <th
              className="fw-bold fs-10-ss py-1 text-center"
              style={{ width: "3%" }}
            >
              Predikat
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.muatan?.map((item) => {
            return (
              <>
                <tr>
                  <td
                    className="align-text-top fs-10-ss fw-bold py-1"
                    colSpan="8"
                  >
                    {item?.nama ? item?.nama : "-"}
                  </td>
                </tr>
                {item?.mapelRapor?.map((mapel, idx) => {
                  const kkm = parseInt(mapel?.mataPelajaran?.kkm);
                  const kkmKeterampilan = parseInt(mapel?.kkm2);
                  const rekapMateriPengetahuan = filtered
                    ?.filter(
                      (item) =>
                        item.rekapRombel.rekap.mMateriId ==
                          mapel?.mataPelajaran?.materi?.id &&
                        item.rekapRombel.rekap.tipe != "keterampilan"
                    )
                    .sort((a, b) => b.nilai - a.nilai);
                  const rekapMateriKeterampilan = filtered
                    ?.filter(
                      (item) =>
                        item.rekapRombel.rekap.mMateriId ==
                          mapel?.mataPelajaran?.materi?.id &&
                        item.rekapRombel.rekap.tipe == "keterampilan"
                    )
                    .sort((a, b) => b.nilai - a.nilai);
                  return (
                    <tr>
                      <td className="align-text-top fs-10-ss text-center">
                        {idx + 1}
                      </td>
                      <td className="align-text-top fs-10-ss">
                        {mapel?.nama ? mapel?.nama : "-"}
                      </td>
                      <td className="align-text-top fs-10-ss">
                        {getDeskripsiPengetahuan(
                          mapel,
                          predikat,
                          rekapMateriPengetahuan[0]?.rekapRombel.rekap,
                          rekapMateriPengetahuan[
                            rekapMateriPengetahuan.length - 1
                          ]?.rekapRombel.rekap
                        )}
                      </td>
                      <td className="align-text-top fs-10-ss text-center text-uppercase">
                        {!mapel?.mataPelajaran?.nilaiIndividu?.nilai ||
                        !predikat
                          ? "-"
                          : checkPredikatPengetahuan(
                              mapel?.mataPelajaran?.nilaiIndividu?.nilai,
                              predikat
                            )}
                      </td>
                      <td className="align-text-top fs-10-ss">
                        {getDeskripsiKeterampilan(
                          mapel,
                          predikat,
                          rekapMateriKeterampilan[0]?.rekapRombel.rekap,
                          rekapMateriKeterampilan[
                            rekapMateriKeterampilan.length - 1
                          ]?.rekapRombel.rekap
                        )}
                      </td>
                      <td className="align-text-top fs-10-ss text-center text-uppercase">
                        {!mapel?.mataPelajaran?.nilaiIndividu
                          ?.nilaiKeterampilan || !predikat
                          ? "-"
                          : checkPredikatKeterampilan(
                              mapel?.mataPelajaran?.nilaiIndividu
                                ?.nilaiKeterampilan,
                              predikat
                            )}
                      </td>
                      <td className="align-text-top fs-10-ss">
                        {getDeskripsiSikapSosial(
                          mapel?.mataPelajaran?.sikapSiswa,
                          mapel?.mataPelajaran?.templateDeskripsi,
                          sikapsosial
                        )}
                      </td>
                      <td className="align-text-top fs-10-ss text-center text-uppercase">
                        {mapel?.mataPelajaran?.sikapSiswa?.predikat?.predikat ||
                          "-"}
                      </td>
                    </tr>
                  );
                })}
              </>
            );
          })}
        </tbody>
      </table>
      <h2 className="text-center">DAFTAR NILAI</h2>
      <table className="w-100 table">
        <thead>
          <tr>
            <th
              className="text-center align-middle fw-bold fs-12-ss"
              style={{ width: "5%" }}
              rowSpan="2"
            >
              No
            </th>
            <th
              className="fw-bold fs-12-ss align-middle"
              style={{ width: "30%" }}
              rowSpan="2"
            >
              Mata Pelajaran
            </th>
            <th
              className="fw-bold fs-12-ss py-1 text-center"
              style={{ width: "30%" }}
              colSpan="3"
            >
              Pengetahuan
            </th>
            <th
              className="fw-bold fs-12-ss py-1 text-center"
              style={{ width: "30%" }}
              colSpan="3"
            >
              Keterampilan
            </th>
          </tr>
          <tr>
            <th
              className="fw-bold fs-12-ss py-1 text-center"
              style={{ width: "8%" }}
            >
              KKM
            </th>
            <th
              className="fw-bold fs-12-ss py-1 text-center"
              style={{ width: "8%" }}
            >
              Nilai
            </th>
            <th
              className="fw-bold fs-12-ss py-1 text-center"
              style={{ width: "8%" }}
            >
              Predikat
            </th>
            <th
              className="fw-bold fs-12-ss py-1 text-center"
              style={{ width: "8%" }}
            >
              KKM
            </th>
            <th
              className="fw-bold fs-12-ss py-1 text-center"
              style={{ width: "8%" }}
            >
              Nilai
            </th>
            <th
              className="fw-bold fs-12-ss py-1 text-center"
              style={{ width: "8%" }}
            >
              Predikat
            </th>
          </tr>
        </thead>
        {data?.muatan?.map((d, idx) => {
          return (
            <tbody>
              <tr>
                <td
                  className="align-text-top fs-12-ss fw-bold py-1"
                  colSpan="8"
                >
                  {!d?.nama ? `-` : `${d?.nama}`}
                </td>
              </tr>
              {d?.mapelRapor?.map((data, idx) => {
                return (
                  <tr>
                    <td className="align-text-top fs-12-ss text-center">
                      {idx + 1}
                    </td>
                    <td className="align-text-top fs-12-ss">
                      {!data?.nama ? `-` : `${data?.nama}`}
                    </td>
                    <td className="align-text-top fs-12-ss text-center text-uppercase">
                      {!data?.mataPelajaran?.kkm
                        ? `-`
                        : `${data?.mataPelajaran?.kkm}`}
                    </td>
                    <td className="align-text-top fs-12-ss text-center text-uppercase">
                      {!data?.mataPelajaran?.nilaiIndividu?.nilai
                        ? `-`
                        : `${data?.mataPelajaran?.nilaiIndividu?.nilai}`}
                    </td>
                    <td className="align-text-top fs-12-ss text-center text-uppercase">
                      {!data?.mataPelajaran?.nilaiIndividu?.nilai || !predikat
                        ? `-`
                        : `
                     ${checkPredikatPengetahuan(
                       data?.mataPelajaran?.nilaiIndividu?.nilai,
                       predikat
                     )}`}
                    </td>
                    <td className="align-text-top fs-12-ss text-center text-uppercase">
                      {!data?.kkm2 ? `-` : `${data?.kkm2}`}
                    </td>
                    <td className="align-text-top fs-12-ss text-center text-uppercase">
                      {!data?.mataPelajaran?.nilaiIndividu?.nilaiKeterampilan
                        ? `-`
                        : `${data?.mataPelajaran?.nilaiIndividu?.nilaiKeterampilan}`}
                    </td>
                    <td className="align-text-top fs-12-ss text-center text-uppercase">
                      {!data?.mataPelajaran?.nilaiIndividu?.nilaiKeterampilan ||
                      !predikat
                        ? `-`
                        : `
                     ${checkPredikatKeterampilan(
                       data?.mataPelajaran?.nilaiIndividu?.nilaiKeterampilan,
                       predikat
                     )}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          );
        })}
      </table>
      {data?.isUS && (
        <>
          <h6 className="fs-14-ss fw-bold text-uppercase mb-4 ms-4">
            I. Ujian Sekolah
          </h6>
          <table className="w-100 table">
            <thead>
              <tr>
                <th
                  className="text-center align-middle fw-bold fs-12-ss"
                  style={{ width: "5%" }}
                >
                  No
                </th>
                <th
                  className="align-middle fw-bold fs-12-ss"
                  style={{ width: "80%" }}
                >
                  Mata Pelajaran
                </th>
                <th
                  className="text-center align-middle fw-bold fs-12-ss"
                  style={{ width: "15%" }}
                >
                  Nilai
                </th>
              </tr>
            </thead>
            {data?.muatan?.map((d, idx) => {
              return (
                <tbody>
                  {d?.mapelRapor
                    ?.filter(
                      (item) => item?.mataPelajaran?.nilaiIndividu?.nilaiUS
                    )
                    ?.map((data, idx) => {
                      totalNilaiUS +=
                        data.mataPelajaran?.nilaiIndividu?.nilaiUS.nilai || 0;
                      jumlahNilaiUS += 1;
                      return (
                        <tr>
                          <td className="align-text-top fs-12-ss text-center">
                            {idx + 1}
                          </td>
                          <td className="align-text-top fs-12-ss">
                            {!data?.nama ? `-` : `${data?.nama}`}
                          </td>
                          <td className="align-text-top fs-12-ss text-center text-uppercase">
                            {!data.mataPelajaran?.nilaiIndividu?.nilaiUS.nilai
                              ? `-`
                              : `${data.mataPelajaran?.nilaiIndividu?.nilaiUS.nilai}`}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              );
            })}
            <tr>
              <th className="fw-bold fs-12-ss" colSpan="2">
                Rata-rata
              </th>
              <th className="text-center align-middle fw-bold fs-12-ss">
                {totalNilaiUS / jumlahNilaiUS}
              </th>
            </tr>
          </table>
        </>
      )}
    </>
  );
};

export default SectionPengetahuanDanKeterampilanBukuInduk;
