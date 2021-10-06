import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";
import Editor from "../Shared/Editor/Editor";
import { useEffect, useState } from "react";
import {
  postKegiatanGaleri,
  updateKegiatanGaleri,
} from "../../client/KegiatanClient";
import { toast } from "react-toastify";
import { hideModal } from "../../utilities/ModalUtils";

const initialFormData = {
  foto: "",
  nama: "",
  deskripsi: "",
  dihapus: 0,
  mKegiatanId: "",
};

const ModalTambahDaftarKegiatan = ({
  kegiatanNama,
  kegiatanId,
  getKegiatanData,
  editData,
  setEditData,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [buttonState, setButtonState] = useState("idle");

  const handleChangeForm = (e, value) => {
    setFormData({
      ...formData,
      [e.target.name]: value || e.target.value,
    });
  };

  const handleModalSubmit = async () => {
    const payload = {
      ...formData,
      mKegiatanId: kegiatanId,
      deskripsi: window.$(`#editorDeskripsiKegiatanId`).summernote("code"),
    };

    const { data } = editData?.id
      ? await updateKegiatanGaleri(editData?.id, payload)
      : await postKegiatanGaleri(payload);
    if (data) {
      toast.success(data.message);
      getKegiatanData();
      setEditData(null);
      setFormData(initialFormData);
    }
  };

  useEffect(() => {
    if (editData) {
      setFormData({
        ...formData,
        foto: editData.foto,
        nama: editData.nama,
        dihapus: editData.dihapus,
      });
      window
        .$(`#editorDeskripsiKegiatanId`)
        .summernote("code", editData.deskripsi);
    }
  }, [editData]);

  return (
    <NewModal
      modalSize="lg"
      modalId="modalTambahDaftarKegiatan"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">{kegiatanNama}</h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk menambah kegiatan {kegiatanNama}
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
              id="uploadKegiatan"
              name="foto"
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
              placeholder="Tuliskan nama kegiatan"
              name="nama"
              value={formData.nama}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="#editorDeskripsiKegiatanId" className="form-label">
              Deskripsi
            </label>
            <Editor id="editorDeskripsiKegiatanId" />
          </div>
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState={buttonState}
          onClick={handleModalSubmit}
          color={"primary"}
          idleText={`Tambah`}
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

export default ModalTambahDaftarKegiatan;
