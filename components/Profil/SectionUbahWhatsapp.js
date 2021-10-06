import { useState } from "react";
import useUser from "../../hooks/useUser";
import { toast } from "react-toastify";
import { postProfilUser } from "../../client/AuthClient";

const SectionUbahWhatsapp = ({ isReadOnly = false }) => {
  const { user, setUser } = useUser();

  const [whatsapp, setWhatsapp] = useState("");

  const handleSubmit = async () => {
    const { data, error } = await postProfilUser({ whatsapp: whatsapp });
    if (data) {
      toast.success(data?.message);
      setUser({ ...user, whatsapp: whatsapp });
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
                <h4 className="m-0">Ubah Nomor Whatsapp</h4>
              </div>

              <div className="card-body px-4 pb-0">
                <div>
                  <label className="form-label">Nomor Whatsapp</label>
                  <input
                    className="form-control mb-2 color-dark"
                    id="passwordLama"
                    defaultValue={user?.whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    type="text"
                  />
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
                        Ubah Nomor Whatsapp
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

export default SectionUbahWhatsapp;
