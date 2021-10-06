import { useState } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { deletePenghargaanSiswa } from "../../../../client/TataTertibClient";
import useUser from "../../../../hooks/useUser";
import AnimatePage from "../../../Shared/AnimatePage/AnimatePage";
import LabelStatus from "../../../Shared/LabelStatus/LabelStatus"

const Penghargaan = ({ siswa, _getDetailSiswa, setEditDataPenghargaan }) => {
  const { user } = useUser();
  
  const handleClickDeletePenghargaan = (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deletePenghargaanSiswa(id);
        if (data) {
          toast.success(data?.message);
          _getDetailSiswa();
        } else {
          toast.error(error?.message);
        }
      }
    });
  }

  return (
    <AnimatePage>
      <div className="card card-ss mt-3">
        <h4 className="color-dark fw-bold mb-0 py-3 px-4">Daftar Bentuk Penghargaan</h4>
        <table className="table-ss">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Prestasi</th>
              <th>Peringkat</th>
              <th>Tingkat</th>
              <th>Poin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { siswa?.prestasi?.length > 0 ? siswa?.prestasi?.map((prestasi, index) => (
              <tr key={index}>
                <td data-th="No">{index + 1}</td>
                <td data-th="Nama Prestasi">{prestasi?.nama || "-"}</td>
                <td data-th="Peringkat"><h6 className="color-primary mb-0">{prestasi?.peringkat || "-"}</h6></td>
                <td data-th="Tingkat">
                  {prestasi?.tingkatPrestasi?.tingkat || "-"}
                </td>
                <td data-th="Poin">
                  {prestasi?.tingkatPrestasi?.poin || "-"}
                </td>
                <td>
                  { user?.role !== "siswa" && (
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
                        <li className="d-flex align-items-center" onClick={() => setEditDataPenghargaan(prestasi)}>
                          <a
                            className="dropdown-item color-secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#ModalTambahPenghargaan"
                          >
                            <FaPen className="me-2" />
                            Ubah
                          </a>
                        </li>
                        <li onClick={() => handleClickDeletePenghargaan(prestasi?.id)}>
                          <a
                            className="dropdown-item color-danger"
                          >
                            <FaTrashAlt className="me-2 color-danger" />
                            Hapus
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))
              : <tr>
                <td colSpan={6}>Belum ada data</td>
              </tr>}
          </tbody>
        </table>
      </div>
    </AnimatePage>
  )
}

export default Penghargaan;