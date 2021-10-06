import { Badge } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { ssURL } from "../../client/clientAxios";
import { getDetailRombel } from "../../client/RombelClient";
import useUser from "../../hooks/useUser";

const KelasHeader = ({ id, rombel_id }) => {
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

  //   Kelas Header Menu Start
  const navMenus = [
    {
      href: `${ssURL}/kelas/[id]/kegiatan`,
      as: `${ssURL}/kelas/${id}/kegiatan`,
      text: "Kegiatan",
      active: path == `${ssURL}/kelas/${id}/kegiatan`,
      isVisible: true,
      dataJoyride: "kegiatan",
    },
    {
      href: `${ssURL}/kelas/[id]/materi`,
      as: `${ssURL}/kelas/${id}/materi`,
      text: "Materi",
      active: path == `${ssURL}/kelas/${id}/materi`,
      isVisible: true,
      dataJoyride: "materi",
    },
    {
      href: `${ssURL}/kelas/[id]/analisis-nilai`,
      as: `${ssURL}/kelas/${id}/analisis-nilai`,
      text: "Analisis Nilai",
      active: path == `${ssURL}/kelas/${id}/analisis-nilai`,
      isVisible: true,
      dataJoyride: "analisis-nilai",
    },
    {
      href: `${ssURL}/kelas/[id]/absen-harian`,
      as: `${ssURL}/kelas/${id}/absen-harian`,
      text: "Absen Harian",
      active: path == `${ssURL}/kelas/${id}/absen-harian`,
      isVisible: jadwalMengajar?.rombel?.mUserId == user?.id,
      dataJoyride: "absen-harian",
    },
    {
      href: `${ssURL}/kelas/[id]/rapor`,
      as: `${ssURL}/kelas/${id}/rapor`,
      text: "Rapor",
      active: path == `${ssURL}/kelas/${id}/rapor`,
      isVisible: true,
      dataJoyride: "rapor",
    },
  ];

  // Kelas Header Menu End
  return (
    <div className="row">
      <div className="col-md-12">
        <div
          className={`${
            user?.role == "guru" && "d-flex justify-content-between"
          }`}
        >
          <Link href={`${ssURL}/kelas`}>
            <a className="text-decoration-none fw-bolder color-primary">
              <FaChevronLeft />
              <span className="ms-2">Daftar Kelas</span>
            </a>
          </Link>
        </div>

        <div className="card-header-kelas-ss card card-kelas-ss card-ss px-0 mt-3 mb-4">
          <div className="card-body px-4 pt-3 pb-5 justify-content-between d-flex mb-lg-0 mb-3">
            <div className="card-kelas-name text-white">
              <h2 className="mb-2 fw-black">
                {user?.role == "siswa"
                  ? jadwalMengajar?.mataPelajaran?.nama
                  : jadwalMengajar?.rombel?.nama}
              </h2>
              <p className="m-0 fw-semibold fs-18-ss">
                {user?.role == "siswa"
                  ? jadwalMengajar?.mataPelajaran?.user?.nama
                  : jadwalMengajar?.mataPelajaran?.nama}
              </p>
            </div>
            <div
              className="card-kelas-info hover-scale"
              data-joyride="kelas-info"
            >
              <Link
                href={`${ssURL}/rombel/[id]?nav=info`}
                as={`${ssURL}/rombel/${id}?nav=info`}
              >
                <a>
                  <img
                    src={`/img/button-info.svg`}
                    alt="button-info"
                    width={40}
                    height={40}
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className="card-footer card-footer-ss card-kelas-footer py-lg-3 py-0 px-lg-3 px-0 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center align-items-stretch">
            <div className="kelas-nav d-flex flex-column flex-lg-row">
              {navMenus.map((d) => {
                return (
                  d.isVisible && (
                    <Link href={d.href} as={d.as}>
                      <a
                        className={`position-relative text-decoration-none fw-bold px-0  me-lg-5 me-0 pt-0 py-3 py-lg-0 text-center text-mb-left mb-lg-0 mb-3 ${
                          d.active ? "color-primary" : "color-secondary"
                        }`}
                        data-joyride={d.dataJoyride || ""}
                      >
                        {d?.withBadge?.show && (
                          <Badge
                            count={parseInt(d?.withBadge?.text)}
                            className="position-absolute"
                            style={{ top: "-18px", right: "-40px" }}
                          />
                        )}
                        {d.text}
                      </a>
                    </Link>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KelasHeader;
