import { Badge } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaClock,
  FaClone,
  FaPen,
  FaTrashAlt,
} from "react-icons/fa";
import { ssURL } from "../../client/clientAxios";
import { getDetailRombel } from "../../client/RombelClient";
import useUser from "../../hooks/useUser";

const KegiatanKelasItem = ({ id, rombel_id, type, isGuru }) => {
  const { user } = useUser();

  const router = useRouter();

  const path = router.asPath;

  console.log(path);

  // ======= TIMELINE STATE =======
  const [timelineData, setTimelineData] = useState([]);
  const [buttonStatePertemuan, setButtonStatePertemuan] = useState("idle");
  const [detailRombelData, setDetailRombelData] = useState({});
  const [loading, setLoading] = useState(true);
  const { jadwalMengajar } = detailRombelData;

  useEffect(() => {
    getDetailRombelData();
  }, []);

  const getDetailRombelData = async () => {
    const { data } = await getDetailRombel(id, {
      rombel_id: rombel_id,
      kode_hari: new Date().getDay(),
    });

    if (data) {
      setDetailRombelData(data);
    }
  };

  return (
    <div className="kegiatan-items py-3 pointer rounded-ss mb-4 px-4">
      <div className="row">
        <div className="col-lg-9 mb-lg-0 mb-5">
          <Link
            href={`${ssURL}/kelas/[id]/kegiatan/[id]`}
            as={`${ssURL}/kelas/${id}/kegiatan/1`}
          >
            <a className="text-decoration-none">
              <div className="d-flex align-items-md-center flex-lg-nowrap flex-wrap flex-md-row flex-column">
                <img
                  src={`/img/icon-kegiatan-${
                    type == "tatap-maya"
                      ? "tatap-maya"
                      : type == "materi"
                      ? "materi"
                      : type == "tugas" || type == "tugas-kuis"
                      ? "tugas"
                      : ""
                  }.svg`}
                  alt="icon-kegiatan"
                  width="50px"
                  height="50px"
                  className="me-lg-3 mb-lg-0 mb-4"
                />
                <div className="w-100">
                  <h6
                    className={`fs-18-ss color-dark fw-bold text-truncate ${
                      type == "tatap-maya" ? "mb-0" : "mb-1"
                    }`}
                  >
                    {type == "tatap-maya"
                      ? "Tatap Maya"
                      : type == "materi"
                      ? "Materi -"
                      : type == "tugas"
                      ? "Tugas -"
                      : type == "tugas-kuis"
                      ? "Tugas Kuis -"
                      : ""}
                    {type == "materi"
                      ? "Determinan Matriks 1x1"
                      : type == "tugas"
                      ? "Determinan Matriks 1x1"
                      : type == "tugas-kuis"
                      ? "Determinan Matriks 1x1"
                      : ""}
                  </h6>
                  {type == "materi" && (
                    <p className="fs-14-ss fw-semibold color-secondary text-truncate mb-0">
                      BAB 1 - Matriks
                    </p>
                  )}
                  {(type == "tugas" || type == "tugas-kuis") && (
                    <p className="fs-14-ss fw-semibold color-danger text-truncate mb-0">
                      <FaClock className="me-2 mb-1" /> Batas Pengumpulan 14
                      hari
                    </p>
                  )}
                </div>
              </div>
            </a>
          </Link>
        </div>
        <div className="col-lg-3 d-flex justify-content-end align-items-center">
          <Link
            href={`${ssURL}/kelas/[id]/kegiatan/[id]`}
            as={`${ssURL}/kelas/${id}/kegiatan/1`}
          >
            <a className="text-decoration-none">
              <span
                className="p-1 d-flex align-items-center justify-content-center rounded-pill fs-12-ss fw-bold bg-soft-success color-success"
                style={{ width: "90px", height: "24px" }}
              >
                36 / 36
              </span>
            </a>
          </Link>
          {isGuru && (
            <div className="dropdown dropdown-ss mb-md-0 mb-2 d-md-inline d-flex justify-content-end">
              <div
                role="button"
                id="dropdownOption"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="/img/option-button-vertical-secondary.svg"
                  alt="option-button"
                  className="ms-4"
                />
              </div>
              <ul
                className="dropdown-menu dropdown-menu-ss my-1"
                aria-labelledby="dropdownOption"
              >
                <li
                  // onClick={() => onClickEdit(ujian)}
                  data-bs-toggle="modal"
                  data-bs-target={`${
                    type == "tatap-maya"
                      ? "#modalKegiatanTatapMaya"
                      : type == "materi"
                      ? "#modalKegiatanMateri"
                      : type == "tugas"
                      ? "#modalKegiatanTugas"
                      : type == "tugas-kuis"
                      ? "#modalKegiatanTugasKuis"
                      : ""
                  }`}
                >
                  <a className="dropdown-item">
                    <FaPen className="me-2" />
                    <span>Edit</span>
                  </a>
                </li>
                {(type == "tugas" || type == "tugas-kuis") && (
                  <li
                    // onClick={() => onClickDuplikat(ujian)}
                    data-bs-toggle="modal"
                    data-bs-target={`${
                      type == "tugas"
                        ? "#modalKegiatanTugas"
                        : type == "tugas-kuis"
                        ? "#modalKegiatanTugasKuis"
                        : ""
                    }`}
                  >
                    <a className="dropdown-item">
                      <FaClone className="me-2" />
                      <span>Duplikat</span>
                    </a>
                  </li>
                )}
                <li
                // onClick={() => deleteUjianData(ujian?.id)}
                >
                  <a className="dropdown-item color-danger">
                    <FaTrashAlt className="me-2" />
                    <span>Hapus</span>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KegiatanKelasItem;
