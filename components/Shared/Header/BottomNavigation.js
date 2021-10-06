import Link from "next/link";
import { useEffect, useState } from "react";
import { baseURL, ssURL } from "../../../client/clientAxios";

import { useRouter } from "next/router";
import { getProfil } from "../../../client/sharedClient";
import useUser from "../../../hooks/useUser";
import useSekolah from "../../../hooks/useSekolah";
import Avatar from "../Avatar/Avatar";
import { FaBell } from "react-icons/fa";
import { Badge } from "antd";
import useBagian from "../../../hooks/useBagian";

const BottomNavigation = () => {
  const router = useRouter();
  const [menuAktif, setMenuAktif] = useState(ssURL);

  const { user, setUser } = useUser();
  const { setBagian } = useBagian();
  const { sekolah } = useSekolah();
  const [activeMenu, setActiveMenu] = useState(`/`);

  useEffect(() => {
    setActiveMenu(router.pathname);
  }, [router.pathname]);

  //   const headerData = headerMenus.filter((menu) => menu.isVisible);

  useEffect(() => {
    setMenuAktif(window.location.pathname);
  }, [menuAktif]);

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("ss-token");
    router.push(`${ssURL}/login`);
  };

  return (
    <div
      className="bg-white w-100 position-fixed d-md-none d-flex"
      style={{
        zIndex: "100",
        bottom: "0",
        boxShadow: "0 -5px 15px rgba(58, 65, 102, 0.1)",
      }}
    >
      <div className="container-fluid px-4 py-2">
        <div className="row">
          <div className="col-3">
            <Link href={`${ssURL}/`}>
              <a className="text-decoration-none">
                <div
                  className={
                    "d-flex justify-content-center align-items-center flex-column"
                  }
                >
                  <img
                    src={`${
                      activeMenu === `${ssURL}`
                        ? "/img/icon-beranda-bottomnav-active.svg"
                        : "/img/icon-beranda-bottomnav.svg"
                    }`}
                    alt=""
                    className="mb-2"
                  />
                  <h6
                    className={`fs-12-ss fw-bold ${
                      activeMenu === `${ssURL}`
                        ? "color-primary"
                        : "color-secondary"
                    }`}
                  >
                    Beranda
                  </h6>
                </div>
              </a>
            </Link>
          </div>
          <div className="col-3">
            <Link href={`${ssURL}/rombel`}>
              <a className="text-decoration-none">
                <div
                  className={
                    "d-flex justify-content-center align-items-center flex-column"
                  }
                >
                  <img
                    src={`${
                      activeMenu === `${ssURL}/rombel`
                        ? "/img/icon-kelas-bottomnav-active.svg"
                        : "/img/icon-kelas-bottomnav.svg"
                    }`}
                    alt=""
                    className="mb-2"
                  />
                  <h6
                    className={`fs-12-ss fw-bold ${
                      activeMenu === `${ssURL}/rombel`
                        ? "color-primary"
                        : "color-secondary"
                    }`}
                  >
                    Kelas
                  </h6>
                </div>
              </a>
            </Link>
          </div>
          <div className="col-3">
            <Link href={`${ssURL}/materi`}>
              <a className="text-decoration-none">
                <div
                  className={
                    "d-flex justify-content-center align-items-center flex-column"
                  }
                >
                  <img
                    src={`${
                      activeMenu === `${ssURL}/materi`
                        ? "/img/icon-materi-bottomnav-active.svg"
                        : "/img/icon-materi-bottomnav.svg"
                    }`}
                    alt=""
                    className="mb-2"
                  />
                  <h6
                    className={`fs-12-ss fw-bold ${
                      activeMenu === `${ssURL}/materi`
                        ? "color-primary"
                        : "color-secondary"
                    }`}
                  >
                    Materi
                  </h6>
                </div>
              </a>
            </Link>
          </div>

          <div className="col-3">
            {user.role == "siswa" ? (
              <Link href={`${ssURL}/jadwal-ujian`}>
                <a className="text-decoration-none">
                  <div
                    className={
                      "d-flex justify-content-center align-items-center flex-column"
                    }
                  >
                    <img
                      src={`${
                        activeMenu === `${ssURL}/jadwal-ujian`
                          ? "/img/icon-ujian-bottomnav-active.svg"
                          : "/img/icon-ujian-bottomnav.svg"
                      }`}
                      alt=""
                      className="mb-2"
                    />
                    <h6
                      className={`fs-12-ss fw-bold ${
                        activeMenu === `${ssURL}/jadwal-ujian`
                          ? "color-primary"
                          : "color-secondary"
                      }`}
                    >
                      Ujian
                    </h6>
                  </div>
                </a>
              </Link>
            ) : (
              <Link href={`${ssURL}/ujian`}>
                <a className="text-decoration-none">
                  <div
                    className={
                      "d-flex justify-content-center align-items-center flex-column"
                    }
                  >
                    <img
                      src={`${
                        activeMenu === `${ssURL}/ujian`
                          ? "/img/icon-ujian-bottomnav-active.svg"
                          : "/img/icon-ujian-bottomnav.svg"
                      }`}
                      alt=""
                      className="mb-2"
                    />
                    <h6
                      className={`fs-12-ss fw-bold ${
                        activeMenu === `${ssURL}/ujian`
                          ? "color-primary"
                          : "color-secondary"
                      }`}
                    >
                      Ujian
                    </h6>
                  </div>
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
