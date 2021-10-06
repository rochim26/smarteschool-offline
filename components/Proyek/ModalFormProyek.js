import React from "react";
import { BlockPicker, TwitterPicker } from "react-color";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const ModalFormProyek = ({
  formData,
  handleChangeForm,
  setFormData,
  _postProyek,
  _editProyek,
}) => {
  return (
    <div>
      <NewModal
        modalId="modalBuatProyek"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">
              {formData?.id ? "Edit" : "Buat"} Proyek
            </h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah untuk membuat proyek
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Nama Proyek</label>
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                placeholder="Tuliskan nama proyek"
                value={formData?.nama}
                name="nama"
                onChange={({ target }) =>
                  setFormData({ ...formData, [target.name]: target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Privasi Proyek</label>
              <select
                className="form-select"
                aria-label="Default select example"
                placeholder="Pilih tipe ujian"
                value={formData?.privasi}
                name="privasi"
                onChange={({ target }) =>
                  setFormData({ ...formData, [target.name]: target.value })
                }
              >
                <option hidden>Pilih tipe proyek</option>
                <option value="0">Proyek Publik</option>
                <option value="1">Proyek Privat</option>
              </select>
            </div>
            {formData?.id && (
              <div className="mb-4">
                <label className="form-label">Status Proyek</label>
                <input
                  type="text"
                  className="form-control mb-4"
                  autoComplete="off"
                  placeholder="Tuliskan status proyek"
                  value={formData?.status}
                  name="status"
                  onChange={({ target }) =>
                    setFormData({ ...formData, [target.name]: target.value })
                  }
                />
                <TwitterPicker
                  color={formData?.warnaStatus}
                  triangle="hide"
                  className="w-100"
                  onChange={(color) => {
                    setFormData({ ...formData, warnaStatus: color.hex });
                  }}
                />
              </div>
            )}
            <div className="mb-4">
              <label className="form-label">Deskripsi</label>
              <TextareaAutosize
                className="form-control"
                autoComplete="off"
                style={{
                  resize: "none",
                  width: "100%",
                }}
                name="deskripsi"
                placeholder="Tuliskan Deskripsi Proyek"
                minRows={3}
                value={formData.deskripsi}
                onChange={({ target }) =>
                  setFormData({ ...formData, [target.name]: target.value })
                }
              />
            </div>
            <div className="mb-4">
              <UploadBanner
                accept="image/*"
                id="uploadBannerSlider"
                name="banner"
                label="Banner Proyek"
                preview={formData.banner}
                onUpload={(onUpload) =>
                  setFormData({
                    ...formData,
                    btnLoading: onUpload ? "loading" : "idle",
                  })
                }
                onChange={(e, uploadedFile) => {
                  setFormData({ ...formData, banner: uploadedFile });
                }}
              />
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={formData?.btnLoading}
            color={"primary"}
            idleText={`${formData?.id ? "Edit" : "Buat"} Proyek`}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            data-bs-dismiss="modal"
            className={"btn btn-primary"}
            onClick={formData?.id ? _editProyek : _postProyek}
          />
        }
      />
    </div>
  );
};

export default ModalFormProyek;
