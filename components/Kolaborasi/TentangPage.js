import moment from "moment";

import { useState, useEffect } from "react";
import {
  FaCheck,
  FaChevronDown,
  FaCross,
  FaEdit,
  FaGlobeAmericas,
  FaMinus,
  FaPen,
  FaPlus,
  FaTimes,
  FaTimesCircle,
  FaTrashAlt,
} from "react-icons/fa";
import { ssURL } from "../../client/clientAxios";
import useUser from "../../hooks/useUser";
import Avatar from "../Shared/Avatar/Avatar";
import Navbar from "../Shared/Navbar/Navbar";
import ModalEditRole from "../../components/Kolaborasi/ModalEditRole";
import ModalEditRoleAnggota from "../../components/Kolaborasi/ModalEditRoleAnggota";
import ModalJobdesk from "../../components/Kolaborasi/ModalJobdesk";
import ModalFormProyek from "../../components/Proyek/ModalFormProyek";
import { db } from "../../config/config";
import WhatsappLink from "../Shared/WhatsappLink/WhatsappLink";
import { hideModal } from "../../utilities/ModalUtils";
import { toast } from "react-toastify";
import { deleteAnggotaProyek, editProyek } from "../../client/ProyekClient";
import swal from "sweetalert";
import CardPartnerKolaborasi from "./CardPartnerKolaborasi";
import { Dropdown } from "antd";

