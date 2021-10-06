import TextareaAutosize from "react-textarea-autosize";

const SectionKontakSekolah = ({ formData, handleChangeForm }) => {
  return (
    <>
      <div
        className="card-body px-4 pt-4 pb-0 mb-5"
        data-joyride="kontak-sekolah"
      >
        <h4 className="fw-extrabold color-dark title-border mb-5">
          Kontak Sekolah
        </h4>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-4" data-joyride="alamat-sekolah">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Alamat Sekolah
              </label>
              <TextareaAutosize
                className="form-control"
                autoComplete="off"
                style={{
                  resize: "none",
                  width: "100%",
                  height: "100%",
                }}
                placeholder="Masukan alamat sekolah disini"
                minRows={6}
                name="alamat"
                value={formData.alamat}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-4" data-joyride="link-google-maps">
              <label className="form-label">Link Google Maps</label>
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                placeholder="Masukan link google maps sekolah"
                name="gmaps"
                value={formData.gmaps}
                onChange={handleChangeForm}
              />
            </div>
            <div style={{ paddingTop: "6px" }} data-joyride="email-sekolah">
              <label className="form-label">Email Sekolah</label>
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                placeholder="Masukan email Sekolah sekolah"
                name="email"
                value={formData.email}
                onChange={handleChangeForm}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div data-joyride="nomor-telpon">
              <label className="form-label">Nomor Telpon</label>
              <input
                type="number"
                className="form-control"
                autoComplete="off"
                placeholder="Masukan nomor telpon sekolah"
                name="telp"
                value={formData.telp}
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div data-joyride="nomor-fax">
              <label className="form-label">Nomor Fax</label>
              <input
                type="number"
                className="form-control"
                autoComplete="off"
                placeholder="Masukan nomor fax sekolah"
                name="fax"
                value={formData.fax}
                onChange={handleChangeForm}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <hr className="m-0" />
      </div>
    </>
  );
};

export default SectionKontakSekolah;
