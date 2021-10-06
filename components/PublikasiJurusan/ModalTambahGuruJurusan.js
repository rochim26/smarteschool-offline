import { useState, useEffect } from "react";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import UploadProfilePicture from "../Shared/UploadProfilePicture/UploadProfilePicture";
import { Select } from "antd";
import { toast } from "react-toastify";
import {
  postGuruJurusan,
  editGuruJurusan,
} from "../../client/GuruJurusanClient";
import { hideModal } from "../../utilities/ModalUtils";

const { Option } = Select;

const initialFormData = {
  foto: "",
  jabatan: "",
  mJurusanId: null,
  mUserId: null,
};

const ModalTambahGuruJurusan = ({
  mJurusanId,
  listGuru,
  getDetailJurusan,
  editData,
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
    setButtonState("loading");
    const payload = {
      ...formData,
      mJurusanId: mJurusanId,
    };
    const { data } = editData?.id
      ? await editGuruJurusan(editData?.id, payload)
      : await postGuruJurusan(payload);
    if (data) {
      toast.success(data.message);
      setButtonState("success");
      hideModal("modalGuruJurusan");
      getDetailJurusan();
    } else {
      setButtonState("error");
    }
  };

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData(initialFormData);
    }
  }, [editData]);

  return (
    <NewModal
      modalSize="lg"
      modalId="modalGuruJurusan"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            {editData?.id ? "Edit" : "Tambah"} Guru
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk {editData?.id ? "mengubah" : "menambah"}{" "}
            guru
          </span>
        </>
      }
      content={
        <>
          <div className="mb-3">
            <UploadProfilePicture
              name="foto"
              id="uploadFotoGuruJurusan"
              preview={formData.foto}
              onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nama</label>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              onChange={(e) => setFormData({ ...formData, mUserId: e })}
              value={formData.mUserId}
            >
              {listGuru?.map((guru) => (
                <Option value={guru.id}>{guru.nama}</Option>
              ))}
            </Select>
          </div>
          <div className="mb-3">
            <label className="form-label">Jabatan</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Tuliskan jabatan guru"
              name="jabatan"
              value={formData.jabatan}
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
          idleText={`${editData?.id ? "Edit" : "Tambah"} Guru`}
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

export default ModalTambahGuruJurusan;
