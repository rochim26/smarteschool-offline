import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import AnimatePage from "../Shared/AnimatePage/AnimatePage";
import LabelStatus from "../Shared/LabelStatus/LabelStatus";
import CardBab from "./CardBab";
import Link from "next/link";
import { ssURL } from "../../client/clientAxios";
import ModalTambahKategoriPelanggaran from "./modal/ModalTambahKategoriPelanggaran";
import { deleteKategoriPelanggaran, getKategoriPelanggaran } from "../../client/TataTertibClient";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { toast } from "react-toastify";

const Pelanggaran = () => { 

  const [editData, setEditData] = useState(null);

  const [listKategoriPelanggaran, setListKategoriPelanggaran] = useState([]);

  const _getKategoriPelanggaran = async () => {
    const { data } = await getKategoriPelanggaran();
    if (data) {
      setListKategoriPelanggaran(data?.kategori);
    }
  }

  const handleDeleteKategoriPelanggaran = (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deleteKategoriPelanggaran(id);
        if (data) {
          toast.success(data?.message);
          _getKategoriPelanggaran();
        } else {
          toast.error(error?.message);
        }
      }
    });
  }

  useEffect(() => {
    _getKategoriPelanggaran();
  }, []);

  return (
    <AnimatePage>
      <div className="d-flex w-100 align-items-center justify-content-between">
        <h4 className="color-dark fw-bold mb-0">Kategori Pelanggaran</h4>
        <button className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold" data-bs-toggle="modal" data-bs-target="#ModalTambahKategoriPelanggaran" onClick={() => setEditData(null)}>
          <FaPlus className="me-2" />
          Tambah Kategori
        </button>
      </div>
      <hr />

      <div className="row">
        { listKategoriPelanggaran?.length > 0 ? listKategoriPelanggaran?.map(kategori => (
          <div className="col-md-4 mb-3">
            <CardBab>
              <Link href={`${ssURL}/tata-tertib?menu=poin&nav=pelanggaran&detail=pelanggaran&id=${kategori?.id}`}>
                <a>
                  <h5 className="color-dark fw-bold mb-2">{kategori?.nama}</h5>
                  <p className="color-secondary fs-14-ss mb-0">{kategori?.meta?.total} Bentuk Pelanggaran</p>
                </a>
              </Link>
              <div style={{ top: 20, right: 30 }} className="dropdown dropdown-ss position-absolute dropdown-tata-tertib">
                <div
                  aria-expanded="false"
                  style={{ justifySelf: "flex-end" }}

                  role="button"
                  id="dropdownBuatKalender"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src="/img/icon-option-vertical.svg" />
                </div>
                <ul className="dropdown-menu dropdown-menu-ss my-1" aria-labelledby="dropdownBuatKalender">
                  <li className="d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#ModalTambahKategoriPelanggaran" onClick={() => setEditData({ nama: kategori?.nama, id: kategori?.id })}>
                    <a className="dropdown-item color-secondary">
                      <FaPen className="me-2" />
                      Ubah
                    </a>
                  </li>
                  <li onClick={() => handleDeleteKategoriPelanggaran(kategori?.id)}>
                    <a className="dropdown-item color-danger">
                      <FaTrashAlt className="me-2 color-danger" />
                      Hapus
                    </a>
                  </li>
                </ul>
              </div>
            </CardBab>
          </div>
        )) : "Belum ada data"}
      </div>
      <ModalTambahKategoriPelanggaran _getKategoriPelanggaran={_getKategoriPelanggaran} editData={editData} />
    </AnimatePage>
  )
}

export default Pelanggaran;