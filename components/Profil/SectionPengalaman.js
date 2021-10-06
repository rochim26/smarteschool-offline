import { useState } from "react";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { postProfilUser } from "../../client/AuthClient";
import useUser from "../../hooks/useUser";
import { momentPackage } from "../../utilities/HelperUtils";
import ModalTambahPengalaman from "./ModalTambahPengalaman";

const SectionPengalaman = ({ isReadOnly = false, isPPDB, data }) => {
  const { user, setUser } = data || useUser();
  const [editIndex, setEditIndex] = useState(null);

  const handleDeletePengalaman = (deleteIndex) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const pengalaman = [...user.profil.pengalaman];
        pengalaman.splice(deleteIndex, 1);
        const { data, error } = await postProfilUser({
          pengalaman: pengalaman,
        });
        if (data) {
          toast.success(data?.message);
          setUser({
            ...user,
            profil: { ...user.profil, pengalaman: pengalaman },
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
            <h4
              className={`fw-extrabold color-dark mb-0 ${
                isPPDB ? "title-border" : null
              }`}
            >
              Pengalaman
            </h4>
            {!isReadOnly && (
              <button
                className="btn btn-ss btn-primary btn-primary-ss bg-gradient-primary shadow-primary-ss rounded-pill fs-14-ss fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#modalTambahPengalaman"
              >
                <FaPlus className="me-2" />
                Tambah
              </button>
            )}
          </div>
          <ul className="list-group list-group-flush mb-2">
            {user?.profil?.pengalaman?.length > 0
              ? user?.profil?.pengalaman?.map((pengalaman, index) => (
                  <li
                    className="list-group-item pt-0 pb-3 ps-0 pe-0 mb-3"
                    key={index}
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src="/img/icon-profil-pengalaman.svg"
                        alt="icon-profil-pengalaman"
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center justify-content-between ms-3">
                          <div className="">
                            <h6 className="fw-extrabold color-dark mb-1">
                              {pengalaman?.judul || "-"}
                            </h6>
                            <p className="fs-14-ss color-dark fw-semibold mb-1">
                              {pengalaman?.instansi}
                            </p>
                            <p className="fs-14-ss fw-semibold mb-0">
                              {momentPackage(pengalaman?.dimulai).format(
                                "MMM YYYY"
                              )}{" "}
                              -{" "}
                              {momentPackage(pengalaman?.berakhir).format(
                                "MMM YYYY"
                              )}{" "}
                              ({" "}
                              {momentPackage(pengalaman?.berakhir).diff(
                                pengalaman?.dimulai,
                                "year"
                              )}{" "}
                              tahun )
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
                                data-bs-target="#modalTambahPengalaman"
                                onClick={() => setEditIndex(index)}
                              >
                                <FaPen className="color-secondary fs-5" />
                              </button>
                            )}
                            {!isReadOnly && (
                              <button
                                className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fs-6 pointer ms-3"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                }}
                                onClick={() => handleDeletePengalaman(index)}
                              >
                                <FaTrashAlt className="color-secondary" />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="fs-14-ss fw-semibold color-dark mb-0 mt-3 ms-3">
                          {pengalaman?.deskripsi || "-"}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              : "Belum ada data"}
          </ul>
        </div>
      </div>
      <ModalTambahPengalaman
        editIndex={editIndex}
        setEditIndex={setEditIndex}
      />
    </>
  );
};

export default SectionPengalaman;
