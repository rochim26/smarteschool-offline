import { DatePicker } from "antd";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../NewModal/NewModal";

const ModalArsipSurel = ({
  handleChangeForm,
  _postSurelDiarsip,
  formData,
  arsip,
}) => {
  return (
    <>
      <NewModal
        modalId="modalArsipSurel"
        modalSize="lg"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Arsip Surel</h4>
          </>
        }
        content={
          <>
            <div className="mb-3">
              <h6 className="fs-18-ss fw-bold color-dark mb-4">
                Pilih Folder Arsip untuk Mengarsip Surel
              </h6>
              <div className="row gy-4">
                {arsip?.map((d, idx) => {
                  return (
                    <div className="col-md-4">
                      <div className="form-check-surel col-md-12 position-relative">
                        <input
                          className="form-check-input form-check-radio-surel position-absolute"
                          type="radio"
                          name="arsip"
                          value={d?.id}
                          onChange={handleChangeForm}
                          id={`arsip-${d?.id}`}
                          style={{
                            zIndex: "1",
                            top: "18%",
                            left: "12em",
                          }}
                        />

                        <div className="card-arsip-ss card card-ss px-0 form-check-label ">
                          <label htmlFor={`arsip-${d?.id}`}>
                            <div className="card-body p-4 ">
                              <div className="justify-content-between d-flex">
                                <img src="/img/icon-folder.svg" />
                              </div>
                              <div>
                                <p className="fs-6 fw-extrabold m-0 color-dark">
                                  {d?.nama}
                                </p>
                                <p className="fs-14-ss fw-bold m-0">
                                  {d?.meta?.total} Surat
                                </p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div
                  className="col-md-4 pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#modalTambahArsip"
                  onClick={() => {
                    // setEditId(null);
                  }}
                >
                  <div className="card-tambah-arsip-ss card card-ss px-0 ">
                    <div
                      className="card-body p-4 "
                      style={{
                        marginTop: "-25px",
                      }}
                    >
                      <div className="d-flex justify-content-center">
                        <img src="/img/icon-tambah-folder.svg" />
                      </div>
                      <div
                        style={{
                          marginTop: "-30px",
                        }}
                      >
                        <p className="fs-6 fw-extrabold m-0 color-primary text-center">
                          Tambah Folder
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={formData.btnBio}
            color={"primary"}
            idleText={"Arsip"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            data-bs-dismiss="modal"
            className={"btn btn-primary"}
            onClick={() => _postSurelDiarsip()}
          />
        }
      />
    </>
  );
};

export default ModalArsipSurel;
