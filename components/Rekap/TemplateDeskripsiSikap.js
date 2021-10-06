import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import { editTemplateDeskripsi } from "../../client/RekapClient";
import useUser from "../../hooks/useUser";
import { hideModal } from "../../utilities/ModalUtils";
import ModalEditTemplateDeskripsi from "./ModalEditTemplateDeskripsi";

const TemplateDeskripsiSikap = ({ dataTemplateSikap }) => {
  const { user } = useUser();
  const initialValue = {
    id: "",
    judul: "",
    prolog: "",
    epilog: "",
    btnBio: "idle",
  };

  const [showInput, setShowInput] = useState(null);
  const [formData, setFormData] = useState(initialValue);

  const handleChangeForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setFormData({ ...formData, btnBio: "loading" });
    const { data, error } = await editTemplateDeskripsi(formData.id, {
      prolog: formData.prolog,
      epilog: formData.epilog,
    });

    if (data) {
      const index = dataTemplateSikap?.findIndex(
        (item) => item.id == formData.id
      );
      dataTemplateSikap[index].prolog = formData.prolog;
      dataTemplateSikap[index].epilog = formData.epilog;
      toast.success(data?.message);
      setFormData(initialValue);
      hideModal("modalEditTemplateDeskripsi");
    } else {
      toast.error(error.message);
      setFormData({ ...formData, btnBio: "error" });
    }
  };

  const template = dataTemplateSikap?.map((item) => {
    return {
      id: item.id,
      nilai: `${item.prolog}  [SIKAP_YANG_DITUNJUKKAN]. ${item.epilog} [SIKAP_PERLU_DITINGKATKAN].`,
    };
  });

  return (
    <div className="card card-ss">
      <div className="card-header p-4 card-header-ss">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="fw-extrabold color-dark mb-sm-0 mb-3">
            Daftar Template Deskripsi Sikap{" "}
          </h4>
          {/* {user?.role == "guru" && (
            <button
              type="button"
              className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold"
              data-bs-toggle="modal"
              data-bs-target="#modal-mata-pelajaran"
              onClick={() => {
                setEditId(null);
              }}
              data-joyride="btn-tambah-mapel"
            >
              <FaPlus /> Tambah
            </button>
          )} */}
        </div>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table-ss">
            <thead>
              <tr>
                <th className="d-flex justify-content-center"> Deskripsi</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {template?.map((d, idx) => {
                return (
                  <tr key={idx}>
                    <td data-th="Deksripsi" style={{ width: "80%" }}>
                      {showInput == d.id ? (
                        <div>
                          <TextareaAutosize
                            className="form-control"
                            // autoComplete="off"
                            style={{
                              width: "100%",
                            }}
                            minRows={2}
                            name="deskripsi"
                            defaultValue={d?.nilai}
                            // onChange={handleChangeForm}
                          />
                        </div>
                      ) : (
                        <p>{d?.nilai}</p>
                      )}
                    </td>
                    <td data-th="">
                      <a
                        onClick={() =>
                          setFormData(
                            dataTemplateSikap?.find((item) => item.id == d.id)
                          )
                        }
                        data-bs-toggle="modal"
                        data-bs-target="#modalEditTemplateDeskripsi"
                      >
                        <img
                          src={`/img/icon-edit-template-deskripsi.svg`}
                          alt="icon-option"
                        />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ModalEditTemplateDeskripsi
        formData={formData}
        handleChangeForm={handleChangeForm}
        handleSubmit={handleSubmit}
        tipe={0}
      />
    </div>
  );
};

export default TemplateDeskripsiSikap;
