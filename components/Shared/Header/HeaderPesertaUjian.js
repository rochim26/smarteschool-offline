import { useRouter } from "next/router";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import { ssURL } from "../../../client/clientAxios";

const HeaderPesertaUjian = ({
  title,
  backProps = false,
  href,
  listRombel,
  selectedRombel,
}) => {
  const router = useRouter();

  return (
    <header>
      <nav className="navbar navbar-ss navbar-expand-lg bg-primary position-fixed w-100 p-4 position-fixed py-3">
        {/* <div className="container-fluid px-lg-5 px-4 justify-content-center">
          {backProps && (
            <a
              onClick={() => router.push(backProps)}
              className="me-auto text-white p-sm-0  p-2"
            >
              <FaChevronLeft />
            </a>
          )}
          {!backProps && (
            <a
              onClick={() => router.back()}
              className="me-auto text-white p-sm-0  p-2"
            >
              <FaChevronLeft />
            </a>
          )}

          <h3 className="me-auto mb-0 text-white fw-extrabold p-sm-0 p-2">
            {title}
          </h3>
        </div> */}

        <div className="container">
          <div className="w-100">
            <div className="row">
              <div className="col-10 ps-0">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                  <div>
                    <h5 className="mb-2 fw-extrabold text-white">{title}</h5>

                    {/* Dropdown Nama Siswa Start */}

                    <div className="dropdown dropdown-ss dropdown-nama-nilai-tugas">
                      <div
                        className="btn btn-ss btn-light bg-light dropdown-toggle dropdown-search-perpustakaan-toggle dropdown-kelas-peserta-ujian-toggle rounded-ss fw-bold color-dark fs-12-ss"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {selectedRombel?.nama}
                      </div>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        {/* <li>
                          <a className="dropdown-item">Semua</a>
                        </li> */}
                        {listRombel?.map((item) => {
                          return (
                            <li>
                              <Link
                                href={`${ssURL}/peserta-ujian/${item?.peserta?.[0]?.id}?subnav=detail-jawaban`}
                              >
                                <a className="dropdown-item">
                                  {item?.rombel?.nama}
                                </a>
                              </Link>
                            </li>
                          );
                        })}
                        {/* <li>
                          <a className="dropdown-item">XII SIJA 2</a>
                        </li> */}
                      </ul>
                    </div>

                    {/* Dropdown Nama Siswa End */}
                  </div>
                </div>
              </div>
              <div className="col-2 pe-0 d-flex justify-content-end align-items-center">
                <div className="order-1 order-md-2 d-flex d-md-inline justify-content-end m-md-0 m-2">
                  <Link href={href}>
                    <a>
                      <img src="/img/btn-close.svg" alt="" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderPesertaUjian;
