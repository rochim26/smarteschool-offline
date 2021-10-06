import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import { hideModal } from "../../utilities/ModalUtils";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const ModalDitugaskan = ({
  handleChangeFormCheck,
  formData,
  jobs,
  anggota,
}) => {
  const handleSubmit = () => {
    hideModal("modalDitugaskan");
  };
  return (
    <>
      <NewModal
        modalId="modalDitugaskan"
        modalSize="sm"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Ditugaskan</h4>
          </>
        }
        content={
          <>
            <div className="mb-3">
              <label className="form-label">Anggota</label>
              <Select
                className="select-filter-proyek"
                mode="multiple"
                value={formData.anggota}
                placeholder="Pilih Anggota"
                style={{ width: "100%" }}
                onChange={(e) =>
                  handleChangeFormCheck({
                    target: { name: "anggota", value: e },
                  })
                }
                maxTagCount="responsive"
              >
                {anggota
                  ? anggota?.map((d, idx) => {
                      return <Option value={d.id}>{d.user.nama}</Option>;
                    })
                  : ""}
              </Select>
            </div>
            <div className="mb-3">
              <label className="form-label">Jobdesk</label>
              <Select
                className="select-filter-proyek"
                mode="multiple"
                value={formData.jobdesk}
                placeholder="Pilih Jobdesk"
                style={{ width: "100%" }}
                onChange={(e) =>
                  handleChangeFormCheck({
                    target: { name: "jobdesk", value: e },
                  })
                }
                maxTagCount="responsive"
              >
                {jobs
                  ? jobs?.map((d, idx) => {
                      return <Option value={d.id}>{d.name}</Option>;
                    })
                  : ""}
              </Select>
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            // buttonState={formData.button}
            color={"primary"}
            idleText={"Simpan"}
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

export default ModalDitugaskan;
