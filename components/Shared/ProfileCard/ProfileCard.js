import { Badge } from "antd";
import Link from "next/link";
import { FaCamera, FaChevronLeft } from "react-icons/fa";
import { ssURL } from "../../../client/clientAxios";
import Avatar from "../Avatar/Avatar";

const ProfileCard = ({ navMenus = [], backUrl, status }) => {

  const statusClass = (info) => {
    if (info === "warning") {
      return "bg-soft-warning color-warning"
    } else if (info === "info") {
      return "bg-light-primary color-primary"
    } else if (info === "danger") {
      return "bg-soft-danger color-danger"
    } else {
      return "bg-soft-success color-success"
    }
  }

  return (
    <div className="card-header-kelas-ss card card-kelas-ss card-ss px-0 mt-3 mb-4" style={{ position: "relative" }}>
      <img
        src={"https://picsum.photos/1920/1080"}
        className="card-img-top card-header-ss img-fit-cover bg-detail-partner-kolaborasi mb-lg-0 mb-3"
      />
      { backUrl && (
        <div className="d-flex justify-content-between" style={{ position: "absolute", left: 20, top: 20, zIndex: 10 }}>
          <Link href={backUrl}>
            <a
              className="text-decoration-none fw-bolder position-relative text-white pointer"
              data-joyride="button-kembali"
            >
              <FaChevronLeft />
              <span className="ms-2">Kembali</span>
            </a>
          </Link>
        </div>
      )}
      <div className="card-img-overlay p-lg-4 px-3 pt-4">
        <div className="d-flex justify-content-end">
          <label
            htmlFor="formFileBanner"
            className="rounded-circle bg-soft-secondary color-secondary d-flex align-items-center justify-content-center pointer fs-5 shadow-dark-ss"
            style={{ width: "40px", height: "40px" }}
          >
            <FaCamera />
          </label>
        </div>
        <input
          accept="image/*"
          className="form-control d-none"
          type="file"
          id="formFileBanner"
          onChange={(e) => uploadFileToServer(e, true)}
        ></input>
      </div>
      <div className="name-user-profil p-4 position-relative d-flex justify-content-lg-start justify-content-center text-center">
        <div className="position-absolute img-user-profil">
          <div className="position-relative rounded-circle border border-5 border-white">
            <Avatar name={"Ashandi Leonadi"} size={120} />
            <div
              className="position-absolute"
              style={{ bottom: "0", right: "0" }}
            >
              <div
                className="d-flex justify-content-end position-relative"
                style={{ zIndex: "1" }}
              >
                <label
                  htmlFor="formFile"
                  className="rounded-circle bg-soft-secondary color-secondary d-flex align-items-center justify-content-center pointer fs-6 shadow-dark-ss"
                  style={{ width: "30px", height: "30px" }}
                >
                  <FaCamera />
                </label>
              </div>
              <input
                id="formFile"
                accept="image/*"
                className="form-control d-none"
                type="file"
                // onChange={(e) => uploadFileToServer(e, false)}
              ></input>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between w-100">
          <h4 className="fw-extrabold color-dark mb-0">Ashandi Leonadi</h4>
          { status && (
            <div className={`label-ss fs-12-ss fw-bold rounded-pill ${statusClass(status.info)}`}>
              {status.text}
            </div>
          )}
        </div>
      </div>
      { navMenus.length > 0 && (
        <>
          <hr className="m-lg-0 mt-0 mb-3" />
          <div className="card-footer card-footer-ss card-kelas-footer py-lg-4 py-0 px-lg-4 px-0 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center align-items-stretch">
            <div className="kelas-nav d-flex flex-column flex-lg-row">
              {navMenus.map((d) => {
                return (
                  d.isVisible && (
                    <Link href={d.href} as={d.as}>
                      <a
                        className={`position-relative text-decoration-none fw-bold fs-18-ss px-0  me-lg-5 me-0 pt-0 py-3 py-lg-0 text-center text-mb-left mb-lg-0 mb-3 ${
                          d.active ? "color-primary" : "color-secondary"
                        }`}
                        data-joyride={d.dataJoyride || ""}
                      >
                        {d?.withBadge?.show && (
                          <Badge
                            count={parseInt(d?.withBadge?.text)}
                            className="position-absolute"
                            style={{ top: "-18px", right: "-40px" }}
                          />
                        )}
                        {d.text}
                      </a>
                    </Link>
                  )
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProfileCard;