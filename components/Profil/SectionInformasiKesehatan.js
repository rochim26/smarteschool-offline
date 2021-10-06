import { FaPen } from "react-icons/fa";
import useUser from "../../hooks/useUser";
import ModalEditInformasiKesehatan from "./ModalEditInformasiKesehatan";

const SectionInformasiKesehatan = ({ isReadOnly }) => {
  const { user, setUser } = useUser();

  const showLampiranTidakButaWarna = user?.profil?.butaWarna === 0;
  const showKeteranganKacamata = user?.profil?.kacamata !== "0";
  const showKeteranganSehat = user?.profil?.disabilitas === "0";

  return (
    <>
      <div className="card card-ss">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-extrabold color-dark mb-0">
              Informasi Kesehatan
            </h4>
            {!isReadOnly && (
              <button
                type="button"
                className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center p-1"
                style={{
                  width: "40px",
                  height: "40px",
                }}
                data-bs-toggle="modal"
                data-bs-target="#modalEditInformasiKesehatan"
                // onClick={() => onClickEdit(slider)}
                // data-joyride="edit-slider"
              >
                <FaPen className="color-secondary fs-5" />
              </button>
            )}
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item pt-0 pb-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Tinggi Badan</h6>
              <p className="color-secondary fs-18-ss fw-semibold mb-0">
                {user?.profil?.tb || "-"}
              </p>
            </li>
            <li className="list-group-item pt-0 pb-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Berat Badan</h6>
              <p className="color-secondary fs-18-ss fw-semibold mb-0">
                {user?.profil?.tb ? `${user?.profil?.tb} kg` : "-"}
              </p>
            </li>
            <li className="list-group-item pt-0 pb-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Golongan Darah</h6>
              <p className="color-secondary fs-18-ss fw-semibold mb-0 text-uppercase">
                {user?.profil?.golDarah || "-"}
              </p>
            </li>
            <li className="list-group-item pt-0 pb-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Buta Warna</h6>
              <p className="color-secondary fs-18-ss fw-semibold mb-0 text-uppercase">
                {user?.profil?.butaWarna ? "Buta Warna" : "Tidak Buta Warna"}
              </p>
            </li>
            {showLampiranTidakButaWarna && (
              <li className="list-group-item pt-0 pb-2 ps-0 mb-4">
                <h6 className="color-dark fw-bold mb-2">
                  Surat Keterangan Tidak Buta Warna
                </h6>
                <a
                  href={user?.profil?.suratKeteranganButaWarna}
                  target="__blank"
                  className="fs-14-ss"
                >
                  Lihat Surat
                </a>
              </li>
            )}
            <li className="list-group-item pt-0 pb-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Kacamata</h6>
              <p className="color-secondary fs-18-ss fw-semibold mb-0 text-uppercase">
                {user?.profil?.kacamata !== "0" ? "Kacamata" : "Tidak Kacamata"}
              </p>
            </li>
            {showKeteranganKacamata && (
              <li className="list-group-item pt-0 pb-2 ps-0 mb-4">
                <h6 className="color-dark fw-bold mb-2">Keterangan Kacamata</h6>
                <p className="color-secondary fs-18-ss fw-semibold mb-0 text-uppercase">
                  {user?.profil?.kacamata === "1" ||
                  user?.profil?.kacamata === "0"
                    ? "-"
                    : user?.profil?.kacamata}
                </p>
              </li>
            )}
            <li className="list-group-item pt-0 pb-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Disabilitas</h6>
              <p className="color-secondary fs-18-ss fw-semibold mb-0 text-uppercase">
                {!showKeteranganSehat ? "Disabilitas" : "Tidak Disabilitas"}
              </p>
            </li>
            {showKeteranganSehat && (
              <li className="list-group-item pt-0 pb-2 ps-0 mb-4">
                <h6 className="color-dark fw-bold mb-2">
                  Surat Keterangan Sehat
                </h6>
                <a
                  href={user?.profil?.suratKeteranganSehat}
                  target="__blank"
                  className="fs-14-ss"
                >
                  Lihat Surat
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <ModalEditInformasiKesehatan />
    </>
  );
};

export default SectionInformasiKesehatan;
