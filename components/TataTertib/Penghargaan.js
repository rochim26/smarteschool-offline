import { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { deletePenghargaan, getPenghargaan } from "../../client/TataTertibClient";
import AnimatePage from "../Shared/AnimatePage/AnimatePage";
import LabelStatus from "../Shared/LabelStatus/LabelStatus";
import ModalTambahPoinPenghargaan from "./modal/ModalTambahPoinPenghargaan";

const Penghargaan = () => {

  const [listPenghargaan, setListPenghargaan] = useState([]);
  const [editData, setEditData] = useState(null);

  const _getPenghargaan = async () => {
    const { data } = await getPenghargaan();
    if (data) {
      setListPenghargaan(data?.tingkat)
    }
  }

  const handleDeletePenghargaan = (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deletePenghargaan(id);
        if (data) {
          toast.success(data?.message);
          _getPenghargaan();
        } else {
          toast.error(error?.message);
        }
      }
    });
  }

  useEffect(() => {
    _getPenghargaan();
  }, []);

  return (
    <AnimatePage>
      <div className="card card-ss">
        <div className="d-flex w-100 align-items-center justify-content-between pt-4 px-3">
          <h4 className="color-dark fw-bold mb-0">Bentuk Penghargaan</h4>
          <button className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold" data-bs-toggle="modal" data-bs-target="#ModalTambahPoinPenghargaan" onClick={() => setEditData(null)}>
            <FaPlus className="me-2" />
            Tambah Bentuk
          </button>
        </div>

        <table className="table-ss mt-4">
          <thead>
            <tr>
              <th>No</th>
              <th>Tingkat Prestasi</th>
              <th>Poin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { listPenghargaan?.length > 0 ? listPenghargaan?.map((penghargaan, index) => (
              <tr>
                <td data-th="No">{index + 1}</td>
                <td data-th="Tingkat Prestasi">{penghargaan?.tingkat}</td>
                <td data-th="Poin">-{penghargaan?.poin}</td>
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
                      <li className="d-flex align-items-center" onClick={() => setEditData(penghargaan)}>
                        <a
                          className="dropdown-item color-secondary"
                          data-bs-toggle="modal"
                          data-bs-target="#ModalTambahPoinPenghargaan"
                        >
                          <FaPen className="me-2" />
                          Ubah
                        </a>
                      </li>
                      <li onClick={() => handleDeletePenghargaan(penghargaan?.id)}>
                        <a
                          className="dropdown-item color-danger"
                        >
                          <FaTrashAlt className="me-2 color-danger" />
                          Hapus
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4">
                  Belum ada Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ModalTambahPoinPenghargaan editData={editData} _getPenghargaan={_getPenghargaan} />
    </AnimatePage>
  )
}

export default Penghargaan;