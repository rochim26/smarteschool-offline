import Editor from "../Shared/Editor/Editor";

const SectionSambutanKetuaJurusan = () => {
  return (
    <>
      <div
        className="card-body px-4 pt-4 pb-0 mb-5"
        data-joyride="sambutan-ketua-jurusan"
      >
        <h4 className="fw-extrabold color-dark title-border mb-5">
          Sambutan Ketua Jurusan
        </h4>
        <div data-joyride="form-sambutan">
          <label htmlFor="#sambutan" className="form-label">
            Sambutan
          </label>
          <Editor id="sambutan" />
        </div>
      </div>
      <div className="px-4 mb-5">
        <hr className="m-0" />
      </div>
    </>
  );
};

export default SectionSambutanKetuaJurusan;
