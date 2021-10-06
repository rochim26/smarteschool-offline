import { DatePicker } from "antd";
import ReactMultiselectCheckboxes from "react-multiselect-checkboxes/lib/ReactMultiselectCheckboxes";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";

const ModalAjukanPertemuan = () => {

  const options = [
    { label: "Thing 1", value: 1 },
    { label: "Thing 2", value: 2 },
  ];

  return (
    <NewModal
      modalId="modalAjukanPertemuan"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">Ajukan Pertemuan</h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk mengajukan pertemuan dengan Guru BK
          </span>
        </>
      }
      content={
        <>
          <div className="mb-4">
            <label className="form-label">Nama Guru BK</label>
            <input
              className="form-control"
              autoComplete="off"
              type="text"
              name="idSertifikat"
              placeholder="Masukkan nama guru BK"
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Keperluan</label>
            <input
              className="form-control"
              autoComplete="off"
              type="text"
              name="idSertifikat"
              placeholder="Masukkan Keperluan"
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Tanggal Konsultasi</label>
            <DatePicker
              // onChange={(date, dateString) =>
              //   handleChangeDate(dateString, "tanggalTerbit")
              // }
              placeholder="Pilih tanggal"
              className="form-control"
              autoComplete="off"
              // value={momentPackage(formData[index].tanggalTerbit)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Media Konsultasi</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    // value={data?.id}
                    // id={data?.id}
                    // name="rombelId"
                    // defaultChecked={formData?.rombelId.includes(
                    //   data?.id
                    // )}
                    // onChange={(e) =>
                    //   handleChangeForm(e, null, null, true)
                    // }
                  />
                  <label
                    className="form-check-label fs-14-ss fw-semibold"
                    // htmlFor={data?.id}
                  >
                    Bertemu Langsung
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    // value={data?.id}
                    // id={data?.id}
                    // name="rombelId"
                    // defaultChecked={formData?.rombelId.includes(
                    //   data?.id
                    // )}
                    // onChange={(e) =>
                    //   handleChangeForm(e, null, null, true)
                    // }
                  />
                  <label
                    className="form-check-label fs-14-ss fw-semibold"
                    // htmlFor={data?.id}
                  >
                    Meeting Online
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    // value={data?.id}
                    // id={data?.id}
                    // name="rombelId"
                    // defaultChecked={formData?.rombelId.includes(
                    //   data?.id
                    // )}
                    // onChange={(e) =>
                    //   handleChangeForm(e, null, null, true)
                    // }
                  />
                  <label
                    className="form-check-label fs-14-ss fw-semibold"
                    // htmlFor={data?.id}
                  >
                    Whatsapp
                  </label>
                </div>
              </div>
          </div>
          <div className="mb-4">
            <label className="form-label">Keterangan</label>
            <input
              className="form-control"
              autoComplete="off"
              type="text"
              name="idSertifikat"
              placeholder="Masukkan Keterangan"
            />
          </div>
        </>
      }
      submitButton={
        <ReactiveButton
          // buttonState={buttonState}
          color={"primary"}
          idleText={"Ajukan Pertemuan"}
          loadingText={"Diproses"}
          successText={"Berhasil"}
          errorText={"Gagal"}
          type={"button"}
          data-bs-dismiss="modal"
          className={"btn btn-primary"}
          // onClick={handleSubmit}
        />
      }
    />
  )
}

export default ModalAjukanPertemuan;