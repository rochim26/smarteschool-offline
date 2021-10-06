import Axios from "axios";
import { useState } from "react";
import {
  FaFile,
  FaFilePdf,
  FaLink,
  FaPaperclip,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import LampiranSkeleton from "../../Shared/Skeleton/LampiranSkeleton";
import { editMateriKesimpulan } from "../../../client/MateriClient";
import { editTopik } from "../../../client/TopikClient";
import useUser from "../../../hooks/useUser";
import { checkEditorType } from "../../../utilities/EditorUtils";
import { isValidUrl, momentPackage } from "../../../utilities/HelperUtils";
import Editor from "../../Shared/Editor/Editor";
import TextareaAutosize from "react-textarea-autosize";
import { hideModal } from "../../../utilities/ModalUtils";
import InputFile from "../../Shared/InputFile/InputFile";

const TopikComponent = ({
  formData,
  setFormData,
  topik,
  postMateriKesimpulanData,
  getDetailTopikData,
  topikId,
}) => {
  const [buttonState, setButtonState] = useState("idle");
  const [buttonKesimpulanState, setButtonKesimpulanState] = useState("idle");
  const [tautanLink, setTautanLink] = useState("");
  const [loading, setLoading] = useState(false);
  const listAttachment = [...formData.lampiran, ...formData.link];
  const { user } = useUser();
  const [kesimpulanSuccess, setKesimpulanSuccess] = useState(null);

  const handlePutTopikData = async () => {
    setButtonState("loading");
    const payload = {
      ...formData,
      konten: checkEditorType(window.$(`#editorKonten`).summernote("code")),
    };
    const { data } = await editTopik(payload, topikId);
    if (data) {
      toast.success(data?.message);
      setButtonState("success");
    } else {
      setButtonState("error");
    }
  };

  const [kesimpulan, setKesimpulan] = useState(
    topik?.materiKesimpulan?.kesimpulan
  );

  const handlePutMateriKesimpulanData = async () => {
    setButtonKesimpulanState("loading");
    if (!kesimpulan) {
      setButtonKesimpulanState("error");
      toast.error("anda belum menulis kesimpulan");
      return;
    }
    const payload = {
      mTopikId: topikId,
      kesimpulan: kesimpulan,
      waktuSelesai: momentPackage().format("YYYY-MM-DD HH:mm:ss"),
    };
    const data = await editMateriKesimpulan(payload, topikId);
    if (data) {
      setKesimpulanSuccess("Data berhasil disimpan!");
      setButtonKesimpulanState("success");
    } else {
      setButtonKesimpulanState("error");
    }
  };

  const handlePostLink = () => {
    if (isValidUrl(tautanLink)) {
      setFormData({
        ...formData,
        link: [...formData.link, tautanLink],
      });
      setTautanLink("");
      toast.success("Berhasil menambahkan link");
      hideModal("modalTautanLink");
    } else {
      toast.error("Harap masukkan url yang valid");
    }
  };

  const handleChangeInputFile = (e, data) => {
    if (data) {
      setFormData({
        ...formData,
        lampiran: [...formData.lampiran, data],
      });
    }
  }

  return (
    <div className="topik-component">
      {user?.role == "siswa" && (
        <p
          className="color-secondary dangerous-html"
          dangerouslySetInnerHTML={{
            __html: topik?.konten,
          }}
        ></p>
      )}

      {user?.role == "guru" && (
        <div>
          <Editor id="editorKonten" defaultValue={topik?.konten} />
          <div className="divider"></div>
        </div>
      )}

      <div className="lampiran-materi mt-4">
        <div className="d-flex justify-content-between align-items-sm-center flex-sm-row flex-column">
          <h6 className="color-dark fw-bold fs-18-ss">Lampiran Materi</h6>
          {user?.role == "guru" && (
            <div className="d-flex align-items-sm-center flex-sm-row flex-column">
              <label
                htmlFor="inputGuruLampiranMateri"
                className="d-flex align-items-center justify-content-center form-label m-0 fs-12-ss fw-bold btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill me-sm-3 mb-sm-0 mb-3"
              >
                <FaPaperclip className="me-2" />
                <p className="mb-0">Unggah File</p>
              </label>

              {/* </label> */}
              <InputFile
                name="inputGuruLampiranMateri"
                id="inputGuruLampiranMateri"
                onChange={handleChangeInputFile}
              />
              {/* <!-- Button Trigger Modal Tautan Link Start --> */}

              <button
                type="button"
                className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fs-12-ss fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#modalTautanLink"
              >
                <FaLink className="me-2" />
                Tautan Link
              </button>

              {/* <!-- Button Trigger Modal Tautan Link End --> */}
            </div>
          )}
        </div>
        <div className="mt-4"></div>
        {!loading && listAttachment?.length === 0 && (
          <p>Tidak ada lampiran atau unggahan</p>
        )}
        {loading && <LampiranSkeleton />}
        {!loading &&
          listAttachment?.map((d, idx) => {
            if (user?.role == "siswa") {
              return (
                <a
                  key={idx}
                  href={`${isValidUrl(d) ? d : `${d}`}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <div className="bg-soft-primary p-3 rounded-ss mb-3">
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
                        <p className="fw-bold color-dark mb-1">{d}</p>
                      </div>
                    </div>
                  </div>
                </a>
              );
            }
            return (
              <div
                className="card-lampiran-materi border-light-secondary rounded-ss mb-3"
                key={idx}
              >
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
                      href={`${isValidUrl(d) ? d : `${d}`}`}
                      className="btn btn-sm btn-outline-secondary me-3 btn-pratinjau-file rounded-pill fs-12-ss fw-bold d-flex align-items-center justify-content-center"
                    >
                      Pratinjau
                    </a>
                    <a
                      className="btn"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          lampiran: formData.lampiran.filter((e) => e != d),
                          link: formData.link.filter((e) => e != d),
                        })
                      }
                    >
                      <FaTimes className="text-secondary" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}

        {user?.role == "siswa" && (
          <div>
            <p className="fs-18-ss fw-bold mt-4">
              Kesimpulan {kesimpulanSuccess && `(${kesimpulanSuccess})`}
            </p>
            <TextareaAutosize
              className="form-control"
              autoComplete="off"
              name="kesimpulan"
              style={{
                resize: "none",
                width: "100%",
              }}
              placeholder="Tuliskan kesimpulan materi.."
              minRows={3}
              onChange={({ target }) => setKesimpulan(target.value)}
              value={kesimpulan}
              onPaste={(e) => e.preventDefault()}
              onDrop={(e) => e.preventDefault()}
            />
          </div>
        )}
      </div>
      <div className="d-flex justify-content-end mt-4">
        {user?.role == "guru" && (
          <ReactiveButton
            buttonState={buttonState}
            onClick={handlePutTopikData}
            color={"primary"}
            idleText={"Simpan"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            className={
              "btn btn-primary rounded-pill fs-14-ss fw-bolder py-2 px-4 d-flex align-items-center bg-gradient-primary"
            }
          />
        )}
        {user?.role == "siswa" && (
          <ReactiveButton
            buttonState={buttonKesimpulanState}
            onClick={handlePutMateriKesimpulanData}
            color={"primary"}
            idleText={"Simpan"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            className={
              "btn btn-primary rounded-pill fs-14-ss fw-bolder py-2 px-4 d-flex align-items-center bg-gradient-primary"
            }
          />
        )}
      </div>
      <div
        className="modal modal-ss fade"
        id="modalTautanLink"
        tabIndex="-1"
        aria-labelledby="modalTautanLink"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title fw-extrabold">Tambah Link</h4>
              <button
                type="button"
                className="btn-close"
                onClick={() => hideModal("modalTautanLink")}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-4">
                <label className="form-label">Alamat Link</label>
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  placeholder="Contoh:http://getsmartschool.id"
                  onChange={(e) => setTautanLink(e.target.value)}
                  value={tautanLink}
                />
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <div className="row w-100">
                <div className="col-6 ps-0">
                  <button
                    type="button"
                    className="btn btn-secondary w-100"
                    data-bs-dismiss="modal"
                  >
                    Batal
                  </button>
                </div>
                <div className="col-6 pe-0">
                  <button
                    type="button"
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                    onClick={handlePostLink}
                  >
                    Tambah
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopikComponent;
