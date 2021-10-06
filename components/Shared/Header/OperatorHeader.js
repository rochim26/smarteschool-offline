import Link from "next/link";
import { useEffect, useState } from "react";
import { baseURL, ssURL } from "../../../client/clientAxios";

import { useRouter } from "next/router";
import { getProfil } from "../../../client/sharedClient";
import useUser from "../../../hooks/useUser";
import useBagian from "../../../hooks/useBagian";
import { FaChevronLeft } from "react-icons/fa";
import Avatar from "../Avatar/Avatar";

const OperatorHeader = () => {
  const router = useRouter();
  const [menuAktif, setMenuAktif] = useState(ssURL);

  const { user } = useUser();
  const { bagian } = useBagian();

  let menus = [];

  if (bagian == "tata-usaha") {
    menus = [
      {
        isDropdown: false,
        text: "Beranda",
        url: `${ssURL}`,
      },
      {
        isDropdown: false,
        text: "Alur PPDB",
        url: `${ssURL}/alur-ppdb`,
      },
      {
        isDropdown: false,
        text: "Gelombang PPDB",
        url: `${ssURL}/gelombang-ppdb`,
      },
      {
        isDropdown: false,
        text: "Kehadiran GTK",
        url: `${ssURL}/kehadiran-gtk`,
      },
      {
        isDropdown: false,
        text: "Surat",
        url: `${ssURL}/surat-masuk`,
      },
    ];
  } else if (bagian == "kurikulum") {
    menus = [
      {
        isDropdown: false,
        text: "Beranda",
        url: `${ssURL}`,
      },
      {
        isDropdown: false,
        text: "GTK",
        url: `${ssURL}/gtk`,
      },
      {
        isDropdown: false,
        text: "Siswa",
        url: `${ssURL}/siswa`,
      },
      {
        isDropdown: false,
        text: "Tahun Akademik",
        url: `${ssURL}/tahun-akademik`,
      },
      {
        isDropdown: false,
        text: "Mapel",
        url: `${ssURL}/mata-pelajaran`,
      },
      {
        isDropdown: false,
        text: "Jurusan",
        url: `${ssURL}/jurusan`,
      },
      {
        isDropdown: false,
        text: "Rombel",
        url: `${ssURL}/rombel`,
      },
      {
        isDropdown: false,
        text: "Jam Mengajar",
        url: `${ssURL}/jam-mengajar`,
      },
      {
        isDropdown: false,
        text: "Jadwal Mengajar",
        url: `${ssURL}/jadwal-mengajar`,
      },
      {
        isDropdown: false,
        text: "Kalender",
        url: `${ssURL}/kalender`,
      },
      {
        isDropdown: false,
        text: "Buku Induk",
        url: `${ssURL}/buku-induk`,
      },
    ];
  } else if (bagian == "kesiswaan") {
    menus = [
      {
        isDropdown: false,
        text: "Beranda",
        url: `${ssURL}`,
      },
      {
        isDropdown: false,
        text: "Siswa",
        url: `${ssURL}/siswa`,
      },
      {
        isDropdown: false,
        text: "Tata tertib",
        url: `${ssURL}/tata-tertib`,
      },
      {
        isDropdown: false,
        text: "Prestasi",
        url: `${ssURL}/prestasi`,
      },
      {
        isDropdown: false,
        text: "Kehadiran",
        url: `${ssURL}/kehadiran-siswa`,
      },
    ];
  } else if (bagian == "sarpras") {
    menus = [
      {
        isDropdown: false,
        text: "Beranda",
        url: `${ssURL}`,
      },
      {
        isDropdown: false,
        text: "Lokasi",
        url: `${ssURL}/lokasi`,
      },
      {
        isDropdown: false,
        text: "Barang",
        url: `${ssURL}/barang`,
      },
    ];
  } else if (bagian == "humas") {
    menus = [
      {
        isDropdown: false,
        text: "Beranda",
        url: `${ssURL}`,
      },
      // {
      //   isDropdown: false,
      //   text: "Mitra Industri",
      //   url: `/under-construction`,
      // },
      {
        isDropdown: false,
        text: "Tracking Alumni",
        url: `${ssURL}/ikatan-alumni`,
      },
      // {
      //   isDropdown: false,
      //   text: "Surel",
      //   url: `${ssURL}/kotak-masuk-surel`,
      // },
      // {
      //   isDropdown: false,
      //   text: "Buku Tamu",
      //   url: `${ssURL}/buku-tamu`,
      // },
    ];
  } else if (bagian == "publikasi") {
    menus = [
      {
        isDropdown: false,
        text: "Beranda",
        url: `${ssURL}`,
      },
      {
        isDropdown: false,
        text: "Homepage",
        url: `${ssURL}/publikasi-homepage`,
      },
      {
        isDropdown: false,
        text: "Profil",
        url: `${ssURL}/publikasi-profil`,
      },
      {
        isDropdown: false,
        text: "Jurusan",
        url: `${ssURL}/publikasi-jurusan`,
      },
      {
        isDropdown: false,
        text: "Kegiatan",
        url: `${ssURL}/publikasi-kegiatan`,
      },
      {
        isDropdown: false,
        text: "Sarpras",
        url: `${ssURL}/publikasi-sarpras`,
      },
      {
        isDropdown: false,
        text: "Blog",
        url: `${ssURL}/post`,
      },
    ];
  } else if (bagian == "keuangan") {
    menus = [
      {
        isDropdown: false,
        text: "Beranda",
        url: `${ssURL}`,
      },
      {
        isDropdown: false,
        text: "Pembayaran",
        url: `${ssURL}/pembayaran`,
      },
      {
        isDropdown: false,
        text: "Mutasi",
        url: `${ssURL}/mutasi`,
      },
      // {
      //   isDropdown: false,
      //   text: "Tunggakan",
      //   url: `${ssURL}/tunggakan`,
      // },
    ];
  } else if (bagian == "ujian") {
    menus = [
      {
        isDropdown: false,
        text: "Beranda",
        url: `${ssURL}`,
      },
      {
        isDropdown: false,
        text: "Bank Soal",
        url: `${ssURL}/ujian`,
      },
      {
        isDropdown: false,
        text: "Jadwal Ujian",
        url: `${ssURL}/jadwal-ujian?subnav=berlangsung`,
      },
    ];
  } else if (bagian == "dapodik") {
    menus = [
      {
        isDropdown: false,
        text: "Beranda",
        url: `${ssURL}`,
      },
      {
        isDropdown: false,
        text: "Import",
        url: `${ssURL}/dapodik-import`,
      },
    ];
  } else if (bagian == "absensi") {
    menus = [
      {
        isDropdown: false,
        text: "Beranda",
        url: `${ssURL}`,
      },
      {
        isDropdown: false,
        text: "Sinkronisasi",
        url: `${ssURL}/sinkron`,
      },
      // {
      //   isDropdown: false,
      //   text: "Monitoring",
      //   url: `${ssURL}/camera`,
      // },
    ];
  }

  useEffect(() => {
    setMenuAktif(window.location.pathname);
  }, [menuAktif]);

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("ss-token");
    router.push(`${ssURL}/login`);
  };

  const { setBagian } = useBagian();

  return (
    <header>
      <nav className="navbar navbar-ss navbar-expand-lg navbar-dark  bg-gradient-primary position-fixed w-100 ">
        <div className="container-fluid px-lg-5 px-4">
          <Link href={`${ssURL}/`}>
            <a className="navbar-brand me-0">
              {bagian && (
                <div
                  className="d-flex align-items-center"
                  onClick={() => setBagian("")}
                >
                  <FaChevronLeft className="me-3" />
                  <img src={`/img/ss-logo-white.png`} width={40} height={40} />
                </div>
              )}
              {!bagian && (
                <img
                  src="/img/ss-logo-white-full.png"
                  width={254}
                  height={50}
                />
              )}
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {menus?.map((menu, idx) => {
                if (menu.isDropdown) {
                  return (
                    <li className="nav-item dropdown dropdown-ss" key={idx}>
                      <a
                        className="nav-link dropdown-toggle fw-bold"
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
                                className: "nav-link fw-bold active",
                                "aria-current": "page",
                              }
                            : { className: "nav-link fw-bold" })}
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
                      className="rounded-cirlce"
                    />
                  </div>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link href={`${ssURL}/profil`}>
                      <a className="dropdown-item">Profil</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`${ssURL}/pengaturan`}>
                      <a className="dropdown-item">Pengaturan</a>
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
    </header>
  );
};

export default OperatorHeader;
