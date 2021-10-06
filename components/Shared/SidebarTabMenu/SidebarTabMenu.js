import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { route } from "next/dist/next-server/server/router";

const SidebarTabMenu = ({
  idParams = null,
  listMenu = [],
  withBtnTambah,
  withDropdown,
  loading = false,
  activeMenuIndex,
  withHeader,
}) => {
  const router = useRouter();

  const isActive = (idx) => {
    if (idParams) {
      return parseInt(idParams) === idx || (!idParams && idx === 0);
    }

    return activeMenuIndex === idx;
  };

  return (
    <div className="col-lg-3 positon-relative mb-4">
      <ul
        className="nav side-nav-ss bg-white rounded-ss px-3 py-4 flex-column shadow-dark-ss"
        data-joyride="sidebar-menu-jurusan"
      >
        {loading && (
          <>
            <li className="mb-3">
              <Skeleton width="100%" height={30} />
            </li>
            <li className="mb-3">
              <Skeleton width="100%" height={30} />
            </li>
            <li className="mb-3">
              <Skeleton width="100%" height={30} />
            </li>
          </>
        )}

        {withHeader && (
          <div className="d-flex align-items-center w-100 justify-content-between mb-4">
            <p className="fs-18-ss color-dark fw-bold mb-0">
              {withHeader.text}
            </p>
            <img
              src="/img/icon-plus.svg"
              style={{ width: 24, height: 24 }}
              className="pointer"
              data-bs-toggle="modal"
              data-bs-target={withHeader.dataBsTarget}
            />
          </div>
        )}

        {!loading &&
          listMenu?.length > 0 &&
          listMenu?.map((data, idx) => (
            <li className="nav-item" key={idx}>
              <Link
                href={data?.url ? data?.url : `${router.route}?id=${data.id}`}
              >
                <a
                  className={`
                    nav-link color-dark fw-bold fs-18-ss d-flex align-items-center px-4 mb-3
                    d-flex justify-content-between align-items-center
                    ${isActive(data?.id || idx) ? "active" : ""}
                  `}
                >
                  <div className="d-flex align-items-center">
                    {data?.icon && (
                      <img
                        src={`${data?.icon}`}
                        alt=""
                        className="me-2"
                        style={{ width: 30, height: 30 }}
                      />
                    )}

                    <span>{data?.kode || data?.nama}</span>
                  </div>

                  {!loading && withDropdown && (
                    <div className="dropdown dropdown-ss">
                      <div
                        className="ps-3 pe-2"
                        role="button"
                        id="dropdownEditDeleteKegiatan"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src="/img/icon-option-vertical.svg"
                          alt="icon-option"
                        />
                      </div>
                      <ul
                        className="dropdown-menu dropdown-menu-ss my-1"
                        aria-labelledby="dropdownEditDeleteKegiatan"
                      >
                        <li
                          className="d-flex align-items-center"
                          onClick={() => withDropdown.onClickEdit(data)}
                        >
                          <a
                            className="dropdown-item color-secondary"
                            data-bs-toggle="modal"
                            data-bs-target={`#${withDropdown.dataBsTarget}`}
                          >
                            <FaPen /> &nbsp; Edit asd
                          </a>
                        </li>
                        <li onClick={() => withDropdown.onClickDelete(data.id)}>
                          <a className="dropdown-item color-danger">
                            <FaTrashAlt /> &nbsp; Hapus
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </a>
              </Link>
            </li>
          ))}
        {!loading && withBtnTambah && (
          <li
            className="nav-item mt-3 d-flex flex-column"
            data-joyride="btn-tambah-sidebarmenu"
          >
            <button
              className="btn btn-ss btn-primary bg-gradient-primary rounded-pill fw-bold shadow-primary-ss"
              data-bs-toggle="modal"
              data-bs-target={`#${withBtnTambah.dataBsTarget}`}
              onClick={withBtnTambah.onClick}
            >
              <FaPlus className="me-2" /> {withBtnTambah.title}
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SidebarTabMenu;
