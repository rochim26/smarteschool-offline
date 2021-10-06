import { DatePicker, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { FaLink, FaPaperclip, FaPlus, FaTimes, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import { getRombel, postPenghargaanSiswa, updatePenghargaanSiswa } from "../../../client/TataTertibClient";
import useUser from "../../../hooks/useUser";
import { momentPackage } from "../../../utilities/HelperUtils";
import { hideModal } from "../../../utilities/ModalUtils";
import EmptyStateFile from "../../Shared/EmptyState/EmptyStateFile";
import InputFile from "../../Shared/InputFile/InputFile";
import ModalTautanLink from "../../Shared/ModalTautanLink/ModalTautanLink";
import NewModal from "../../Shared/NewModal/NewModal"
import SelectShared from "../../Shared/SelectShared/SelectShared";

const initialFormData = {
  userId: [""],
  nama: "",
  tingkat: "",
  peringkat: "",
  lembaga: "",
  tanggalTerbit: momentPackage(),
  sertifikatKadaluarsa: "",
  tanggalKadaluarsa: momentPackage(),
  idSertifikat: "",
  lampiran: [],
  link: []
}

const ModalTambahPenghargaan = ({ editDataPenghargaan=null, listPenghargaan, _getDetailSiswa }) => {

  listPenghargaan = listPenghargaan?.map(penghargaan => ({ value: penghargaan?.id, label: penghargaan?.tingkat }));

  const { user } = useUser()

  const [listSiswa, setListSiswa] = useState([]);

  const [formData, setFormData] = useState(initialFormData);

  const recursiveFetchRombel = async (allData = [], page = 1) => {
    const { data: { siswa } } = await getRombel({ page });
    allData = allData.concat(siswa?.data);

    return (page < siswa?.lastPage) ? await recursiveFetchRombel(allData, page+1) : allData;
  }

  const _getRombel =  async () => {
    const data = await recursiveFetchRombel();
    if (data) {
      const newData = data?.map(siswa => ({ value: siswa?.id, label: siswa?.nama }))
      setListSiswa(newData);
    }
  }

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeNamaSiswa = (e, index) => {

    if (formData.userId.includes(e.value)) {
      alert("Siswa sudah terpilih");
      return;
    }

    const newUserId = [...formData.userId];
    newUserId[index] = e.value;
    setFormData({ ...formData, userId: newUserId });
  }

  const handleChangeDate = (name, date) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleChangeInputFile = async (e, data) => {
    if (data) {
      setFormData({
        ...formData,
        lampiran: [...formData?.lampiran, data]
      });
    }
  };

  const handleChangeTautanLink = (e, link) => {
    setFormData({
      ...formData,
      link: [...formData.link, link]
    })
  }

  const handleRemoveLampiran = (lamp) => {
    setFormData({
      ...formData,
      lampiran: formData.lampiran.filter(lampiranFile => lampiranFile !== lamp)
    })
  }

  const handleRemoveLink = (link) => {
    setFormData({
      ...formData,
      link: formData.link.filter(lampiranLink => lampiranLink !== link)
    });
  }

  const submitModal = async () => {
    let paylod = {
      ...formData,
      tanggalKadaluarsa: momentPackage(formData.tanggalKadaluarsa).format("YYYY-MM-DD"),
      tanggalTerbit: momentPackage(formData.tanggalTerbit).format("YYYY-MM-DD")
    }
    const { data } = editDataPenghargaan ? await updatePenghargaanSiswa(paylod, editDataPenghargaan.id) : await postPenghargaanSiswa(paylod);
    if (data) {
      toast.success(data?.message);
      hideModal("ModalTambahPenghargaan");
      _getDetailSiswa();
    }
  }

  useEffect(() => {
    if (user?.role !== "siswa") {
      _getRombel();
    }
  }, []);

  useEffect(() => {
    if (editDataPenghargaan !== null) {
      setFormData({
        nama: editDataPenghargaan.nama,
        tingkat: editDataPenghargaan.tingkat,
        peringkat: editDataPenghargaan.peringkat,
        lembaga: editDataPenghargaan.lembaga,
        tanggalTerbit: momentPackage(editDataPenghargaan.tanggalTerbit),
        sertifikatKadaluarsa: parseInt(editDataPenghargaan.sertifikatKadaluarsa),
        tanggalKadaluarsa: momentPackage(editDataPenghargaan.tanggalKadaluarsa),
        idSertifikat: editDataPenghargaan.idSertifikat,
        lampiran: editDataPenghargaan.lampiran,
        link: editDataPenghargaan.link,
      })
    } else {
      setFormData(initialFormData);
    }
  }, [editDataPenghargaan]);

  return (
    <NewModal
      modalId="ModalTambahPenghargaan"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">
            {editDataPenghargaan ? "Ubah" : "Tambah"} Penghargaan
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk {editDataPenghargaan ? "mengubah" : "menambahkan"}{" "}
            penghargaan
          </span>
        </>
      }
      content={
        <>
          { editDataPenghargaan === null && formData.userId.map((id, index) => (
            <div className=" d-flex flex-lg-nowrap flex-lg-row flex-column flex-wrap justify-content-between mb-3 align-items-center" key={`${id}-${index}`}>
              <div className="d-flex justify-content-between w-100 flex-column">
                <div className="d-flex flex-row justify-content-between my-2 my-md-0 align-items-center">
                  <label className="form-label">
                    Nama Siswa {index === 0 ? "" : index+1}
                  </label>
                  <button
                    className="btn btn-danger btn-danger-ss rounded-circle shadow-danger-ss d-flex justify-content-center align-items-center fs-6 ms-3 order-lg-3 order-2 d-lg-none p-0"
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                    onClick={() => {
                      const newUserId = [...formData.userId];
                      newUserId.splice(index, 1);
                      setFormData({ ...formData, userId: newUserId });
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
                <div className="w-100 text-break order-lg-2 order-3 mt-lg-0 mt-2 w-100">
                  <SelectShared
                    name="nama"
                    placeholder="Pilih Siswa"
                    style={{
                      fontSize: "14px !important",
                    }}
                    handleChangeSelect={(e) => handleChangeNamaSiswa(e, index)}
                    value={formData.userId[index]}
                    options={listSiswa}
                  />
                </div>
              </div>
            </div>
          ))}

          { editDataPenghargaan === null && (
            <button
              className="btn btn-ss btn-primary btn-primary-ss fs-14-ss fw-bold rounded-pill shadow-primary-ss mt-2 mb-4"
              onClick={() => setFormData({ ...formData, userId: [...formData.userId, ""] })}
            >
              <FaPlus className="me-2" />
              Tambah Nama Siswa
            </button>
          )}

          <div className="mb-4">
            <label className="form-label">Nama Prestasi</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Tuliskan nama prestasi"
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChangeForm}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Tingkat Prestasi</label>
            <SelectShared
              name="bidang"
              placeholder="Pilih Tingkat Prestasi"
              style={{
                fontSize: "14px !important",
              }}
              handleChangeSelect={(e) => setFormData({ ...formData, tingkat: e.value })}
              value={formData.tingkat}
              options={listPenghargaan}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Lembaga</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Contoh : Kemendikbud"
              type="text"
              name="lembaga"
              value={formData.lembaga}
              onChange={handleChangeForm}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Peringkat</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Contoh : 1"
              type="text"
              value={formData.peringkat}
              name="peringkat"
              onChange={handleChangeForm}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Tanggal Terbit (opsional)</label>
            <DatePicker
              onChange={(date, dateString) =>
                handleChangeDate("tanggalTerbit", dateString)
              }
              placeholder="yyyy / mm / dd"
              className="form-control"
              autoComplete="off"
              value={momentPackage(formData.tanggalTerbit)}
            />
          </div>

          <div className="mb-4">
            <h6 className="fs-18-ss fw-bold color-dark mb-3">
              Sertifikat Memiliki Tanggal Kadaluarsa
            </h6>
            <div className="row">
              <div className="form-check-ss col-6 position-relative">
                <input
                  className="form-check-input form-check-radio position-absolute"
                  type="radio"
                  name="flexRadioDefault"
                  id="radioYa"
                  style={{
                    top: "36%",
                    left: "2em",
                  }}
                  checked={formData.sertifikatKadaluarsa == 1}
                  onClick={() => setFormData({ ...formData, sertifikatKadaluarsa: 1 })}
                />
                <label
                  className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                  htmlFor="radioYa"
                >
                  <span className="ms-4 ps-2">Ya</span>
                </label>
              </div>
              <div className="form-check-ss col-6 position-relative">
                <input
                  className="form-check-input form-check-radio-salah form-check-input-salah position-absolute rounded-pill"
                  type="radio"
                  name="flexRadioDefault"
                  id="radioTidak"
                  style={{
                    top: "36%",
                    left: "2em",
                  }}
                  checked={formData.sertifikatKadaluarsa == 0}
                  onClick={() => setFormData({ ...formData, sertifikatKadaluarsa: 0 })}
                />
                <label
                  className="form-check-label-salah rounded-ss w-100 border border-light-secondary-ss p-3"
                  htmlFor="radioTidak"
                >
                  <span className="ms-4 ps-2">Tidak</span>
                </label>
              </div>
            </div>
          </div>
          
          { formData.sertifikatKadaluarsa === 1 && (
            <div className="mb-4">
              <label className="form-label">Tanggal Kadaluarsa</label>
              <DatePicker
                onChange={(date, dateString) =>
                  handleChangeDate("tanggalKadaluarsa", dateString)
                }
                placeholder="yyyy / mm / dd"
                className="form-control"
                autoComplete="off"
                value={momentPackage(formData.tanggalKadaluarsa)}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="form-label">ID Sertifikat</label>
            <input
              className="form-control"
              autoComplete="off"
              placeholder="Contoh : No. 1001/SES/SEM.1/IV/2021"
              type="text"
              value={formData.idSertifikat}
              name="idSertifikat"
              onChange={handleChangeForm}
            />
          </div>

          <div className="mb-4">
            <div className="d-flex align-items-md-center flex-md-row flex-column justify-content-between mb-4">
              <p className="form-label">Lampiran Sertifikat</p>
              <div className="d-flex justify-content-between flex-column flex-md-row">
                <label
                  htmlFor="lampiranModalTambahPenghargaan"
                  className="d-flex align-items-center justify-content-center form-label m-0 fs-6 btn btn-ss fs-14-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-lg-3 fw-bold mb-md-0 mb-3"
                >
                  <FaPaperclip className="me-2" />
                  <p className="mb-0">Unggah File</p>
                </label>
                <InputFile
                  accept="file/*"
                  name="lampiran"
                  id="lampiranModalTambahPenghargaan"
                  onChange={handleChangeInputFile}
                />
                <button
                  type="button"
                  className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fs-14-ss fw-bold"
                  data-bs-toggle="modal"
                  data-bs-target="#ModalTautanLinkTambahPenghargaan"
                >
                  <FaLink className="me-2" />
                  Tautan Link
                </button>
              </div>
            </div>
            
            {/* tampilan ketika file yang diinsert */}
            { formData?.lampiran?.map((lamp, index) => (
                <div className="card-lampiran-materi border-0 bg-soft-primary rounded-ss mt-4" key={`${lamp}-${index}`}>
                  <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-row">
                    {/* <a
                      href={isUploadedFile ? preview : URL.createObjectURL(preview)}
                      target="_blank"
                    > */}
                    <div className="d-flex align-items-center flex-wrap" style={{ width: "95%" }}>
                      <img src="/img/icon-file-download.svg" alt="" />
                      <div className="p-2" style={{ width: "90%" }}>
                        <Tooltip title={lamp}>
                          <p className="fw-bold color-dark mb-0 ms-4 text-truncate">{lamp}</p>
                        </Tooltip>
                        <span className="fs-12-ss color-secondary fs-12-ss fw-bold">
                          {/* PDF */}
                        </span>
                      </div>
                    </div>
                    {/* </a> */}
                    <div className="d-flex justify-content-between align-items-center ps-md-2 pt-md-2 pb-md-2 pe-0 p-0">
                      <FaTimes
                        className="pointer fs-4"
                        style={{ color: "#96DAFF" }}
                        onClick={() => handleRemoveLampiran(lamp)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* tampilan ketika link yg diinsert */}
              { formData?.link?.map((link, index) => (
                <div className="card-lampiran-materi border-0 bg-soft-primary rounded-ss mt-4" key={`${link}-${index}`}>
                  <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-row">
                    {/* <a
                      href={isUploadedFile ? preview : URL.createObjectURL(preview)}
                      target="_blank"
                    > */}
                    <div className="d-flex align-items-center flex-wrap" style={{ width: "95%" }}>
                      <img src="/img/icon-upload-link.svg" alt="" />
                      <div className="p-2" style={{ width: "90%" }}>
                        <Tooltip title={link}>
                          <p className="fw-bold color-dark mb-0 ms-4 text-truncate">{link}</p>
                        </Tooltip>
                        <span className="fs-12-ss color-secondary fs-12-ss fw-bold">
                          {/* PDF */}
                        </span>
                      </div>
                    </div>
                    {/* </a> */}
                    <div className="d-flex justify-content-between align-items-center ps-md-2 pt-md-2 pb-md-2 pe-0 p-0">
                      <FaTimes
                        className="pointer fs-4"
                        style={{ color: "#96DAFF" }}
                        onClick={() => handleRemoveLink(link)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* tampilan kosong */}
              {formData?.lampiran?.length === 0 && formData?.link?.length === 0 && (
                <EmptyStateFile
                  type="file"
                  pesan="Tidak ada file atau link yang dilampirkan"
                />
              )}
          </div>
          <ModalTautanLink
            toastMessage="Link berhasil ditambahkan"
            name="lampiran"
            modalId="ModalTautanLinkTambahPenghargaan"
            // defaultValue={formData.lampiran}
            getLink={(e, link) => handleChangeTautanLink(e, link)}
          />
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState={"idle"}
          onClick={submitModal}
          color={"primary"}
          idleText={`${editDataPenghargaan ? "Ubah" : "Tambah"} Penghargaan`}
          loadingText={"Diproses"}
          successText={"Berhasil"}
          errorText={"Gagal"}
          type={"button"}
          data-bs-dismiss="modal"
          className={"btn btn-primary"}
        />
      }
    />
  )
}

export default ModalTambahPenghargaan;