import { DatePicker } from "antd";
import ReactiveButton from "reactive-button";
import moment from "moment";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NewModal from "../Shared/NewModal/NewModal";
import MultipleInputField from "../Shared/MultipleInputField/MultipleInputField";
import Editor from "../Shared/Editor/Editor";
import { momentPackage } from "../../utilities/HelperUtils";
import { editAlurPPDB, postAlurPPDB } from "../../client/AlurPPDB";
import { hideModal } from "../../utilities/ModalUtils";

const ModalFormAlurPPDB = ({ editData, _getAlurPPDB, isEdit }) => {
  const initialFormData = {
    judul: "",
    deskripsi: "",
    buttonState: "idle",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(
    () =>
      setFormData({
        ...editData,
      }),
    [editData]
  );

  const _postAlurPPDB = async () => {
    setFormData({ ...formData, buttonState: "loading" });

    const payload = {
      ...formData,
      deskripsi: window.$(`#editorDeskripsi`).summernote("code"),
    };

    const { data } = isEdit
      ? await editAlurPPDB(editData?.id, payload)
      : await postAlurPPDB(payload);

    if (data) {
      setFormData({ ...initialFormData, buttonState: "success" });
      toast.success(data.message);
      hideModal("ModalFormAlurPPDB");
      _getAlurPPDB();
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

  return (
    <NewModal
      modalId="ModalFormAlurPPDB"
      modalSize="xl"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            {isEdit ? "Ubah" : "Tambah"} Alur PPDB
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk {isEdit ? "mengubah" : "menambahkan"}{" "}
            Alur PPDB
          </span>
        </>
      }
      content={
        <>
          <div className="mb-4">
            <label className="form-label">Judul</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Judul"
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Deskripsi</label>
            <Editor id="editorDeskripsi" defaultValue={formData?.deskripsi} />
          </div>
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState={formData.buttonState}
          onClick={_postAlurPPDB}
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

export default ModalFormAlurPPDB;
