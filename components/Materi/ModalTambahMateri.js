import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { editMateri, postMateri } from "../../client/MateriClient";
import { hideModal } from "../../utilities/ModalUtils";
import NewModal from "../Shared/NewModal/NewModal";

const initialState = {
  nama: "",
};

const ModalTambahMateri = ({ getMateriData, editData }) => {
  const [formData, setFormData] = useState(initialState);
  const [buttonState, setButtonState] = useState("idle");

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleModalSubmit = async () => {
    setButtonState("loading");
    const payload = { ...formData };
    const { data } = editData
      ? await editMateri(payload, editData?.id)
      : await postMateri(payload);
    if (data) {
      setButtonState("success");
      toast.success(data.message);
      hideModal("modalTambahMateri");
      getMateriData();
    } else {
      setButtonState("error");
    }
  };

  useEffect(() => {
    if (editData) {
      setFormData({ ...formData, nama: editData?.nama });
    } else {
      setFormData(initialState);
    }
  }, [editData]);

  return (
    <NewModal
      modalSize="md"
      modalId="modalTambahMateri"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            {editData ? "Edit" : "Tambah"} Materi
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk {editData ? "mengubah" : "menambah"}{" "}
            materi
          </span>
        </>
      }
      content={
        <>
          <div className="mb-3">
            <label className="form-label">Nama</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Nama materi"
              name="nama"
              value={formData.nama}
              onChange={handleChangeForm}
            />
          </div>
        </>
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

export default ModalTambahMateri;
