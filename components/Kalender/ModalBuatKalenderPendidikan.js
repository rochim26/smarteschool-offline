import { DatePicker } from "antd";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";

const ModalBuatKalenderPendidikan = ({ editData, _getAlurPPDB, isEdit }) => {

  return (
    <NewModal
      modalId="ModalBuatKalenderPendidikan"
      modalSize="lg"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            Buat Kalender Pendidikan
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk membuat kalender pendidikan
          </span>
        </>
      }
      content={
        <>
          <div className="mb-4">
            <label className="form-label">Nama Kegiatan Pendidikan</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Tuliskan nama kegiatan pendidikan"
              type="text"
              name="judul"
              // value={formData.judul}
              // onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Label Kalender</label>
            <SelectShared
              // name="gender"
              // handleChangeSelect={handleChangeSelect}
              // value={formData.gender}
              // options={genderData}
              placeholder="Pilih label kalender"
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
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState="idle"
          // onClick={_postAlurPPDB}
          color={"primary"}
          idleText="Buat"
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

export default ModalBuatKalenderPendidikan;
