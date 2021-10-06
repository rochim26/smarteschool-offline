import { Tooltip } from "antd";
import { useState } from "react";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { postProfilUser } from "../../client/AuthClient";
import useUser from "../../hooks/useUser";
import { momentPackage } from "../../utilities/HelperUtils";
import ModalDetailPortofolio from "./ModalDetailPortofolio";
import ModalTambahPortofolio from "./ModalTambahPortofolio";

const SectionPortofolio = ({ isReadOnly = false, data }) => {
  const { user, setUser } = data || useUser();
  const [editIndex, setEditIndex] = useState(null);
  const [singlePortfolio, setSinglePortfolio] = useState(null);

  const onClickDelete = (deleteIndex) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const portofolio = [...user.profil.portofolio];
        portofolio.splice(deleteIndex, 1);
        const { data, error } = await postProfilUser({
          portofolio: portofolio,
        });
        if (data) {
          toast.success(data?.message);
          setUser({
            ...user,
            profil: { ...user.profil, portofolio: portofolio },
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
            <h4 className="fw-extrabold color-dark mb-0">Portofolio</h4>
            {!isReadOnly && (
              <button
                className="btn btn-ss btn-primary btn-primary-ss bg-gradient-primary shadow-primary-ss rounded-pill fs-14-ss fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#modalTambahPortofolio"
              >
                <FaPlus className="me-2" />
                Tambah
              </button>
            )}
          </div>
          <ul className="list-group list-group-flush mb-2">
            {user?.profil?.portofolio?.length > 0
              ? user?.profil?.portofolio?.map((portofolio, index) => (
                  <li
                    className="list-group-item pt-0 pb-3 ps-0 pe-0 mb-3"
                    key={index}
                    onClick={() => setSinglePortfolio(portofolio)}
                  >
                    <div className="d-flex align-items-center">
                      <a
                        href=""
                        data-bs-toggle="modal"
                        data-bs-target="#modalDetailPortofolio"
                      >
                        <img
                          src={portofolio.dokumentasi[0]}
                          alt="icon-profil-portofolio"
                          className="img-fit-cover rounded-ss pointer"
                          width="250px"
                          height="150px"
                        />
                      </a>
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center justify-content-between ms-3">
                          <a
                            className="text-decoration-none pointer"
                            data-bs-toggle="modal"
                            data-bs-target="#modalDetailPortofolio"
                          >
                            <h5 className="fs-18-ss fw-extrabold color-dark mb-1">
                              {portofolio.nama}
                            </h5>
                            <p className="text-decoration-none color-primary fw-semibold fs-14-ss mb-3">
                              {portofolio.bidang}
                            </p>
                            <Tooltip title={portofolio.deskripsi}>
                              <p
                                className="fs-14-ss color-dark fw-semibold mb-2"
                                style={{
                                  maxHeight: "40px",
                                  overflowY: "hidden",
                                }}
                              >
                                {portofolio.deskripsi}
                              </p>
                            </Tooltip>
                            <p className="fs-14-ss color-secondary fw-semibold mb-0">
                              {`${momentPackage(portofolio.dimulai).format(
                                "MMM YYYY"
                              )} - ${momentPackage(portofolio.berakhir).format(
                                "MMM YYYY"
                              )}`}
                            </p>
                          </a>
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
                                data-bs-target="#modalTambahPortofolio"
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
                              onClick={() => onClickDelete(index)}
                            >
                              <FaTrashAlt className="color-secondary" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              : "Belum ada data"}
          </ul>
        </div>
      </div>
      <ModalTambahPortofolio
        editIndex={editIndex}
        setEditIndex={setEditIndex}
      />
      <ModalDetailPortofolio
        singlePortfolio={singlePortfolio}
        setSinglePortfolio={setSinglePortfolio}
      />
    </>
  );
};

export default SectionPortofolio;
