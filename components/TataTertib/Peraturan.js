import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa"
import { ssURL } from "../../client/clientAxios"
import AnimatePage from "../Shared/AnimatePage/AnimatePage"
import CardBab from "./CardBab"
import Link from "next/link";
import useUser from "../../hooks/useUser";
import ModalTambahBabPeraturan from "./modal/ModalTambahBabPeraturan";
import { deleteBabPeraturan, getBabPeraturan } from "../../client/TataTertibClient";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { toast } from "react-toastify";

const Peraturan = () => {

  const { user } = useUser();

  const [listBabPeraturan, setListBabPeraturan] = useState([]);
  const [editData, setEditData] = useState(null);

  const _getBabPeraturan = async () => {
    const { data } = await getBabPeraturan();
    if (data) {
      setListBabPeraturan(data?.bab);
    }
  }

  const handleDeleteBabPeraturan = (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deleteBabPeraturan(id);
        if (data) {
          toast.success(data?.message);
          _getBabPeraturan();
        } else {
          toast.error(error?.message);
        }
      }
    });
  }

  useEffect(() => {
    _getBabPeraturan();
  }, []);

  return (
    <div className={`${user?.role === "siswa" ? "col-md-12" : "col-md-12 col-lg-9"}`}>
      <AnimatePage>
        <div className="d-flex w-100 align-items-center justify-content-between">
          <h4 className="color-dark fw-bold mb-0">Bab Peraturan</h4>
          { user?.role !== "siswa" && (
            <button className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold" data-bs-toggle="modal" data-bs-target="#ModalTambahBabPeraturan" onClick={() => setEditData(null)}>
              <FaPlus className="me-2" />
              Tambah Bab
            </button>
          )}
        </div>
        <hr />

        { listBabPeraturan?.length > 0 ? listBabPeraturan?.map(({ id, nama, meta: { total: totalPasal } }) => (
          <CardBab containerClass="mb-3 card-tata-tertib">
            <Link href={`${ssURL}/tata-tertib?menu=peraturan&detail=peraturan&id=${id}`}>
              <a>
                <h5 className="color-dark fw-bold mb-0">{nama}</h5>
                <p className="color-secondary fs-14-ss mb-0">{totalPasal} Pasal</p>
              </a>
            </Link>
            { user?.role !== "siswa" && (
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
                  <li className="d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#ModalTambahBabPeraturan" onClick={() => setEditData({ nama, id })}>
                    <a className="dropdown-item color-secondary">
                      <FaPen className="me-2" />
                      Ubah
                    </a>
                  </li>
                  <li onClick={() => handleDeleteBabPeraturan(id)}>
                    <a className="dropdown-item color-danger">
                      <FaTrashAlt className="me-2 color-danger" />
                      Hapus
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </CardBab>
        )) : "Belum ada data"}
      </AnimatePage>
      <ModalTambahBabPeraturan editData={editData} _getBabPeraturan={_getBabPeraturan} />
    </div>
  )
}

export default Peraturan