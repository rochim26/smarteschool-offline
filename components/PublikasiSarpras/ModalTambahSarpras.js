import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { editSarpras, postSarpras } from "../../client/SarprasClient";
import Editor from "../Shared/Editor/Editor";
import NewModal from "../Shared/NewModal/NewModal";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";
import { hideModal } from "../../utilities/ModalUtils";

const initialFormData = {
  foto: "",
  nama: "",
  virtualTour: "",
  deskripsi: "",
};

const ModalTambahSarpras = ({ getSarpras, editData, setEditData }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [buttonState, setButtonState] = useState("idle");

  const handleChangeForm = (e, value) => {
    setFormData({
      ...formData,
      [e.target.name]: value || e.target.value,
    });
  };

  const handleModalSubmit = async () => {
    setButtonState("loading");
    const payload = {
      ...formData,
      deskripsi: window.$(`#deskripsi`).summernote("code"),
    };

    const { data } = editData?.id
      ? await editSarpras(editData?.id, payload)
      : await postSarpras(payload);
    if (data) {
      setButtonState("success");
      toast.success(data.message);
      getSarpras();
      setFormData(initialFormData);
      setEditData(null);
      window.$(`#deskripsi`).summernote("code", "");
      hideModal("modalTambahSarpras");
    } else {
      setButtonState("error");
    }
  };

  useEffect(() => {
    if (editData) {
      setFormData({
        ...formData,
        foto: editData?.foto,
        nama: editData?.nama,
        virtualTour: editData?.virtualTour,
        deskripsi: editData?.deskripsi,
      });
      window.$(`#deskripsi`).summernote("code", editData?.deskripsi);
    }
  }, [editData]);

  return (
    <NewModal
      modalSize="lg"
      modalId="modalTambahSarpras"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            {editData?.id ? "Edit" : "Tambah"} Sarpras
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk menambahkan sarpras
          </span>
        </>
      }
      content={
        <>
          <div className="mb-3">
            <UploadBanner
              label="Foto"
              titleUnggahan="Foto"
              accept="image/*"
              id="uploadBannerSlider"
              name="foto"
              titleUkuran="1366 x 768"
              preview={formData.foto}
              onUpload={(onUpload) =>
                setButtonState(onUpload ? "loading" : "idle")
              }
              onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="jumlah-guru" className="form-label">
              Nama
            </label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Tuliskan nama sarpras"
              name="nama"
              value={formData.nama}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="jumlah-guru" className="form-label">
              Link Jelajah Sekolah
            </label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Masukan link Jelajah Sekolah disini"
              name="virtualTour"
              value={formData.virtualTour}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="#deskripsi" className="form-label">
              Deskripsi
            </label>
            <Editor id="deskripsi" />
          </div>
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState={buttonState}
          onClick={handleModalSubmit}
          color={"primary"}
          idleText={`${editData?.id ? "Edit" : "Tambah"}`}
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

export default ModalTambahSarpras;
