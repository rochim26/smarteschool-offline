import React from "react";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";

const ModalJobdesk = ({ setFormData, formData, handleSubmit }) => {
  const onSubmitJobdesk = () => {
    setFormData({
      ...formData,
      job: "",
    });
    handleSubmit(formData);
  };
  return (
    <>
      <NewModal
        modalId="modalJobdesk"
        modalSize="md"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">
              {formData?.type == "edit" ? "Edit" : "Buat"} Jobdesk Baru
            </h4>
          </>
        }
        content={
          <>
            <div className="mb-4">
              <label className="form-label">Nama Jobdesk</label>
              <input
                className="form-control"
                autoComplete="off"
                placeholder="Contoh : Project Manager"
                type="text"
                name="job"
                id="job"
                value={formData?.job}
                onChange={(event) =>
                  setFormData({ ...formData, job: event.target.value })
                }
              />
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
            onClick={() => onSubmitJobdesk()}
          />
        }
      />
    </>
  );
};

export default ModalJobdesk;
