import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { postKegiatan, updateKegiatan } from "../../client/KegiatanClient";
import NewModal from "../Shared/NewModal/NewModal";

const ModalTambahMenuKegiatan = ({ getKegiatanData, editState }) => {
  const [buttonState, setButtonState] = useState("idle");
  const [nama, setNama] = useState("");

  const handlePostKegiatan = async () => {
    setButtonState("loading");
    const { data } = editState.id
      ? await updateKegiatan(editState.id, { nama })
      : await postKegiatan({ nama });
    if (data) {
      setNama("");
      setButtonState("success");
      toast.success(data.message);
      getKegiatanData();
    }
  };

  useEffect(() => {
    setNama(editState.nama);
  }, [editState]);

  return (
    <NewModal
      modalSize="sm"
      modalId="modalTambahKegiatan"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            {editState.id ? "Edit" : "Tambah"} Kegiatan
          </h4>
        </>
      }
      content={
        <>
          <div className="mb-3">
            <label className="form-label">Nama Kegiatan</label>
            <form onSubmit={handlePostKegiatan}>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan nama kegiatan"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </form>
          </div>
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState={buttonState}
          onClick={handlePostKegiatan}
          color={"primary"}
          idleText={`${editState.id ? "Edit" : "Tambah"} Kegiatan`}
          loadingText={"Diproses"}
          successText={"Berhasil"}
          errorText={"Gagal"}
          type={"button"}
          data-bs-dismiss="modal"
          className={"btn btn-primary"}
          disabled={!nama}
        />
      }
    />
  );
};

export default ModalTambahMenuKegiatan;
