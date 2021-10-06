import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Axios from "axios";
import { editPost, getDetailPost, postPost } from "../../client/PostClient";
import { getKategori } from "../../client/KategoriClient";
import Editor from "../Shared/Editor/Editor";
import getConfig from "next/config";
import Button from "../Shared/Button/Button";

import { baseURL, ssURL } from "../../client/clientAxios";
import { Select, Skeleton } from "antd";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import MyJoyride from "../Shared/MyJoyride/MyJoyride";
import InputFile from "../Shared/InputFile/InputFile";

const initialFormData = {
  judul: "Ini judul postinganku",
  kategori: "",
  banner: null,
};

const CreateEditPost = ({ id }) => {
  const {
    publicRuntimeConfig: { SS_URL },
  } = getConfig();
  const router = useRouter();
  const isEdit = router.pathname.includes("edit");

  const [formData, setFormData] = useState(initialFormData);
  const [buttonPostState, setButtonPostState] = useState("idle");
  const [buttonSimpanState, setButtonSimpanState] = useState("idle");
  const [loading, setLoading] = useState(true);
  const [kategoriData, setKategoriData] = useState();
  const { kategori } = kategoriData || {};

  let kategoriOptions = [];
  kategori?.length > 0 &&
    kategori?.map((kategori) => {
      kategoriOptions.push({
        label: kategori?.judul,
        value: kategori?.id,
      });
    });

  const selectProps = {
    mode: "multiple",
    style: { width: "100%" },
    value: formData?.mKategoriId,
    options: kategoriOptions,
    onChange: (newValue) =>
      setFormData({
        ...formData,
        mKategoriId: newValue,
      }),
    placeholder: "Pilih Kategori",
    maxTagCount: "responsive",
  };

  const handlePostPostData = async () => {
    setButtonPostState("loading");
    const payload = {
      ...formData,
      konten: window.$(`#post-content`).summernote("code"),
    };

    const { data } = isEdit
      ? await editPost(payload, id)
      : await postPost(payload);
    if (data) {
      setButtonPostState("success");
      toast.success(data?.message);
      router.push(`${SS_URL}/post`);
    } else {
      setButtonPostState("error");
    }
  };

  const handleSavePostData = async () => {
    setButtonSimpanState("loading");
    const { data } = await postPost({
      ...formData,
      konten: window.$(`#post-content`).summernote("code"),
      simpan: 1,
    });
    if (data) {
      toast.success(data?.message);
      setButtonSimpanState("success");
      router.push(`${SS_URL}/post`);
    } else {
      setButtonSimpanState("error");
    }
  };

  const getDetailPostData = async () => {
    setLoading(true);
    const { data } = await getDetailPost(id);

    if (data) {
      let kategoriId = [];

      data?.post?.tkPost?.map((tkData) => {
        kategoriId.push(tkData?.mKategoriId);
      });

      window.$(`#post-content`).summernote("code", data?.post?.konten);

      setFormData({
        ...formData,
        judul: data.post.judul,
        mKategoriId: kategoriId,
        banner: data.post.banner,
      });
    }

    setLoading(false);
  };

  const handleChangeInputFile = (e, data) => {
    if (data) {
      setFormData({ ...formData, banner: data });
    }
  };

  const getKategoriData = async () => {
    setLoading(true);
    const { data } = await getKategori();
    if (data) {
      setKategoriData(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    id && getDetailPostData();
    getKategoriData();
  }, []);

  const steps = [
    {
      target: '[data-joyride="button-kembali"]',
      content: "Text 1",
      disableBeacon: true,
    },
    {
      target: '[data-joyride="input-judul-postingan"]',
      content: "Text 2",
      disableBeacon: true,
    },
    {
      target: '[data-joyride="editor-postingan"]',
      content: "Text 3",
      disableBeacon: true,
    },
    {
      target: '[data-joyride="input-kategori"]',
      content: "Text 4",
      disableBeacon: true,
    },
    {
      target: '[data-joyride="input-cover-blog"]',
      content: "Text 5",
      disableBeacon: true,
    },
  ];

  return (
    <div className="row g-4">
      <MyJoyride steps={steps} />
      {loading && <Skeleton count={4} height={50} />}
      {!loading && (
        <>
          <div className="row mb-4">
            <div className="col-md-12">
              <Link href={`${ssURL}/post`}>
                <a
                  className="text-decoration-none fw-bolder color-primary"
                  data-joyride="button-kembali"
                >
                  <FaChevronLeft />
                  <span className="ms-2">Kembali</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="col-lg-8 container-editor-postingan">
            <div className="card card-ss h-100">
              <div className="card-body p-4 bab-detail">
                <div
                  className="mb-4 bab-title w-100"
                  data-joyride="input-judul-postingan"
                >
                  <TextareaAutosize
                    className="ps-0 border-0 border-bottom border-2 form-control form-bab-materi shadow-none fs-4 color-dark fw-extrabold"
                    placeholder="Tuliskan judul disini"
                    value={formData.judul}
                    onChange={({ target }) =>
                      setFormData({ ...formData, judul: target.value })
                    }
                  />
                </div>
                <div data-joyride="editor-postingan">
                  <Editor id="post-content" className="edit-postingan" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card card-ss">
              <div className="card-body p-4 ">
                <h4 className="fw-extrabold color-dark mb-4">Informasi</h4>
                <div className="mb-3" data-joyride="input-kategori">
                  <label className="form-label">Kategori</label>
                  <Select {...selectProps} />
                </div>
                {/* <div className="mb-3">
                  <label className="form-label">Banner</label>
                  <input
                    id="uploadBannerPost"
                    type="file"
                    className="form-control"
autoComplete="off"
                    accept="image/*"
                    onChange={async ({ target }) => {
                      const data = await uploadFile(target.files[0]);
                      if (data) {
                        setFormData({ ...formData, banner: data });
                      }
                    }}
                  />
                </div> */}
                <div data-joyride="input-cover-blog">
                  <label className="form-label">Cover Blog</label>
                  {!formData.banner && (
                    <label
                      htmlFor="uploadBannerPost"
                      className="form-label mb-0 w-100"
                    >
                      <div
                        className="drop-file bg-soft-primary rounded d-flex justify-content-center align-items-center pointer w-100 border border-primary-ss rounded-ss"
                        style={{ height: "205px" }}
                      >
                        <div className="label-input d-flex align-items-center py-5 px-4 flex-column m-3 m-md-0">
                          <img src={`/img/icon-upload-dropfile.svg`} alt="" />
                          <span className="fs-18-ss fw-semibold color-secondary m-0 mt-4 text-center">
                            Tekan untuk mengupload{" "}
                            <span className="color-primary">Foto</span>
                          </span>
                        </div>
                      </div>
                    </label>
                  )}
                  <InputFile
                    id="uploadBannerPost"
                    name="uploadBannerPost"
                    accept="image/*"
                    onChange={handleChangeInputFile}
                  />
                  {/* {formData.banner ? (
                  <img
                    src={`${formData?.banner}`}
                    layout="responsive"
                    width={500}
                    height={500}
                  />
                ) : null} */}
                  <div
                    className="position-relative mx-auto"
                    style={{ width: "100%" }}
                  >
                    {formData.banner && (
                      <>
                        <img
                          width="100%"
                          src={`${formData?.banner}`}
                          className="rounded"
                        />
                        <label
                          className="rounded-circle shadow-primary-ss position-absolute pointer"
                          htmlFor="uploadBannerPost"
                          style={{
                            right: "5%",
                            top: "5%",
                            width: "50px",
                            height: "50px",
                            background: `
                        url(/img/icon-edit-foto.svg)`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                          }}
                        ></label>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="ujian-content-footer w-100 p-md-4 p-3 position-fixed bg-very-soft-secondary"
            style={{ bottom: "0", left: "0", zIndex: "101" }}
          >
            <div className="container d-flex flex-column align-items-strech">
              <div className="d-flex justify-content-end align-items-center">
                {/* <div className="d-flex justify-content-end mt-4">
                  <Button
                    state={buttonSimpanState}
                    variant="secondary"
                    idleText="Simpan sebagai draft"
                    onClick={handleSavePostData}
                  />
                  <Button
                    state={buttonPostState}
                    variant="primary"
                    idleText={isEdit ? "Edit Postingan" : "Posing"}
                    onClick={handlePostPostData}
                  />
                </div> */}
                <button
                  state={buttonSimpanState}
                  type="button"
                  className="btn btn-secondary btn-ss border border-light-secondary color-dark bg-white fw-bold me-3 mt-1 rounded-pill"
                  onClick={handleSavePostData}
                >
                  Draf
                </button>
                <ReactiveButton
                  buttonState={buttonPostState}
                  onClick={handlePostPostData}
                  color={"primary"}
                  idleText={isEdit ? "Edit Postingan" : "Posting"}
                  loadingText={"Diproses"}
                  successText={"Berhasil"}
                  errorText={"Gagal"}
                  type={"button"}
                  data-bs-dismiss="modal"
                  className={
                    "btn btn-primary btn-ss btn-primary-ss bg-gradient-primary shadow-primary-ss rounded-pill fw-bold fs-6"
                  }
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateEditPost;
