import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import AsyncSelect from "react-select/async";
import ReactiveButton from "reactive-button";
import SignaturePad from "signature_pad";
import { storage } from "../../config/config";
import Editor from "../Shared/Editor/Editor";
import NewModal from "../Shared/NewModal/NewModal";
import UploadBukuTamu from "../Shared/UploadBanner/UploadBukuTamu";

const ModalDisposisi = ({
  userGuru,
  handleChangeForm,
  formData,
  _postDisposisi,
  loadNewUser,
}) => {
  const [usingSignature, setUsingSignature] = useState(null);
  const [signaturePad, setSignaturePad] = useState();
  const startDraw = () => {
    const canvas = document.getElementById("canvasnya");
    const signature = new SignaturePad(canvas);
    setSignaturePad(signature);
  };

  const clear = () => {
    signaturePad.clear();
  };
  const ttdimage = async () => {
    const ttdFile = new Date().getTime();
    const ttdImage = signaturePad.toDataURL();
    console.log(ttdImage);
    const blob = dataURItoBlob(ttdImage);
    const upload = await storage.child(`tdd-img-${ttdFile}.png`).put(blob);
    const url = await storage
      .child(`tdd-img-${ttdFile}.png`)
      .getDownloadURL()
      .then((url) =>
        handleChangeForm({
          target: { name: "ttd", value: [url] },
        })
      );
    // document.getElementById("ttd").appendChild(image);
  };

  const handleSubmit = () => {
    // if (usingSignature) {
    //   handleChangeForm({ target: { name: "file", value: ttdimage() } });
    // }
    _postDisposisi();
  };

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  useEffect(() => {
    if (usingSignature) startDraw();
  }, [usingSignature]);

  return (
    <>
      <NewModal
        modalId="modalDisposisi"
        modalSize="lg"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Lembar Disposisi</h4>
            <span className="fs-6 fw-normal">
              Isi informasi dibawah untuk membuat lembar disposisi
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Disposisikan Kepada </label>
              <AsyncSelect
                type="text"
                placeholder="Pilih Tujuan Disposisi"
                value={formData.userId}
                onChange={(value) =>
                  handleChangeForm({ target: { name: "userId", value: value } })
                }
                defaultOptions={userGuru}
                loadOptions={loadNewUser}
                cacheOptions
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Isi Ringkasan Surat</label>
              <Editor id="isi2" />
            </div>

            <div className="mb-4">
              <h6 className="fs-18-ss fw-bold color-dark mb-3">Penanganan</h6>
              <div className="row">
                <div className="form-check-ss col-md-4 position-relative mb-3 mb-md-0">
                  <input
                    className="form-check-input form-check-radio position-absolute"
                    type="radio"
                    id="sangat-segera"
                    style={{
                      top: "36%",
                      left: "2em",
                    }}
                    name="penanganan"
                    value="Sangat Segera"
                    checked={formData.penanganan == "Sangat Segera"}
                    onChange={handleChangeForm}
                  />
                  <label
                    className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="sangat-segera"
                  >
                    <span className="ms-4 ps-2">Sangat Segera</span>
                  </label>
                </div>
                <div className="form-check-ss col-md-4 position-relative mb-3 mb-md-0">
                  <input
                    className="form-check-input form-check-radio position-absolute"
                    type="radio"
                    id="segera"
                    style={{
                      top: "36%",
                      left: "2em",
                    }}
                    value="Segera"
                    name="penanganan"
                    checked={formData.penanganan == "Segera"}
                    onChange={handleChangeForm}
                  />
                  <label
                    className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="segera"
                  >
                    <span className="ms-4 ps-2">Segera</span>
                  </label>
                </div>
                <div className="form-check-ss col-md-4 position-relative">
                  <input
                    className="form-check-input form-check-radio position-absolute"
                    type="radio"
                    id="penanganan-biasa"
                    style={{
                      top: "36%",
                      left: "2em",
                    }}
                    value="Biasa"
                    name="penanganan"
                    checked={formData.penanganan == "Biasa"}
                    onChange={handleChangeForm}
                  />
                  <label
                    className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="penanganan-biasa"
                  >
                    <span className="ms-4 ps-2">Biasa</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Tanggal Surat</label>
              <DatePicker
                className="form-control"
                autoComplete="off"
                value={formData?.tanggal}
                placeholder="Pilih tanggal"
                onChange={(date, dateString) =>
                  handleChangeForm({ target: { name: "tanggal", value: date } })
                }
              />
            </div>
            <div>
              <label className="form-label">Tanda Tangan</label>
              <div className="row mb-4">
                <div className="form-check-ss col-md-6 position-relative mb-3 mb-md-0">
                  <input
                    className="form-check-input form-check-radio position-absolute"
                    type="radio"
                    id="usingFile"
                    style={{
                      top: "36%",
                      left: "2em",
                    }}
                    name="ttd"
                    checked={!usingSignature}
                    onClick={() => setUsingSignature(false)}
                  />
                  <label
                    className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="usingFile"
                  >
                    <span className="ms-4 ps-2 ">Unggah File Tanda Tangan</span>
                  </label>
                </div>
                <div className="form-check-ss col-md-6 position-relative">
                  <input
                    className="form-check-input form-check-radio position-absolute"
                    type="radio"
                    id="usingSignature"
                    style={{
                      top: "36%",
                      left: "2em",
                    }}
                    name="ttd"
                    checked={usingSignature}
                    onClick={() => setUsingSignature(true)}
                  />
                  <label
                    className="form-check-label rounded-ss w-100 border border-light-secondary-ss p-3"
                    htmlFor="usingSignature"
                  >
                    <span className="ms-4 ps-2">Tanda Tangan Manual</span>
                  </label>
                </div>
              </div>
              <div>
                {usingSignature ? (
                  <div className="position-relative" id="ttdCanvasLoc">
                    <div
                      onClick={() => {
                        clear();
                      }}
                      className="rounded-circle template-rapor-buku-induk d-flex justify-content-center align-items-center bg-secondary pointer position-absolute hapus-signature"
                      style={{
                        width: "30px",
                        height: "30px",
                        right: " 10px",
                        top: "10px",
                      }}
                    >
                      <FaTrashAlt color="white" />
                    </div>
                    <div
                      onClick={() => {
                        ttdimage();
                      }}
                      className="rounded-circle template-rapor-buku-induk d-flex justify-content-center align-items-center bg-secondary pointer position-absolute hapus-signature"
                      style={{
                        width: "30px",
                        height: "30px",
                        right: " 10px",
                        top: "10px",
                      }}
                    >
                      <FaCheck color="white" />
                    </div>
                    {/* <a
                        className="dropdown-item color-danger"
                        onClick={() => {
                          ttdimage();
                        }}
                      >
                        <FaTrashAlt className="me-2" />
                        <span>image</span>
                      </a>
                     
                       */}
                    <canvas
                      id="canvasnya"
                      height={113}
                      width={
                        document.getElementById("ttdCanvasLoc")?.offsetWidth
                      }
                      style={{
                        border: "1px solid #E1E1E7",
                      }}
                      className="rounded-ss border-light-secondary-ss"
                    ></canvas>
                  </div>
                ) : (
                  <UploadBukuTamu
                    accept="image/*"
                    id="ttd"
                    name="file"
                    titleUnggahan="file"
                    preview={formData.file}
                    onUpload={(onUpload) =>
                      handleChangeForm({
                        target: {
                          name: "btnBio",
                          value: onUpload ? "loading" : "idle",
                        },
                      })
                    }
                    onChange={(e, uploadedFile) =>
                      handleChangeForm({
                        target: {
                          name: "file",
                          value: [uploadedFile],
                        },
                      })
                    }
                  />
                )}
              </div>
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={formData.btnBio}
            color={"primary"}
            idleText={"Disposisi"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            data-bs-dismiss="modal"
            className={"btn btn-primary"}
            onClick={() => handleSubmit()}
          />
        }
      />
    </>
  );
};

export default ModalDisposisi;
