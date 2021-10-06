import { useEffect, useState } from "react";
import {
  FaAngleRight,
  FaPlus,
  FaTrash,
  FaChevronLeft,
  FaTrashAlt,
  FaPen,
  FaClone,
  FaCommentDots,
  FaPaperclip,
  FaRegClock,
  FaCloudDownloadAlt,
  FaLink,
  FaFilePdf,
  FaTimes,
} from "react-icons/fa";
import { DatePicker, TimePicker } from "antd";
import Layout from "../../components/Layout/Layout";
import { getDetailRombel } from "../../client/RombelClient";
import Link from "next/link";
import { baseURL, ssURL } from "../../client/clientAxios";
import { useRouter } from "next/router";
import LayoutDetail from "../../components/Layout/LayoutDetail";
import WhatsappLink from "../../components/Shared/WhatsappLink/WhatsappLink";
import Tabs from "../../components/Shared/Tabs/Tabs";

import AnimatePage from "../../components/Shared/AnimatePage/AnimatePage";
import NewModal from "../../components/Shared/NewModal/NewModal";
import ReactiveButton from "reactive-button";
import Axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Shared/Navbar/Navbar";
import TextareaAutosize from "react-textarea-autosize";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { Fragment } from "react";
import { getTimeline, postTimeline } from "../../client/TimelineClient";
import { postTugas, getTugas, deleteTugas } from "../../client/TugasClient";
import { uploadFile } from "../../client/uploadFileClient";
import { getProfil } from "../../client/sharedClient";
import swal from "sweetalert";
import TugasSkeleton from "../Shared/Skeleton/TugasSkeleton";
import TimelinePage from "../../components/Rombel/TimelinePage";
import TugasPage from "../../components/Rombel/TugasPage";
import PertemuanPage from "../../components/Rombel/PertemuanPage";

const AnalisisMateriPage = ({ loading, analisisMateri, id }) => {
  return (
    <>
      <div className="row justify-content-center">
        {!analisisMateri?.materi?.bab.length && (
          <>
            <div className="row justify-content-center mt-3">
              <div className="col-md-4 col-8">
                <img
                  src="/img/empty-state-timeline.png"
                  alt="empty-state"
                  className="img-fluid"
                />
              </div>
              <div className="col-12 text-center">
                <h5 className="color-dark fw-black">Belum Ada Materi</h5>
                <p className="fw-bold fs-14-ss">
                  Tekan tombol{" "}
                  <a href="#" className="text-decoration-none color-primary">
                    dibawah
                  </a>{" "}
                  untuk membuat materi
                </p>
                <Link href={`${ssURL}/materi`}>
                  <a className="text-decoration-none">
                    <button
                      className="btn btn-ss btn-primary btn-primary-ss shadow-primary-ss rounded-pill fw-bold"
                      style={{ width: "164px" }}
                    >
                      Buat Materi
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          </>
        )}
        {loading && (
          <div className="col-md-10">
            <TugasSkeleton />
          </div>
        )}
        {!loading &&
          analisisMateri?.materi?.bab?.map((bab, idx) => {
            return (
              <div className="col-md-10" key={idx}>
                {/* Card Post Start */}
                <div className="card-analisis-materi card card-ss mb-4">
                  <div className="card-header card-header-ss p-4 border-bottom border-secondary border-light-secondary-ss">
                    <div className="card-post-title d-flex align-items-center">
                      <div
                        className="rounded-circle shadow-primary-ss me-4"
                        style={{
                          width: "50px",
                          height: "50px",
                        }}
                      >
                        <img src={`/img/post-icon-1.svg`} alt="post-icon" />
                      </div>
                      <h6 className="fw-black fs-18-ss m-0 color-dark">
                        BAB {idx + 1} - {bab?.judul}
                      </h6>
                    </div>
                  </div>
                  <div className="card-body pt-0 ps-0 pb-4 pe-0">
                    {bab?.topik?.map((topik, idx) => {
                      return (
                        <Link
                          href={`${ssURL}/analisis-materi/[id]?m_jadwal_mengajar_id=${id}`}
                          as={`${ssURL}/analisis-materi/${topik.id}?m_jadwal_mengajar_id=${id}`}
                          key={idx}
                        >
                          <a
                            className="topik-items px-4 py-3 d-flex justify-content-between align-items-center border-bottom border-light-secondary-ss text-decoration-none"
                            data-joyride="topik-materi"
                          >
                            <p className="color-secondary m-0">
                              {topik?.judul}
                            </p>
                            {topik?.meta?.totalKesimpulan ==
                            analisisMateri?.rombel?.meta?.totalAnggota ? (
                              <div
                                className="label-topik label-light-success-ss rounded-pill fs-14-ss fw-bold d-flex justify-content-center align-items-center"
                                data-joyride="progres-materi"
                              >
                                Selesai
                              </div>
                            ) : (
                              <div
                                className="label-topik label-light-primary-ss rounded-pill fs-14-ss fw-bold d-flex justify-content-center align-items-center"
                                data-joyride="progres-materi"
                              >
                                {topik?.meta?.totalKesimpulan} /{" "}
                                {analisisMateri?.rombel?.meta?.totalAnggota}
                              </div>
                            )}
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                {/* Card Analisis Materi End */}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AnalisisMateriPage;
