import moment from "moment";
import { useState } from "react";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { postProfilUser } from "../../client/AuthClient";
import useUser from "../../hooks/useUser";
import ModalTambahPendidikan from "./ModalTambahPendidikan";

const SectionPendidikan = ({ isReadOnly = false, data }) => {
  const { user, setUser } = data || useUser();
  const [editIndex, setEditIndex] = useState(null);

  const handleDeletePendidikan = (deleteIndex) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const pendidikan = [...user.profil.pendidikan];
        pendidikan.splice(deleteIndex, 1);
        const { data, error } = await postProfilUser({
          pendidikan: pendidikan,
        });
        if (data) {
          toast.success(data?.message);
          setUser({
            ...user,
            profil: { ...user.profil, pendidikan: pendidikan },
          });
        } else {
          setButtonState("error");
          toast.error(error?.message);
        }
      }
    });
  };

  return (
    <>
      <div className="card card-ss">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-extrabold color-dark mb-0">Pendidikan</h4>
            {!isReadOnly && (
              <button
                className="btn btn-ss btn-primary btn-primary-ss bg-gradient-primary shadow-primary-ss rounded-pill fs-14-ss fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#modalTambahPendidikan"
              >
                <FaPlus className="me-2" />
                Tambah
              </button>
            )}
          </div>
          <ul className="list-group list-group-flush mb-2">
            {user?.profil?.pendidikan?.length > 0
              ? user?.profil?.pendidikan?.map((pen, index) => (
                  <li
                    className="list-group-item pt-0 pb-3 ps-0 pe-0 mb-3"
                    key={index}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src="/img/icon-profil-pendidikan.svg"
                        alt="icon-profil-pendidikan"
                      />
                      <div className="d-flex align-items-center justify-content-between ms-3 flex-grow-1">
                        <div className="">
                          <h6 className="fw-extrabold color-dark mb-1">
                            {pen?.instansi}
                          </h6>
                          <p className="fs-14-ss color-dark fw-semibold mb-1">
                            {pen.jurusan}
                          </p>
                          <p className="fs-14-ss color-dark fw-semibold mb-1">
                            {pen.gelar}
                          </p>
                          <p className="fs-14-ss fw-semibold mb-0">
                            {pen.dimulai.substr(0, 4)} -{" "}
                            {pen.berakhir.substr(0, 4)}
                          </p>
                        </div>
                        <div className="d-flex align-items-center">
                          {!isReadOnly && (
                            <button
                              type="button"
                              className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center p-2 ms-sm-0 ms-2"
                              style={{
                                width: "40px",
                                height: "40px",
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#modalTambahPendidikan"
                              onClick={() => setEditIndex(index)}
                            >
                              <FaPen className="color-secondary fs-5" />
                            </button>
                          )}
                          <button
                            className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fs-6 pointer ms-3"
                            style={{
                              width: "40px",
                              height: "40px",
                            }}
                            onClick={() => handleDeletePendidikan(index)}
                          >
                            <FaTrashAlt className="color-secondary" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              : "Data kosong"}
          </ul>
        </div>
      </div>
      <ModalTambahPendidikan
        editIndex={editIndex}
        setEditIndex={setEditIndex}
      />
    </>
  );
};

export default SectionPendidikan;
