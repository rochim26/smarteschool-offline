import { Select } from "antd";
import React from "react";
import { FaFile, FaPaperclip, FaTimes } from "react-icons/fa";
import ReactiveButton from "reactive-button";
import Avatar from "../Shared/Avatar/Avatar";
import Editor from "../Shared/Editor/Editor";
import InputFile from "../Shared/InputFile/InputFile";

const ModalAddPostingan = ({ formData, handleSubmit, setFormData }) => {
  const handleChangeInputFile = (e, data) => {
    if (data) {
      setFormData({
        ...formData,
        lampiran: [...formData.lampiran, data],
      });
    }
  };

  return (
    <>
      <div
        className="modal modal-ss fade"
        id="modalAddPostingan"
        tabIndex="-1"
        aria-labelledby="modalAddPostinganLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title fw-extrabold" id="exampleModalLabel">
                Buat Postingan
              </h4>
              <button
                type="button"
                className="btn-close"
                // onClick={() => hideModal("modalAddPostingan")}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center mb-4">
                <Avatar size={50} name={formData?.user?.nama} />
                <div className="w-75 text-break ms-4">
                  <p className="mb-0 fw-semibold color-secondary">
                    {formData?.user?.nama}
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label">Dibagikan untuk</label>
                <Select
                  className="select-filter-proyek"
                  mode="multiple"
                  value={formData.jobdesk}
                  placeholder="Pilih Jobdesk"
                  style={{ width: "100%" }}
                  onChange={(e) => setFormData({ ...formData, jobdesk: e })}
                  maxTagCount="responsive"
                >
                  {formData?.jobs
                    ? formData?.jobs?.map((d, idx) => {
                        return <Option value={d.id}>{d.name}</Option>;
                      })
                    : ""}
                </Select>
              </div>
              <div className="my-4">
                <label className="form-label">Deskripsi</label>

                {formData.deskripsi ? (
                  <Editor
                    id="editorDiskusi"
                    defaultValue={formData?.deskripsi}
                  />
                ) : (
                  <Editor id="editorDiskusi" />
                )}
              </div>
              <hr className="mt-4" />
              <div className="d-flex justify-content-between align-items-center mb-4  flex-wrap">
                <h6 className="mt-0 fw-bold color-dark">Lampiran</h6>
                <div className="d-flex align-items-md-center flex-md-row flex-column justify-content-between">
                  <label
                    htmlFor="inputLampirangPostingan"
                    className="btn btn-ss fs-12-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fw-bold form-label"
                  >
                    <FaPaperclip className="me-2" />
                    Unggah File
                  </label>
                  <InputFile
                    className="form-control d-none"
                    type="file"
                    name="inputLampirangPostingan"
                    id="inputLampirangPostingan"
                    onChange={handleChangeInputFile}
                  />
                </div>
              </div>
              <div className="mt-3">
                {formData?.lampiran.map((d) => {
                  return (
                    <div className="card-lampiran-materi border-light-secondary rounded-ss mb-3">
                      <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-md-row flex-column">
                        <div className="d-flex align-items-center flex-wrap">
                          <div className="pdf-icon ms-0 m-2 shadow-primary-ss">
                            <FaFile className="text-white fs-3" />
                          </div>
                          <div className="p-2">
                            <p className="fw-bold color-dark mb-0">{d}</p>
                            <span className="fs-12-ss color-secondary fs-12-ss fw-bold">
                              {/* PDF */}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center ps-md-2 pt-md-2 pb-md-2 pe-0 pt-3 p-0">
                          <a
                            target="_blank"
                            rel="noreferrer noopener"
                            href={d}
                            className="btn btn-sm btn-outline-secondary me-3 btn-pratinjau-file rounded-pill fs-12-ss fw-bold d-flex justify-content-center align-items-center"
                          >
                            Pratinjau
                          </a>
                          <FaTimes
                            className="text-secondary pointer"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                lampiran: formData.lampiran.filter(
                                  (data) => data !== d
                                ),
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="modal-footer">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex align-items-center w-50">
                  <div className="ms-4 react-multi-select select-share-posting">
                    {/* <ReactMultiSelectCheckboxes
                          options={options}
                          placeholderButtonLabel="Pilih Kelas.."
                        /> */}
                  </div>
                </div>
                <ReactiveButton
                  buttonState={formData?.loading}
                  color={"primary"}
                  idleText={"Posting"}
                  loadingText={"Diproses"}
                  successText={"Berhasil"}
                  errorText={"Gagal"}
                  type={"button"}
                  data-bs-dismiss="modal"
                  className={"btn btn-primary"}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAddPostingan;
