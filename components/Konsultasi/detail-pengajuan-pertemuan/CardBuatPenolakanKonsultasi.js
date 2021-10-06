const CardBuatPenolakanKonsultasi = () => {
  return (
    <div className="card card-ss mt-4">
      <div className="card-body">
        <h4 className="fw-extrabold color-dark">
          Keterangan Penolakan Pengajuan
        </h4>

        <div className="mb-4">
          <label className="form-label">Keterangan</label>
          { true
            ? <input
              className="form-control"
              autoComplete="off"
              type="text"
              name="golDarah"
              placeholder="Masukkan Keterangan"
              // value={formData?.golDarah}
              // onChange={handleChangeForm}
            /> : <p>Tidak bisa karena di tanggal yang diajukan sedang penuh. Coba tanggal yang lain</p>
          }
        </div>

        <div className="btn-primary btn-primary-ss rounded-ss py-4 d-flex align-items-center justify-content-center pointer">
          <p className="fw-bold mb-0 ms-3">Masukkan Keterangan</p>
        </div>
      </div>
    </div>
  )
}

export default CardBuatPenolakanKonsultasi;