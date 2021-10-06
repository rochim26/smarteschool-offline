import { DatePicker } from "antd"
import ReactiveButton from "reactive-button"
import Editor from "../Editor/Editor"
import MultipleInputField from "../MultipleInputField/MultipleInputField"
import NewModal from "../NewModal/NewModal"
import moment from "moment";
import { useState, useEffect } from "react"
import { editAlumni, postAlumni } from "../../../client/AlumniClient"
import { toast } from "react-toastify"
import { momentPackage } from "../../../utilities/HelperUtils"
import { hideModal } from "../../../utilities/ModalUtils"

const initialFormData = {
  nama: "",
  whatsapp: "",
  gender: "L",
  tanggalLahir: "",
  email: "",
  jurusan: "",
  tahunMasuk: "",
  pekerjaan: "",
  kantor: "",
  sektorIndustri: "",
  sekolahLanjutan: [],
  pengalaman: [],
  sertifikasiKeahlian: [],
  purnakarya: "",
  deskripsi: "",
}

const ModalTambahIkatanAlumni = ({ editData, _getAlumni }) => {

  const [buttonState, setButtonState] = useState("idle");
  const [formData, setFormData] = useState(initialFormData);

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleChangeDatePicker(date, dateString) {
    setFormData({
      ...formData,
      tanggalLahir: moment(dateString),
    });
  }

  const handleChangeRadio = (value) => {
    setFormData({
      ...formData,
      purnakarya: value === 1
    })
  }

  const handleChangeMultipleInput = (value, target) => {
    setFormData({
      ...formData,
      [target]: value
    })
  }

  const _postAlumni = async () => {
    setButtonState("loading");
    const payload = {
      ...formData,
      tanggalLahir: momentPackage(formData.tanggalLahir).format("YYYY-MM-DD"),
      deskripsi: window.$(`#editorDeskripsi`).summernote("code")
    }

    const { data, error } = editData ? await editAlumni(payload, editData?.id) :  await postAlumni(payload);
    if (data) {
      toast.success(data.message);
      _getAlumni();
      hideModal("modalTambahIkatanAlumni");
      setButtonState("success")
    } else {
      setButtonState("error");
      toast.error(error?.message)
    }
    
  }

  useEffect(() => {
    if (editData) {
      setFormData({ ...formData, ...editData });
      window.$(`#editorDeskripsi`).summernote("code", editData?.deskripsi);
    } else {
      setFormData(initialFormData);
    }
  }, [editData])

  return (
    <NewModal
      modalId="modalTambahIkatanAlumni"
      modalSize="xl"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">{editData ? "Ubah" : "Tambah"} Ikatan Alumni</h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk {editData ? "mengubah" : "menambahkan"} Ikatan Alumni
          </span>
        </>
      }
      content={
        <>
          <div className="mb-4">
            <label className="form-label">Nama</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Tuliskan nama prestasi"
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Whatsapp</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="No Whatsapp"
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Jenis Kelamin</label>
            <select className="form-select" id="inputGroupSelect01" name="gender" onChange={handleChangeForm} value={formData?.gender}>
              <option hidden>Pilih Jenis Kelamin</option>
              <option value="L">Laki - Laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Tanggal Lahir
            </label>
            <DatePicker
              className="form-control"
              autoComplete="off"
              value={formData?.tanggalLahir}
              placeholder="Pilih tanggal"
              onChange={handleChangeDatePicker}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Email"
              type="text"
              value={formData.email}
              name="email"
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Jurusan</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Jurusan"
              type="text"
              value={formData.jurusan}
              name="jurusan"
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Tahun Masuk</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Tahun Masuk"
              type="text"
              value={formData.tahunMasuk}
              name="tahunMasuk"
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Pekerjaan</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Pekerjaan"
              type="text"
              value={formData.pekerjaan}
              name="pekerjaan"
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Kantor</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Kantor"
              type="text"
              value={formData.kantor}
              name="kantor"
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Sektor Industri</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Sektor Industri"
              type="text"
              value={formData.sektorIndustri}
              name="sektorIndustri"
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <hr className="my-5" />
            <h4 className="fw-extrabold color-dark title-border mb-3">
              Sekolah Lanjutan
            </h4>
            <MultipleInputField
              label="Nama Sekolah"
              placeholder="Tuliskan nama sekolah"
              onChange={(value) => handleChangeMultipleInput(value, "sekolahLanjutan")}
              value={formData?.sekolahLanjutan}
            />
          </div>
          <div className="mb-4">
            <hr className="my-5" />
            <h4 className="fw-extrabold color-dark title-border mb-3">
              Pengalaman
            </h4>
            <MultipleInputField
              label="Pengalaman"
              placeholder="Tuliskan pengalaman"
              onChange={(value) => handleChangeMultipleInput(value, "pengalaman")}
              value={formData?.pengalaman}
            />
          </div>
          <div className="mb-4">
            <hr className="my-5" />
            <h4 className="fw-extrabold color-dark title-border mb-3">
              Setifikat Keahlian
            </h4>
            <MultipleInputField
              label="Nama Sertifikat"
              placeholder="Tuliskan nama sertifikat"
              onChange={(value) => handleChangeMultipleInput(value, "sertifikasiKeahlian")}
              value={formData?.sertifikasiKeahlian}
            />
          </div>
          <div className="mb-4">
            <h6 className="fs-18-ss fw-bold color-dark mb-3">
              Purnakarya
            </h6>
            <div className="row">
              <div className="form-check-ss col-md-6 position-relative">
                <input
                  className="form-check-input form-check-radio position-absolute"
                  type="radio"
                  name="flexRadioDefault"
                  id="radioYa"
                  style={{
                    top: "36%",
                    left: "2em",
                  }}
                  value={1}
                  checked={formData?.purnakarya}
                  onChange={(e) => handleChangeRadio(1)}
                />
                <label
                  className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                  htmlFor="radioYa"
                >
                  <span className="ms-4 ps-2">Ya</span>
                </label>
              </div>
              <div className="form-check-ss col-md-6 position-relative">
                <input
                  className="form-check-input form-check-radio-salah form-check-input-salah position-absolute rounded-pill"
                  type="radio"
                  name="flexRadioDefault"
                  id="radioTidak"
                  style={{
                    top: "36%",
                    left: "2em",
                    // height: "20px",
                  }}
                  checked={!formData?.purnakarya}
                  onChange={(e) => handleChangeRadio(0)}
                />
                <label
                  className="form-check-label-salah rounded-ss w-100 border border-light-secondary-ss p-3"
                  htmlFor="radioTidak"
                >
                  <span className="ms-4 ps-2">Tidak</span>
                </label>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label">Deskripsi</label>
            <Editor id="editorDeskripsi" />
          </div>
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState={buttonState}
          onClick={_postAlumni}
          color={"primary"}
          idleText={`${editData ? "Ubah" : "Tambah"} Alumni`}
          loadingText={"Diproses"}
          successText={"Berhasil"}
          errorText={"Gagal"}
          type={"button"}
          data-bs-dismiss="modal"
          className={"btn btn-primary"}
        />
      }
    />
  )
}

export default ModalTambahIkatanAlumni