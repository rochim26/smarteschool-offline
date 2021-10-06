import React from "react";
import ReactiveButton from "reactive-button";
import NewModal from "../NewModal/NewModal";
import bankData from "../../../data/bank.json";
import SelectShared from "../SelectShared/SelectShared";
import UploadBanner from "../UploadBanner/UploadBanner";

const ModalUploadBuktiPembayaran = ({
  handleChangeSelect,
  handleChangeForm,
  formData,
  _editPendaftarPPDB,
}) => {
  return (
    <NewModal
      modalId="modalKonfirmasiPembayaran"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">Konfirmasi Pembayaran</h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk konfirmasi pembayaran
          </span>
        </>
      }
      content={
        <>
          <div className="mb-4">
            <label className="form-label">Nama Bank</label>
            <SelectShared
              name="bank"
              handleChangeSelect={handleChangeSelect}
              value={formData.bank}
              options={bankData}
              isImg={true}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Nomor Rekening</label>
            <input
              className="form-control"
              placeholder="Tuliskan nomor rekening"
              type="text"
              name="norek"
              value={formData.norek}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Nama Pemilik Rekening</label>
            <input
              className="form-control"
              placeholder="Tuliskan nama pemilik"
              type="text"
              name="namaPemilik"
              value={formData.namaPemilik}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Nominal</label>
            <input
              className="form-control"
              placeholder="Rp. 0"
              type="number"
              name="nominal"
              value={formData.nominal}
              onChange={handleChangeForm}
            />
          </div>
          <div className="mb-4">
            <div>
              <UploadBanner
                label="Bukti Pembayaran"
                titleUnggahan="Foto / File"
                id="bukti"
                name="bukti"
                preview={formData.bukti}
                onChange={(e, uploadedFile) =>
                  handleChangeForm(e, uploadedFile)
                }
              />
            </div>
          </div>
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState={formData.btnState}
          onClick={_editPendaftarPPDB}
          color={"primary"}
          idleText={"Konfirmasi Pembayaran"}
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

export default ModalUploadBuktiPembayaran;
