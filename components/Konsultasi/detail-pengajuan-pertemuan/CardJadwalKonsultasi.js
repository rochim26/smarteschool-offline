const CardJadwalKonsultasi = () => {
  const usingWhatsapp = true;
  return (
    <div className="card card-ss mt-4">
      <div className="card-body p-4">
        <h4 className="fw-extrabold color-dark mb-4">
          Jadwal Konsultasi
        </h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item pt-0 py-2 ps-0 mb-4">
            <h6 className="color-dark fw-bold mb-2">Tanggal Konsultasi</h6>
            <p className="color-secondary fs-18-ss mb-0">
              Selasa, 14 Juni 2021 
            </p>
          </li>
          <li className="list-group-item pt-0 py-2 ps-0 mb-4">
            <h6 className="color-dark fw-bold mb-2">Waktu</h6>
            <p className="color-secondary fs-18-ss mb-0">
              08:00 - 09:00
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
              Bertemu di ruang BK
            </p>
          </li>
          <li className="list-group-item pt-0 py-2 ps-0 mb-4">
            <h6 className="color-dark fw-bold mb-2">Keterangan</h6>
            <p className="color-secondary fs-18-ss mb-0">
              Bertemu di ruang BK
            </p>
          </li>
        </ul>

        {/* only show if pengajuan diterima */}
        { usingWhatsapp ? (
          <div className="btn-success btn-success-ss rounded-ss py-4 d-flex align-items-center justify-content-center pointer">
            <img src="/img/whatsapp.svg" />
            <p className="fw-bold mb-0 ms-3">Whatsapp</p>
          </div>
        ) : (
          <div className="btn-primary btn-primary-ss rounded-ss py-4 d-flex align-items-center justify-content-center pointer">
            <img src="/img/icon-tatap-muka.svg" />
            <p className="fw-bold mb-0 ms-3">Meeting Online</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CardJadwalKonsultasi;