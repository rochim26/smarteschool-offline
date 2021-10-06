import { Tooltip } from "antd";
import moment from "moment";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  FaChevronDown,
  FaClone,
  FaPen,
  FaPlus,
  FaTrashAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Avatar from "../Shared/Avatar/Avatar";

const TableRuangKerja = ({
  kategori,
  pekerjaan,
  handleChangeForm,
  setFormData,
  proyekRef,
  _deletePekerjaanProyek,
  _deleteKategoriProyek,
  search,
  roles,
  anggota,
  user,
  checkPermission,
}) => {
  const statusColor = {
    Baru: "primary",
    Menunggu: "secondary",
    Terhambat: "danger",
    SedangDikerjakan: "warning",
    SudahDikerjakan: "success",
    Selesai: "success",
  };
  const prioritasColor = {
    Rendah: "success",
    Sedang: "warning",
    Tinggi: "danger",
  };
  const shiftArray = ({ source, destination }, kategori) => {
    if (
      !(
        anggota.find((d) => d.user.id == user.id)?.role.role == "Pemilik" ||
        roles.find(
          (role) =>
            role.label == anggota.find((d) => d.user.id == user.id)?.role.role
        )?.permissions.Drag_Pekerjaan
      )
    ) {
      toast.error("Tidak Di izinkan");
      return;
    }
    if (!destination) {
      return;
    }
    const { id: sumberKategori, pekerjaan: sumberData } =
      kategori[source.droppableId];
    const { id: targetKategori, pekerjaan: targetData } =
      kategori[destination.droppableId];

    let temp;
    if (sumberKategori === targetKategori) {
      temp = sumberData.splice(source.index, 1);
      sumberData.splice(destination.index, 0, ...temp);
    } else {
      temp = sumberData.splice(source.index, 1);
      targetData.splice(destination.index, 0, ...temp);
    }
    proyekRef.collection("kategori").doc(`${sumberKategori}`).update({
      pekerjaan: sumberData,
    });
    proyekRef.collection("kategori").doc(`${targetKategori}`).update({
      pekerjaan: targetData,
    });
  };

  const buatPekerjaan = (column) => {
    setFormData({
      kategori_id: column.id,
      btnKategori: "idle",
      namaKategori: "",
      warna: "",
      judul: "",
      prioritas: "Rendah",
      status: "Baru",
      batas_waktu: "",
      deskripsi: "",
      urutan: "",
      lampiran: [],
      anggota: [],
      jobdesk: [],
    });
  };

  const editPekerjaan = (data) => {
    setFormData({
      id: data?.id,
      batas_waktu: data?.batas_waktu,
      prioritas: data?.prioritas,
      status: data?.status,
      deskripsi: data?.deskripsi,
      judul: data?.judul,
      pekerjaan_id: data?.id,
      urutan: data?.urutan,
      kategori_id: data?.mKategoriPekerjaanId,
      lampiran: data?.lampiran?.length > 0 ? JSON.parse(data?.lampiran) : [],
      anggota: data?.anggota ? JSON.parse(data?.anggota) : [],
      jobdesk: data?.jobdesk ? JSON.parse(data?.jobdesk) : [],
      type: "update",
    });
  };

  const duplikatPekerjaan = (data) => {
    setFormData({
      batas_waktu: data?.batas_waktu,
      prioritas: data?.prioritas,
      status: data?.status,
      deskripsi: data?.deskripsi,
      judul: data?.judul,
      pekerjaan_id: data?.id,
      urutan: data?.urutan,
      kategori_id: data?.mKategoriPekerjaanId,
      lampiran: data?.lampiran?.length > 0 ? JSON.parse(data?.lampiran) : [],
      anggota: data?.anggota ? JSON.parse(data?.anggota) : [],
      jobdesk: data?.jobdesk ? JSON.parse(data?.jobdesk) : [],
      type: "duplikat",
    });
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <DragDropContext
        // onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        onDragEnd={(result) => shiftArray(result, kategori)}
      >
        {Object.entries(kategori).map(([columnId, column], index) => {
          return (
            <div className="mb-5 d-flex flex-column" key={columnId}>
              {/* <Draggable> */}
              <div className="d-flex mb-2">
                <h4 className="fs-5 fw-bold" style={{ color: column.warna }}>
                  {column.nama}
                </h4>
                {anggota.find((d) => d.user.id == user.id)?.role.role ==
                  "Pemilik" ||
                roles.find(
                  (role) =>
                    role.label ==
                    anggota.find((d) => d.user.id == user.id)?.role.role
                ) ? (
                  <>
                    {(checkPermission("Edit_Kategori") ||
                      checkPermission("Buat_Kategori") ||
                      checkPermission("Delete_Kategori")) && (
                      <div className="dropdown dropdown-ss mb-md-0 mb-2 d-md-inline d-flex justify-content-end ms-2">
                        <div
                          className="rounded-circle template-rapor-buku-induk d-flex justify-content-center align-items-center dropdown-template-rapor"
                          style={{
                            width: "24px",
                            height: "24px",
                            background: column.warna,
                          }}
                          role="button"
                          id="dropdownOption"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <FaChevronDown color="white" />
                        </div>
                        <ul
                          className="dropdown-menu dropdown-menu-ss my-1"
                          aria-labelledby="dropdownOption"
                        >
                          {checkPermission("Edit_Kategori") && (
                            <li
                              onClick={() =>
                                setFormData({
                                  kategori_id: column?.id,
                                  namaKategori: column?.nama,
                                  warna: column?.warna,
                                  type: "edit",
                                })
                              }
                              data-bs-toggle="modal"
                              data-bs-target="#modalBuatKategori"
                            >
                              <a className="dropdown-item">
                                <FaPen className="me-2" />
                                <span>Edit</span>
                              </a>
                            </li>
                          )}
                          {checkPermission("Buat_Kategori") && (
                            <li
                              onClick={() =>
                                setFormData({
                                  namaKategori: column?.nama,
                                  warna: column?.warna,
                                })
                              }
                              data-bs-toggle="modal"
                              data-bs-target="#modalBuatKategori"
                            >
                              <a className="dropdown-item">
                                <FaClone className="me-2" />
                                <span>Duplikat</span>
                              </a>
                            </li>
                          )}
                          {checkPermission("Delete_Kategori") && (
                            <li
                              onClick={() =>
                                _deleteKategoriProyek({
                                  kategori_id: column?.id,
                                  namaKategori: column?.nama,
                                })
                              }
                            >
                              <a className="dropdown-item color-danger">
                                <FaTrashAlt className="me-2" />
                                <span>Hapus</span>
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
              {/* </Draggable> */}
              <div className="table-kerja table-kerja-heading mb-2 d-none d-md-flex">
                <div className="table-kerja-list table-kerja-heading border-0">
                  Judul
                </div>
                <div className="table-kerja-list table-kerja-heading">
                  Prioritas
                </div>
                <div className="table-kerja-list table-kerja-heading">
                  Ditugaskan
                </div>
                <div className="table-kerja-list table-kerja-heading">
                  Status
                </div>
                <div className="table-kerja-list table-kerja-heading">
                  Batas Waktu
                </div>
                <div className="table-kerja-list table-kerja-heading"></div>
              </div>
              <div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? `rgba(107, 177, 254, .3)`
                            : "white",
                          //   padding: 4,
                          width: "100%",
                          minHeight: "56px",
                        }}
                      >
                        {column.pekerjaan?.map((item, index) => {
                          const temp = pekerjaan[item];
                          if (
                            temp?.judul
                              ?.toLowerCase()
                              .includes(search.text.toLowerCase()) &&
                            (search.prioritas.length > 0
                              ? search.prioritas.includes(temp?.prioritas)
                              : 1) &&
                            (search.status.length > 0
                              ? search.status.includes(temp?.status)
                              : 1) &&
                            (search.batasWaktu.length == 2 &&
                            search.batasWaktu[0] !== ""
                              ? moment(temp?.batas_waktu).isBetween(
                                  search.batasWaktu[0],
                                  search.batasWaktu[1]
                                )
                              : 1) &&
                            (search.anggotaId.length > 0
                              ? temp?.anggota &&
                                search.anggotaId.filter((id) =>
                                  JSON.parse(temp.anggota)?.includes(id)
                                ).length > 0
                              : 1) &&
                            (search.jobdesk.length > 0
                              ? temp?.jobdesk.length > 0 &&
                                search.jobdesk.filter((d) =>
                                  temp.jobdesk.includes(d)
                                ).length > 0
                              : 1)
                          ) {
                            const color =
                              temp?.status == "Selesai" || !temp?.status
                                ? "white"
                                : statusColor[
                                    `${temp?.status.replace(" ", "")}`
                                  ];
                            const bgColor = !temp?.status
                              ? "secondary"
                              : temp?.status == "Selesai"
                              ? statusColor[`${temp?.status.replace(" ", "")}`]
                              : "soft-" +
                                statusColor[`${temp?.status.replace(" ", "")}`];
                            return (
                              <Draggable
                                key={temp?.id}
                                draggableId={`${temp?.id}`}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        //   padding: 16,
                                        margin: "0 0 8px 0",
                                        //   minHeight: "50px",
                                        background: snapshot.isDragging
                                          ? `rgba(244, 244, 247, 1)`
                                          : `rgba(244, 244, 247, .45)`,
                                        color: "#80849C",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <div className="table-kerja d-flex flex-column flex-md-row">
                                        <div
                                          className="table-kerja-list"
                                          style={{
                                            borderColor: column.warna,
                                          }}
                                          onClick={() => editPekerjaan(temp)}
                                          data-bs-toggle="modal"
                                          data-bs-target="#modalDetailKategori"
                                        >
                                          <span className="w-100">
                                            {temp?.judul}
                                          </span>
                                        </div>
                                        <div className="table-kerja-list">
                                          <span className="d-flex d-md-none w-50">
                                            Prioritas
                                          </span>
                                          <span
                                            className={
                                              "bg-soft-" +
                                              prioritasColor[
                                                `${temp.prioritas}`
                                              ] +
                                              " color-" +
                                              prioritasColor[
                                                `${temp.prioritas}`
                                              ] +
                                              " rounded-pill fs-12-ss fw-bold d-flex align-items-center justify-content-center"
                                            }
                                            style={{
                                              width: "82px",
                                              height: "24px",
                                            }}
                                          >
                                            {temp?.prioritas}
                                          </span>
                                        </div>
                                        <Tooltip
                                          title={JSON.parse(temp.anggota)
                                            .map(
                                              (item) =>
                                                anggota.find(
                                                  (d) => d.id == item
                                                )?.user?.nama
                                            )
                                            .join(", ")}
                                        >
                                          <div className="table-kerja-list">
                                            <span className="d-flex d-md-none w-50">
                                              Ditugaskan
                                            </span>
                                            {temp.anggota &&
                                              JSON.parse(temp.anggota)[0] && (
                                                <Avatar
                                                  name={
                                                    anggota.find(
                                                      (d) =>
                                                        d.id ==
                                                        JSON.parse(
                                                          temp.anggota
                                                        )[0]
                                                    )?.user.nama
                                                  }
                                                  src={
                                                    anggota.find(
                                                      (d) =>
                                                        d.id ==
                                                        JSON.parse(
                                                          temp.anggota
                                                        )[0]
                                                    )?.user.avatar
                                                  }
                                                  size={40}
                                                />
                                              )}
                                            {temp.anggota &&
                                              JSON.parse(temp.anggota)[1] && (
                                                <div
                                                  className=""
                                                  style={{
                                                    marginLeft: "-16px",
                                                  }}
                                                >
                                                  <Avatar
                                                    name={
                                                      anggota.find(
                                                        (d) =>
                                                          d.id ==
                                                          JSON.parse(
                                                            temp.anggota
                                                          )[1]
                                                      )?.user.nama
                                                    }
                                                    src={
                                                      anggota.find(
                                                        (d) =>
                                                          d.id ==
                                                          JSON.parse(
                                                            temp.anggota
                                                          )[0]
                                                      )?.user.avatar
                                                    }
                                                    size={40}
                                                  />
                                                </div>
                                              )}
                                            {temp.anggota &&
                                              JSON.parse(temp.anggota).length >
                                                2 && (
                                                <div
                                                  className="rounded-circle bg-white shadow-primary-ss d-flex justify-content-center align-items-center color-primary fw-bold fs-12-ss position-relative"
                                                  style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    marginLeft: "-16px",
                                                    zIndex: "1",
                                                  }}
                                                >
                                                  {`+${
                                                    JSON.parse(temp.anggota)
                                                      .length - 2
                                                  }`}
                                                </div>
                                              )}
                                          </div>
                                        </Tooltip>
                                        <div className="table-kerja-list">
                                          <span className="d-flex d-md-none w-50">
                                            Status
                                          </span>
                                          <span
                                            className={
                                              "label-ss rounded-pill fs-12-ss fw-bold text-" +
                                              color +
                                              " bg-" +
                                              bgColor
                                            }
                                          >
                                            {temp?.status}
                                          </span>
                                        </div>
                                        <div className="table-kerja-list">
                                          <span className="d-flex d-md-none w-50">
                                            Batas Waktu
                                          </span>
                                          {moment(temp?.batas_waktu)
                                            .locale("ID")
                                            .format("D MMM YYYY")}
                                        </div>
                                        {anggota.find(
                                          (d) => d.user.id == user.id
                                        )?.role.role == "Pemilik" ||
                                        roles.find(
                                          (role) =>
                                            role.label ==
                                            anggota.find(
                                              (d) => d.user.id == user.id
                                            )?.role.role
                                        ) ? (
                                          <div className="table-kerja-list">
                                            <span className="d-flex d-md-none w-50">
                                              Aksi
                                            </span>
                                            <div className="dropdown dropdown-ss mb-md-0 mb-2 d-md-inline d-flex justify-content-end">
                                              <div
                                                role="button"
                                                id="dropdownOption"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                <img
                                                  src={`/img/icon-dropdown-option.svg`}
                                                  alt="icon-option"
                                                />
                                              </div>
                                              <ul
                                                className="dropdown-menu dropdown-menu-ss my-1"
                                                aria-labelledby="dropdownOption"
                                              >
                                                {checkPermission(
                                                  "Edit_Pekerjaan"
                                                ) && (
                                                  <li
                                                    onClick={() =>
                                                      editPekerjaan(temp)
                                                    }
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#modalDetailKategori"
                                                  >
                                                    <a className="dropdown-item">
                                                      <FaPen className="me-2" />
                                                      <span>Edit</span>
                                                    </a>
                                                  </li>
                                                )}
                                                {checkPermission(
                                                  "Buat_Pekerjaan"
                                                ) && (
                                                  <li
                                                    onClick={() =>
                                                      duplikatPekerjaan(temp)
                                                    }
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#modalDetailKategori"
                                                  >
                                                    <a className="dropdown-item">
                                                      <FaClone className="me-2" />
                                                      <span>Duplikat</span>
                                                    </a>
                                                  </li>
                                                )}

                                                {checkPermission(
                                                  "Delete_Pekerjaan"
                                                ) && (
                                                  <li
                                                    onClick={() =>
                                                      _deletePekerjaanProyek(
                                                        temp?.id,
                                                        temp?.mKategoriPekerjaanId
                                                      )
                                                    }
                                                  >
                                                    <a className="dropdown-item color-danger">
                                                      <FaTrashAlt className="me-2" />
                                                      <span>Hapus</span>
                                                    </a>
                                                  </li>
                                                )}
                                              </ul>
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          }
                        })}
                        {checkPermission("Buat_Pekerjaan") && (
                          <a
                            href=""
                            className="text-decoration-none"
                            data-bs-toggle="modal"
                            data-bs-target="#modalDetailKategori"
                            onClick={() => buatPekerjaan(column)}
                          >
                            <div className="table-kerja">
                              <div
                                className="table-kerja-list tambah-table-kerja"
                                style={{
                                  borderColor: column.warna,
                                  background: `${column.warna}33`,
                                  color: column.warna,
                                  minHeight: "56px",
                                }}
                              >
                                <FaPlus className="me-2" /> Tambah
                              </div>
                            </div>
                          </a>
                        )}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default TableRuangKerja;
