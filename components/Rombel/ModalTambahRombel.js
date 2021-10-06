import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import { Select } from "antd";
import { postRombel, putRombel } from "../../client/RombelClient";
import { hideModal } from "../../utilities/ModalUtils";
import SelectShared from "../Shared/SelectShared/SelectShared";

const { Option } = Select;

const initialFormData = {
  tingkat: "",
  mJurusanId: "",
  mUserId: "",
  kode: "",
};

const ModalTambahRombel = ({
  editId,
  listTingkat,
  listJurusan,
  listGuru,
  getRombelData,
  editData,
  nav,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [buttonState, setButtonState] = useState("idle");

  const handleModalSubmit = async () => {
    setButtonState("loading");

    const payload = {
      ...formData,
      kelompok: !nav ? "reguler" : nav,
    };

    const { data, error } = editData?.id
      ? await putRombel(editData?.id, payload)
      : await postRombel(payload);
    if (data) {
      toast.success(data?.message);
      setButtonState("success");
      setFormData(initialFormData);
      getRombelData();
      hideModal("modal-rombel");
    } else {
      toast.error(error?.message);
      setButtonState("error");
    }
  };

  const handleChangeSelect = (e, name) => {
    setFormData({
      ...formData,
      [name]: e?.value,
    });
  };

  useEffect(() => {
    if (editData !== null) {
      setFormData(editData);
    } else {
      setFormData(initialFormData);
    }
  }, [editData]);

  return (
    <NewModal
      modalId="modal-rombel"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            {editData?.id ? "Edit" : "Tambah"} Rombel
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk{" "}
            {editData?.id ? "mengubah data rombel" : "menambah rombel"}
          </span>
        </>
      }
      content={
        <div>
          {nav !== "ekskul" && (
            <div className="mb-4">
              <label className="form-label">Pilih Tingkat</label>
              <SelectShared
                name="tingkat"
                handleChangeSelect={handleChangeSelect}
                value={formData.tingkat}
                options={listTingkat}
              />
            </div>
          )}

          {nav !== "ekskul" && (
            <div className="mb-4">
              <label className="form-label">Pilih Jurusan</label>
              <SelectShared
                name="mJurusanId"
                handleChangeSelect={handleChangeSelect}
                value={formData.mJurusanId}
                options={listJurusan}
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="pilih-kode" className="form-label">
              {nav === "ekskul" ? "Nama Ekskul" : "Kode"}
            </label>
            <input
              className="form-control"
              autoComplete="off"
              value={formData.kode}
              id="pilih-kode"
              onChange={(e) =>
                setFormData({ ...formData, kode: e.target.value })
              }
              type="text"
              placeholder={`${
                nav === "ekskul"
                  ? "Masukkan nama ekskul"
                  : "Contoh : Kode 1 untuk X JURUSAN 1"
              }`}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              {nav === "ekskul" ? "Pembimbing Ekskul" : "Atur Wali Kelas"}
            </label>
            <SelectShared
              name="mUserId"
              handleChangeSelect={handleChangeSelect}
              value={formData.mUserId}
              options={listGuru}
            />
          </div>
        </div>
      }
      submitButton={
        <ReactiveButton
          buttonState={buttonState}
          onClick={handleModalSubmit}
          color={"primary"}
          idleText={"Simpan"}
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

export default ModalTambahRombel;
