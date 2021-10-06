import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { postPasalPeraturan, updatePasalPeraturan } from "../../../client/TataTertibClient";
import { hideModal } from "../../../utilities/ModalUtils";
import Editor from "../../Shared/Editor/Editor";
import NewModal from "../../Shared/NewModal/NewModal";

const initialFormData = {
  nama: "",
  isi: ""
}

const ModalTambahPasal = ({ peraturanId, _getDetailBabPeraturan, editData=null }) => {

  const [formData, setFormData] = useState(initialFormData);

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getPayload = () => {
    return {
      ...formData,
      isi: window.$(`#isiPasalPeraturan`).summernote("code")
    }
  }

  const handleSubmit = async () => {
    const payload = getPayload();
    const { data } = editData ? await updatePasalPeraturan(payload, editData.id) : await postPasalPeraturan(payload, peraturanId);
    if (data) {
      toast.success(data?.message);
      hideModal("ModalTambahPasal");
      _getDetailBabPeraturan();
    }
  }

  useEffect(() => {
    if (editData) {
      setFormData({ nama: editData.nama, isi: editData.isi });
      window.$(`#isiPasalPeraturan`).summernote("code", editData.isi);
    } else {
      setFormData(initialFormData);
      window.$(`#isiPasalPeraturan`).summernote("code", "");
    }
  }, [editData]);

  return (
    <>
      <NewModal
        modalId="ModalTambahPasal"
        modalSize="lg"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">{editData ? "Ubah" : "Tambah"} Pasal</h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah ini untuk membuat pasal
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Nama Pasal</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan nama pasal"
                type="text"
                name="nama"
                value={formData?.nama}
                onChange={handleChangeForm}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="#editorDeskripsiJurusan" className="form-label">
                Isi
              </label>
              <Editor id="isiPasalPeraturan" />
              
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={"idle"}
            color={"primary"}
            idleText={`${editData ? "Ubah" : "Tambah"} Pasal`}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            data-bs-dismiss="modal"
            className={"btn btn-primary"}
            onClick={handleSubmit}
          />
        }
      />
    </>
  );
};

export default ModalTambahPasal;
