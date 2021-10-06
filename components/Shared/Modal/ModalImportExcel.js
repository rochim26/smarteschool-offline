import React, { useState } from "react";
import ReactiveButton from "reactive-button";
import NewModal from "../NewModal/NewModal";
import UploadBanner from "../UploadBanner/UploadBanner";
import { toast } from "react-toastify";
import axios from "axios";
import { baseURL } from "../../../client/clientAxios";

const ModalImportExcel = ({
  name, bgImg, fileTemplate, endpointUrl
}) => {

  const initialStateForm = {
    file: "",
    btnImport: "idle",
  };

  const [formData, setFormData] = useState({
    ...initialStateForm,
  });

  const _importRombel = async () => {
    setFormData({ ...formData, btnImport: "loading" });

    var fd = new FormData();
    for (var key in formData) {
      fd.append(key, formData[key]);
    }

    const { data, error } = await axios.post(`${baseURL}/${endpointUrl}`, fd);

    if (data) {
      setFormData({ ...initialStateForm, btnImport: "success" });
      toast.success(data?.message);
    } else {
      setFormData({ ...initialStateForm, btnImport: "error" });
      toast.error(error?.message);
    }
  };

  const handleClickSubmit = () => {
    _importRombel();
  };

  const handleChangeForm = (e, uploadedFile) => {
    setFormData({
      ...formData,
      [e.target.name]: uploadedFile || e.target.value,
    });
  };

  return (
    <NewModal
      modalId="ModalImportExcel"
      title={
        <>
          <h4 className="mb-1 fw-extrabold">Konfirmasi Pembayaran</h4>
          <span className="fs-6 fw-normal">
            Isi informasi dibawah untuk konfirmasi pembayaran
          </span>
        </>
      }
      content={
        <>
          <div className="card card-ss">
            <div
              className="card-header-ss p-4"
              style={{
                minHeight: "155px",
                background: `url(${bgImg}), white`,
                backgroundPosition: "right, bottom",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              {" "}
              <h3 className="fw-extrabold color-dark">Import {name}</h3>
              <h6 className="fw-semibold">
                Download template file untuk mengimport data{" "}
                <span className="text-lowercase"> {name}</span>.
              </h6>
            </div>
            <div className="card-body p-4">
              <div className="mb-4">
                <h6 className="color-dark fw-semibold mb-2">
                  Download template file untuk mengimport data{" "}
                  <span className="text-lowercase">{name}</span>
                </h6>
                <a href={fileTemplate} target="_blank">
                  <div className="w-100 bg-soft-primary border border-primary d-flex align-items-center justify-content-center p-4 rounded-ss">
                    <img src="/img/icon-file-download.svg" alt="" />
                    <p className="fs-18-ss color-secondary fw-semibold ms-4 mb-0">
                      Klik untuk mengunduh{" "}
                      <span className="color-primary fw-bold">
                        Template File Import {name}
                      </span>
                    </p>
                  </div>
                </a>
              </div>
              <UploadBanner
                label="Import"
                titleUnggahan={`File Import ${name}`}
                id="file"
                name="file"
                preview={formData.file}
                onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
                isFile={true}
                onClick={() => setFormData({ ...formData, file: "" })}
                isImport={true}
              />
            </div>
          </div>
        </>
      }
      submitButton={
        <ReactiveButton
          buttonState={"idle"}
          onClick={handleClickSubmit}
          color={"primary"}
          idleText={"Submit"}
          loadingText={"Diproses"}
          successText={"Berhasil"}
          errorText={"Gagal"}
          type={"button"}
          data-bs-dismiss="modal"
          className={"btn btn-primary"}
        />
      }
    />
  );
};

export default ModalImportExcel;
