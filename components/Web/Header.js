import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { baseURL, ssURL, webURL } from "../../client/clientAxios";
import useInformasiJurusan from "../../hooks/useInformasiJurusan";
import useSekolah from "../../hooks/useSekolah";
import { getKegiatan } from "../../client/KegiatanClient";

const Header = () => {
  const router = useRouter();
  const [menuAktif, setMenuAktif] = useState(webURL);
  const [dropdownKegiatan, setDropdownKegiatan] = useState([]);
  const { informasiJurusan } = useInformasiJurusan();
  const { sekolah } = useSekolah();

  const _getKegiatan = async () => {
    let listKegiatan = [];
    const { data } = await getKegiatan();
    if (data && data?.kegiatan) {
      data?.kegiatan?.map((kegiatan) => {
        listKegiatan.push({
          text: kegiatan.nama,
          url: `${webURL}/kegiatan/${kegiatan.id}`,
        });
      });
      setDropdownKegiatan(listKegiatan);
    }
  };

  let menus = [
    {
      isDropdown: true,
      text: "Profil",
      url: `#`,
      dropdownMenus: [
        {
          text: "Tentang Sekolah",
          url: `${webURL}/tentang-sekolah`,
        },
        {
          text: "Visi dan Misi",
          url: `${webURL}/visi-dan-misi`,
        },
        {
          text: "Pesan Kepala Sekolah",
          url: `${webURL}/pesan-kepsek`,
        },
        {
          text: "Sejarah Sekolah",
          url: `${webURL}/sejarah-sekolah`,
        },
        {
          text: "Lambang dan Mars",
          url: `${webURL}/lambang-dan-mars`,
        },
        {
          text: "Prestasi",
          url: `/under-construction-web`,
        },
      ],
    },
    {
      isDropdown: true,
      text: "Kompetensi Keahlian",
      url: "#",
      dropdownMenus: informasiJurusan?.jurusan?.map((d) => {
        return { text: d?.nama, url: `${webURL}/jurusan/${d?.id}` };
      }),
    },
    {
      isDropdown: true,
      text: "Kegiatan",
      url: "#",
      dropdownMenus: dropdownKegiatan,
    },
    {
      isDropdown: true,
      text: "Fasilitas",
      url: "#",
      dropdownMenus: [
        {
          text: "Sarana Prasarana",
          url: `${webURL}/sarpras`,
        },
        {
          text: "Tur Virtual Sekolah",
          url: sekolah?.informasi?.virtualTour,
          isAnchor: true,
        },
        {
          text: "Perpustakaan",
          url: `${ssURL}/perpustakaan`,
        },
      ],
    },
    {
      isDropdown: false,
      text: "Blog",
      url: `${webURL}/blog`,
    },
    {
      isDropdown: false,
      text: "Kontak",
      url: `${webURL}/kontak`,
    },
  ];

  useEffect(() => {
    setMenuAktif(window.location.pathname);
  }, [menuAktif]);

  useEffect(() => {
    _getKegiatan();
  }, []);

  return (
    <header>
      <nav className="navbar navbar-ss navbar-expand-lg navbar-dark bg-gradient-primary position-fixed w-100 ">
        <div className="container">
          <Link href={`${webURL}/`}>
            <a className="navbar-brand me-0">
              <img src={sekolah?.informasi?.fotoLogo} width={60} height={60} />
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {menus?.map((menu, idx) => {
                if (menu.isDropdown) {
                  return (
                    <li
                      className="nav-item dropdown dropdown-ss dropdown-web-ss"
                      key={idx}
                    >
                      <a
                        className="nav-link fw-bold text-uppercase fs-14-ss"
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
                        {menu.dropdownMenus?.map((dropdownMenu, idx) => {
                          if (dropdownMenu?.isAnchor) {
                            return (
                              <li key={idx}>
                                <a
                                  href={dropdownMenu?.url}
                                  target="_blank"
                                  className="dropdown-item"
                                  onClick={() => setMenuAktif(menu.url)}
                                >
                                  {dropdownMenu.text}
                                </a>
                              </li>
                            );
                          }
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
                                className:
                                  "nav-link fw-bold text-uppercase fs-14-ss active",
                                "aria-current": "page",
                              }
                            : {
                                className:
                                  "nav-link text-uppercase fs-14-ss fw-bold",
                              })}
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
