import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";
import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const ModalEditRoleAnggota = ({
  handleChangeFormCheck,
  formData,
  handleSubmit,
  handleChangeSelect,
}) => {
  const roles = formData?.roles;
  const jobs = formData?.jobs;

  return (
    <>
      <NewModal
        modalId="modalEditRoleAnggota"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">Edit Peran Anggota</h4>
            <span className="fs-6 fw-normal">
              Dibawah ini adalah Peran-peran yang ada
            </span>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Peran</label>
              <SelectShared
                name="role"
                handleChangeSelect={handleChangeSelect}
                value={formData?.role}
                options={
                  formData.roles
                    ? roles
                        ?.filter((d) => d.label !== "Pemilik")
                        .map((d, idx) => {
                          return { value: d.label, label: d.label };
                        })
                    : []
                }
              />
            </div>

            <div className="mb-4">
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
                {formData.jobs
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

export default ModalEditRoleAnggota;
