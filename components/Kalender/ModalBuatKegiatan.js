import { DatePicker, TimePicker } from "antd";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";

const ModalBuatKegiatan = ({ editData, _getAlurPPDB, isEdit }) => {

  return (
    <NewModal
      modalId="ModalBuatKegiatan"
      modalSize="lg"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            Buat Kegiatan
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk membuat kegiatan
          </span>
        </>
      }
      content={
        <>
          <div className="mb-4">
            <label className="form-label">Nama Kegiatan</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Tuliskan nama kegiatan"
              type="text"
              name="judul"
              // value={formData.judul}
              // onChange={handleChangeForm}
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-4">
              <label className="form-label">Tanggal Mulai</label>
              <DatePicker
                // onChange={(date, dateString) =>
                //   handleChangeDate(dateString, "tanggalMulai")
                // }
                placeholder="dd / mm / yyyy"
                className="form-control"
                autoComplete="off"
                // value={
                //   formData?.tanggalMulai &&
                //   momentPackage(formData?.tanggalMulai)
                // }
              />
            </div>
            <div className="col-md-6 mb-4">
              <label className="form-label">Tanggal Selesai</label>
              <DatePicker
                // onChange={(date, dateString) =>
                //   handleChangeDate(dateString, "tanggalSelesai")
                // }
                placeholder="dd / mm / yyyy"
                className="form-control"
                autoComplete="off"
                // value={
                //   formData?.tanggalSelesai &&
                //   momentPackage(formData?.tanggalSelesai)
                // }
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6 mb-md-0 mb-3">
              <label className="form-label">Waktu Mulai </label>
              <TimePicker
                className="form-control"
                autoComplete="off"
                format="HH:mm"
                placeholder="-- : --"
                // onChange={(date, dateString) =>
                //   handleChangeForm(dateString, "time", "waktu")
                // }
                // value={formData?.waktu}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Waktu Selesai</label>
              <input
                type="number"
                className="form-control"
                autoComplete="off"
                placeholder="-- : --"
                // name="durasi"
                // value={formData?.durasi}
                // onChange={(e) =>
                //   handleChangeForm(e, null, null, true)
                // }
              />
            </div>
          </div>

          <div className="row">
            <label className="form-label">Media Kegiatan</label>
            <div className="form-check-ss col-md-6 position-relative mb-4">
              <input
                className="form-check-input form-check-radio position-absolute"
                type="radio"
                // id="buta-warna-ya"
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
                <span className="ms-4 ps-2">Bertemu Langsung</span>
              </label>
            </div>
            <div className="form-check-ss col-md-6 position-relative mb-4">
              <input
                className="form-check-input form-check-radio-salah form-check-input-salah position-absolute rounded-pill"
                type="radio"
                // id="buta-warna-tidak"
                style={{
                  top: "36%",
                  left: "2em",
                  // height: "20px",
                }}
                // checked={!formData?.butaWarna}
                // onChange={() => setFormData({ ...formData, butaWarna: false }) }
              />
              <label
                className="form-check-label-salah rounded-ss w-100 border border-light-secondary-ss p-3"
                htmlFor="buta-warna-tidak"
              >
                <span className="ms-4 ps-2">Meeting Online</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Tempat Kegiatan</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Tuliskan tempat kegiatan berlangsung"
              type="text"
              name="judul"
              // value={formData.judul}
              // onChange={handleChangeForm}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Link Meeting Online</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Masukkan link meeting online"
              type="text"
              name="judul"
              // value={formData.judul}
              // onChange={handleChangeForm}
            />
          </div>

          <div className="row">
            <label className="form-label">Menggunakan Buku Tamu</label>
            <div className="form-check-ss col-md-6 position-relative mb-4">
              <input
                className="form-check-input form-check-radio position-absolute"
                type="radio"
                // id="buta-warna-ya"
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
                <span className="ms-4 ps-2">Ya</span>
              </label>
            </div>
            <div className="form-check-ss col-md-6 position-relative mb-4">
              <input
                className="form-check-input form-check-radio-salah form-check-input-salah position-absolute rounded-pill"
                type="radio"
                // id="buta-warna-tidak"
                style={{
                  top: "36%",
                  left: "2em",
                  // height: "20px",
                }}
                // checked={!formData?.butaWarna}
                // onChange={() => setFormData({ ...formData, butaWarna: false }) }
              />
              <label
                className="form-check-label-salah rounded-ss w-100 border border-light-secondary-ss p-3"
                htmlFor="buta-warna-tidak"
              >
                <span className="ms-4 ps-2">Tidak</span>
              </label>
            </div>
          </div>
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState="idle"
          // onClick={_postAlurPPDB}
          color={"primary"}
          idleText="Buat Kegiatan"
          loadingText={"Diproses"}
          successText={"Berhasil"}
          errorText={"Gagal"}
          type={"button"}
          data-bs-dismiss="modal"
          className={"btn btn-primary"}
        />
      }
    />
  );
};

export default ModalBuatKegiatan;
