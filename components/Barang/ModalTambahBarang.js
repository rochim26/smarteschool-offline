import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { postBarang, updateBarang } from "../../client/BarangClient";
import {
  getSarana,
  postSarana,
  updateSarana,
} from "../../client/SaranaPrasaranaClient";
import { momentPackage } from "../../utilities/HelperUtils";
import { hideModal } from "../../utilities/ModalUtils";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";
import UploadPhoto from "../Shared/UploadPhoto.js/UploadPhoto";
import KepemiliikanData from "../../data/kepemilikanbarang.json";

const initialFormData = {
  nama: "",
  kodeBarang: "",
  merk: "",
  tahunBeli: "",
  asal: "",
  harga: "",
  deskripsi: "",
  status: "",
  kepemilikan: "",
  mLokasiId: null,
  jumlah: "",
  foto: [],
  namaPemilik: "",
};

const ModalTambahBarang = ({ editData = null, setEditData, _getBarang }) => {
  const isEdit = editData !== null;

  const [buttonState, setButtonState] = useState("idle");

  const [formData, setFormData] = useState(initialFormData);
  console.log(formData);
  const [listLokasi, setListLokasi] = useState([]);

  const listStatus = [
    { value: "rusak", label: "Rusak" },
    { value: "bagus", label: "Bagus" },
  ];

  const handleChangeInput = (e, uploadedFile) => {
    setFormData({
      ...formData,
      [e.target.name]: uploadedFile || e.target.value,
    });
  };

  const handleChangeSelect = (e, name) => {
    setFormData({
      ...formData,
      [name]: e.value,
    });
  };

  const setupPayload = () => {
    const payload = {
      ...formData,
      tahunBeli: momentPackage(formData.tahunBeli).format("YYYY-MM-DD"),
      harga: parseInt(formData.harga),
      mLokasiId: parseInt(formData.mLokasiId),
      jumlah: parseInt(formData.jumlah),
    };

    return payload;
  };
  function handleChangeDatePicker(date, dateString) {
    setFormData({
      ...formData,
      tahunBeli: dateString ? momentPackage(dateString) : "",
    });
  }

  const handleSubmit = async () => {
    if (!formData.nama) {
      toast.error("Anda belum memasukkan nama barang");
      return;
    } else if (!formData.merk) {
      toast.error("Anda belum memasukkan merk barang");
      return;
    } else if (!formData.kodeBarang) {
      toast.error("Anda belum memasukkan kode barang");
      return;
    } else if (!formData.tahunBeli) {
      toast.error("Anda belum memasukkan tahun pembelian barang");
      return;
    } else if (!formData.asal) {
      toast.error("Anda belum memasukkan asal barang");
      return;
    } else if (!formData.deskripsi) {
      toast.error("Anda belum memasukkan spesifikasi barang");
      return;
    } else if (!formData.jumlah) {
      toast.error("Anda belum memasukkan jumlah barang");
      return;
    } else if (!formData.harga) {
      toast.error("Anda belum memasukkan harga barang");
      return;
    } else if (!formData.kepemilikan) {
      toast.error("Anda belum memasukkan kepemilikan barang barang");
      return;
    } else if (!formData.foto[0]) {
      toast.error("Anda belum menambahkan foto barang");
      return;
    } else if (!formData.mLokasiId) {
      toast.error("Anda belum menambahkan lokasi barang");
      return;
    }
    const payload = setupPayload();
    const { data, error } = isEdit
      ? await updateBarang(editData?.id, payload)
      : await postBarang(payload);
    if (data) {
      setEditData(null);
      setButtonState("success");
      setFormData(initialFormData);
      hideModal("ModalTambahBarang");
      _getBarang();
      toast.success(data?.message);
    } else {
      setButtonState("error");
      toast.error(error?.message);
    }
  };

  const getLokasiData = async (page = 1) => {
    const { data } = await getSarana({ page: page });

    const tempData = data?.lokasi?.data;

    if (data) {
      if (data?.lokasi?.lastPage > page) {
        return tempData.concat(await getLokasiData(page + 1));
      } else {
        return tempData;
      }
    }
  };

  useEffect(() => {
    if (editData !== null) {
      setFormData({
        nama: editData.nama,
        kodeBarang: editData.kodeBarang,
        merk: editData.merk,
        tahunBeli: editData.tahunBeli,
        asal: editData.asal,
        harga: editData.harga,
        deskripsi: editData.deskripsi,
        kepemilikan: editData.kepemilikan,
        mLokasiId: editData.mLokasiId,
        jumlah: editData.jumlah,
        foto: editData.foto,
        namaPemilik: editData.namaPemilik,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editData]);

  useEffect(() => {
    (async () => {
      const lokasi = await getLokasiData();
      if (lokasi?.length > 0) {
        const newLokasi = lokasi?.map((lo) => ({
          value: lo.id,
          label: lo.nama,
        }));
        setListLokasi(newLokasi);
      }
    })();
  }, []);

  return (
    <NewModal
      onCloseModal={() => setEditData(null)}
      modalId="ModalTambahBarang"
      modalSize="xl"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            {isEdit ? "Ubah" : "Tambah"} Barang
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk {isEdit ? "mengubah" : "menambahkan"}{" "}
            Barang
          </span>
        </>
      }
      content={
        <>
          <div className="mb-4">
            <UploadPhoto
              name="foto"
              id="uploadFotoBarang"
              label="Foto Barang"
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
            <label className="form-label">Nama Barang</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Tuliskan nama barang"
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row gy-4 mb-4">
            <div className="col-md-6">
              <label className="form-label">Merk</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan merk barang"
                type="text"
                name="merk"
                value={formData.merk}
                onChange={handleChangeInput}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Kode Barang</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan kode barang"
                type="text"
                name="kodeBarang"
                value={formData.kodeBarang}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="row gy-4 mb-4">
            <div className="col-md-6">
              <label className="form-label">Tahun Dibeli</label>
              <DatePicker
                className="form-control"
                autoComplete="off"
                value={momentPackage(formData.tahunBeli)}
                placeholder="Pilih tanggal"
                onChange={handleChangeDatePicker}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Asal</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan asal barang"
                type="text"
                name="asal"
                value={formData.asal}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label">Spesifikasi</label>
            <TextareaAutosize
              className="form-control"
              autoComplete="off"
              style={{
                resize: "none",
                width: "100%",
              }}
              placeholder="Tuliskan Deskripsi"
              minRows={1}
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row gy-4 mb-4">
            <div className="col-md-6">
              <label className="form-label">Jumlah</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Jumlah barang"
                type="number"
                name="jumlah"
                value={formData.jumlah}
                onChange={handleChangeInput}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Harga Satuan Barang</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan harga barang"
                type="number"
                name="harga"
                value={formData.harga}
                onChange={handleChangeInput}
              />
            </div>
          </div>

          <div className="row gy-4 mb-4">
            <div className="col-md-6">
              <label className="form-label">Kepemilikan</label>
              <SelectShared
                name="kepemilikan"
                placeholder="Pilih kepemilikian"
                handleChangeSelect={handleChangeSelect}
                value={formData.kepemilikan}
                options={KepemiliikanData}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Nama Pemilik / Peminjam</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan nama pemilik / peminjam"
                type="text"
                name="namaPemilik"
                value={formData.namaPemilik}
                onChange={handleChangeInput}
                disabled={
                  formData.kepemilikan == "milik" || !formData.kepemilikan
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Lokasi</label>
            <SelectShared
              placeholder="Lokasi"
              handleChangeSelect={(e) => handleChangeSelect(e, "mLokasiId")}
              value={formData.mLokasiId}
              options={listLokasi}
            />
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

export default ModalTambahBarang;
