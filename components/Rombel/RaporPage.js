import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { ssURL } from "../../client/clientAxios";
import { deleteTimeline } from "../../client/TimelineClient";
import Navbar from "../../components/Shared/Navbar/Navbar";
import useUser from "../../hooks/useUser";
import DaftarEkstrakurikuler from "./DaftarEkstrakurikuler";
import DaftarKeteranganKelulusan from "./DaftarKeteranganKelulusan";
import DaftarKeteranganPkl from "./DaftarKeteranganPkl";
import DaftarNilaiKeterampilan from "./DaftarNilaiKeterampilan";
import DaftarNilaiPengetahuan from "./DaftarNilaiPengetahuan";
import DaftarNilaiPengetahuanWalas from "./DaftarNilaiPengetahuanWalas";
import DaftarNilaiSikap from "./DaftarNilaiSikap";
import DaftarRapor from "./DaftarRapor";
import DaftarSikap from "./DaftarSikap";

const TugasPage = ({
  subnav,
  id,
  setInitialFormData,
  setStateEditData,
  tugasData,
  isLoading,
  getDetailRombelData,
  setIsDuplicate,
  timelineData,
  jadwalMengajar,
  keterangan,
  industri,
  sikapsosial,
  sikapspiritual,
  keteranganRombel,
  totalMapel,
  kkm,
}) => {
  const { user } = useUser();
  const [isTugasLoading, setIsTugasLoading] = useState(isLoading);
  const [activeSubTugas, setActiveSubTugas] = useState([]);
  const {
    tugasDraf,
    tugasSaatIni,
    tugasSelesai,
    tugasTerjadwal,
    tugasTerperiksa,
  } = tugasData || {};
  const kelasRombel = keteranganRombel?.nama;
  const rombel_id = keteranganRombel?.id;
  const deleteTimelineData = (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data } = await deleteTimeline(id);
        if (data) {
          toast.success(data?.message);
          getDetailRombelData();
        }
      }
    });
  };

  const getActiveSubTugasData = () => {
    let data = [];
    const tugasDataSiswa = timelineData?.timeline?.filter(
      (data) => data.tipe === "tugas"
    );

    if (subnav === "saat-ini" || !subnav) {
      if (user?.role === "guru") {
        data = tugasSaatIni;
      } else {
        data = tugasDataSiswa?.filter((data) => !data.dikumpulkan);
      }
    } else if (subnav === "terjadwal") {
      data = tugasTerjadwal;
    } else if (subnav === "sudah-selesai") {
      if (user?.role === "guru") {
        data = tugasSelesai;
      } else {
        data = tugasDataSiswa?.filter((data) => data.dikumpulkan === 1);
      }
    } else if (subnav === "terperiksa") {
      data = tugasTerperiksa;
    } else {
      data = tugasDraf;
    }

    setActiveSubTugas(data);
  };

  const navItems = [
    {
      url: `${ssURL}/rombel/[id]?nav=rapor&subnav=nilai-pengetahuan`,
      as: `${ssURL}/rombel/${id}?nav=rapor&subnav=nilai-pengetahuan`,
      text: "Nilai Pengetahuan",
      active: subnav == "nilai-pengetahuan" || subnav == undefined,
      dataJoyride: "nilai-pengetahuan",
    },
    user?.role === "guru" && {
      url: `${ssURL}/rombel/[id]?nav=rapor&subnav=nilai-keterampilan`,
      as: `${ssURL}/rombel/${id}?nav=rapor&subnav=nilai-keterampilan`,
      text: "Nilai Keterampilan",
      active: subnav == "nilai-keterampilan",
      dataJoyride: "nilai-keterampilan",
    },
    {
      url: `${ssURL}/rombel/[id]?nav=rapor&subnav=nilai-sikap`,
      as: `${ssURL}/rombel/${id}?nav=rapor&subnav=nilai-sikap`,
      text: "Nilai Sikap",
      active: subnav == "nilai-sikap",
      dataJoyride: "nilai-sikap",
    },
  ];

  useEffect(() => {
    if (tugasData) {
      setIsTugasLoading(true);
      setTimeout(() => {
        getActiveSubTugasData();
        setIsTugasLoading(false);
      }, 350);
    }
  }, [subnav, tugasData]);

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-12">
          {jadwalMengajar?.rombel?.mUserId == user?.id ? (
            <>
              <div className="subnav-rapor card card-ss mb-4">
                <div className="d-flex flex-column flex-lg-row align-items-lg-center">
                  <div className="dropdown dropdown-ss dropdown-subnav-rapor d-flex flex-column">
                    <Link
                      href={`${ssURL}/rombel/[id]?nav=rapor`}
                      as={`${ssURL}/rombel/${id}?nav=rapor`}
                    >
                      <a
                        className={`subnav-link py-md-4 py-3 mx-4 fw-bold color-secondary ${
                          !subnav && "active"
                        }`}
                      >
                        Nilai
                      </a>
                    </Link>
                    {/* <ul
                      className="dropdown-menu dropdown-menu-ss my-1"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li>
                        <Link
                          href={`${ssURL}/rombel/[id]?nav=rapor&subnav=nilai-pengetahuan`}
                          as={`${ssURL}/rombel/${id}?nav=rapor&subnav=nilai-pengetahuan`}
                        >
                          <a
                            className={`dropdown-item pointer ${
                              (subnav == "nilai-pengetahuan" || !subnav) &&
                              "active"
                            }`}
                          >
                            <span>Nilai Pengetahuan</span>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${ssURL}/rombel/[id]?nav=rapor&subnav=nilai-keterampilan`}
                          as={`${ssURL}/rombel/${id}?nav=rapor&subnav=nilai-keterampilan`}
                        >
                          <a
                            className={`dropdown-item pointer ${
                              subnav == "nilai-keterampilan" && "active"
                            }`}
                          >
                            <span>Nilai Keterampilan</span>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${ssURL}/rombel/[id]?nav=rapor&subnav=nilai-sikap`}
                          as={`${ssURL}/rombel/${id}?nav=rapor&subnav=nilai-sikap`}
                        >
                          <a
                            className={`dropdown-item pointer ${
                              subnav == "nilai-sikap" && "active"
                            }`}
                          >
                            <span>Nilai Sikap</span>
                          </a>
                        </Link>
                      </li>
                    </ul> */}
                  </div>
                  <Link
                    href={`${ssURL}/rombel/[id]?nav=rapor&subnav=sikap`}
                    as={`${ssURL}/rombel/${id}?nav=rapor&subnav=sikap`}
                  >
                    <a
                      className={`subnav-link py-md-4 py-3 mx-4 fw-bold color-secondary ${
                        subnav == "sikap" && "active"
                      }`}
                    >
                      Sikap Rapor
                    </a>
                  </Link>
                  <div className="dropdown dropdown-ss dropdown-subnav-rapor d-flex flex-column">
                    <a
                      className={`dropdown-toggle subnav-link py-md-4 py-3 mx-4 fw-bold color-secondary ${
                        (subnav == "keterangan-kelulusan" ||
                          subnav == "keterangan-pkl") &&
                        "active"
                      }`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Keterangan
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-ss my-1"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li>
                        <Link
                          href={`${ssURL}/rombel/[id]?nav=rapor&subnav=keterangan-kelulusan`}
                          as={`${ssURL}/rombel/${id}?nav=rapor&subnav=keterangan-kelulusan`}
                        >
                          <a
                            className={`dropdown-item pointer ${
                              subnav == "keterangan-kelulusan" && "active"
                            }`}
                          >
                            <span>Keterangan Kelulusan</span>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${ssURL}/rombel/[id]?nav=rapor&subnav=keterangan-pkl`}
                          as={`${ssURL}/rombel/${id}?nav=rapor&subnav=keterangan-pkl`}
                        >
                          <a
                            className={`dropdown-item pointer ${
                              subnav == "keterangan-pkl" && "active"
                            }`}
                          >
                            <span>Keterangan PKL</span>
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* <Link
                    href={`${ssURL}/rombel/[id]?nav=rapor&subnav=ekstrakurikuler`}
                    as={`${ssURL}/rombel/${id}?nav=rapor&subnav=ekstrakurikuler`}
                  >
                    <a
                      className={`subnav-link py-md-4 py-3 mx-4 fw-bold color-secondary ${
                        subnav == "ekstrakurikuler" && "active"
                      }`}
                    >
                      Ekstrakurikuler
                    </a>
                  </Link> */}
                  <Link
                    href={`${ssURL}/rombel/[id]?nav=rapor&subnav=lihat-rapor`}
                    as={`${ssURL}/rombel/${id}?nav=rapor&subnav=lihat-rapor`}
                  >
                    <a
                      className={`subnav-link py-md-4 py-3 mx-4 fw-bold color-secondary ${
                        subnav == "lihat-rapor" && "active"
                      }`}
                    >
                      Lihat Rapor
                    </a>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <Navbar nav={navItems} />
          )}
        </div>
        <div className="col-md-12">
          {(subnav == "nilai-pengetahuan" || !subnav) && (
            <>
              {jadwalMengajar?.rombel?.mUserId == user?.id ? (
                <DaftarNilaiPengetahuanWalas
                  keterangan={keterangan}
                  rombel_id={id}
                  kkm={kkm}
                  totalMapel={totalMapel}
                />
              ) : (
                <DaftarNilaiPengetahuan
                  keterangan={keterangan}
                  rombel_id={id}
                  kkm={jadwalMengajar?.mataPelajaran?.kkm}
                  mapelId={jadwalMengajar?.mataPelajaran?.id}
                />
              )}
            </>
          )}
          {subnav == "nilai-keterampilan" && (
            <DaftarNilaiKeterampilan
              keterangan={keterangan}
              rombel_id={id}
              kkm={jadwalMengajar?.mataPelajaran?.kkm}
              mapelId={jadwalMengajar?.mataPelajaran?.id}
            />
          )}
          {subnav == "nilai-sikap" && (
            <DaftarNilaiSikap
              keterangan={keterangan}
              sikapsosial={sikapsosial}
              sikapspiritual={sikapspiritual}
            />
          )}
          {subnav == "keterangan-kelulusan" && (
            <DaftarKeteranganKelulusan
              keterangan={keterangan}
              getDetailRombelData={getDetailRombelData}
            />
          )}
          {subnav == "ekstrakurikuler" && (
            <DaftarEkstrakurikuler
              keterangan={keterangan}
              getDetailRombelData={getDetailRombelData}
              kelasRombel={kelasRombel}
              rombel_id={rombel_id}
            />
          )}
          {subnav == "sikap" && (
            <DaftarSikap
              keterangan={keterangan}
              sikapsosial={sikapsosial}
              sikapspiritual={sikapspiritual}
              getDetailRombelData={getDetailRombelData}
            />
          )}
          {subnav == "keterangan-pkl" && (
            <DaftarKeteranganPkl
              keterangan={keterangan}
              industri={industri}
              getDetailRombelData={getDetailRombelData}
            />
          )}
          {subnav == "lihat-rapor" && (
            <DaftarRapor
              rombel_id={jadwalMengajar?.rombel?.id}
              keterangan={keterangan}
              jadwalMengajar={jadwalMengajar?.id}
              totalMapel={totalMapel}
              kkm={kkm}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TugasPage;
