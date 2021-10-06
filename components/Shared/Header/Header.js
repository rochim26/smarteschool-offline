import Link from "next/link";
import { useEffect, useState } from "react";
import { ssURL } from "../../../client/clientAxios";

const Header = () => {
  const [menuAktif, setMenuAktif] = useState(ssURL);

  const headerMenus = [
    {
      isDropdown: false,
      text: "Sinkron",
      url: `/sinkron`,
    },
  ];

  useEffect(() => {
    setMenuAktif(window.location.pathname);
  }, [menuAktif]);

  return (
    <header>
      <nav className="navbar navbar-ss navbar-expand-lg navbar-dark  bg-gradient-primary position-fixed w-100 ">
        <div className="container-fluid px-lg-5 px-4">
          <Link href={`/`}>
            <a className="navbar-brand me-0">
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {headerMenus?.map((menu, idx) => {
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
