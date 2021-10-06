import { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { deleteSarpras, getSarpras } from "../../client/SarprasClient";
import ModalTambahSarpras from "./ModalTambahSarpras";

const SectionDaftarSarpras = () => {
  const [sarpras, setSarpras] = useState([]);
  const [editData, setEditData] = useState(null);

  const onClickEdit = (data) => {
    setEditData(data);
  };

  const onClickDelete = async (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deleteSarpras(id);
        if (data) {
          toast.success(data.message);
          _getSarpras();
        } else {
          toast.error(error.message);
        }
      }
    });
  };

  const _getSarpras = async () => {
    const { data } = await getSarpras();
    if (data) {
      setSarpras(data.sarpras);
    }
  };

  useEffect(() => {
    _getSarpras();
  }, []);

  return (
    <div
      className="card-body px-0 pt-4 pb-0 mb-5"
      data-joyride="daftar-sarpras"
    >
      <div className="d-flex justify-content-between align-items-sm-center flex-sm-row flex-column mb-5 px-4">
        <h4 className="fw-extrabold color-dark title-border">Daftar Sarpras</h4>
        <button
          type="button"
          className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold"
          data-bs-toggle="modal"
          data-bs-target="#modalTambahSarpras"
          data-joyride="btn-tambah-sarpras"
        >
          <FaPlus className="me-2" />
          Tambah Sarpras
        </button>
      </div>
      <div className="table-responsive mb-5">
        <table className="table-ss" data-joyride="table-sarpras">
          <thead>
            <tr>
              <th>No</th>
              <th>Foto</th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Link Jelajah Sekolah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sarpras?.map((dataSarpras, idx) => (
              <tr>
                <td>{idx + 1}</td>
                <td>
                  <a href={dataSarpras.foto} target="__blank">
                    <img
                      src={dataSarpras.foto}
                      alt={dataSarpras.nama}
                      className="img-fit-cover rounded-circle pointer"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </a>
                </td>
                <td>{dataSarpras.nama}</td>
                <td>
                  <div
                    dangerouslySetInnerHTML={{ __html: dataSarpras.deskripsi }}
                  />
                </td>
                <td>{dataSarpras.virtualTour}</td>
                <td>
                  <div className="d-flex flex-lg-row flex-md-column flex-row">
                    <div
                      data-bs-toggle="modal"
                      data-bs-target="#modalTambahSarpras"
                      className="rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fs-6 me-3 mb-lg-0 mb-md-3 mb-0"
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                      onClick={() => onClickEdit(dataSarpras)}
                      data-joyride="edit-sarpras"
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
                        onClick={() => onClickDelete(dataSarpras?.id)}
                        data-joyride="delete-sarpras"
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
      <ModalTambahSarpras
        getSarpras={_getSarpras}
        editData={editData}
        setEditData={setEditData}
      />
    </div>
  );
};

export default SectionDaftarSarpras;