const TentangPage = ({
  subnav,
  detail,
  anggota,
  logs,
  roles,
  postRoles,
  putRole,
  handleSubmitJobdesk,
  jobs,
  isAnggota,
  request,
  checkPermission,
}) => {
  const { user } = useUser();

  const [formData, setFormData] = useState({ ...detail, btnLoading: "idle" });
  const [search, setSearch] = useState("");
  const [logDates, setLogDates] = useState([]);
  const [logLimit, setLogLimit] = useState([]);

  const _editProyek = async () => {
    const { data } = await editProyek(detail.id, {
      nama: formData.nama,
      deskripsi: formData.deskripsi,
      banner: formData.banner,
      privasi: formData.privasi,
    });
    db.collection("kolaborasi")
      .doc(`${detail.id}`)
      .update({
        nama: formData.nama,
        deskripsi: formData.deskripsi,
        banner: formData.banner,
        privasi: formData.privasi,
        status: formData.status,
        warnaStatus: formData.warnaStatus
          ? formData.warnaStatus
          : "#" + Math.floor(Math.random() * 16777215).toString(16),
      });
    hideModal("modalBuatProyek");
  };

  const _deleteAnggota = async (id, nama) => {
    swal({
      title: `Yakin ingin menghapus ${nama}?`,
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deleteAnggotaProyek(id);
        if (data) {
          db.collection("kolaborasi")
            .doc(`${detail.id}`)
            .collection("anggota")
            .doc(`${id}`)
            .delete();
          toast.success(data.message);
        } else {
          toast.error(error.message);
        }
      }
    });
  };

  const deleteJobdesk = async (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const anggotaJobdesk = anggota?.filter(
          (item) => item.jobdesk?.indexOf(id) >= 0
        );
        await anggotaJobdesk?.map(async (item) => {
          const ref = db
            .collection("kolaborasi")
            .doc(`${detail.id}`)
            .collection("anggota")
            .doc(`${item.id}`)
            .update({
              jobdesk: item.jobdesk?.filter((job) => job != id),
            });
        });
        await db
          .collection("kolaborasi")
          .doc(`${detail.id}`)
          .collection("jobdesk")
          .doc(`${id}`)
          .delete();
        return;
      }
    });
  };

  const changePermission = (d) => {
    if (d.target.name == "role") {
      setFormData({
        ...formData,
        role: d.target.value,
      });
    } else {
      setFormData({
        ...formData,
        permissions: {
          ...formData.permissions,
          [d.target.name]: d.target.value == 0 ? 1 : 0,
        },
      });
    }
  };

  const handleSubmit = async () => {
    if (formData?.type == "delete" && !formData?.role) {
      toast.error("Pilih peran pengganti");
      return;
    } else {
      await postRoles(formData);
      toast.success("Peran Diubah");
      hideModal("modalEditRole");
    }
  };

  const changeRole = (d) => {
    setFormData({
      ...formData,
      [d.target.name]: d.target.value,
    });
  };

  const handleSubmitAnggota = async () => {
    putRole(formData);
    hideModal("modalEditRoleAnggota");
  };

  const handleChangeSelect = (e, name) => {
    setFormData({
      ...formData,
      [name]: e?.value,
    });
  };
  const navItems = [
    {
      url: `${ssURL}/proyek/${detail.id}?nav=tentang&subnav=informasi`,
      as: `${ssURL}/proyek/${detail.id}?nav=tentang&subnav=informasi`,
      text: "Informasi",
      active: subnav == "informasi" || subnav == undefined,
    },
    {
      url: `${ssURL}/proyek/${detail.id}?nav=tentang&subnav=anggota`,
      as: `${ssURL}/proyek/${detail.id}?nav=tentang&subnav=anggota`,
      text: "Anggota",
      active: subnav == "anggota",
    },
    {
      url: `${ssURL}/proyek/${detail.id}?nav=tentang&subnav=aktivitas`,
      as: `${ssURL}/proyek/${detail.id}?nav=tentang&subnav=aktivitas`,
      text: "Aktivitas",
      active: subnav == "aktivitas",
    },
    {
      url: `${ssURL}/proyek/${detail.id}?nav=tentang&subnav=manajemen-user`,
      as: `${ssURL}/proyek/${detail.id}?nav=tentang&subnav=manajemen-user`,
      text: "Manajemen User",
      active: subnav == "manajemen-user",
    },
    {
      url: `${ssURL}/proyek/${detail.id}?nav=tentang&subnav=permintaan-anggota`,
      as: `${ssURL}/proyek/${detail.id}?nav=tentang&subnav=permintaan-anggota`,
      text: "Permintaan Anggota",
      active: subnav == "permintaan-anggota",
    },
  ];

  const SubNavbarTentangProyek = () => (
    <>
      <Navbar nav={navItems} />
    </>
  );

  useEffect(() => {
    const dates = [];
    const limit = [];
    const count = Math.ceil(
      (logs[0]?.tanggal.toDate() - logs[logs.length - 1]?.tanggal.toDate()) /
        (1000 * 60 * 60 * 24)
    );
    for (let i = 0; i < count; i++) {
      dates.push(
        moment(logs[0]?.tanggal.toDate()).subtract(i, "days").toDate()
      );
      limit.push(3);
    }
    setLogLimit([...limit]);
    setLogDates([...dates]);
  }, [logs]);

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <SubNavbarTentangProyek />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {(subnav == "informasi" || !subnav) && (
            <>
              <div className="card card-ss">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center ">
                    <h4 className="fw-extrabold color-dark">
                      Informasi Proyek
                    </h4>
                    {checkPermission("Edit_Proyek") && (
                      <button
                        type="button"
                        className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center p-1"
                        style={{
                          width: "30px",
                          height: "30px",
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#modalBuatProyek"
                        // onClick={() => onClickEdit(slider)}
                        // data-joyride="edit-slider"
                      >
                        <FaPen className="color-secondary" />
                      </button>
                    )}
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item py-2 ps-0">
                      <h6 className="color-dark fw-bold mb-2">Deksripsi</h6>
                      <p className="fs-18-ss fw-semibold mb-0">
                        {detail.deskripsi}
                      </p>
                    </li>

                    <li className="list-group-item pt-4 py-2 ps-0">
                      <h6 className="color-dark fw-bold mb-2">
                        Privasi Proyek
                      </h6>
                      <p className="color-secondary fs-18-ss fw-semibold mb-0">
                        <FaGlobeAmericas className="me-2" />
                        {parseInt(detail.privasi)
                          ? "Proyek Privat. Hanya anggota yang bisa melihat anggota proyek ini dan juga progres kerja dari proyek ini."
                          : "Proyek Publik. Siapa saja bisa melihat anggota proyek ini dan juga progres kerja dari proyek ini."}
                      </p>
                    </li>
                    <li className="list-group-item pt-4 py-2 ps-0">
                      <h6 className="color-dark fw-bold mb-2">
                        Status Pengerjaan
                      </h6>
                      <p className="color-secondary fs-18-ss fw-semibold mb-0">
                        Perencanaan produk
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
          {subnav == "anggota" && (
            <>
              <div className="card card-ss">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between flex-column flex-md-row align-items-md-center mb-4">
                    <h4 className="color-dark fw-extrabold m-0 mb-md-0 mb-3">
                      Anggota ({Object.keys(anggota).length})
                    </h4>
                    <input
                      type="text"
                      className="form-control form-search rounded-pill fs-14-ss fw-semibold border-secondary-ss"
                      id="exampleFormControlInput1"
                      placeholder="Cari Anggota"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      style={{ height: "35px" }}
                    />
                  </div>
                  <ul className="list-group list-group-flush mb-4">
                    {anggota?.map((d, idx) => {
                      if (d.user?.nama.includes(search)) {
                        return (
                          <li
                            className="list-group-item py-3 px-0"
                            key={`anggota-${idx}`}
                          >
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-start">
                                <Avatar name={d.user?.nama} size={45} />
                                <div className="ms-3">
                                  <div className="d-flex">
                                    <h6 className="mb-1 fw-semibold color-dark me-3">
                                      {d.user?.nama}
                                    </h6>
                                    <div className="ms-3 label-ss rounded-pill fs-12-ss label-light-warning-ss fw-bolder d-sm-block d-none">
                                      {d.role?.role}
                                    </div>
                                  </div>

                                  <p className="fs-14-ss fw-semibold color-secondary mb-0">
                                    {d.user?.sekolah.nama}
                                  </p>
                                  <p className="fs-14-ss fw-italic color-primary mb-0">
                                    {d?.jobdesk
                                      ? d?.jobdesk
                                          .map(
                                            (job, idx) =>
                                              jobs?.find((d) => d.id == job)
                                                ?.name
                                          )
                                          ?.join(", ")
                                      : ""}
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex justify-content-beetween">
                                <WhatsappLink
                                  phoneNumber={d?.user?.whatsapp}
                                  text="Halo nak"
                                >
                                  <div
                                    className="rounded-circle shadow-success-ss"
                                    style={{
                                      width: "45px",
                                      height: "45px",
                                    }}
                                  >
                                    <img
                                      src={`/img/whatsapp.svg`}
                                      width={45}
                                      height={45}
                                    />
                                  </div>
                                </WhatsappLink>
                                {d?.role?.role !== "Pemilik" &&
                                  (checkPermission("Edit_Izin_Anggota") ||
                                    checkPermission("Kick_Anggota")) && (
                                    <div className="dropdown dropdown-ss mb-md-0 mb-2 d-md-inline d-flex justify-content-end">
                                      <div
                                        className="rounded-circle template-rapor-buku-induk d-flex justify-content-center align-items-center dropdown-template-rapor ms-2 ms-md-3"
                                        style={{
                                          width: "45px",
                                          height: "45px",
                                          background: "#EEF5FF",
                                        }}
                                        role="button"
                                        id="dropdownOption"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <FaChevronDown
                                          color="#80849C"
                                          className="fs-6"
                                        />
                                      </div>
                                      <ul
                                        className="dropdown-menu dropdown-menu-ss my-1"
                                        aria-labelledby="dropdownOption"
                                      >
                                        {checkPermission(
                                          "Edit_Izin_Anggota"
                                        ) && (
                                          <li
                                            onClick={() =>
                                              onClickEditKategori(d)
                                            }
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalEditRoleAnggota"
                                            onClick={() =>
                                              setFormData({
                                                anggotaNama: d?.user?.nama,
                                                anggotaId: d?.id,
                                                role: d?.role?.role,
                                                status: "menerima",
                                                roles: roles,
                                                jobdesk: d?.jobdesk
                                                  ? d?.jobdesk
                                                  : [],
                                                jobs: jobs,
                                              })
                                            }
                                          >
                                            <a className="dropdown-item">
                                              <FaPen className="me-2" />
                                              <span>Edit</span>
                                            </a>
                                          </li>
                                        )}
                                        {checkPermission("Kick_Anggota") && (
                                          <li
                                            onClick={() =>
                                              _deleteAnggota(
                                                d?.id,
                                                d?.user?.nama
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
                                  )}
                              </div>
                            </div>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              </div>
            </>
          )}
          {subnav == "aktivitas" && (
            <>
              <div className="card card-ss">
                <div className="card-body p-4">
                  {logDates.map((date, idx) => {
                    const filtered = logs
                      ?.filter((d) =>
                        moment(d.tanggal.toDate()).isSame(date, "days")
                      )
                      .slice(0, logLimit[idx]);
                    if (filtered.length > 0)
                      return (
                        <>
                          <button
                            className="btn btn-primary-ss px-4 py-1 rounded-pill shadow-primary-ss mb-4 me-2"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapseExample${idx}`}
                            aria-expanded="false"
                            aria-controls={`collapseExample${idx}`}
                          >
                            {moment(date).locale("ID").format("DD-MMMM dddd")}
                          </button>
                          <div
                            class="collapse show"
                            id={`collapseExample${idx}`}
                          >
                            {filtered.map((log, idx) => {
                              return (
                                <div
                                  className="position-relative activity-items"
                                  key={`log-${idx}`}
                                >
                                  <div className="d-flex align-items-mb-center activity-items-content">
                                    <Avatar
                                      name={log.by}
                                      size={45}
                                      className="activity-avatar"
                                    />
                                    <div className="ms-4">
                                      <h6 className="fs-14-ss color-dark mb-1 fw-bold">
                                        {log.message}
                                      </h6>
                                      <span className="fs-12-ss fw-semilbold">
                                        {moment(log.tanggal.toDate())
                                          .locale("ID")
                                          .format("D MMM YYYY hh:mm:ss a")}{" "}
                                        oleh{" "}
                                        <span className="color-primary">
                                          {log.by}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                  {idx < filtered.length - 1 ? (
                                    <span className="activity-items-stripe position-absolute"></span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              );
                            })}
                            {logLimit[idx] != 3 && (
                              <div
                                size={20}
                                className="pointer mb-4"
                                onClick={() =>
                                  setLogLimit([
                                    ...logLimit.map((d, index) => {
                                      if (index == idx) {
                                        if (d - 1 <= 0) {
                                          return 1;
                                        } else {
                                          return 3;
                                        }
                                      } else {
                                        return d;
                                      }
                                    }),
                                  ])
                                }
                              >
                                Tampilkan Lebih Sedikit
                              </div>
                            )}
                            {logs?.filter((d) =>
                              moment(d.tanggal.toDate()).isSame(date, "days")
                            )?.length != logLimit[idx] && (
                              <div
                                size={20}
                                className="pointer mb-4"
                                onClick={() =>
                                  setLogLimit([
                                    ...logLimit.map((d, index) => {
                                      if (index == idx) {
                                        return logs?.filter((d) =>
                                          moment(d.tanggal.toDate()).isSame(
                                            date,
                                            "days"
                                          )
                                        )?.length;
                                      } else {
                                        return d;
                                      }
                                    }),
                                  ])
                                }
                              >
                                Tampilkan Lebih Banyak
                              </div>
                            )}
                          </div>
                        </>
                      );
                  })}
                </div>
              </div>
            </>
          )}

          {subnav == "manajemen-user" && (
            <>
              <div className="card card-ss mb-4">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className={`fw-extrabold color-dark mb-0`}>Akses</h4>
                    {checkPermission("Buat_Izin") && (
                      <button
                        className="btn btn-ss btn-primary btn-primary-ss bg-gradient-primary shadow-primary-ss rounded-pill fs-14-ss fw-bold"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEditRole"
                        onClick={() =>
                          setFormData({
                            role: "",
                            permissions: {},
                          })
                        }
                      >
                        <FaPlus className="me-2" />
                        Tambah
                      </button>
                    )}
                  </div>
                  <ul className="list-group list-group-flush mb-2">
                    {roles?.length
                      ? roles?.map((d, idx) => {
                          return (
                            <>
                              <li
                                className="list-group-item pt-0 pb-3 ps-0 pe-0 mb-3"
                                // key={index}
                              >
                                <div className="d-flex align-items-center ">
                                  <img
                                    src="/img/icon-user-access.svg"
                                    alt="icon-user-access"
                                  />
                                  <div className="flex-grow-1">
                                    <div className="d-flex align-items-center justify-content-between ms-3">
                                      <div className="">
                                        <p className="fs-16-ss color-dark fw-semibold mb-1">
                                          {d.label}
                                        </p>
                                      </div>
                                      <div className="d-flex align-items-center">
                                        {checkPermission("Buat_Izin") && (
                                          <button
                                            type="button"
                                            className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center p-2 ms-sm-0 ms-2"
                                            style={{
                                              width: "30px",
                                              height: "30px",
                                            }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalEditRole"
                                            onClick={() =>
                                              setFormData({
                                                roleBefore: d.label,
                                                role: d.label,
                                                permissions: d.permissions,
                                                type: "edit",
                                              })
                                            }
                                          >
                                            <FaPen className="color-secondary fs-5" />
                                          </button>
                                        )}
                                        {d.label !== "Pemilik" &&
                                          d.label !== "Anggota" &&
                                          checkPermission("Delete_Izin") && (
                                            <button
                                              className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fs-6 pointer ms-3 p-1"
                                              style={{
                                                width: "30px",
                                                height: "30px",
                                              }}
                                              data-bs-toggle="modal"
                                              data-bs-target="#modalEditRole"
                                              onClick={() =>
                                                setFormData({
                                                  roleBefore: d.label,
                                                  role: "",
                                                  type: "delete",
                                                  roles: roles,
                                                })
                                              }
                                            >
                                              <FaTrashAlt className="color-secondary" />
                                            </button>
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </>
                          );
                        })
                      : "Belum ada data"}
                  </ul>
                </div>
              </div>

              <div className="card card-ss">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className={`w-50 fw-extrabold color-dark mb-0`}>
                      Jobdesk Pekerjaan
                    </h4>
                    {checkPermission("Buat_Jobdesk") && (
                      <button
                        className="btn btn-ss btn-primary btn-primary-ss bg-gradient-primary shadow-primary-ss rounded-pill fs-14-ss fw-bold"
                        data-bs-toggle="modal"
                        data-bs-target="#modalJobdesk"
                        onClick={() =>
                          setFormData({ ...formData, type: "Post", job: "" })
                        }
                      >
                        <FaPlus className="me-2" />
                        Tambah
                      </button>
                    )}
                  </div>
                  <div>
                    {jobs?.map((d, idx) => {
                      return (
                        <span className="bg-soft-secondary rounded-pill color-secondary fs-16-ss fw-semibold py-1 px-3 me-2 inline-block mb-2 mb-md-0 ">
                          {d?.name}

                          {checkPermission("Delete_Jobdesk") && (
                            <FaTimesCircle
                              className="pointer ms-2 fs-6 delete-jobdesk"
                              style={{
                                marginBottom: "2px",
                              }}
                              onClick={() => {
                                deleteJobdesk(d?.id);
                              }}
                            />
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {subnav == "permintaan-anggota" && (
            <>
              <div className="card card-ss mb-4">
                <div className="card-header-ss py-4 px-0">
                  <div className="d-flex justify-content-between align-items-md-center flex-md-row flex-column px-4 mb-0 mb-md-4">
                    <h4 className="fw-extrabold m-0 color-dark mb-md-0 mb-4">
                      Permintaan Anggota ({request.length})
                    </h4>
                  </div>
                  <div className="row px-4">
                    <div className="col-lg-9 col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control form-search form-search-mutasi rounded-pill fw-semibold border-secondary-ss w-100"
                        style={{ height: "42px", width: "100%" }}
                        id="exampleFormControlInput1"
                        placeholder="Cari Nama Anggota"
                        // value={searchTransaksi}
                        // onChange={(e) => setSearchTransaksi(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-3 col-md-6 col-md-3 mb-3">
                      {/* <Dropdown
                      listValue={tingkatPrestasi}
                      defaultValue={
                        tingkatPrestasi?.find((d) => d.value == tingkat)
                          ?.label
                      }
                      onChange={handleChangeDropdown}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="row position-relative gy-4"
                style={{ zIndex: "50" }}
              >
                {request.map((d, idx) => {
                  if (d.user?.nama.includes(search)) {
                    return (
                      <div className="col-md-4" key={idx}>
                        <CardPartnerKolaborasi
                          isPermintaan
                          data={d?.user}
                          // formData={formData}
                          isCheckPermintaan={checkPermission("Undang_Anggota")}
                          putRoleTerima={() => {
                            putRole({
                              anggotaNama: d?.user?.nama,
                              anggotaId: d?.id,
                              role: "Anggota",
                              status: "menerima",
                              jobdesk: [],
                            });
                          }}
                          putRoleTolak={() => {
                            putRole({
                              anggotaNama: d?.user?.nama,
                              anggotaId: d?.id,
                              role: "",
                              status: "menolak",
                              jobdesk: [],
                            });
                          }}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </>
          )}
        </div>
      </div>
      <ModalEditRole
        formData={formData}
        handleChangeFormCheck={changePermission}
        handleSubmit={handleSubmit}
        handleChangeSelect={handleChangeSelect}
      />
      <ModalEditRoleAnggota
        formData={formData}
        handleChangeFormCheck={changeRole}
        handleSubmit={handleSubmitAnggota}
        handleChangeSelect={handleChangeSelect}
      />
      <ModalFormProyek
        formData={formData}
        setFormData={setFormData}
        _editProyek={_editProyek}
      />
      <ModalJobdesk
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmitJobdesk}
      />
    </>
  );
};

export default TentangPage;
