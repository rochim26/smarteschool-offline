import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FaCheck, FaClone, FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { editKKM } from "../../client/BukuIndukClient";
import { hideModal } from "../../utilities/ModalUtils";
import Avatar from "../Shared/Avatar/Avatar";

const KKMPage = ({ kategoriMapel, _getRaporBukuInduk }) => {
  const [showInput, setShowInput] = useState(null);

  const initialStateForm = {
    kkmPengetahuan: "",
    kkmKeterampilan: "",
    idMapel: "",
  };

  const [formData, setFormData] = useState({
    ...initialStateForm,
  });
  const putKKM = async () => {
    const { data, error } = await editKKM(formData.idMapel, {
      kkm2: formData.kkmKeterampilan,
      kkm: formData.kkmPengetahuan,
    });

    if (data) {
      _getRaporBukuInduk();
      toast.success(data?.message);
    } else {
      toast.error(error?.message);
    }
  };
  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onClickEdit = (data) => {
    if (data) {
      setFormData({
        kkmPengetahuan: data.mataPelajaran.kkm,
        kkmKeterampilan: data.kkm2,
        idMapel: data.id,
      });
    }
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-ss p-4">
          <div
            style={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
            }}
          >
            {kategoriMapel?.map((d, idx) => {
              return (
                <div className="mb-5 d-flex flex-column" key={idx}>
                  <h4
                    className={`fs-5 fw-bold mb-4`}
                    style={{
                      color: `${d?.warna}`,
                    }}
                  >
                    {d?.nama}
                  </h4>
                  <div className="table-kkm table-kkm-heading mb-2 d-none d-md-flex">
                    <div className="table-kkm-list table-kkm-heading border-0">
                      Judul
                    </div>
                    <div className="table-kkm-list table-kkm-heading">
                      Pengetahuan
                    </div>
                    <div className="table-kkm-list table-kkm-heading">
                      Keterampilan
                    </div>

                    <div className="table-kkm-list table-kkm-heading"></div>
                  </div>
                  <div>
                    {d?.mapelRapor?.map((mapel, idx) => {
                      return (
                        <div
                          style={{
                            userSelect: "none",
                            margin: "0 0 8px 0",
                            background: "rgba(244, 244, 247, .45)",
                            color: "#80849C",
                          }}
                        >
                          <div className="table-kkm d-flex flex-column flex-md-row">
                            <div
                              className="table-kkm-list"
                              style={{
                                borderColor: `${d?.warna}`,
                              }}
                            >
                              <span className="d-flex d-md-none w-50">
                                Judul
                              </span>
                              <p className="fw-semibold mb-0 text-decoration-none color-secondary">
                                {mapel?.nama}
                              </p>
                            </div>

                            <div className="table-kkm-list ">
                              <span className="d-flex d-md-none w-50">
                                Pengetahuan
                              </span>
                              {showInput == mapel.id ? (
                                <div>
                                  <TextareaAutosize
                                    className="form-control p-2 text-center"
                                    style={{
                                      width: "70px",
                                    }}
                                    minRows={1}
                                    name="kkmPengetahuan"
                                    defaultValue={mapel?.mataPelajaran?.kkm}
                                    onChange={handleChangeForm}
                                  />
                                </div>
                              ) : (
                                <p className="ps-md-4 ps-0 m-0 fw-extrabold">
                                  {mapel?.mataPelajaran?.kkm}
                                </p>
                              )}
                            </div>
                            <div className="table-kkm-list ">
                              <span className="d-flex d-md-none w-50">
                                Keterampilan
                              </span>
                              {showInput == mapel.id ? (
                                <div>
                                  <TextareaAutosize
                                    className="form-control p-2 text-center"
                                    style={{
                                      width: "70px",
                                    }}
                                    minRows={1}
                                    name="kkmKeterampilan"
                                    defaultValue={mapel?.kkm2}
                                    onChange={handleChangeForm}
                                  />
                                </div>
                              ) : (
                                <p className="ps-md-4 ps-0 m-0 fw-extrabold">
                                  {mapel?.kkm2}
                                </p>
                              )}
                            </div>
                            <div className="table-kkm-list">
                              <span className="d-flex d-md-none w-50">
                                Aksi
                              </span>
                              {showInput == mapel.id ? (
                                <a
                                  onClick={() => {
                                    putKKM();
                                    setShowInput(null);
                                  }}
                                >
                                  <div className="rounded-circle bg-primary p-2 d-flex justify-content-center align-items-center">
                                    <FaCheck color="white" />
                                  </div>
                                </a>
                              ) : (
                                <a
                                  onClick={() => {
                                    onClickEdit(mapel);
                                    setShowInput(mapel.id);
                                  }}
                                >
                                  <div className="rounded-circle bg-soft-secondary p-2 d-flex justify-content-center align-items-center">
                                    <FaPen />
                                  </div>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KKMPage;
