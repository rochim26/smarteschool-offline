import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ssURL } from "../../client/clientAxios";
import { deleteTimeline } from "../../client/TimelineClient";
import { postProyekForum } from "../../client/ProyekClient";
import useUser from "../../hooks/useUser";
import Avatar from "../Shared/Avatar/Avatar";
import Navbar from "../Shared/Navbar/Navbar";
import ModalAddPostingan from "../../components/Kolaborasi/ModalAddPostingan";
import { db } from "../../config/config";

import { hideModal } from "../../utilities/ModalUtils";
import {
  FaCommentDots,
  FaFile,
  FaPaperclip,
  FaPen,
  FaTrashAlt,
} from "react-icons/fa";
import moment from "moment";
import TextareaAutosize from "react-textarea-autosize";
import { Select } from "antd";
import KomenTimeline from "../Shared/KomenTimeline/KomenTimeline";

const ForumPage = ({
  subnav,
  setEditId,
  id,
  roles,
  anggota,
  isAnggota,
  jobs,
  forum,
  checkPermission,
}) => {
  const { user } = useUser();

  const initialFormData = {
    type: "post",
    deskripsi: "",
    lampiran: [],
    loading: "idle",
    user,
    filter: [],
  };
  const [formData, setFormData] = useState(initialFormData);
  const [comments, setComments] = useState({});

  const proyekRef = db.collection("kolaborasi").doc(`${id}`);

  const _getKomen = async (id) => {
    const temp = [];
    const observer = proyekRef
      .collection("forum")
      .doc(`${id}`)
      .collection("comments")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type == "added") {
            temp.push(change.doc.data());
          }
        });
        setComments({
          ...comments,
          [id]: temp.sort((a, b) => a.createdAt - b.createdAt),
        });
      });
  };

  const postNewLog = (message) => {
    proyekRef.collection("logs").doc().set({
      message,
      by: user.nama,
      tanggal: moment().toDate(),
    });
  };

  const postKomen = async (id) => {
    proyekRef
      .collection("forum")
      .doc(`${id}`)
      .collection("comments")
      .doc()
      .set({
        by: user,
        message: formData[`komen:${id}`],
        createdAt: moment().toDate(),
      });
    setFormData({
      ...formData,
      [`komen:${id}`]: "",
    });
    const postingan = await proyekRef.collection("forum").doc(`${id}`).get();
    proyekRef
      .collection("forum")
      .doc(`${id}`)
      .update({
        comment: postingan.data().comment ? postingan.data().comment + 1 : 1,
      });
    _getKomen(id);
  };

  const handleSubmit = (id) => {
    if (id) {
      proyekRef.collection("forum").doc(`${id}`).delete();
      toast.success("Postingan berhasil di hapus");
      return;
    }
    if (formData.type == "post") {
      _postProyekForum();
    } else if (formData.type == "edit") {
      _putProyekForum();
    }
  };

  const _postProyekForum = async () => {
    const content = window.$(`#editorDiskusi`).summernote("code");
    setFormData({ ...formData, loading: "loading" });
    const { data, error } = await postProyekForum(id, {
      deskripsi: content,
      lampiran: formData.lampiran.join(";"),
      m_user_id: user.id,
    });

    if (data) {
      postNewLog(`postingan baru ditambahkan`);
      proyekRef
        .collection("forum")
        .doc(`${data?.forum?.id}`)
        .set({ ...data?.forum, jobdesk: formData.jobdesk.join(";") });
      // _getForumPostingan();
      setFormData({ ...initialFormData, loading: "success" });
      window.$(`#editorDiskusi`).summernote("reset");
      hideModal("modalAddPostingan");
      toast.success(data?.message);
    } else {
      setFormData({ ...formData, loading: "error" });
      toast.error(error?.message);
    }
  };

  const _putProyekForum = async () => {
    const content = window.$(`#editorDiskusi`).summernote("code");
    const update = proyekRef
      .collection("forum")
      .doc(`${formData.id}`)
      .update({
        deskripsi: content,
        lampiran: formData.lampiran.join(";"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
    window.$(`#editorDiskusi`).summernote("reset");
    hideModal("modalAddPostingan");
    toast.success("Postingan berhasil di edit");
  };

  const handleClickEdit = (data) => {
    setFormData({
      ...formData,
      type: "edit",
      id: data.id,
      deskripsi: data.deskripsi,
      lampiran: data.lampiran ? data.lampiran.split(";") : [],
    });
    window.$(`#editorDiskusi`).summernote("code", data.deskripsi);
  };

  const navItems = [
    {
      url: `${ssURL}/proyek/[id]?nav=tentang&subnav=informasi`,
      as: `${ssURL}/proyek/1?nav=tentang&subnav=informasi`,
      text: "Informasi",
      active: subnav == "informasi" || subnav == undefined,
    },
    {
      url: `${ssURL}/proyek/[id]?nav=tentang&subnav=anggota`,
      as: `${ssURL}/proyek/1?nav=tentang&subnav=anggota`,
      text: "Anggota",
      active: subnav == "anggota",
    },
    {
      url: `${ssURL}/proyek/[id]?nav=tentang&subnav=aktivitas`,
      as: `${ssURL}/proyek/1?nav=tentang&subnav=aktivitas`,
      text: "Aktivitas",
      active: subnav == "aktivitas",
    },
  ];

  const SubNavbarTentangProyek = () => (
    <>
      <Navbar nav={navItems} />
    </>
  );

  // useEffect(() => {
  // _getForumPostingan();
  // }, []);
  return (
    <>
      <ModalAddPostingan
        formData={formData}
        handleSubmit={handleSubmit}
        setFormData={setFormData}
      />
      <div className="row justify-content-center">
        <div className="col-md-10">
          {isAnggota && checkPermission("Buat_Postingan") && (
            <div
              className="card card-ss bg-white p-4 pointer mb-4"
              data-bs-toggle="modal"
              data-bs-target="#modalAddPostingan"
              data-joyride="add-postingan"
              onClick={() => setFormData({ ...formData, jobs, jobdesk: [] })}
            >
              <div className="div d-flex align-items-center">
                <Avatar size={45} name={formData?.user?.nama} />
                <p className="mb-0 color-secondary ms-3">
                  Diskusikan sesuatu pada proyek Anda...
                </p>
              </div>
            </div>
          )}
          <div className="mb-4">
            <Select
              className="select-filter-proyek"
              mode="multiple"
              value={formData.filter}
              placeholder="Pilih Jobdesk Forum"
              style={{ width: "100%" }}
              onChange={(e) => setFormData({ ...formData, filter: e })}
              maxTagCount="responsive"
            >
              {jobs
                ? jobs?.map((d, idx) => {
                    return <Option value={d.id}>{d.name}</Option>;
                  })
                : ""}
            </Select>
          </div>
          {forum.map((d, idx) => {
            if (!comments[d.id]) {
              _getKomen(d.id);
            }
            const anggotaData = anggota?.find(
              (user) => user?.mUserId == d.mUserId
            )?.user;
            const filter =
              formData.filter.length > 0
                ? d.jobdesk
                  ? formData.filter.filter((value) =>
                      d.jobdesk.split(";").includes(value)
                    ).length > 0
                    ? 1
                    : 0
                  : 0
                : 1;
            if (filter) {
              return (
                <div className="mb-4" key={idx}>
                  <div className="card-post card card-ss">
                    <div className="card-header card-header-ss p-4 d-flex flex-md-row justify-content-between">
                      {/* Post Title Start */}
                      <a className="text-decoration-none order-md-1 order-1">
                        <div className="card-post-title d-flex align-items-center flex-grow-1 ">
                          <div
                            className="rounded-circle shadow-primary-ss me-4"
                            style={{
                              width: "45px",
                              height: "45px",
                            }}
                          >
                            <Avatar size={45} name={anggotaData?.nama} />
                          </div>
                          <div className="title">
                            <h6 className="color-dark fw-bold m-0">
                              {anggotaData?.nama}
                            </h6>
                            <p className="color-secondary m-0 fs-14-ss mt-2">
                              {d.createdAt}
                            </p>
                          </div>
                        </div>
                      </a>
                      {/* Post Title End */}

                      {/* Dropdown Option Start */}
                      {anggotaData?.id == user.id && (
                        <div className="dropdown dropdown-ss mb-md-0 mb-2 d-md-inline d-flex justify-content-end order-md-2 order-1">
                          <div
                            role="button"
                            id="dropdownMenuLink"
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
                            aria-labelledby="dropdownMenuLink"
                          >
                            {checkPermission("Edit_Postingan") && (
                              <li
                                data-bs-toggle="modal"
                                data-bs-target="#modalAddPostingan"
                                onClick={() => handleClickEdit(d)}
                              >
                                <a className="dropdown-item">
                                  <FaPen className="me-2" />
                                  <span>Edit</span>
                                </a>
                              </li>
                            )}

                            {checkPermission("Delete_Postingan") && (
                              <li onClick={() => handleSubmit(d.id)}>
                                <a className="dropdown-item color-danger">
                                  <FaTrashAlt className="me-2" />
                                  <span>Hapus</span>
                                </a>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                      {/* Dropdown Option End */}
                    </div>

                    <div className="card-body pt-0 px-4 pb-3">
                      {/* Post Content Start */}
                      <a className="text-decoration-none">
                        <div className="row px-0">
                          {/* Post Description Start */}

                          <div
                            className={`card-post-content dangerous-html ${
                              user?.role === "guru" ? "col-lg-9" : "col-lg-8"
                            } col-md-8 color-secondary`}
                            dangerouslySetInnerHTML={{
                              __html: d.deskripsi,
                            }}
                          />
                          {/* Post Description End */}
                        </div>
                      </a>
                      {/* Post Content End */}
                    </div>
                    <div className="card-footer-ss p-4 pt-0">
                      <hr className="m-0 mb-3" />
                      <a
                        className="text-decoration-none"
                        href={`#collapseKomentar-${d.id}`}
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        aria-controls={`collapseKomentar-${d.id}`}
                      >
                        <div className="d-flex mb-3 mb-md-0">
                          <div className="comment color-dark fs-14-ss fw-bolder me-4">
                            <FaCommentDots className="color-dark fs-5 me-2" />
                            <span>{d?.comment ? d.comment : 0} Komentar</span>
                          </div>
                        </div>
                      </a>
                      {/* <div className="comment-items d-flex">
                        <div className="flex-grow-1 rounded-ss border border-secondary border-light-secondary-ss position-relative p-2 pe-5">
                          <TextareaAutosize
                            minRows={1}
                            className="textarea-auto"
                            style={{
                              resize: "none",
                              width: "100%",
                              border: "none",
                            }}
                            placeholder="Tuliskan komentar..."
                            name={`komen:${d.id}`}
                            onChange={(event) => {
                              setFormData({
                                ...formData,
                                [`komen:${d.id}`]: event.target.value,
                              });
                            }}
                            value={formData[`komen:${d.id}`]}
                          />
                          <button
                            className="border-0 btn position-absolute pe-2"
                            style={{
                              bottom: "-2px",
                              right: "-3px",
                            }}
                            onClick={() => postKomen(d.id)}
                          >
                            <img
                              src={`/img/btn-submit-comment.svg`}
                              alt="button-submit-comment"
                            />
                          </button>
                        </div>
                      </div> */}
                      <div className="collapse" id={`collapseKomentar-${d.id}`}>
                        <div className="row mt-3">
                          {comments[d.id] ? (
                            <>
                              {comments[d.id].map((item, idx) => {
                                return (
                                  <KomenTimeline
                                    idx={idx}
                                    totalKomen={d?.comment}
                                    komen={item?.message}
                                    userObj={item?.by}
                                    userId={item?.by?.id}
                                    createdAt={item?.createdAt.toDate()}
                                  />
                                );
                              })}
                              <div className="comment-items d-flex">
                                <div className="ava me-3 d-md-inline d-none">
                                  <Avatar
                                    name={user?.nama}
                                    src={user?.avatar}
                                  />
                                </div>
                                <div className="flex-grow-1 rounded-ss border border-secondary border-light-secondary-ss position-relative p-2 pe-5">
                                  <TextareaAutosize
                                    minRows={1}
                                    className="textarea-auto"
                                    style={{
                                      resize: "none",
                                      width: "100%",
                                      border: "none",
                                    }}
                                    placeholder="Tuliskan komentar..."
                                    name={`komen:${d.id}`}
                                    onChange={(event) => {
                                      setFormData({
                                        ...formData,
                                        [`komen:${d.id}`]: event.target.value,
                                      });
                                    }}
                                    value={formData[`komen:${d.id}`]}
                                  />
                                  <button
                                    className="border-0 btn position-absolute pe-2"
                                    style={{
                                      bottom: "-2px",
                                      right: "-3px",
                                    }}
                                    onClick={() => postKomen(d.id)}
                                  >
                                    <img
                                      src={`/img/btn-submit-comment.svg`}
                                      alt="button-submit-comment"
                                    />
                                  </button>
                                </div>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-md-center flex-column flex-md-row">
                        <a className="text-decoration-none">
                          {/* Comment & Attachment Start */}
                          <div className="d-flex mb-3 mb-md-0">
                            {/* <FaCommentDots className="me-2" />
                          <TextareaAutosize
                            className="textarea-auto"
                            style={{
                              resize: "none",
                              width: "100%",
                              border: "none",
                            }}
                            placeholder="Tuliskan komentar..."
                            name="komen"
                            onChange={(event) =>
                              setFormData({
                                ...formData,
                                komen: event.target.value,
                              })
                            }
                            value={formData?.komen}
                          /> */}
                            <div className="comment color-dark fs-14-ss fw-bolder me-4"></div>
                          </div>
                          <div className="row">
                            {d.lampiran
                              ? d.lampiran?.split(";")?.map((file) => {
                                  if (
                                    file.includes(
                                      "https://firebasestorage.googleapis.com/v0/b/smart-school-300211.appspot.com/o/"
                                    )
                                  )
                                    file = file?.replace(
                                      "https://firebasestorage.googleapis.com/v0/b/smart-school-300211.appspot.com/o/",
                                      ""
                                    );
                                  file = file.slice(0, file.indexOf("?alt"));
                                  return (
                                    <div className="card-lampiran-materi border-light-secondary rounded-ss mt-3">
                                      <div className="d-flex justify-content-between align-items-md-center flex-wrap flex-md-row flex-column">
                                        <div className="d-flex align-items-center flex-wrap">
                                          <div className="pdf-icon ms-0 m-2 shadow-primary-ss">
                                            <FaFile className="text-white fs-3" />
                                          </div>
                                          <div className="p-2">
                                            <p className="fw-bold color-dark mb-0">
                                              {file}
                                            </p>
                                            <span className="fs-12-ss color-secondary fs-12-ss fw-bold">
                                              {/* PDF */}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              : ""}
                          </div>
                          {/* Comment & Attachment End */}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default ForumPage;
