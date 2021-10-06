import { momentPackage } from "../../utilities/HelperUtils";

const SectionIndetitasPesertaDidik = ({
  isReadOnly = false,
  siswa,
  sekolah,
  ta,
}) => {
  return (
    <>
      <div className="pt-4" style={{ minHeight: "1100px" }}>
        <div className="row text-center mb-4">
          <div className="col-md-12">
            <h6 className="fs-14-ss fw-bold text-uppercase mb-0">
              Indetitas Peserta Didik
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <table className="w-100">
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">1.</div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">Nama</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.nama ? `-` : `${siswa?.nama}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">2.</div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">NISN / NIS</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.nisn ? `-` : `${siswa?.profil?.nisn}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">3.</div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">Tempat, Tanggal Lahir</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.tempatLahir || !siswa?.profil?.tanggalLahir
                      ? `-`
                      : `${siswa?.profil?.tempatLahir}, ${momentPackage(
                          siswa?.profil?.tanggalLahir
                        ).format("DD MMMM YYYY")}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">4.</div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">Jenis Kelamin</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.genderText ? `-` : `${siswa?.genderText}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">5.</div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">Agama</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.agama ? `-` : `${siswa?.profil?.agama}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">6.</div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">Status dalam Keluarga</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.statusKeluarga
                      ? `-`
                      : `${siswa?.profil?.statusKeluarga}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">7.</div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">Anak ke</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.anakKe ? `-` : `${siswa?.profil?.anakKe}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">8.</div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss"> Alamat Peserta Didik</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.alamat ? `-` : `${siswa?.profil?.alamat}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">9.</div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">Nomor Telepon</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.whatsapp ? `-` : `${siswa?.whatsapp}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">10.</div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">Sekolah Asal</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.asalSekolah
                      ? `-`
                      : `${siswa?.profil?.asalSekolah}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">11.</div>
                </td>
                <td colSpan="3">
                  <div className="mb-2 fs-12-ss">Sekolah Asal</div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss"></div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">Di kelas</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.kelasDiterima
                      ? `-`
                      : `${siswa?.profil?.kelasDiterima}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss"></div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">Pada tanggal</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.tanggalMasuk
                      ? `-`
                      : `${momentPackage(siswa?.profil?.tanggalMasuk).format(
                          "DD MMMM YYYY"
                        )}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">12.</div>
                </td>
                <td colSpan="3">
                  <div className="mb-2 fs-12-ss">Nama Orang Tua</div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss"></div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">a. Ayah</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.namaAyah
                      ? `-`
                      : `${siswa?.profil?.namaAyah}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss"></div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">b. Ibu</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.namaIbu
                      ? `-`
                      : `${siswa?.profil?.namaIbu}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">13.</div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">Alamat Orang Tua</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.alamatAyah
                      ? `-`
                      : `${siswa?.profil?.alamatAyah}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">14.</div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">Nomor Telepon Rumah</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.telpRumah
                      ? `-`
                      : `${siswa?.profil?.telpRumah}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">15.</div>
                </td>
                <td colSpan="3">
                  <div className="mb-2 fs-12-ss">Pekerjaan Orang Tua</div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss"></div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">a. Ayah</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.pekerjaanAyah
                      ? `-`
                      : `${siswa?.profil?.pekerjaanAyah}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss"></div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">b. Ibu</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.pekerjaanIbu
                      ? `-`
                      : `${siswa?.profil?.pekerjaanIbu}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">16.</div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss"> Nama Wali Peserta Didik </div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.namaWali
                      ? `-`
                      : `${siswa?.profil?.namaWali}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">17.</div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">Alamat Wali Peserta Didik</div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.alamatWali
                      ? `-`
                      : `${siswa?.profil?.alamatWali}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">18.</div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">
                    Nomor Telpon Wali Peserta Didik
                  </div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.telpWali
                      ? `-`
                      : `${siswa?.profil?.telpWali}`}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-text-top" style={{ width: "3%" }}>
                  <div className="mb-2 fs-12-ss">19.</div>
                </td>
                <td className="align-text-top" style={{ width: "45%" }}>
                  <div className="mb-2 fs-12-ss">
                    Pekerjaan Wali Peserta Didik
                  </div>
                </td>
                <td className="align-text-top" style={{ width: "9%" }}>
                  <div className="mb-2 fs-12-ss">:</div>
                </td>
                <td className="align-text-top" style={{ width: "43%" }}>
                  <div className="mb-2 fs-12-ss text-uppercase">
                    {!siswa?.profil?.pekerjaanWali
                      ? `-`
                      : `${siswa?.profil?.pekerjaanWali}`}
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div className="col-md-12 mt-4">
            <div className="row align-items-center justify-content-around">
              <div className="col-3">
                <img
                  src={siswa?.avatar || "/img/cover-sma-smk.svg"}
                  alt="cover-foto-rapor"
                  className="img-fluid img-fit-cover rounded-ss"
                  style={{ width: "115px", height: "150px" }}
                />
              </div>
              <div className="col-3 d-flex align-items-center">
                <div>
                  <h5 className="fs-12-ss mb-2">
                    {sekolah?.provinsi},{" "}
                    {momentPackage().format("DD MMMM YYYY")}
                  </h5>
                  <h5 className="fs-12-ss" style={{ marginBottom: "85px" }}>
                    Kepala Sekolah
                  </h5>
                  <h5 className="fs-12-ss fw-bold text-uppercase mb-1">
                    {ta?.namaKepsek}
                  </h5>
                  <h5 className="fs-12-ss text-uppercase">
                    NIP. {ta?.nipKepsek}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionIndetitasPesertaDidik;
