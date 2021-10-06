import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { postSarana, updateSarana } from "../../client/SaranaPrasaranaClient";
import { hideModal } from "../../utilities/ModalUtils";
import NewModal from "../Shared/NewModal/NewModal";
import UploadPhoto from "../Shared/UploadPhoto.js/UploadPhoto";

const initialFormData = {
  nama: "",
  jenis: "",
  noRegis: "",
  lebar: "",
  panjang: "",
  foto: [],
};

const ModalTambahPrasarana = ({ editData = null, setEditData, _getSarana }) => {
  const isEdit = editData !== null;

  const [buttonState, setButtonState] = useState("idle");

  const [formData, setFormData] = useState(initialFormData);

  const handleChangeInput = (e, uploadedFile) => {
    setFormData({
      ...formData,
      [e.target.name]: uploadedFile || e.target.value,
    });
  };

  const setupPayload = () => {
    const payload = {
      ...formData,
      panjang: parseFloat(formData.panjang),
      lebar: parseFloat(formData.lebar),
    };

    return payload;
  };

  const handleSubmit = async () => {
    if (!formData.nama) {
      toast.error("Anda belum memasukkan nama lokasi");
      return;
    } else if (!formData.jenis) {
      toast.error("Anda belum memasukkan jenis prasarana");
      return;
    } else if (!formData.noRegis) {
      toast.error("Anda belum memasukkan nomor regristasi");
      return;
    } else if (!formData.lebar) {
      toast.error("Anda belum memasukkan lebar lokasi");
      return;
    } else if (!formData.panjang) {
      toast.error("Anda belum memasukkan panjang lokasi");
      return;
    } else if (!formData.foto[0]) {
      toast.error("Anda belum menambahkan foto lokasi");
      return;
    }
    const payload = setupPayload();
    const { data, error } =
      editData !== null
        ? await updateSarana(editData?.id, payload)
        : await postSarana(payload);
    if (data) {
      setEditData(null);
      setButtonState("success");
      setFormData(initialFormData);
      hideModal("modalTambahPrasarana");
      _getSarana();
      toast.success(data?.message);
    } else {
      setButtonState("error");
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (editData !== null) {
      setFormData({
        nama: editData.nama,
        jenis: editData.jenis,
        noRegis: editData.noRegis,
        lebar: editData.lebar,
        panjang: editData.panjang,
        foto: editData.foto,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editData]);

  return (
    <NewModal
      onCloseModal={() => setEditData(null)}
      modalId="modalTambahPrasarana"
      modalSize="xl"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            {isEdit ? "Ubah" : "Tambah"} Lokasi
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk {isEdit ? "mengubah" : "menambahkan"}{" "}
            Lokasi
          </span>
        </>
      }
      content={
        <>
          <div className="mb-4">
            <UploadPhoto
              name="foto"
              id="uploadFotoPrasarana"
              label="Foto Lokasi"
              col="col-md-3"
              titleUnggahan="Foto"
              titleUkuran=""
              titleRasio="1:1"
              isSarpras
              listPhoto={formData.foto || []}
              onChange={(e, uploadedFile) => handleChangeInput(e, uploadedFile)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Nama Lokasi</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Tuliskan nama lokasi"
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row gy-4 mb-4">
            <div className="col-md-6">
              <label className="form-label">Jenis Prasarana</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Pilih jenis prasarana"
                type="text"
                name="jenis"
                value={formData.jenis}
                onChange={handleChangeInput}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Nomor Registrasi</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan nomor registrasi"
                type="text"
                name="noRegis"
                value={formData.noRegis}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="row gy-4 mb-4">
            <div className="col-md-6">
              <label className="form-label">Panjang</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskanm panjang"
                type="number"
                name="panjang"
                value={formData.panjang}
                onChange={handleChangeInput}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Lebar</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan lebar"
                type="number"
                name="lebar"
                value={formData.lebar}
                onChange={handleChangeInput}
              />
            </div>
          </div>
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState={buttonState}
          onClick={handleSubmit}
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

export default ModalTambahPrasarana;
