import { FaChevronLeft, FaUser } from "react-icons/fa";
import AnimatePage from "../../Shared/AnimatePage/AnimatePage";
import Link from "next/link";
import { ssURL } from "../../../client/clientAxios";
import LabelStatus from "../../Shared/LabelStatus/LabelStatus";
import { useRouter } from "next/router";
import { getDetailRombel } from "../../../client/TataTertibClient";
import { useEffect, useState } from "react";

const DetailKelas = () => {

  const router = useRouter();
  const { query: { id } } = router;

  const [detailRombel, setDetailRombel] = useState({});

  const {
    nama,
    anggotaRombel,
    jurusan
  } = detailRombel;

  const _getDetailRombel = async () => {
    const { data } = await getDetailRombel(id);
    if (data) {
      setDetailRombel(data?.rombel);
    }
  }

  useEffect(() => {
    _getDetailRombel();
  }, []);

  return (
    <AnimatePage>
      <div className="d-flex justify-content-between">
        <Link href={`${ssURL}/tata-tertib?menu=data-siswa&nav=data`}>
          <a className="text-decoration-none fw-bolder position-relative pointer">
            <FaChevronLeft />
            <span className="ms-2">Daftar Kelas</span>
          </a>
        </Link>
      </div>

      <div className="card card-ss px-4 py-3 mt-3 position-relative overflow-hidden">
        <img src="/img/bg-detail-kelas.png" className="position-absolute" style={{ right: 0, top: -8 }} />
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <img src="/img/icon-user.svg" className="me-4" />
            <div>
              <h4 className="color-dark fw-bold">{nama}</h4>
              <h5 className="color-secondary mb-0">{jurusan?.nama}</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-ss mt-3">
        <h4 className="color-dark fw-bold mb-0 py-3 px-4">Daftar Siswa</h4>
        <table className="table-ss">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Jumlah Pelanggaran</th>
              <th>Poin</th>
              <th>Sanksi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            { anggotaRombel?.length > 0 ? anggotaRombel?.map((anggota, index) => {

              const jumlahPelanggaran  = anggota?.user?.pelanggaranSiswa?.reduce((curr, array) => curr + array?.poin, 0);

              return (
                <tr>
                  <td data-th="No">{index + 1}</td>
                  <td data-th="Nama">{anggota?.user?.nama}</td>
                  <td data-th="Jumlah Pelanggaran">{anggota?.user?.pelanggaranSiswa?.length > 0 ? anggota?.user?.pelanggaranSiswa?.length : "-"}</td>
                  <td data-th="Poin"><h6 className="color-primary mb-0">{jumlahPelanggaran > 0 ? jumlahPelanggaran : <span className="color-dark">-</span>}</h6></td>
                  <td data-th="Sanksi">
                    { anggota?.user?.sanksiSiswa?.length === 0 && anggota?.user?.pelanggaranSiswa?.length > 0 && (
                      <LabelStatus status="soft-danger">
                        Perlu Tindakan
                      </LabelStatus>
                    )}
                  </td>
                  <td data-th="Aksi">
                    <Link href={`${ssURL}/tata-tertib?menu=data-siswa&nav=data&detail=siswa&id=${anggota?.user?.id}&kelasId=${id}`}>
                      <a className="btn btn-primary-ss rounded-pill px-3 py-1 text-decoration-none fs-12-ss shadow-primary-ss">
                        Lihat
                      </a>
                    </Link>
                  </td>
                </tr>
              )
            }) : <tr>
                <td colSpan={6}>
                  Belum ada data
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      
    </AnimatePage>
  )
}

export default DetailKelas;