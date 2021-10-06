import { useState } from "react";
import useUser from "../../hooks/useUser";
import { postProfilUser } from "../../client/AuthClient";
import { toast } from "react-toastify";

const SectionUbahEmail = ({ isReadOnly = false }) => {
  const { user, setUser } = useUser();

  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const { data, error } = await postProfilUser({ email: email });
    if (data) {
      toast.success(data?.message);
      setUser({ ...user, email: email });
    } else {
      toast.error(error?.message);
    }
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card card-ss">
              <div className="card-header-ss p-4 pb-0 fw-extrabold color-dark">
                <h4 className="m-0">Ubah Alamat Email</h4>
              </div>

              <div className="card-body px-4 pb-0">
                <div>
                  <label className="form-label">Alamat Email</label>
                  <input
                    className="form-control mb-2 color-dark"
                    id="passwordLama"
                    value={user?.email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Masukkan alamat email"
                  />

                  <h6 className="fw-semibold color-secondary mt-4">
                    Email akan berubah ketika Anda sudah menekan link verifikasi
                  </h6>
                </div>
              </div>
              <div className="card-footer-ss">
                <div className="container p-4">
                  <div className="row ">
                    <div className="col-md-12 d-flex justify-content-md-end flex-md-row flex-column">
                      <button
                        type="button"
                        className="btn btn-ss btn-primary bg-gradient-primary rounded-pill shadow-primary-ss fw-bold"
                        onClick={handleSubmit}
                      >
                        Ubah Alamat Email
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

export default SectionUbahEmail;
