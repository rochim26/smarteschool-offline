import { FaPen, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { deletePelanggaranSiswa } from "../../../../client/TataTertibClient";
import useUser from "../../../../hooks/useUser";
import { momentPackage } from "../../../../utilities/HelperUtils";
import AnimatePage from "../../../Shared/AnimatePage/AnimatePage";
import LabelStatus from "../../../Shared/LabelStatus/LabelStatus"

const Pelanggaran = ({ siswa, setEditDataBentukPelanggaran, _getDetailSiswa }) => {

  const { user } = useUser();
  const { pelanggaranSiswa } = siswa || []

  const handleDeletePelanggaranSiswa = async (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deletePelanggaranSiswa(id);
        if (data) {
          toast.success(data?.message);
          _getDetailSiswa();
        } else {
          toast.error(error?.message);
        }
      }
    });
  };

  return (
    <AnimatePage>
      <div className="card card-ss mt-3">
        <h4 className="color-dark fw-bold mb-0 py-3 px-4">Daftar Bentuk Pelanggaran</h4>
        <table className="table-ss">
          <thead>
            <tr>
              <th>No</th>
              <th>Bentuk Pelanggaran</th>
              <th>Poin</th>
              <th>Pelapor</th>
              <th>Tanggal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { pelanggaranSiswa?.length > 0 ? pelanggaranSiswa?.map((pelanggaran, index) => (
              <tr key={`${pelanggaran?.id}-${index}`}>
                <td data-th="No">{index + 1}</td>
                <td data-th="Bentuk Pelanggaran">{pelanggaran?.pelanggaran?.nama}</td>
                <td data-th="Poin"><h6 className="color-primary mb-0">{pelanggaran?.poin}</h6></td>
                <td data-th="Pelapor">
                  {pelanggaran?.userPelapor?.nama}
                </td>
                <td data-th="Tanggal">
                  {momentPackage(pelanggaran?.tanggalPelanggaran).format("dddd, DD MMMM YYYY")}
                </td>
                <td data-th="Aksi">
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
                        <li className="d-flex align-items-center" onClick={() => setEditDataBentukPelanggaran(pelanggaran)}>
                          <a
                            className="dropdown-item color-secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#ModalTambahPelanggaran"
                          >
                            <FaPen className="me-2" />
                            Ubah
                          </a>
                        </li>
                        <li onClick={() => handleDeletePelanggaranSiswa(pelanggaran?.id)}>
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
            )) : <tr>
              <td colSpan={6}>Belum ada data</td>
            </tr>}
          </tbody>
        </table>
      </div>
    </AnimatePage>
  )
}

export default Pelanggaran;