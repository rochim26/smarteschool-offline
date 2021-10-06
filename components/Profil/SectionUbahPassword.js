import { FaPen, FaPlus } from "react-icons/fa";
import { useState } from "react";
import useUser from "../../hooks/useUser";
import { toast } from "react-toastify";
import { changePassword } from "../../client/sharedClient";

const SectionUbahPassword = ({ isReadOnly = false }) => {
  const initialFormData = {
    konfirmasiPassword: "",
    passwordBaru: "",
    passwordLama: "",
    lihatPasswordLama: false,
    lihatPasswordBaru: false,
    lihatKonfirmasiPassword: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  
  const handleChangePassword = (e) => {
    const checkbox = [
      "lihatPasswordLama",
      "lihatPasswordBaru",
      "lihatKonfirmasiPassword",
    ];

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    if (checkbox.includes(e.target.id)) {
      setFormData({
        ...formData,
        [e.target.id]: !formData[e.target.id],
      });
    }
  };

  const handleSubmit = async () => {
    const { data, error } = await changePassword(formData);
    if (data) {
      toast.success(data?.message);
    } else {
      toast.error(error?.message);
    }
  }
  return (
    <>
      <div className="container">
        <div className="row justify-content-center gy-4">
          <div className="col-md-12">
            <div className="card card-ss">
              <div className="card-header-ss p-4 pb-0 fw-extrabold color-dark">
                <h4 className="m-0">Ubah Password</h4>
              </div>
              <div className="card-body p-4 pb-0">
                <div className="mb-4">
                  <label className="form-label">Password Lama</label>
                  <input
                    className="form-control mb-2"
                    id="passwordLama"
                    placeholder="Masukkan Password Lama"
                    value={formData.passwordLama}
                    onChange={(e) => handleChangePassword(e)}
                    type={
                      formData.lihatPasswordLama
                        ? "text"
                        : "password"
                    }
                  />
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="lihatPasswordLama"
                      onChange={(e) => handleChangePassword(e)}
                    />
                    <label
                      className="form-check-label fs-14-ss color-secondary fw-semibold"
                      htmlFor="lihatPasswordLama"
                    >
                      Tampilkan password
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label">Password Baru</label>
                  <input
                    className="form-control mb-2"
                    id="passwordBaru"
                    placeholder="Masukkan Password Baru"
                    value={formData.passwordBaru}
                    onChange={(e) => handleChangePassword(e)}
                    type={
                      formData.lihatPasswordBaru
                        ? "text"
                        : "password"
                    }
                  />
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="lihatPasswordBaru"
                      onChange={(e) => handleChangePassword(e)}
                    />
                    <label
                      className="form-check-label fs-14-ss color-secondary fw-semibold"
                      htmlFor="lihatPasswordBaru"
                    >
                      Tampilkan password
                    </label>
                  </div>
                </div>
                <div>
                  <label className="form-label">Konfirmasi Password Baru</label>
                  <input
                    className={`form-control mb-2 ${
                      formData.passwordBaru !==
                      formData.konfirmasiPassword
                        ? "form-konfirmasi-salah"
                        : ""
                    }`}
                    id="konfirmasiPassword"
                    placeholder="Konfirmasi Password Baru"
                    value={formData.konfirmasiPassword}
                    onChange={(e) => handleChangePassword(e)}
                    type={
                      formData.lihatKonfirmasiPassword
                        ? "text"
                        : "password"
                    }
                  />
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="lihatKonfirmasiPassword"
                      onChange={(e) => handleChangePassword(e)}
                    />
                    <label
                      className="form-check-label fs-14-ss color-secondary fw-semibold"
                      htmlFor="lihatKonfirmasiPassword"
                    >
                      Tampilkan password
                    </label>
                  </div>
                </div>
              </div>
              <div className="card-footer-ss">
                <div className="container p-4 ">
                  <div className="row ">
                    <div className="col-md-12 d-flex justify-content-md-end flex-md-row flex-column">
                      <button
                        type="button"
                        className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold"
                        onClick={handleSubmit}
                      >
                        Ubah Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionUbahPassword;
