import { FaPen } from "react-icons/fa";

import useUser from "../../hooks/useUser";
import ModalEditKontakOrangTua from "./ModalEditKontakOrangTua";

const SectionKontakOrangTua = () => {
  const { user } = useUser();

  return (
    <>
      <div className="card card-ss">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-extrabold color-dark mb-0">
              Kontak Orang Tua / Wali
            </h4>
            <button
              type="button"
              className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center p-1"
              style={{
                width: "40px",
                height: "40px",
              }}
              data-bs-toggle="modal"
              data-bs-target="#modalEditKontakOrangTua"
              // onClick={() => onClickEdit(slider)}
              // data-joyride="edit-slider"
            >
              <FaPen className="color-secondary fs-5" />
            </button>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Nama Ayah</h6>
              <p className="color-secondary fs-18-ss fw-semibold mb-0 text-uppercase">
                {user?.profil?.namaAyah || "-"}
              </p>
            </li>
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Nomer Whatsapp</h6>
              <p className="color-secondary fs-18-ss fw-semibold mb-0 text-uppercase">
                {user?.profil?.telpAyah || "-"}
              </p>
            </li>
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Nama Ibu</h6>
              <p className="color-secondary fs-18-ss fw-semibold mb-0 text-uppercase">
                {user?.profil?.namaIbu || "-"}
              </p>
            </li>
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Nomer Whatsapp</h6>
              <p className="color-secondary fs-18-ss fw-semibold mb-0 text-uppercase">
                {user?.profil?.telpIbu || "-"}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <ModalEditKontakOrangTua />
    </>
  );
};

export default SectionKontakOrangTua;
