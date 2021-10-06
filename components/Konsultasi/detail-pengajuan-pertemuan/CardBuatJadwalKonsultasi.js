import { DatePicker } from "antd"

const CardBuatJadwalKonsultasi = () => {
  return (
    <div className="card card-ss mt-4">
      <div className="card-body">
        <h4 className="fw-extrabold color-dark">
          Buat Jadwal Konsultasi
        </h4>

        <div className="mb-4">
          <label className="form-label">Tanggal</label>
          <DatePicker
            // onChange={(date, dateString) =>
            //   handleChangeDate(dateString, "tanggalKonsultasi")
            // }
            placeholder="-- : --"
            className="form-control"
            autoComplete="off"
            // value={momentPackage(formData[index].tanggalKonsultasi)}
          />
        </div>

        <div className="d-flex align-items-center w-100">
          <div className="mb-4 w-50 me-4">
            <label className="form-label">Waktu Mulai</label>
            <DatePicker
              // onChange={(date, dateString) =>
              //   handleChangeDate(dateString, "tanggalKonsultasi")
              // }
              placeholder="-- : --"
              className="form-control"
              autoComplete="off"
              // value={momentPackage(formData[index].tanggalKonsultasi)}
            />
          </div>
          <div className="mb-4 w-50">
            <label className="form-label">Waktu Berakhir</label>
            <DatePicker
              // onChange={(date, dateString) =>
              //   handleChangeDate(dateString, "tanggalKonsultasi")
              // }
              placeholder="-- : --"
              className="form-control"
              autoComplete="off"
              // value={momentPackage(formData[index].tanggalKonsultasi)}
            />
          </div>
        </div>

        <label className="form-label">Media Konsultasi</label>
        <div className="d-flex align-items-center justify-content-between w-100 mb-4">
          <div className="form-check-ss col-md-6 position-relative" style={{ width: "32.33%" }}>
            <input
              className="form-check-input form-check-radio position-absolute"
              type="radio"
              id="buta-warna-ya"
              style={{
                top: "36%",
                left: "2em",
              }}
              // checked={formData?.butaWarna}
              // onChange={(e) => setFormData({ ...formData, butaWarna: true }) }
            />
            <label
              className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
              htmlFor="buta-warna-ya"
            >
              <span className="ms-5 ps-2">Bertemu langsung</span>
            </label>
          </div>
          <div className="form-check-ss col-md-6 position-relative" style={{ width: "32.33%" }}>
            <input
              className="form-check-input form-check-radio position-absolute"
              type="radio"
              id="buta-warna-ya"
              style={{
                top: "36%",
                left: "2em",
              }}
              // checked={formData?.butaWarna}
              // onChange={(e) => setFormData({ ...formData, butaWarna: true }) }
            />
            <label
              className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
              htmlFor="buta-warna-ya"
            >
              <span className="ms-5 ps-2">Meeting Online</span>
            </label>
          </div>
          <div className="form-check-ss col-md-6 position-relative" style={{ width: "32.33%" }}>
            <input
              className="form-check-input form-check-radio position-absolute"
              type="radio"
              id="buta-warna-ya"
              style={{
                top: "36%",
                left: "2em",
              }}
              // checked={formData?.butaWarna}
              // onChange={(e) => setFormData({ ...formData, butaWarna: true }) }
            />
            <label
              className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
              htmlFor="buta-warna-ya"
            >
              <span className="ms-5 ps-2">Whatsapp</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Link Meeting Online</label>
          <input
            className="form-control"
            autoComplete="off"
            type="text"
            name="golDarah"
            placeholder="Masukkan Link Meeting Online"
            // value={formData?.golDarah}
            // onChange={handleChangeForm}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Keterangan</label>
          <input
            className="form-control"
            autoComplete="off"
            type="text"
            name="golDarah"
            placeholder="Masukkan Keterangan"
            // value={formData?.golDarah}
            // onChange={handleChangeForm}
          />
        </div>

        <div className="btn-primary btn-primary-ss rounded-ss py-4 d-flex align-items-center justify-content-center pointer">
          <p className="fw-bold mb-0 ms-3">Buat Jadwal</p>
        </div>
      </div>
    </div>
  )
}

export default CardBuatJadwalKonsultasi;