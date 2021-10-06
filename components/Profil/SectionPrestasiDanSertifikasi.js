import { useState } from "react";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { postProfilUser } from "../../client/AuthClient";
import useUser from "../../hooks/useUser";
import { momentPackage } from "../../utilities/HelperUtils";
import ModalTambahPrestasiDanSertifikasi from "./ModalTambahPrestasiDanSertifikasi";

const SectionPrestasiDanSertifikasi = ({
  isReadOnly = false,
  isPPDB,
  data,
}) => {
  const { user, setUser } = data || useUser();
  const [editIndex, setEditIndex] = useState(null);

  const onClickDelete = (deleteIndex) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const prestasi = [...user.profil.prestasi];
        prestasi.splice(deleteIndex, 1);
        const { data, error } = await postProfilUser({ prestasi: prestasi });
        if (data) {
          toast.success(data?.message);
          setUser({ ...user, profil: { ...user.profil, prestasi: prestasi } });
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
              Prestasi dan Sertifikasi
            </h4>
            {!isReadOnly && (
              <button
                className="btn btn-ss btn-primary btn-primary-ss bg-gradient-primary shadow-primary-ss rounded-pill fs-14-ss fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#modalTambahPrestasiDanSertifikasi"
              >
                <FaPlus className="me-2" />
                Tambah
              </button>
            )}
          </div>
          <ul className="list-group list-group-flush mb-2">
            {user?.profil?.prestasi?.length > 0
              ? user?.profil?.prestasi?.map((prestasi, index) => (
                  <li className="list-group-item pt-0 pb-3 ps-0 pe-0 mb-3">
                    <div className="d-flex align-items-start">
                      <img
                        src="/img/icon-profil-sertifikat.svg"
                        alt="icon-profil-sertifikat"
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center justify-content-between ms-3">
                          <div className="">
                            <h6 className="fw-extrabold color-dark mb-1">
                              {prestasi?.nama}
                            </h6>
                            <p className="fs-14-ss color-dark fw-semibold mb-1">
                              {prestasi?.instansi}
                            </p>
                            <p className="fs-14-ss fw-semibold mb-0">
                              Diterbitkan{" "}
                              {momentPackage(prestasi.tanggalTerbit).format(
                                "MMM YYYY"
                              )}{" "}
                              -
                              {prestasi?.tanggalKadaluarsa
                                ? " " +
                                  momentPackage(
                                    prestasi.tanggalKadaluarsa
                                  ).format("MMM YYYY")
                                : " Tidak ada tanggal kadaluarsa"}
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
                                data-bs-target="#modalTambahPrestasiDanSertifikasi"
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
                        {prestasi?.lampiran && (
                          <a
                            href={prestasi?.lampiran}
                            target="__blank"
                            className="text-decoration-none color-primary fs-14-ss fw-bold mt-3 ms-3"
                          >
                            Lihat Sertifikat
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                ))
              : "Belum ada data"}
          </ul>
        </div>
      </div>
      <ModalTambahPrestasiDanSertifikasi
        editIndex={editIndex}
        setEditIndex={setEditIndex}
      />
    </>
  );
};

export default SectionPrestasiDanSertifikasi;
