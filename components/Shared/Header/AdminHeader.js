import Link from "next/link";
import { useEffect, useState } from "react";
import { baseURL, adminURL } from "../../../client/clientAxios";

import { useRouter } from "next/router";

const menus = [
  {
    isDropdown: false,
    text: "Beranda",
    url: `${adminURL}`,
  },
  {
    isDropdown: false,
    text: "Sekolah",
    url: `${adminURL}/sekolah`,
  },
  {
    isDropdown: true,
    text: "Kurikulum",
    url: "#",
    dropdownMenus: [
      {
        text: "Jurusan",
        url: `${adminURL}/jurusan`,
      },
      {
        text: "Mata Pelajaran",
        url: `${adminURL}/mata-pelajaran`,
      },
      {
        text: "Tahun Akademik",
        url: `${adminURL}/tahun-akademik`,
      },
      {
        text: "Perencanaan Pembelajaran",
        url: `${adminURL}/tahun-akademik`,
      },
    ],
  },
  {
    isDropdown: true,
    text: "TU",
    url: "#",
    dropdownMenus: [
      {
        text: "PPDB",
        url: `${adminURL}/ppdb`,
      },
    ],
  },
  {
    isDropdown: true,
    text: "Humas",
    url: "#",
    dropdownMenus: [
      {
        text: "Tanah & Bangunan",
        url: `${adminURL}/tanah-bangunan`,
      },
      {
        text: "Ruang",
        url: `${adminURL}/ruang`,
      },
      {
        text: "Alat, Angkutan, & Buku",
        url: `${adminURL}/alat-angkutan-buku`,
      },
    ],
  },
  {
    isDropdown: true,
    text: "Sarpras",
    url: "#",
    dropdownMenus: [
      {
        text: "Tanah & Bangunan",
        url: `${adminURL}/tanah-bangunan`,
      },
      {
        text: "Ruang",
        url: `${adminURL}/ruang`,
      },
      {
        text: "Alat, Angkutan, & Buku",
        url: `${adminURL}/alat-angkutan-buku`,
      },
    ],
  },
  {
    isDropdown: false,
    text: "GTK",
    url: `${adminURL}/gtk`,
  },
  {
    isDropdown: false,
    text: "Siswa",
    url: `${adminURL}/siswa`,
  },
  {
    isDropdown: false,
    text: "Rombel",
    url: `${adminURL}/rombel`,
  },
  {
    isDropdown: true,
    text: "Jadwal",
    url: "#",
    dropdownMenus: [
      {
        text: "Jam Mengajar",
        url: `${adminURL}/jam-mengajar`,
      },
      {
        text: "Jadwal Mengajar",
        url: `${adminURL}/jadwal-mengajar`,
      },
    ],
  },
  {
    isDropdown: false,
    text: "E-Rapor",
    url: `${adminURL}/e-rapor`,
  },
];

const AdminHeader = () => {
  const router = useRouter();
  const [menuAktif, setMenuAktif] = useState(adminURL);

  useEffect(() => {
    setMenuAktif(window.location.pathname);
  }, [menuAktif]);

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("ss-token");
    router.push(`${adminURL}/login`);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary bg-gradient">
        <div className="container">
          <a className="navbar-brand">
            <img src={`/img/ss-logo-white.png`} width={30} height={30} />
          </a>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {menus.map((menu, idx) => {
                if (menu.isDropdown) {
                  return (
                    <li className="nav-item dropdown" key={idx}>
                      <a
                        className="nav-link dropdown-toggle"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {menu.text}
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        {menu.dropdownMenus.map((dropdownMenu, idx) => {
                          return (
                            <li key={idx}>
                              <Link href={dropdownMenu.url}>
                                <a
                                  className="dropdown-item"
                                  onClick={() => setMenuAktif(menu.url)}
                                >
                                  {dropdownMenu.text}
                                </a>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                } else {
                  return (
                    <li className="nav-item" key={idx}>
                      <Link href={menu.url}>
                        <a
                          {...(menuAktif == menu.url
                            ? {
                                className: "nav-link active",
                                "aria-current": "page",
                              }
                            : { className: "nav-link" })}
                          onClick={() => setMenuAktif(menu.url)}
                        >
                          {menu.text}
                        </a>
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={`/img/avatar-default.png`}
                    width={45}
                    height={45}
                    className="avatar"
                  />
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item">Pengaturan</a>
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
    </header>
  );
};

export default AdminHeader;
