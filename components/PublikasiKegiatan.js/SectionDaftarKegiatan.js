import { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import swal from "sweetalert";
import {
  deleteKegiatanGaleri,
  getKegiatanGaleri,
} from "../../client/KegiatanClient";
import ModalTambahDaftarKegiatan from "./ModalTambahDaftarKegiatan";

const SectionDaftarKegiatan = ({
  kegiatanNama,
  kegiatanId,
  kegiatanGaleri,
  getKegiatanData,
}) => {
  const [editData, setEditData] = useState(null);

  const handleDeleteKegiatanGaleri = async (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data } = await deleteKegiatanGaleri(id);
        if (data) {
          toast.success(data?.message);
          getKegiatanData();
        }
      }
    });
  };

  const onClickEdit = (data) => {
    setEditData(data);
  };

  return (
    <div
      className="card-body pt-4 pb-0 mb-5 px-0"
      data-joyride="daftar-kegiatan"
    >
      <div className="d-flex justify-content-between align-items-sm-center flex-sm-row flex-column mb-5 px-4">
        <h4 className="fw-extrabold color-dark title-border mb-0">
          Daftar Kegiatan {kegiatanNama}
        </h4>
        <button
          type="button"
          className="btn btn-ss btn-primary btn-primary-ss rounded-pill shadow-primary-ss fw-bold"
          data-bs-toggle="modal"
          data-bs-target="#modalTambahDaftarKegiatan"
          data-joyride="btn-tambah-kegiatan"
        >
          <FaPlus className="me-2" />
          Tambah Kegiatan {kegiatanNama} Baru
        </button>
      </div>
      <div className="table-responsive mb-5">
        <table className="table-ss" data-joyride="table-kegiatan">
          <thead>
            <tr>
              <th>No</th>
              <th>Foto</th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kegiatanGaleri?.map((galeri, idx) => (
              <tr>
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={galeri.foto}
                    alt="test"
                    className="img-fit-cover rounded-circle pointer"
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{galeri.nama}</td>
                <td dangerouslySetInnerHTML={{ __html: galeri.deskripsi }}></td>
                <td>
                  <div className="d-flex flex-lg-row flex-sm-column flex-row justify-content-between">
                    <div
                      data-bs-toggle="modal"
                      data-bs-target="#modalTambahDaftarKegiatan"
                      className="rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fs-6 me-lg-2 mb-2 pointer"
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                      onClick={() => onClickEdit(galeri)}
                      data-joyride="edit-kegiatan"
                    >
                      <FaPen className="color-secondary" />
                    </div>
                    <div className="d-flex flex-lg-row flex-sm-column flex-row justify-content-between">
                      <div
                        className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fs-6 pointer"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                        onClick={() => handleDeleteKegiatanGaleri(galeri?.id)}
                        data-joyride="delete-kegiatan"
                      >
                        <FaTrashAlt className="color-secondary" />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalTambahDaftarKegiatan
        kegiatanNama={kegiatanNama}
        kegiatanId={kegiatanId}
        getKegiatanData={getKegiatanData}
        editData={editData}
        setEditData={setEditData}
      />
    </div>
  );
};

export default SectionDaftarKegiatan;
