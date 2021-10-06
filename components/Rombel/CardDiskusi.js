import { useState } from "react";

import {
  FaCommentDots,
  FaFile,
  FaFilePdf,
  FaPen,
  FaTrashAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { baseURL } from "../../client/clientAxios";
import {
  deleteTimelineKomen,
  getDetailTimeline,
  postTimelineKomen,
} from "../../client/TimelineClient";
import KomenInput from "../Shared/KomenTimeline/KomenInput";
import KomenTimeline from "../Shared/KomenTimeline/KomenTimeline";
import Avatar from "../Shared/Avatar/Avatar";

const CardDiskusi = ({ d, user, handleClickEdit, deleteTimelineData }) => {
  const [komenData, setKomenData] = useState([]);
  const lampiran = d?.timeline?.lampiran || d?.lampiran;

  const postKomen = async (komen, timelineId) => {
    const payload = {
      mTimelineId: timelineId,
      komen,
    };

    const { data } = await postTimelineKomen(payload);
    if (data) {
      toast.success(data?.message);
      getDetailTimelineData(timelineId);
    }
  };

  const getDetailTimelineData = async (id) => {
    const { data } = await getDetailTimeline(id);
    if (data) {
      setKomenData(data.timeline.komen);
    }
  };

  const deleteKomen = async (komenId, timelineId) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data } = await deleteTimelineKomen(komenId);
        if (data) {
          toast.success(data?.message);
          getDetailTimelineData(timelineId);
        }
      }
    });
  };

  return (
    <>
      <div className="col-lg-10">
        <div className="card-post card card-ss">
          <div className="card-header card-header-ss p-4 d-flex flex-md-row flex-column justify-content-between">
            <div className="card-post-title d-flex align-items-center flex-grow-1 order-md-1 order-2">
              {/* Post Title Start */}
              <div className="card-post-title d-flex align-items-center flex-grow-1">
                <div className="div">
                  {user?.role == "guru" ? (
                    <Avatar name={d?.user?.nama} src={d?.user?.avatar} />
                  ) : (
                    <Avatar
                      name={d.timeline?.user?.nama}
                      src={d.timeline?.user?.avatar}
                    />
                  )}
                </div>
                <div className="title ms-4">
                  <h6 className="color-dark fw-black m-0">
                    {(user?.role == "guru" && user?.id == d.user?.id) ||
                    (user?.role == "siswa" && user?.id == d.timeline?.mUserId)
                      ? "Anda"
                      : user?.role == "guru"
                      ? d.user?.nama
                      : d.timeline?.user?.nama}
                  </h6>
                  <p className="color-secondary m-0 fs-14-ss mt-2">
                    {d.createdAt}
                  </p>
                </div>
              </div>
              {/* Post Title End */}
            </div>

            {/* Dropdown Option Start */}
            {(user?.role == "guru" && user?.id == d.user?.id) ||
            (user?.role == "siswa" && user?.id == d.timeline?.mUserId) ? (
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
                  <li
                    data-bs-toggle="modal"
                    data-bs-target="#modalAddPostingan"
                    onClick={() =>
                      user?.role == "guru"
                        ? handleClickEdit(d)
                        : handleClickEdit(d?.timeline)
                    }
                  >
                    <a className="dropdown-item">
                      <FaPen className="me-2" />
                      <span>Edit</span>
                    </a>
                  </li>
                  <li
                    onClick={() =>
                      user?.role == "guru"
                        ? deleteTimelineData(d?.id)
                        : deleteTimelineData(d?.timeline?.id)
                    }
                  >
                    <a className="dropdown-item color-danger">
                      <FaTrashAlt className="me-2" />
                      <span>Hapus</span>
                    </a>
                  </li>
                </ul>
              </div>
            ) : null}
            {/* Dropdown Option End */}
          </div>

          <div className="card-body pt-0 px-4 pb-3">
            {/* Post Content Container Start */}
            <div className="div">
              {/* Post Content Start */}

              {/* Content Text Start*/}

              <div
                className={`card-post-content dangerous-html ${
                  user?.role === "guru" ? "col-lg-9" : "col-lg-8"
                } col-md-8 color-secondary`}
                dangerouslySetInnerHTML={{
                  __html: d?.deskripsi || d?.timeline?.deskripsi,
                }}
              />

              {/* Content Text End*/}

              {/* Content Gambar Start */}
              {/* <img
                src={`/img/data-ms-illustration_4x.png`}
                alt="post-img"
                style={{
                  width: "100%",
                  maxHeight: "500px",
                  objectFit: "cover",
                }}
                className="rounded-ss mb-3"
              /> */}
              {/* Content Gambar End*/}

              {/* Content File Start*/}

              {lampiran?.map((lampiran, idx) => {
                return (
                  <a
                    href={`${lampiran}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    key={idx}
                  >
                    <div className="bg-soft-primary p-3 rounded-ss mt-3 mb-3">
                      <div className="file-content d-flex align-items-center flex-wrap">
                        <div
                          className="rounded-circle bg-primary shadow-primary-ss d-flex justify-content-center align-items-center text-white fs-3 p-2"
                          style={{
                            width: "48px",
                            height: "48px",
                          }}
                        >
                          <FaFile />
                        </div>
                        <div className="p-2 d-flex flex-column">
                          <p className="fw-bold color-dark mb-1 text-break">
                            {lampiran}
                          </p>
                          {/* <p className="fs-12-ss fw-bold color-secondary mb-0">
                      PDF
                    </p> */}
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
              {/* Post Content End */}
            </div>
            {/* Post Content Container End */}
          </div>
          <div className="card-footer-ss p-4 pt-0">
            <hr className="m-0 mb-3" />

            <div
              className="d-flex justify-content-between align-items-md-center flex-column flex-md-row"
              onClick={() => getDetailTimelineData(d.id)}
            >
              <a
                className="text-decoration-none"
                href={`#collapseKomentar-${d.id}`}
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls={`collapseKomentar-${d.id}`}
              >
                {/* Comment & Attachment Start */}
                <div className="d-flex mb-3 mb-md-0">
                  <div className="comment color-dark fs-14-ss fw-bolder me-4">
                    <FaCommentDots className="me-2" />
                    <span>{d?.timeline?.meta?.totalKomen} Komentar</span>
                  </div>
                  {/* <div className="attach color-dark fs-14-ss fw-bolder">
                      <FaPaperclip className="me-2" />
                      <span>1 Lampiran</span>
                    </div> */}
                </div>
                {/* Comment & Attachment End */}
              </a>
            </div>
            <div className="collapse" id={`collapseKomentar-${d.id}`}>
              <div className="row mt-3">
                {komenData?.map((data, idx) => (
                  <KomenTimeline
                    idx={idx}
                    totalKomen={komenData?.length}
                    komen={data?.komen}
                    userObj={data?.user}
                    userId={data?.mUserId}
                    createdAt={data?.createdAt}
                    onClickDelete={(komenId) => deleteKomen(komenId, d.id)}
                    komenId={data?.id}
                  />
                ))}
                <KomenInput postKomen={(e) => postKomen(e, d.id)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDiskusi;
