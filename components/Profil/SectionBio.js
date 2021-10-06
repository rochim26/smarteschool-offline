import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { toast } from "react-toastify";
import { postProfilUser } from "../../client/AuthClient";
import useUser from "../../hooks/useUser";
import { hideModal } from "../../utilities/ModalUtils";
import ModalEditBio from "../Profil/ModalEditBio";

const SectionBio = ({ isReadOnly = false, data }) => {
  const initialStateForm = {
    bio: "",
    btnBio: "idle",
  };

  const { user, setUser } = data || useUser();

  const [formData, setFormData] = useState({
    ...initialStateForm,
    ...user,
    ...user?.profil,
  });

  const _postProfilUser = async () => {
    setFormData({ ...formData, btnBio: "loading" });
    const { data, error } = await postProfilUser({ bio: formData.bio });

    if (data) {
      setFormData({ ...formData, btnBio: "success" });
      hideModal("modalEditBio");
      toast.success(data?.message);
      setUser({ ...user, profil: { ...user.profil, bio: formData.bio } });
    } else {
      setFormData({ ...formData, btnBio: "error" });
      toast.error(error?.message);
    }
  };

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="card card-ss">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-extrabold color-dark mb-0">Bio</h4>
            {!isReadOnly && (
              <button
                type="button"
                className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center p-1"
                style={{
                  width: "40px",
                  height: "40px",
                }}
                data-bs-toggle="modal"
                data-bs-target="#modalEditBio"
                // onClick={() => onClickEdit(slider)}
                // data-joyride="edit-slider"
              >
                <FaPen className="color-secondary fs-5" />
              </button>
            )}
          </div>
          <p className="fs-18-ss fw-semibold">{user?.profil?.bio || "-"}</p>
        </div>
      </div>
      <ModalEditBio
        handleChangeForm={handleChangeForm}
        formData={formData}
        _postProfilUser={_postProfilUser}
      />
    </>
  );
};

export default SectionBio;
