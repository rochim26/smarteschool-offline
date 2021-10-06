import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { bkkURL } from "../../client/clientAxios";
import useInformasiJurusan from "../../hooks/useInformasiJurusan";
import useSekolah from "../../hooks/useSekolah";
import { getKegiatan } from "../../client/KegiatanClient";

const Header = () => {
  const [menuAktif, setMenuAktif] = useState(bkkURL);
  const { sekolah } = useSekolah();

  let menus = [
    {
      isDropdown: false,
      text: "Profil",
      url: `${bkkURL}/profil`,
    },
    {
      isDropdown: false,
      text: "Lowongan",
      url: `${bkkURL}/lowongan`,
    },
    {
      isDropdown: false,
      text: "Mitra",
      url: `${bkkURL}/mitra`,
    },
    {
      isDropdown: false,
      text: "Alumni",
      url: `${bkkURL}/alumni`,
    },
  ];

  useEffect(() => {
    setMenuAktif(window.location.pathname);
  }, [menuAktif]);

  return (
    <header>
      <nav className="navbar navbar-ss navbar-expand-lg navbar-dark bg-gradient-primary position-fixed w-100 ">
        <div className="container">
          <Link href={`${bkkURL}/`}>
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
