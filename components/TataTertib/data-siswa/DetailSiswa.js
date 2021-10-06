import { FaChevronLeft, FaUser } from "react-icons/fa";
import AnimatePage from "../../Shared/AnimatePage/AnimatePage";
import Link from "next/link";
import { ssURL } from "../../../client/clientAxios";
import LabelStatus from "../../Shared/LabelStatus/LabelStatus";
import Navbar from "../../Shared/Navbar/Navbar";
import { useRouter } from "next/router";
import Pelanggaran from "./detail-siswa-menu/Pelanggaran";
import Penghargaan from "./detail-siswa-menu/Penghargaan";
import Sanksi from "./detail-siswa-menu/Sanksi";
import ModalSanksiTindakLanjut from "../modal/ModalSanksiTindakLanjut";
import ModalTambahPelanggaran from "../modal/ModalTambahPelanggaran";
import ModalTambahPrestasi from "../../Shared/ModalTambahPrestasi/ModalTambahPrestasi";
import { getDetailSiswa } from "../../../client/TataTertibClient";
import { useEffect, useRef, useState } from "react";
import ModalTambahPenghargaan from "../modal/ModalTambahPenghargaan";
import useUser from "../../../hooks/useUser";

const DetailSiswa = ({ backButton = true }) => {

  const { user } = useUser();

  const [editDataPenghargaan, setEditDataPenghargaan] = useState(null);

  const router = useRouter();
  const { query: { subnav, id, nav } } = router;

  const [detailSiswa, setDetailSiswa] = useState({});

  const [editDataBentukPelanggaran, setEditDataBentukPelanggaran] = useState(null);
  
  const {
    siswa,
    pelanggaran: listPelanggaran,
    sanksi,
    penghargaan: listPenghargaan
  } = detailSiswa;

  const jumlahPoinPelanggaran = siswa?.pelanggaranSiswa?.reduce((curr, array) => curr + array?.poin, 0);
  const jumlahPoinPenghargaan = siswa?.prestasi?.reduce((curr, arr) => curr + (arr?.tingkatPrestasi?.poin || 0), 0);

  const navItems = [
    {
      url: `${ssURL}/tata-tertib?menu=data-siswa&nav=data&detail=siswa&subnav=pelanggaran&id=${id}`,
      text: "Pelanggaran",
      active: (!subnav || subnav === "pelanggaran"),
    },
    {
      url: `${ssURL}/tata-tertib?menu=data-siswa&nav=data&detail=siswa&subnav=penghargaan&id=${id}`,
      text: "Penghargaan",
      active: subnav === "penghargaan",
    },
    {
      url: `${ssURL}/tata-tertib?menu=data-siswa&nav=data&detail=siswa&subnav=sanksi&id=${id}`,
      text: "Sanksi",
      active: subnav === "sanksi",
    },
  ];

  const _getDetailSiswa = async () => {
    const { data } = await getDetailSiswa(id);
    if (data) {
      setDetailSiswa(data);
    }
  }

  useEffect(() => {
    _getDetailSiswa();
  }, []);

  return (
    <AnimatePage>
      { backButton && <div className="d-flex justify-content-between">
        <Link href={`${ssURL}/tata-tertib?menu=data-siswa&nav=${nav}`}>
          <a className="text-decoration-none fw-bolder position-relative pointer">
            <FaChevronLeft />
            <span className="ms-2">Detail Siswa</span>
          </a>
        </Link>
      </div>}

      <div className="card card-ss px-4 py-3 mt-3">
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column">
            <h4 className="color-dark mb-2 fw-bold">{siswa?.nama}</h4>
            { siswa?.sanksiSiswa?.length === 0 && siswa?.pelanggaranSiswa?.length > 0 && (
              <LabelStatus status="soft-danger">
                Perlu Diberikan Sanksi
              </LabelStatus>
            )}
          </div>
        </div>

        <div className="row mt-4">
          { user?.role === "siswa"
            ? <>
              <div className="col-md-8">
                <div className="rounded-ss py-3 px-4 d-flex align-items-center h-100" style={{ backgroundColor: "#F8F8FB" }}>
                  <div className="w-50">
                    <p className="color-secondary fw-bold mb-0 fs-14-ss">Jumlah Bentuk Pelanggaran</p>
                    <p className="color-primary mb-0 fw-bold">
                      {siswa?.pelanggaranSiswa?.length || 0}
                    </p>
                  </div>
                  <div>
                    <p className="color-secondary fw-bold mb-0 fs-14-ss">Jumlah Poin Pelanggaran</p>
                    <p className="color-primary mb-0 fw-bold">
                      {jumlahPoinPelanggaran < 0 ? 0 : jumlahPoinPelanggaran}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="rounded-ss py-3 px-4 d-flex align-items-center h-100" style={{ backgroundColor: "#F8F8FB" }}>
                  <div>
                    <p className="color-secondary fw-bold mb-0 fs-14-ss">Jumlah Poin Penghargaan</p>
                    <p className="color-primary mb-0 fw-bold">
                      {jumlahPoinPenghargaan}
                    </p>
                  </div>
                </div>
              </div>
            </>
            : (
              <div className="col-md-6">
                <div className="rounded-ss py-3 px-4 d-flex align-items-center h-100" style={{ backgroundColor: "#F8F8FB" }}>
                  <div className="w-50">
                    <p className="color-secondary fw-bold mb-0 fs-14-ss">Jumlah Poin Pelanggaran</p>
                    <p className="color-primary mb-0 fw-bold">
                      {jumlahPoinPelanggaran < 0 ? 0 : jumlahPoinPelanggaran}
                    </p>
                  </div>
                  <div>
                    <p className="color-secondary fw-bold mb-0 fs-14-ss">Jumlah Poin Penghargaan</p>
                    <p className="color-primary mb-0 fw-bold">
                      {jumlahPoinPenghargaan}
                    </p>
                  </div>
                </div>
              </div>
            )
          }

          { user?.role !== "siswa" && <>
            <div className="col-md-3">
              <button
                className="btn btn-danger btn-danger-ss rounded-ss d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-start py-3 px-4 h-100"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#ModalSanksiTindakLanjut"
                disabled={siswa?.pelanggaranSiswa?.length === 0}
              >
                <div className="d-flex align-items-center flex-lg-row flex-md-column flex-row ">
                  <img
                    src={`/img/icon-tindak-pelanggaran.svg`}
                    alt="icon-tambah-prestasi"
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  />
                  <p className="m-0 text-white fw-bold px-lg-4 px-md-0 px-4 py-lg-0 py-md-2 py-0" style={{ textAlign: "left" }}>
                    Tindak Lanjut Pelanggaran
                  </p>
                </div>
              </button>
            </div>
            <div className="col-md-3">
              { (!subnav || subnav === "pelanggaran")
                ? (
                  <a
                    className="btn btn-primary btn-primary-ss rounded-ss d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-start py-3 px-4 h-100"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#ModalTambahPelanggaran"
                    onClick={() => setEditDataBentukPelanggaran(null)}
                  >
                    <div className="d-flex align-items-center flex-lg-row flex-md-column flex-row ">
                      <img
                        src={`/img/icon-tambah-bentuk-penghargaan.svg`}
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
                ) : (
                  <a
                    className="btn btn-primary btn-primary-ss rounded-ss d-flex align-items-center justify-content-lg-start justify-content-md-center justify-content-start py-3 px-4 h-100"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#ModalTambahPenghargaan"
                    onClick={() => setEditDataPenghargaan(null)}
                  >
                    <div className="d-flex align-items-center flex-lg-row flex-md-column flex-row ">
                      <img
                        src={`/img/icon-tambah-bentuk-penghargaan.svg`}
                        alt="icon-tambah-prestasi"
                        style={{
                          width: "50px",
                          height: "50px",
                        }}
                      />
                      <p className="m-0 text-white fw-bold px-lg-4 px-md-0 px-4 py-lg-0 py-md-2 py-0" style={{ textAlign: "left" }}>
                        Tambah Bentuk Penghargaan
                      </p>
                    </div>
                  </a>
                )
              }
            </div>
          </>}
        </div>
      </div>

      <ModalSanksiTindakLanjut daftarSanksi={sanksi} jumlahPoinPelanggaran={jumlahPoinPelanggaran} _getDetailSiswa={_getDetailSiswa} siswa={siswa} />
      <ModalTambahPelanggaran listPelanggaran={listPelanggaran} siswa={siswa} _getDetailSiswa={_getDetailSiswa} editDataBentukPelanggaran={editDataBentukPelanggaran} />
      <ModalTambahPenghargaan listPenghargaan={listPenghargaan} editDataPenghargaan={editDataPenghargaan} _getDetailSiswa={_getDetailSiswa} />

      <div className="mt-3">
        <Navbar
          nav={navItems}
        />
      </div>

      { (!subnav || subnav === "pelanggaran") && <Pelanggaran siswa={siswa} setEditDataBentukPelanggaran={setEditDataBentukPelanggaran} _getDetailSiswa={_getDetailSiswa} />}
      { subnav === "penghargaan" && <Penghargaan siswa={siswa} _getDetailSiswa={_getDetailSiswa} setEditDataPenghargaan={setEditDataPenghargaan} />}
      { subnav === "sanksi" && <Sanksi siswa={siswa} _getDetailSiswa={_getDetailSiswa} />}

    </AnimatePage>
  )
}

export default DetailSiswa;