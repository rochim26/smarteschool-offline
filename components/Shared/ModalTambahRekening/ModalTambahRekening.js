import ReactiveButton from "reactive-button";
import NewModal from "../NewModal/NewModal";
import bankData from "../../../data/bank.json";
import Select, { components } from "react-select";
import { useEffect, useState } from "react";
import { updateRekeningSekolah } from "../../../client/RekeningSekolahClient";
import { toast } from "react-toastify";
import { hideModal } from "../../../utilities/ModalUtils";
import { InputNumber } from "antd";

const initialFormData = {
  bank: "",
  norek: "",
  nama: "",
  saldo: "",
};

const ModalTambahRekening = ({ editData, _getRekeningSekolah }) => {
  const [buttonState, setButtonState] = useState("idle");
  const [formData, setFormData] = useState(initialFormData);

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeSelect = (e) => {
    setFormData({
      ...formData,
      bank: e?.value,
    });
  };

  const _updateRekeningSekolah = async () => {
    setButtonState("loading");
    const { data } = await updateRekeningSekolah(formData);
    if (data) {
      toast.success(data.message);
      _getRekeningSekolah();
      hideModal("modalTambahRekening");
      setButtonState("success");
    } else {
      setButtonState("error");
    }
  };

  useEffect(() => {
    if (editData) {
      setFormData({ ...formData, ...editData });
    } else {
      setFormData(initialFormData);
    }
  }, [editData]);

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          {props.data.img && (
            <img
              src={props.data.img}
              alt={props.data.label}
              style={{ height: 50, width: 50, objectFit: "contain" }}
            />
          )}
          <div className="ms-4">
            <div>{props.data.label}</div>
            <div style={{ fontSize: 12 }}>{props.data.value}</div>
          </div>
        </div>
      </components.Option>
    );
  };

  return (
    <NewModal
      modalId="modalTambahRekening"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            {editData ? "Ubah" : "Tambah"} Rekening
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk {editData ? "mengubah" : "menambahkan"}{" "}
            rekening
          </span>
        </>
      }
      content={
        <>
          <div className="mb-4">
            <label className="form-label">Nama Bank</label>
            <Select
              components={{ Option }}
              options={bankData}
              onChange={handleChangeSelect}
              value={bankData?.filter((bank) => bank.value === formData.bank)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Nomor Rekening</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Tuliskan nomor rekening"
              type="number"
              name="norek"
              value={formData.norek}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Nama Pemilik Rekening</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Tuliskan nama pemilik"
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Saldo Saat Ini</label>
            <InputNumber
              className="form-control w-100"
              formatter={(value) =>
                `Rp.${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              }
              placeholder="Rp. 0"
              autoComplete="off"
              name="saldo"
              value={formData.saldo}
              parser={(value) => value.replace(/Rp|\./g, "")}
              onChange={(value) =>
                handleChangeForm({ target: { name: "saldo", value } })
              }
              step={1000}
            />
            {/* <input
              className="form-control"
              autoComplete="off"
              placeholder="Rp. 0"
              type="number"
              value={formData.saldo}
              name="saldo"
              onChange={handleChangeForm}
            /> */}
          </div>
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState={buttonState}
          onClick={_updateRekeningSekolah}
          color={"primary"}
          idleText={`${editData ? "Ubah" : "Tambah"} Rekening`}
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

export default ModalTambahRekening;
