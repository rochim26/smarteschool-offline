import { FaChevronLeft, FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import AnimatePage from "../Shared/AnimatePage/AnimatePage";
import Link from "next/link";
import { ssURL } from "../../client/clientAxios";
import ModalTambahBentukPelanggaran from "./modal/ModalTambahBentukPelanggaran";
import { deleteBentukPelanggaran, getDetailPelanggaran } from "../../client/TataTertibClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import swal from "sweetalert";
import { toast } from "react-toastify";

const PelanggaranDetail = () => {

  const [editData, setEditData] = useState(null);
  const [detailPelanggaran, setDetailPelanggaran] = useState({});

  const jumlahBentukPelanggaran = detailPelanggaran?.pelanggaran?.length || 0;
  const jumlahPoinPelanggaran = detailPelanggaran?.pelanggaran?.reduce((currentNumber, array) => currentNumber + array?.poin, 0);

  const router = useRouter();
  const { query: { id } } = router;

  const _getDetailPelanggaran = async () => {
    const { data } = await getDetailPelanggaran(id);
    if (data) {
      setDetailPelanggaran(data?.kategori);
    }
  }

  const handleDeleteBentukPelanggaran = (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deleteBentukPelanggaran(id);
        if (data) {
          toast.success(data?.message);
          _getDetailPelanggaran();
        } else {
          toast.error(error?.message);
        }
      }
    });
  }

  useEffect(() => {
    _getDetailPelanggaran();
  }, []);

  return (
    <AnimatePage>
      <div className="card card-ss py-4 px-3">
        <Link href={`${ssURL}/tata-tertib?menu=poin&nav=pelanggaran`}>
          <a
            className="text-decoration-none fw-bolder position-relative pointer"
            // onClick={handleBack}
          >
            <FaChevronLeft />
            <span className="ms-2">Kembali</span>
          </a>
        </Link>
        <div className="d-flex align-items-center">
          <img src="/img/icon-bentuk-pelanggaran.svg" />
          <div>
            <h4 className="color-dark fw-bold">Bentuk Pelanggaran</h4>
            <p className="color-dark mb-0">{detailPelanggaran?.nama}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8" style={{ minHeight: 85 }}>
            <div className="rounded-ss py-3 px-4 d-flex align-items-center h-100" style={{ backgroundColor: "#F8F8FB" }}>
              <div className="w-50">
                <p className="color-secondary fw-bold mb-0 fs-14-ss">Jumlah Bentuk Pelanggaran</p>
                <p className="color-primary mb-0 fw-bold">{jumlahBentukPelanggaran}</p>
              </div>
              <div>
                <p className="color-secondary fw-bold mb-0 fs-14-ss">Jumlah Poin Pelanggaran</p>
                <p className="color-primary mb-0 fw-bold">{jumlahPoinPelanggaran}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            
            <a
              className="btn btn-primary btn-primary-ss rounded-ss d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-start py-3 px-4 h-100"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#ModalTambahBentukPelanggaran"
              onClick={() => setEditData(null)}
            >
              <div className="d-flex align-items-center flex-lg-row flex-md-column flex-row ">
                <img
                  src={`/img/icon-pelanggaran-tata-tertib.svg`}
                  alt="icon-tambah-prestasi"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
                <p className="m-0 text-white fw-bold px-lg-4 px-md-0 px-4 py-lg-0 py-md-2 py-0" style={{ textAlign: "left" }}>
                Tambah Bentuk Pelanggaran
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="card card-ss mt-3">
        <div className="d-flex w-100 align-items-center justify-content-between pt-4 px-3">
          <h4 className="color-dark fw-bold mb-0">Bentuk Pelanggaran {detailPelanggaran?.nama}</h4>
          <input
            type="text"
            className="form-control form-search rounded-pill fs-14-ss fw-semibold border-secondary-ss"
            id="exampleFormControlInput1"
            placeholder="Cari bentuk pelanggaran"
          />
        </div>

        <table className="table-ss mt-4">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Poin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { detailPelanggaran?.pelanggaran?.length > 0 ? detailPelanggaran?.pelanggaran?.map((pel, index) => (
              <tr>
                <td data-th="No">{index + 1}</td>
                <td data-th="Nama">{pel?.nama}</td>
                <td data-th="Poin">{pel?.poin}</td>
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
                    <li className="d-flex align-items-center">
                      <a
                        className="dropdown-item color-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#ModalTambahBentukPelanggaran"
                        onClick={() => setEditData(pel)}
                      >
                        <FaPen className="me-2" />
                        Ubah
                      </a>
                    </li>
                    <li onClick={() => handleDeleteBentukPelanggaran(pel?.id)}>
                      <a className="dropdown-item color-danger">
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
                <td colSpan={4}>Belum ada data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ModalTambahBentukPelanggaran pelanggaranId={id} _getDetailPelanggaran={_getDetailPelanggaran} editData={editData} />
    </AnimatePage>
  )
}

export default PelanggaranDetail;