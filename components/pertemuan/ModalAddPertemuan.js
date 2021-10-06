import { DatePicker } from "antd";
import moment from "moment";
import React from "react";
import { FaLink } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";

const ModalAddPertemuan = ({
  editId,
  handleChangeForm,
  formInput,
  handleModalSubmit,
}) => {
  return (
    <NewModal
      modalId="modalAddPertemuan"
      title={
        <>
          <h4 className="mb-0 fw-extrabold">
            {editId ? "Ubah" : "Buat"} Pertemuan
          </h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk {editId ? "mengubah" : "menambah"}{" "}
            pertemuan
          </span>
        </>
      }
      content={
        <>
          <div className="mb-3">
            <div className="row">
              <div className="col-md">
                <label className="form-label">Mulai Pertemuan</label>
                <DatePicker
                  className="form-control"
                  autoComplete="off"
                  showTime
                  secondStep={60}
                  minuteStep={5}
                  onChange={(date, dateString) =>
                    handleChangeForm({
                      target: {
                        name: "tanggalPembagian",
                        value: dateString ? moment(dateString) : "",
                      },
                    })
                  }
                  placeholder="Tanggal dibagikan"
                  value={formInput?.tanggalPembagian}
                />
              </div>
              <div className="col-md">
                <label className="form-label">Akhir Pertemuan</label>
                <DatePicker
                  className="form-control"
                  autoComplete="off"
                  showTime
                  secondStep={60}
                  minuteStep={5}
                  onChange={(date, dateString) =>
                    handleChangeForm({
                      target: {
                        name: "tanggalAkhir",
                        value: dateString ? moment(dateString) : "",
                      },
                    })
                  }
                  placeholder="Tanggal dibagikan"
                  disabledDate={(current) =>
                    current < moment(formInput?.tanggalPembagian)
                  }
                  value={formInput?.tanggalAkhir}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Deskripsi</label>
            <TextareaAutosize
              className="form-control"
              autoComplete="off"
              style={{
                resize: "none",
                width: "100%",
              }}
              placeholder="Tuliskan deskripsi absen harian"
              minRows={3}
              name="deskripsi"
              onChange={handleChangeForm}
              value={formInput.deskripsi}
            />
          </div>
          <div className="mb-3">
            <div className="d-flex align-items-center justify-content-between mb-2 flex-wrap">
              <label className="form-label mb-0">Link Google Meet</label>
              <a
                href="https://meet.google.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="py-1 px-3 bg-soft-primary rounded-pill fs-12-ss color-primary text-decoration-none fw-semibold"
              >
                <FaLink className="me-2" />
                Ambil Link Google Meet
              </a>
            </div>
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              id="exampleFormControlInput1"
              placeholder="Tempel link Google Meet disini"
              name="gmeet"
              onChange={handleChangeForm}
              value={formInput.gmeet}
            />
          </div>
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState={"idle"}
          color={"primary"}
          idleText={`${editId ? "Ubah" : "Tambah"} Pertemuan`}
          loadingText={"Diproses"}
          successText={"Berhasil"}
          errorText={"Gagal"}
          type={"button"}
          data-bs-dismiss="modal"
          className={"btn btn-primary"}
          onClick={handleModalSubmit}
        />
      }
    />
  );
};

export default ModalAddPertemuan;
