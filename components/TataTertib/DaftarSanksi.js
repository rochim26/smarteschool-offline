import { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { deleteSanksiPelanggaran, getSanksiPelanggaran } from "../../client/TataTertibClient";
import AnimatePage from "../Shared/AnimatePage/AnimatePage";
import ModalTambahSanksiPelanggaran from "./modal/ModalTambahSanksiPelanggaran";

const DaftarPenghargaan = () => {

  const [editData, setEditData] = useState(null);
  const [listSanksiPelanggaran, setListSanksiPelanggaran] = useState([]);

  const _getSanksiPelanggaran = async () => {
    const { data } = await getSanksiPelanggaran();
    if (data) {
      setListSanksiPelanggaran(data?.sanksi);
    }
  }

  const handleDeleteSanksiPelanggaran = (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deleteSanksiPelanggaran(id);
        if (data) {
          toast.success(data?.message);
          _getSanksiPelanggaran();
        } else {
          toast.error(error?.message);
        }
      }
    });
  }

  useEffect(() => {
    _getSanksiPelanggaran();
  }, []);

  return (
    <AnimatePage>
      <div className="card card-ss">
        <div className="d-flex w-100 align-items-center justify-content-between pt-4 px-3">
          <h4 className="color-dark fw-bold mb-0">Sanksi Pelanggaran</h4>
          <button className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold" data-bs-toggle="modal" data-bs-target="#ModalTambahSanksiPelanggaran" onClick={() => setEditData(null)}>
            <FaPlus className="me-2" />
            Tambah Sanksi
          </button>
        </div>

        <table className="table-ss mt-4">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Poin</th>
              <th>Tindak Lanjut</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { listSanksiPelanggaran?.length > 0 ? listSanksiPelanggaran?.map((pelanggaran, index) => (
              <tr>
                <td data-th="No">{index + 1}</td>
                <td data-th="Nama">{pelanggaran?.nama}</td>
                <td data-th="Poin">{`${pelanggaran?.poinBawah} - ${pelanggaran?.poinAtas}`}</td>
                <td data-th="Tindak Lanjut">{pelanggaran?.tindakLanjut}</td>
                <td>
                <div className="dropdown dropdown-ss">
                  <div
                    aria-expanded="false"
                    style={{ justifySelf: "flex-end" }}

                    role="button"
                    id="dropdownBuatKalender"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="/img/icon-option-horizontal.svg"
                      alt="icon-option-vertical"
                    />
                  </div>
                  <ul className="dropdown-menu dropdown-menu-ss my-1" aria-labelledby="dropdownBuatKalender">
                    <li className="d-flex align-items-center" onClick={() => setEditData(pelanggaran)}>
                      <a
                        className="dropdown-item color-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#ModalTambahSanksiPelanggaran"
                      >
                        <FaPen className="me-2" />
                        Ubah
                      </a>
                    </li>
                    <li onClick={() => handleDeleteSanksiPelanggaran(pelanggaran?.id)}>
                      <a className="dropdown-item color-danger">
                        <FaTrashAlt className="me-2 color-danger" />
                        Hapus
                      </a>
                    </li>
                  </ul>
                </div>
                </td>
              </tr>
            )) : "Belum ada data"}
          </tbody>
        </table>
      </div>
      <ModalTambahSanksiPelanggaran _getSanksiPelanggaran={_getSanksiPelanggaran} editData={editData} />
    </AnimatePage>
  )
}

export default DaftarPenghargaan;