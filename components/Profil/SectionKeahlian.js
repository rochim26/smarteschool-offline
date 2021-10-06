import { FaPlus } from "react-icons/fa";
import useUser from "../../hooks/useUser";
import ModalTambahKeahlian from "../Profil/ModalTambahKeahlian";

const SectionKeahlian = ({ isReadOnly = false, data }) => {
  const { user } = data || useUser();

  return (
    <>
      <div className="card card-ss">
        <div
          className="card-body"
          style={{ padding: "20px", paddingBottom: "44px" }}
        >
          <div
            className="d-flex justify-content-between align-items-center pt-1 pb-0 px-1"
            style={{ marginBottom: "20px" }}
          >
            <h4 className="fw-extrabold color-dark mb-0">Keahlian</h4>
            {!isReadOnly && (
              <button
                className="btn btn-ss btn-primary btn-primary-ss bg-gradient-primary shadow-primary-ss rounded-pill fs-14-ss fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#modalTambahKeahlian"
              >
                <FaPlus className="me-2" />
                Tambah
              </button>
            )}
          </div>
          <div className="d-flex flex-wrap">
            {user?.profil?.keahlian?.length > 0
              ? user?.profil?.keahlian?.map((keahlian) => (
                  <span className="label-ss rounded-pill bg-soft-secondary color-secondary fw-bold fs-12-ss m-1">
                    {keahlian}
                  </span>
                ))
              : "Belum ada data"}
          </div>
        </div>
      </div>
      <ModalTambahKeahlian />
    </>
  );
};

export default SectionKeahlian;
