import useUser from "../../../hooks/useUser";

const CardInformasiPengajuan = () => {

  const { user } = useUser();

  return (
    <div className="card card-ss">
      <div className="card-body p-4">
        <h4 className="fw-extrabold color-dark mb-4">
          Informasi Pengajuan Pertemuan
        </h4>
        <ul className="list-group list-group-flush">

          {/* SHOW ONLY FOR GURU */}
          { user?.role === "guru" && <>
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Kelas</h6>
              <p className="color-secondary fs-18-ss mb-0">
                XII SIJA 1
              </p>
            </li>
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">No. Telepon</h6>
              <p className="color-secondary fs-18-ss mb-0">
                08281318381313
              </p>
            </li>
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Alamat</h6>
              <p className="color-secondary fs-18-ss mb-0">
                JALAN PAHLAWAN RELOVUSI RT 004/RW 003, KEL. PONDOK BAMBU, KEC. DUREN SAWIT, JAKARTA TIMUR, DKI JAKARTA, 13350.
              </p>
            </li>
          </>}

          {/* SHOW FOR SISWA AND GURU */}
          { (user?.role === "siswa" || user?.role === "guru") && <>
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Keperluan</h6>
              <p className="color-secondary fs-18-ss mb-0">
                Curhat masalah pribadi
              </p>
            </li>
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Tanggal Pengajuan</h6>
              <p className="color-secondary fs-18-ss mb-0">
                Senin, 13 Juni 2021
              </p>
            </li>
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Tanggal Konsultasi</h6>
              <p className="color-secondary fs-18-ss mb-0">
                Selasa, 14 Juni 2021
              </p>
            </li>
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Media Konsultasi</h6>
              <p className="color-secondary fs-18-ss mb-0">
                Bertemu langsung / Google meet / Whatsapp
              </p>
            </li>
            <li className="list-group-item pt-0 py-2 ps-0 mb-4">
              <h6 className="color-dark fw-bold mb-2">Keterangan</h6>
              <p className="color-secondary fs-18-ss mb-0">
                Curhat masalah pribadi
              </p>
            </li>
          </>}
        </ul>
      </div>
    </div>
  )
}

export default CardInformasiPengajuan;