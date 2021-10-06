import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import Dropdown from "../Dropdown/Dropdown";
import Tag from "../Tag/Tag";
import { useRouter } from "next/router";

const PerpustakaanFilter = ({ nav, perpusData }) => {
  const router = useRouter();

  const { tag, filter: filterUrutkan } = perpusData || {};
  const [collapseOpen, setcollapseOpen] = useState(false);
  const [defaultDropdown, setDefaultDropdown] = useState("");

  const handleChangeDropdown = (e) => {
    router.push({
      pathname: "perpustakaan",
      query: {
        ...router.query,
        urutkan: e.value,
      },
    });
  };

  const handleChangeTag = (e) => {
    router.push({
      pathname: "perpustakaan",
      query: {
        ...router.query,
        tag: e,
      },
    });
  };

  useEffect(() => {
    if (router.query.urutkan) {
      setDefaultDropdown(
        filterUrutkan?.filter(
          (data) => data.value === router.query.urutkan
        )?.[0]?.label || ""
      );
    } else {
      setDefaultDropdown(filterUrutkan?.[0]?.label || "");
    }
  }, [filterUrutkan]);

  return (
    <div>
      {nav != "buku-saya" && (
        <>
          <div className="row justify-content-between align-items-center mb-4">
            <div className="col-lg-2 d-flex justify-content-between mb-lg-0 mb-4">
              <Dropdown
                listValue={filterUrutkan}
                defaultValue={defaultDropdown}
                onChange={handleChangeDropdown}
                dataJoyride="dropdown-perpus-urutkan"
              />
              {/* Filter Collapse Toggle Start */}
              <button
                className={`btn py-2 px-4 btn-collapse-filter btn-light rounded-pill border bg-white color-dark fw-bold d-lg-none d-block ${
                  collapseOpen && "active"
                }`}
                data-bs-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                onClick={() => setcollapseOpen(!collapseOpen)}
                style={{ zIndex: "1" }}
              >
                <FaFilter className="me-3 fs-14-ss" />
                Filter
              </button>
              {/* Filter Collapse Toggle End */}
            </div>
            <div className="col-lg-8 text-center py-lg-0 py-3">
              {nav == "buku-saya" && (
                <h4 className="fw-bold mb-0">Semua Buku Saya</h4>
              )}
              {(nav == "buku-sekolah" || nav == "smartlibrary" || !nav) && (
                <div data-joyride="filter-tag-perpustakaan">
                  <Tag listTag={tag} onChange={handleChangeTag} />
                </div>
              )}
            </div>
            <div className="col-lg-2 text-end">
              {/* Filter Collapse Toggle Start */}
              <button
                className={`btn py-2 px-4 btn-collapse-filter btn-light rounded-pill border bg-white color-dark fw-bold d-lg-inline d-none ${
                  collapseOpen && "active"
                }`}
                data-bs-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                onClick={() => setcollapseOpen(!collapseOpen)}
                data-joyride="filter-perpus-collapse"
              >
                <FaFilter className="me-3 fs-14-ss" />
                Filter
              </button>
              {/* Filter Collapse Toggle End */}
            </div>
          </div>

          {/* Filter Collapse Start */}
          <div className="collapse" id="collapseExample">
            <div className="row">
              {(nav == "smartlibrary" || !nav) && (
                <div className="col-lg-3 col-md-6">
                  <label className="form-label ">Sekolah</label>
                  <input
                    type="text"
                    className="form-control form-search-filter-perpus"
                    placeholder="Cari sekolah..."
                  />
                </div>
              )}
              <div
                className={`${
                  nav == "smartlibrary" || !nav ? "col-lg-3" : "col-lg-4"
                } col-md-6`}
              >
                <label className="form-label ">Jurusan</label>
                <input
                  type="text"
                  className="form-control form-search-filter-perpus"
                  placeholder="Cari jurusan..."
                />
              </div>
              <div
                className={`${
                  nav == "smartlibrary" || !nav ? "col-lg-3" : "col-lg-4"
                } col-md-6`}
              >
                <label className="form-label ">Mata Pelajaran</label>
                <input
                  type="text"
                  className="form-control form-search-filter-perpus"
                  placeholder="Cari mata pelajaran..."
                />
              </div>
              <div
                className={`${
                  nav == "smartlibrary" || !nav ? "col-lg-3" : "col-lg-4"
                }`}
              >
                <label className="form-label ">Tag</label>
                <input
                  type="text"
                  className="form-control form-search-filter-perpus"
                  placeholder="Cari tag..."
                />
              </div>
            </div>
          </div>
          {/* Filter Collapse End */}

          <hr className="my-4" />
        </>
      )}
    </div>
  );
};

export default PerpustakaanFilter;
