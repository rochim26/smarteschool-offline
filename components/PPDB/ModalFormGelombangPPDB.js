import { DatePicker } from "antd";
import ReactiveButton from "reactive-button";
import moment from "moment";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NewModal from "../Shared/NewModal/NewModal";
import MultipleInputField from "../Shared/MultipleInputField/MultipleInputField";
import Editor from "../Shared/Editor/Editor";
import { momentPackage } from "../../utilities/HelperUtils";
import {
  editGelombangPPDB,
  postGelombangPPDB,
} from "../../client/GelombangPPDB";
import { hideModal } from "../../utilities/ModalUtils";

const ModalFormGelombangPPDB = ({ editData, _getGelombangPPDB, isEdit }) => {
  const initialFormData = {
    nama: "",
    dibuka: momentPackage(),
    ditutup: momentPackage().add(7, "days"),
    tesAkademik: 0,
    biayaPendaftaran: 0,
    buttonState: "idle",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(
    () =>
      setFormData({
        ...editData,
        dibuka: momentPackage(editData?.dibuka),
        ditutup: momentPackage(editData?.ditutup),
      }),
    [editData]
  );

  const _postGelombangPPDB = async () => {
    setFormData({ ...formData, buttonState: "loading" });

    const payload = {
      ...formData,
      dibuka: momentPackage(formData.dibuka).format("YYYY-MM-DD HH:mm:ss"),
      ditutup: momentPackage(formData.ditutup).format("YYYY-MM-DD HH:mm:ss"),
    };

    const { data } = isEdit
      ? await editGelombangPPDB(editData?.id, payload)
      : await postGelombangPPDB(payload);

    if (data) {
      setFormData({ ...initialFormData, buttonState: "success" });
      toast.success(data.message);
      hideModal("ModalFormGelombangPPDB");
      _getGelombangPPDB();
    } else {
      setFormData({ ...formData, buttonState: "error" });
      toast.error(data.message);
    }
  };

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleChangeDatePicker(date, dateString, name) {
    setFormData({
      ...formData,
      [name]: moment(date),
    });
  }

  return (
    <NewModal
      modalId="ModalFormGelombangPPDB"
      modalSize="xl"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            {isEdit ? "Ubah" : "Tambah"} Gelombang PPDB
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk {isEdit ? "mengubah" : "menambahkan"}{" "}
            Gelombang PPDB
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
              placeholder="Tuliskan nama gelombang"
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Biaya Pendaftaran</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Tuliskan biaya pendaftaran"
              type="number"
              name="biayaPendaftaran"
              value={formData.biayaPendaftaran}
              onChange={handleChangeForm}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Dibuka</label>
            <DatePicker
              className="form-control"
              autoComplete="off"
              value={formData?.dibuka}
              placeholder="Pilih tanggal"
              onChange={(date, dateString) =>
                handleChangeDatePicker(date, dateString, "dibuka")
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Ditutup</label>
            <DatePicker
              className="form-control"
              autoComplete="off"
              value={formData?.ditutup}
              placeholder="Pilih tanggal"
              onChange={(date, dateString) =>
                handleChangeDatePicker(date, dateString, "ditutup")
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tes Akademik</label>
            <div className="row">
              <div className="form-check-ss col-md-6 position-relative">
                <input
                  className="form-check-input form-check-radio position-absolute"
                  type="radio"
                  name="tesAkademik"
                  id="radioYa"
                  style={{
                    top: "36%",
                    left: "2em",
                    // height: "20px",
                  }}
                  name="tesAkademik"
                  value={1}
                  checked={formData?.tesAkademik === 1}
                  onChange={(e) => handleChangeForm(e, null, null, true)}
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
                  name="tesAkademik"
                  id="radioTidak"
                  style={{
                    top: "36%",
                    left: "2em",
                    // height: "20px",
                  }}
                  name="tesAkademik"
                  value={0}
                  checked={formData?.tesAkademik === 0}
                  onChange={(e) => handleChangeForm(e, null, null, true)}
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
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState={formData.buttonState}
          onClick={_postGelombangPPDB}
          color={"primary"}
          idleText={`${isEdit ? "Ubah" : "Tambah"}`}
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

export default ModalFormGelombangPPDB;
