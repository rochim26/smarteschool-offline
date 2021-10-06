import { ssURL } from "../../../client/clientAxios";
import Avatar from "../../Shared/Avatar/Avatar";
import Link from "next/link"

const CardPelanggar = ({ siswa }) => {

  const totalPoinPelanggaran = siswa?.pelanggaranSiswa?.reduce((currentNumber, array) => currentNumber + array?.poin, 0);

  return (
    <div className="card-header-kelas-ss card card-kelas-ss card-ss px-0 mt-3 mb-4" style={{ position: "relative" }}>
      <img
        src={"https://picsum.photos/1920/1080"}
        className="card-img-top card-header-ss img-fit-cover bg-detail-partner-kolaborasi mb-lg-0 mb-3"
        style={{ height: 65 }}
      />
      <div className="p-4 position-relative d-flex justify-content-center text-center">
        <div className="position-absolute img-user-profil" style={{ top: -40}}>
          <div className="rounded-circle border border-5 border-white">
            <Avatar name={siswa?.nama} size={65} />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center w-100 text-center flex-column">
          <h5 className="fw-extrabold color-dark mb-1 mt-3">{siswa?.nama}</h5>
          <span className="color-primary">
            {siswa?.profil?.nisn || "-"}
          </span>
          <p className="color-secondary mb-2">
            {siswa?.anggotaRombel?.rombel?.jurusan?.nama || "-"}
          </p>
          { siswa?.anggotaRombel?.rombel?.nama && (
            <div className="jadwal-ujian-label label-ss color-primary text-white rounded-pill fs-12-ss me-2 border border-primary-ss">
              {siswa?.anggotaRombel?.rombel?.nama}
            </div>
          )}
        </div>
      </div>
      <div className="card-footer bg-white rounded-ss-bottom-left rounded-ss-bottom-right py-3">
        <div className="d-flex align-items-center justify-content-between">
          <p className="color-secondary mb-0">{totalPoinPelanggaran || 0} Poin</p>
          <Link href={`${ssURL}/tata-tertib?menu=data-siswa&nav=cari-pelanggar&detail=siswa&id=${siswa?.id}`}>
            <a className="btn btn-primary-ss rounded-pill px-3 py-1 text-decoration-none fs-12-ss shadow-primary-ss">
              Lihat Detail
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardPelanggar