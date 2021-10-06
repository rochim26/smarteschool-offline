import { FaChevronLeft, FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { ssURL } from "../../client/clientAxios";
import ModalTambahPasal from "./modal/ModalTambahPasal";
import { useRouter } from "next/router";
import { getDetailBabPeraturan } from "../../client/TataTertibClient";
import { useEffect, useState } from "react";
import AnimatePage from "../Shared/AnimatePage/AnimatePage";
import useUser from "../../hooks/useUser";

const PeraturanDetail = () => {

  const { user } = useUser();

  const [editData, setEditData] = useState(null);
  const [detailBab, setDetailBab] = useState({});

  const router = useRouter();
  const { query: { id } } = router;

  const _getDetailBabPeraturan = async () => {
    const { data } = await getDetailBabPeraturan(id);
    if (data) {
      setDetailBab(data?.bab);
    }
  }

  useEffect(() => {
    _getDetailBabPeraturan();
  }, []);

  return <AnimatePage>
    <div className="col-md-12 mb-4">
      <Link href={`${ssURL}/tata-tertib?menu=peraturan`}>
        <a
          className="text-decoration-none fw-bolder position-relative pointer"
          // onClick={handleBack}
        >
          <FaChevronLeft />
          <span className="ms-2">Bab Peraturan</span>
        </a>
      </Link>
      <div className="card card-ss px-2 py-3 mt-3">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img src="/img/icon-bab-peraturan.svg" />
            <div>
              <h4 className="color-dark fw-bold">{detailBab?.nama}</h4>
              <h5 className="color-dark mb-0">{detailBab?.pasal?.length} Pasal</h5>
            </div>
          </div>
          { user?.role !== "siswa" && (
            <button className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold me-3" data-bs-toggle="modal" data-bs-target="#ModalTambahPasal" onClick={() => setEditData(null)}>
              <FaPlus className="me-2" />
              Tambah Pasal
            </button>
          )}
        </div>
      </div>
    </div>

    { detailBab?.pasal?.length > 0 ? detailBab?.pasal?.map(pasalPeraturan => (
      <div className="col-md-12 mb-4">
        <div className="card card-ss card-biaya-pendaftaran p-0">
          <div className="card-header-ss rounded-ss d-flex justify-content-between align-items-between px-4 py-4">
            <h4 className="fw-bold color-dark mb-0 mt-1">
              {pasalPeraturan?.nama}
            </h4>
            <div className="d-flex align-items-center">
              <a
                data-bs-toggle="collapse"
                href={`#collapse-${pasalPeraturan?.id}`}
                role="button"
                aria-expanded="false"
                aria-controls={`collapse-${pasalPeraturan?.id}`}
              >
                <span
                  class="d-flex justify-content-center align-items-center shadow-primary-ss rounded-circle p-1 shadow-primary-ss bg-primary"
                  style={{ width: "40px", height: "40px" }}
                >
                  <img
                    className="dropdown"
                    src="/img/arrow-bottom.svg"
                    alt=""
                  />
                </span>
              </a>
              { user?.role !== "siswa" && (
                <div className="dropdown dropdown-ss dropdown-tata-tertib ms-3">
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
                    <li className="d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#ModalTambahPasal" onClick={() => setEditData(pasalPeraturan)}>
                      <a className="dropdown-item color-secondary">
                        <FaPen className="me-2" />
                        Ubah
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item color-danger">
                        <FaTrashAlt className="me-2 color-danger" />
                        Hapus
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div class="collapse" id={`collapse-${pasalPeraturan?.id}`}>
            <hr className="mb-4 mt-0" />
            <div class="card-body card-footer-ss pb-4 px-4 pt-0">
              <p>Setiap perserta didik yang melanggar akan : </p>

              <p className="color-secondary dangerous-html" dangerouslySetInnerHTML={{ __html: pasalPeraturan?.isi }} />
            </div>
          </div>
        </div>
      </div>
    )) : "Belum ada data"}
    <ModalTambahPasal peraturanId={id} _getDetailBabPeraturan={_getDetailBabPeraturan} editData={editData} />
  </AnimatePage>
}

export default PeraturanDetail;