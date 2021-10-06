import React from "react";
import ReactiveButton from "reactive-button";
import NewModal from "../Shared/NewModal/NewModal";
import SelectShared from "../Shared/SelectShared/SelectShared";

const ModalEditRole = ({
  handleChangeFormCheck,
  handleChangeSelect,
  formData,
  handleSubmit,
}) => {
  const permissions = {
    Proyek: ["Edit_Proyek", "Delete_Proyek"],
    AnggotaProyek: ["Undang_Anggota", "Kick_Anggota"],
    PostinganProyek: ["Buat_Postingan", "Edit_Postingan", "Delete_Postingan"],
    Kategori: ["Buat_Kategori", "Edit_Kategori", "Delete_Kategori"],
    Pekerjaan: [
      "Buat_Pekerjaan",
      "Edit_Pekerjaan",
      "Delete_Pekerjaan",
      "Drag_Pekerjaan",
    ],
    JobDesk: ["Buat_Jobdesk", "Delete_Jobdesk"],
  };
  return (
    <>
      <NewModal
        modalId="modalEditRole"
        modalSize="lg"
        title={
          <>
            <h4 className="mb-1 fw-extrabold">
              {formData?.role ? "Edit" : "Buat"} Akses
            </h4>
            <span className="fs-6 fw-normal">
              {formData.type !== "delete"
                ? "Dibawah ini adalah Izin-izin yang ada"
                : "Buatlah Peran Baru Untuk mengganti peran pengguna"}
            </span>
          </>
        }
        content={
          <>
            <div className="mb-3">
              {formData.type == "delete" && (
                <>
                  <div className="mb-4">
                    <label className="form-label">Izin yang dihapus</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData?.roleBefore}
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">
                      Peran baru untuk user dengan peran {formData.roleBefore}
                    </label>
                    <SelectShared
                      name="role"
                      handleChangeSelect={handleChangeSelect}
                      value={formData?.role}
                      options={
                        formData.roles
                          ? formData.roles
                              ?.filter(
                                (d) =>
                                  d.label !== "Pemilik" &&
                                  d.label !== formData.roleBefore
                              )
                              .map((d, idx) => {
                                return { label: d.label, value: d.label };
                              })
                          : []
                      }
                    />
                  </div>
                </>
              )}
              {formData.type !== "delete" && (
                <>
                  <div className="mb-4">
                    <label className="form-label">Nama Akses</label>
                    <input
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      placeholder="Contoh : Mentor"
                      value={formData?.role}
                      name="role"
                      onChange={(event) => handleChangeFormCheck(event)}
                      disabled={formData?.role == "Anggota" ? 1 : 0}
                    />
                  </div>
                  <p className="fs-18-ss fw-bold color-dark">Hak Akses</p>
                  <div>
                    {formData.type !== "delete" && (
                      <h5 className="fw-extrabold color-dark fs-14-ss">
                        Proyek
                      </h5>
                    )}
                    <div className="d-flex row">
                      {formData.permissions
                        ? permissions?.Proyek.map((d, idx) => {
                            return (
                              <div class="col-md-6 form-check d-flex">
                                <input
                                  class="form-check-input"
                                  name={d}
                                  type="checkbox"
                                  value={
                                    formData?.permissions[d]
                                      ? formData?.permissions[d]
                                      : 0
                                  }
                                  id={"proyek" + idx}
                                  onChange={(event) =>
                                    handleChangeFormCheck(event)
                                  }
                                  checked={
                                    formData?.permissions[d]
                                      ? formData?.permissions[d]
                                      : 0
                                  }
                                  style={{
                                    marginLeft: "-12px",
                                  }}
                                />
                                <label
                                  class="form-check-label fw-bold fs-14-ss color-secondary"
                                  for={"proyek" + idx}
                                  style={{
                                    marginLeft: "14px",
                                  }}
                                >
                                  {/* {d.replace("_", " ")} */}
                                  {d == "Edit_Proyek"
                                    ? `Mengubah informasi proyek`
                                    : `Menghapus  proyek `}
                                </label>
                              </div>
                            );
                          })
                        : ""}
                    </div>
                  </div>
                  <hr className="my-3" />
                  <div>
                    {formData.type !== "delete" && (
                      <h5 className="fw-extrabold color-dark fs-14-ss">
                        Anggota Proyek
                      </h5>
                    )}
                    <div className="d-flex row">
                      {formData.permissions
                        ? permissions?.AnggotaProyek.map((d, idx) => {
                            return (
                              <div class="col-md-6 form-check d-flex">
                                <input
                                  class="form-check-input"
                                  name={d}
                                  type="checkbox"
                                  value={
                                    formData?.permissions[d]
                                      ? formData?.permissions[d]
                                      : 0
                                  }
                                  id={"anggota-proyek" + idx}
                                  onChange={(event) =>
                                    handleChangeFormCheck(event)
                                  }
                                  checked={
                                    formData?.permissions[d]
                                      ? formData?.permissions[d]
                                      : 0
                                  }
                                  style={{
                                    marginLeft: "-12px",
                                  }}
                                />
                                <label
                                  class="form-check-label fw-bold fs-14-ss color-secondary"
                                  for={"anggota-proyek" + idx}
                                  style={{
                                    marginLeft: "14px",
                                  }}
                                >
                                  {/* {d.replace("_", " ")} */}
                                  {d == "Undang_Anggota"
                                    ? `Mengundang anggota ke proyek`
                                    : `Menghapus  anggota dari proyek `}
                                </label>
                              </div>
                            );
                          })
                        : ""}
                    </div>
                  </div>
                  <hr className="my-3" />
                  <div>
                    {formData.type !== "delete" && (
                      <h5 className="fw-extrabold color-dark fs-14-ss">
                        Postingan Proyek
                      </h5>
                    )}
                    <div className="d-flex row">
                      {formData.permissions
                        ? permissions?.PostinganProyek.map((d, idx) => {
                            return (
                              <div class="col-md-6 form-check d-flex">
                                <input
                                  class="form-check-input"
                                  name={d}
                                  type="checkbox"
                                  value={
                                    formData?.permissions[d]
                                      ? formData?.permissions[d]
                                      : 0
                                  }
                                  id={"postingan-proyek" + idx}
                                  onChange={(event) =>
                                    handleChangeFormCheck(event)
                                  }
                                  checked={
                                    formData?.permissions[d]
                                      ? formData?.permissions[d]
                                      : 0
                                  }
                                  style={{
                                    marginLeft: "-12px",
                                  }}
                                />
                                <label
                                  class="form-check-label fw-bold fs-14-ss color-secondary"
                                  for={"postingan-proyek" + idx}
                                  style={{
                                    marginLeft: "14px",
                                  }}
                                >
                                  {/* {d.replace("_", " ")} */}
                                  {d == "Buat_Postingan"
                                    ? `Membuat postingan ke dalam proyek`
                                    : d == "Edit_Postingan"
                                    ? `Mengubah postingan di dalam proyek`
                                    : `Menghapus postingan dari proyek`}
                                </label>
                              </div>
                            );
                          })
                        : ""}
                    </div>
                  </div>
                  <hr className="my-3" />
                  <div>
                    {formData.type !== "delete" && (
                      <h5 className="fw-extrabold color-dark fs-14-ss">
                        Kategori Ruang Kerja
                      </h5>
                    )}
                    <div className="d-flex row">
                      {formData.permissions
                        ? permissions?.Kategori.map((d, idx) => {
                            return (
                              <div class="col-md-6 form-check d-flex">
                                <input
                                  class="form-check-input"
                                  name={d}
                                  type="checkbox"
                                  value={
                                    formData?.permissions[d]
                                      ? formData?.permissions[d]
                                      : 0
                                  }
                                  id={"kategori-proyek" + idx}
                                  onChange={(event) =>
                                    handleChangeFormCheck(event)
                                  }
                                  checked={
                                    formData?.permissions[d]
                                      ? formData?.permissions[d]
                                      : 0
                                  }
                                  style={{
                                    marginLeft: "-12px",
                                  }}
                                />
                                <label
                                  class="form-check-label fw-bold fs-14-ss color-secondary"
                                  for={"kategori-proyek" + idx}
                                  style={{
                                    marginLeft: "14px",
                                  }}
                                >
                                  {/* {d.replace("_", " ")} */}
                                  {d == "Buat_Kategori"
                                    ? `Membuat kategori pada ruang kerja`
                                    : d == "Edit_Kategori"
                                    ? `Mengubah kategori pada ruang kerja`
                                    : `Menghapus kategori dari ruang kerja`}
                                </label>
                              </div>
                            );
                          })
                        : ""}
                    </div>
                  </div>
                  <hr className="my-3" />
                  <div>
                    {formData.type !== "delete" && (
                      <h5 className="fw-extrabold color-dark fs-14-ss">
                        Pekerjaan
                      </h5>
                    )}
                    <div className="d-flex row">
                      {formData.permissions
                        ? permissions?.Pekerjaan.map((d, idx) => {
                            return (
                              <div class="col-md-6 form-check d-flex">
                                <input
                                  class="form-check-input"
                                  name={d}
                                  type="checkbox"
                                  value={
                                    formData?.permissions[d]
                                      ? formData?.permissions[d]
                                      : 0
                                  }
                                  id={"pekerjaan" + idx}
                                  onChange={(event) =>
                                    handleChangeFormCheck(event)
                                  }
                                  checked={
                                    formData?.permissions[d]
                                      ? formData?.permissions[d]
                                      : 0
                                  }
                                  style={{
                                    marginLeft: "-12px",
                                  }}
                                />
                                <label
                                  class="form-check-label fw-bold fs-14-ss color-secondary"
                                  for={"pekerjaan" + idx}
                                  style={{
                                    marginLeft: "14px",
                                  }}
                                >
                                  {/* {d.replace("_", " ")} */}
                                  {d == "Buat_Pekerjaan"
                                    ? `Membuat pekerjaan pada ruang kerja`
                                    : d == "Edit_Pekerjaan"
                                    ? `Mengubah pekerjaan pada ruang kerja`
                                    : d == "Drag_Pekerjaan"
                                    ? `Melakukan Drag Drop pekerjaan pada ruang kerja`
                                    : `Menghapus pekerjaan dari ruang kerja`}
                                </label>
                              </div>
                            );
                          })
                        : ""}
                    </div>
                  </div>

                  <hr className="my-3" />
                  <div>
                    {formData.type !== "delete" && (
                      <h5 className="fw-extrabold color-dark fs-14-ss">
                        Jobdesk
                      </h5>
                    )}
                    <div className="d-flex row">
                      {formData.permissions
                        ? permissions?.JobDesk.map((d, idx) => {
                            return (
                              <div class="col-md-6 form-check d-flex">
                                <input
                                  class="form-check-input"
                                  name={d}
                                  type="checkbox"
                                  value={
                                    formData?.permissions[d]
                                      ? formData?.permissions[d]
                                      : 0
                                  }
                                  id={"jobdesk" + idx}
                                  onChange={(event) =>
                                    handleChangeFormCheck(event)
                                  }
                                  checked={
                                    formData?.permissions[d]
                                      ? formData?.permissions[d]
                                      : 0
                                  }
                                  style={{
                                    marginLeft: "-12px",
                                  }}
                                />
                                <label
                                  class="form-check-label fw-bold fs-14-ss color-secondary"
                                  for={"jobdesk" + idx}
                                  style={{
                                    marginLeft: "14px",
                                  }}
                                >
                                  {/* {d.replace("_", " ")} */}
                                  {d == "Buat_Jobdesk"
                                    ? `Membuat jobdesk pengelompokan anggota`
                                    : `Menghapus jobdesk pengelompokan anggota`}
                                </label>
                              </div>
                            );
                          })
                        : ""}
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        }
        submitButton={
          <ReactiveButton
            buttonState={formData.button}
            color={"primary"}
            idleText={formData?.type == "delete" ? "delete" : "Simpan"}
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

export default ModalEditRole;
