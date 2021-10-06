import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { editSlider, postSlider } from "../../client/SliderClient";
import { hideModal } from "../../utilities/ModalUtils";
import NewModal from "../Shared/NewModal/NewModal";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const initialState = {
  banner: "",
  judul: "",
  deskripsi: "",
};

const ModalTambahSlider = ({ editId, editData, getSlidersData }) => {
  const [formData, setFormData] = useState(initialState);
  const [buttonState, setButtonState] = useState("idle");

  const handleChangeForm = (e, uploadedFile) => {
    setFormData({
      ...formData,
      [e.target.name]: uploadedFile || e.target.value,
    });
  };

  const handlePostSlider = async () => {
    if (!formData.banner) {
      toast.error("Anda belum nambahkan foto slider");
      return;
    }

    setButtonState("loading");
    const { data } = editId
      ? await editSlider(editId, formData)
      : await postSlider(formData);
    if (data) {
      hideModal("modalTambahSlider");
      toast.success(data.message);
      setButtonState("success");
      getSlidersData();
    } else {
      setButtonState("error");
    }
  };

  useEffect(() => {
    setFormData(editId ? editData : initialState);
  }, [editId, editData]);

  return (
    <NewModal
      modalSize="lg"
      modalId="modalTambahSlider"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            {editId ? "Edit" : "Tambah"} Slider
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk menambahkan slider
          </span>
        </>
      }
      content={
        <>
          <div className="mb-3">
            <UploadBanner
              accept="image/*"
              id="uploadBannerSlider"
              name="banner"
              titleUkuran="1366 x 768"
              titleUnggahan="Foto Slider"
              preview={formData.banner}
              onUpload={(onUpload) =>
                setButtonState(onUpload ? "loading" : "idle")
              }
              onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="jumlah-guru" className="form-label">
              Judul
            </label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Tuliskan judul slider"
              name="judul"
              value={formData.judul}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="jumlah-guru" className="form-label">
              Deskripsi
            </label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Tuliskan deskripsi slider"
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChangeForm}
            />
          </div>
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState={buttonState}
          onClick={handlePostSlider}
          color={"primary"}
          idleText={`${editId ? "Edit" : "Tambah"} Slider`}
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

export default ModalTambahSlider;
