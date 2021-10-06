import UploadBanner from "../Shared/UploadBanner/UploadBanner";

const SectionMengapaHarusSekolahDisini = ({
  handleChangeForm,
  formData,
  setButtonState,
}) => {
  return (
    <div className="px-4" data-joyride="section-mengapa-harus-sekolah-disini">
      <h4 className="fw-extrabold color-dark title-border mb-5">
        Section Mengapa Harus Sekolah Disini
      </h4>
      <div className="row">
        <div
          className="col-md-12 mb-4"
          data-joyride="background-section-mengapa-harus-sekolah-disini"
        >
          <UploadBanner
            accept="image/*"
            id="backgroundSectionMengapa"
            name="backgroundSectionMengapa"
            label="Background Section"
            titleUnggahan="Foto Background"
            titleUkuran="1366 x 385"
            preview={formData.backgroundSectionMengapa}
            onUpload={(onUpload) =>
              setButtonState(onUpload ? "loading" : "idle")
            }
            onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
          />
        </div>
        <div className="row">
          <div className="col-md-4 mb-md-0 mb-4" data-joyride="jumlah-siswa">
            <label htmlFor="jumlah-siswa" className="form-label">
              Jumlah Siswa
            </label>
            <input
              className="form-control"
              autoComplete="off"
              id="jumlah-siswa"
              placeholder="Masukkan jumlah siswa"
              name="jumlahSiswa"
              value={formData.jumlahSiswa}
              onChange={handleChangeForm}
            />
          </div>
          <div className="col-md-4 mb-md-0 mb-4" data-joyride="jumlah-guru">
            <label htmlFor="jumlah-guru" className="form-label">
              Jumlah Guru
            </label>
            <input
              className="form-control"
              autoComplete="off"
              id="jumlah-guru"
              placeholder="Masukkan jumlah guru"
              name="jumlahGuru"
              value={formData.jumlahGuru}
              onChange={handleChangeForm}
            />
          </div>
          <div className="col-md-4 mb-md-0 mb-4" data-joyride="jumlah-kelas">
            <label htmlFor="jumlah-kelas" className="form-label">
              Jumlah Kelas
            </label>
            <input
              className="form-control"
              autoComplete="off"
              id="jumlah-kelas"
              placeholder="Masukkan jumlah kelas"
              name="jumlahKelas"
              value={formData.jumlahKelas}
              onChange={handleChangeForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionMengapaHarusSekolahDisini;
