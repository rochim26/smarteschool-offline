import Link from "next/link";
import { useEffect, useState } from "react";
import { baseURL, ppdbURL, ssURL } from "../../../client/clientAxios";

import { useRouter } from "next/router";
import { getProfil } from "../../../client/sharedClient";
import useUser from "../../../hooks/useUser";
import useSekolah from "../../../hooks/useSekolah";
import Avatar from "../Avatar/Avatar";
import { FaBell } from "react-icons/fa";
import { Badge } from "antd";

const HeaderPPDB = ({ isFrontPage }) => {
  const router = useRouter();
  const [menuAktif, setMenuAktif] = useState(ppdbURL);

  const { user } = useUser();
  const { sekolah } = useSekolah();

  const headerMenus = [];

  if (sekolah.id == 17) {
    headerMenus.push({
      isDropdown: false,
      text: "Pengumuman",
      url: `${ppdbURL}#pengumuman`,
    });
  }

  if (isFrontPage) {
    headerMenus.push(
      {
        isDropdown: false,
        text: "Beranda",
        url: `${ppdbURL}#beranda`,
      },
      {
        isDropdown: false,
        text: "Alur Pendaftaran",
        url: `${ppdbURL}#alur-pendaftaran`,
      },
      {
        isDropdown: false,
        text: "Biaya",
        url: `${ppdbURL}#biaya`,
      },
      {
        isDropdown: false,
        text: "Jadwal",
        url: `${ppdbURL}#jadwal`,
      }
    );
  } else {
    headerMenus.push(
      {
        isDropdown: false,
        text: "Beranda",
        url: `${ppdbURL}/dashboard`,
      },
      {
        isDropdown: false,
        text: "Pendaftaran",
        url: `${ppdbURL}/gelombang-ppdb`,
      }
    );
  }

  useEffect(() => {
    setMenuAktif(window.location.pathname);
  }, [menuAktif]);

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("ss-token");
    router.push(`${ppdbURL}`);
  };

  return (
    <header>
      {isFrontPage ? (
        <>
          <nav className="navbar navbar-expand-lg navbar-light navbar-ppdb active position-fixed w-100 py-3">
            <div className="container-fluid px-lg-5 px-4">
              <Link href={`${ppdbURL}`}>
                <a className="navbar-brand">
                  <div
                    className="logo-ss"
                    style={{ width: "40px", height: "40px" }}
                  ></div>
                  {/* <img src={`/img/ss-logo-white.png`} width={40} height={40} /> */}
                </a>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav navbar-nav-ppdb mx-auto mb-2 mb-lg-0">
                  {headerMenus?.map((menu, idx) => {
                    return (
                      <li className="nav-item" key={idx}>
                        <a
                          href={menu.url}
                          {...(menuAktif == menu.url
                            ? {
                                className: "nav-link fw-bold active",
                                "aria-current": "page",
                              }
                            : { className: "nav-link fw-bold" })}
                          onClick={() => setMenuAktif(menu.url)}
                        >
                          {menu.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item d-lg-block d-flex flex-lg-row flex-column">
                    <Link href={`${ppdbURL}/login`}>
                      <a className="btn btn-ss btn-outline-primary btn-outline-primary-ss  rounded-pill mt-1 me-lg-4 mb-lg-0 mb-3">
                        Masuk
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item d-lg-block d-flex flex-lg-row flex-column">
                    <Link href={`${ppdbURL}/login`}>
                      <a className="btn btn-ss btn-primary-ss shadow-primary-ss rounded-pill mt-lg-1">
                        Daftar
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className="navbar navbar-ss navbar-expand-lg navbar-dark  bg-gradient-primary position-fixed w-100 ">
            <div className="container-fluid px-lg-5 px-4">
              <Link href={`${ppdbURL}`}>
                <a className="navbar-brand">
                  <img src={`/img/ss-logo-white.png`} width={40} height={40} />
                </a>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav navbar-nav-ppdb mx-auto mb-2 mb-lg-0">
                  {headerMenus?.map((menu, idx) => {
                    return (
                      <li className="nav-item" key={idx}>
                        <a
                          href={menu.url}
                          {...(menuAktif == menu.url
                            ? {
                                className: "nav-link fw-bold active",
                                "aria-current": "page",
                              }
                            : { className: "nav-link fw-bold" })}
                          onClick={() => setMenuAktif(menu.url)}
                        >
                          {menu.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item dropdown dropdown-ss">
                    <a
                      className="nav-link dropdown-toggle d-flex align-items-center"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="rounded-circle border border-3">
                        <Avatar
                          name={user?.nama}
                          src={user?.avatar}
                          size={40}
                        />
                      </div>
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link href={`${ssURL}/profil`}>
                          <a className="dropdown-item">Profil</a>
                        </Link>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={(e) => handleLogout(e)}
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default HeaderPPDB;
