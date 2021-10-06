import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { Tooltip } from "antd";
import Avatar from "react-avatar";
import useUser from "../../hooks/useUser";
import Link from "next/link";
import { ssURL } from "../../client/clientAxios";
import SelectShared from "../Shared/SelectShared/SelectShared";
import { useRouter } from "next/router";

const SearchRPP = ({ nav, handleChangeForm, formData }) => {
  const router = useRouter();
  const [collapseOpen, setcollapseOpen] = useState(false);
  const [dropdownOpen, setdropdownOpen] = useState(false);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="search-illustasi-kolaborasi rounded-ss bg-soft-primary p-5 position-relative d-flex mb-4 flex-md-row flex-column">
            <div className="search-illustasi-kolaborasi-content">
              <h2 className="fw-extrabold color-dark text-capitalize mb-2">
                Cari RPP
              </h2>
              <h6 className="color-secondary mb-4 fs-18-ss">
                Cari dan temukan RPP yang cocok untuk memudahkan anda dalam
                mengajar di kelas
              </h6>
            </div>
            <img
              src={`/img/illustrasi-rpp.png`}
              alt="illustrasi-kolaborasi"
              className="search-illustrasi-kolaborasi-img img-fluid"
            />
            <div
              className={`search-form row position-absolute ${
                collapseOpen && "show"
              } ${dropdownOpen && "up"}`}
            >
              <div className="col-sm-12 d-flex flex-column">
                <div
                  className={`card card-ss card-search-form ${
                    collapseOpen && "show"
                  }`}
                >
                  <div className="row flex-sm-row flex-column">
                    <div
                      className={`${
                        collapseOpen ? "col-md-12" : "col-md-9"
                      } d-flex flex-column`}
                      data-joyride="cari-buku"
                    >
                      <input
                        type="text"
                        className="form-control form-search-perpustakaan fs-5 fw-bold ms-4 pe-sm-0 pe-4"
                        placeholder={`${
                          nav == "rpp-kemendikbud" || !nav
                            ? "Cari RPP Kemendikbud..."
                            : nav == "rpp-sekolah"
                            ? "Cari RPP Sekolah..."
                            : null
                        }`}
                        autoComplete="off"
                        name="cari"
                        onClick={() => setcollapseOpen(true)}
                        value={formData.cari}
                        onChange={handleChangeForm}
                      />

                      <button type="submit" className="d-none">
                        Cari
                      </button>
                    </div>
                    {!collapseOpen && (
                      <div className="col-md-3 d-flex justify-content-end">
                        <div className="dropdown dropdown-ss dropdown-search-perpustakaan dropdown-search-rpp text-md-start text-center">
                          <div
                            className="dropdown-perpustakaan-toggle-container py-4 pe-4"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            data-joyride="dropdown-perpustakaan"
                          >
                            <a
                              onMouseOver={() => setdropdownOpen(true)}
                              onMouseLeave={() => setdropdownOpen(false)}
                              id="doubleOnClick"
                              className={`dropdown-toggle dropdown-search-perpustakaan-toggle dropdown-search-rpp-toggle border-start border-5 border-secondary border-light-secondary-ss ps-4 fs-5 fw-bold color-dark pointer`}
                            >
                              {(nav == "rpp-kemendikbud" || !nav) &&
                                "RPP Kemendikbud"}
                              {nav == "rpp-sekolah" && "RPP Sekolah"}
                            </a>
                          </div>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                            onMouseOver={() => setdropdownOpen(true)}
                            onMouseLeave={() => setdropdownOpen(false)}
                          >
                            <li>
                              <Link href={`${ssURL}/rpp?nav=rpp-kemendikbud`}>
                                <a
                                  className={`dropdown-item   ${
                                    (nav == "rpp-kemendikbud" || !nav) &&
                                    "active"
                                  }`}
                                  href="#"
                                  onClick={() => setdropdownOpen(false)}
                                >
                                  <img
                                    src="/img/icon-rpp-kemendikbud.svg"
                                    alt="icon-rpp-kemendikbud"
                                    className="me-2"
                                    style={{ width: "24px", height: "24px" }}
                                  />
                                  RPP Kemendikbud
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href={`${ssURL}/rpp?nav=rpp-sekolah`}>
                                <a
                                  className={`dropdown-item   ${
                                    nav == "rpp-sekolah" && "active"
                                  }`}
                                  href="#"
                                  onClick={() => setdropdownOpen(false)}
                                >
                                  <img
                                    src="/img/icon-rpp-sekolah.svg"
                                    alt="icon-rpp-sekolah"
                                    className="me-2"
                                  />
                                  RPP Sekolah
                                </a>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div
                        className={`pencarian-detail p-4 pt-0 ${
                          collapseOpen && "show"
                        }`}
                      >
                        <hr className="mb-3 mt-0" />
                        <h4 className="fs-14-ss fw-extrabold color-dark mb-4">
                          Pencarian Lebih Detail
                        </h4>
                        <div className="row mb-4">
                          <div className="col-md-6">
                            <div className="mb-4">
                              <label className="form-label">
                                Moda Pembelajaran
                              </label>
                              <SelectShared
                                name="modaPembelajaran"
                                placeholder="Pilih moda pembelajaran"
                                // // handleChangeSelect={handleChangeSelect}
                                // value={formData.agama}
                                // options={agamaData}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-4">
                              <label className="form-label">
                                Jenjang Sekolah
                              </label>
                              <SelectShared
                                name="jenjangSekolah"
                                placeholder="Pilih senjang sekolah"
                                // // handleChangeSelect={handleChangeSelect}
                                // value={formData.agama}
                                // options={agamaData}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-4">
                              <label className="form-label">Kelas</label>
                              <SelectShared
                                name="kelas"
                                placeholder="Pilih kelas"
                                // // handleChangeSelect={handleChangeSelect}
                                // value={formData.agama}
                                // options={agamaData}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-4">
                              <label className="form-label">
                                Mata Pelajaran
                              </label>
                              <SelectShared
                                name="mataPelajaran"
                                placeholder="Pilih mata pelajaran"
                                // // handleChangeSelect={handleChangeSelect}
                                // value={formData.agama}
                                // options={agamaData}
                              />
                            </div>
                          </div>
                          <hr className="mt-2 mt-4" />
                          <div className="d-flex align-items-md-center justify-content-between search-form-button flex-md-row flex-column">
                            <span className="color-primary fw-bold mb-md-0 mb-3 text-center">
                              100 Pencarian
                            </span>
                            <div className="ms-md-auto d-flex flex-sm-row flex-column justify-content-between">
                              <button
                                type="button"
                                className="btn btn-secondary mb-sm-0 mb-3"
                              >
                                Reset Filter
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary ms-sm-3"
                                onClick={() => {
                                  router.push(
                                    `${ssURL}/rpp?search=${formData.cari}`
                                  );
                                  setcollapseOpen(false);
                                }}
                              >
                                Cari RPP
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`backdrop-search-kolaborasi ${collapseOpen && "show"}`}
        onClick={() => setcollapseOpen(false)}
      ></div>
    </>
  );
};

export default SearchRPP;
