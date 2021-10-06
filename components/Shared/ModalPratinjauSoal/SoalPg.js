import AudioPlayer from "../AudioPlayer/AudioPlayer";

const SoalPg = ({ activeSoalUjian }) => {
  return (
    <div>
      {activeSoalUjian?.soal?.audio && (
        <div>
          <AudioPlayer src={activeSoalUjian?.soal?.audio} />
        </div>
      )}
      <div className="content-soal mb-4">
        <p
          className="m-0 dangerous-html"
          dangerouslySetInnerHTML={{
            __html:
              activeSoalUjian?.soal?.pertanyaan || activeSoalUjian?.pertanyaan,
          }}
        />
      </div>

      <div className="jawaban-soal mb-4">
        {(activeSoalUjian?.soal?.jawabanA || activeSoalUjian?.pgA) && (
          <div
            className={`list-jawaban-soal rounded-ss border px-4 py-3 d-flex align-items-center mb-3 ${
              activeSoalUjian?.soal?.kjPg === "A" ||
              activeSoalUjian?.pgKj === "A"
                ? "bg-soft-success border-success-ss"
                : "border-light-secondary-ss"
            }`}
          >
            <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">A</h6>
            <div className="konten-list-jawaban-soal">
              <p
                className="mb-0 dangerous-html"
                dangerouslySetInnerHTML={{
                  __html:
                    activeSoalUjian?.soal?.jawabanA || activeSoalUjian?.pgA,
                }}
              />
            </div>
          </div>
        )}
        {(activeSoalUjian?.soal?.jawabanB || activeSoalUjian?.pgB) && (
          <div
            className={`list-jawaban-soal rounded-ss border px-4 py-3 d-flex align-items-center mb-3 ${
              activeSoalUjian?.soal?.kjPg === "B" ||
              activeSoalUjian?.pgKj === "B"
                ? "bg-soft-success border-success-ss"
                : "border-light-secondary-ss"
            }`}
          >
            <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">B</h6>
            <div className="konten-list-jawaban-soal">
              <p
                className="mb-0 dangerous-html"
                dangerouslySetInnerHTML={{
                  __html:
                    activeSoalUjian?.soal?.jawabanB || activeSoalUjian?.pgB,
                }}
              />
            </div>
          </div>
        )}
        {(activeSoalUjian?.soal?.jawabanC || activeSoalUjian?.pgC) && (
          <div
            className={`list-jawaban-soal rounded-ss border px-4 py-3 d-flex align-items-center mb-3 ${
              activeSoalUjian?.soal?.kjPg === "C" ||
              activeSoalUjian?.pgKj === "C"
                ? "bg-soft-success border-success-ss"
                : "border-light-secondary-ss"
            }`}
          >
            <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">C</h6>
            <div className="konten-list-jawaban-soal">
              <p
                className="mb-0 dangerous-html"
                dangerouslySetInnerHTML={{
                  __html:
                    activeSoalUjian?.soal?.jawabanC || activeSoalUjian?.pgC,
                }}
              />
            </div>
          </div>
        )}
        {(activeSoalUjian?.soal?.jawabanD || activeSoalUjian?.pgD) && (
          <div
            className={`list-jawaban-soal rounded-ss border px-4 py-3 d-flex align-items-center mb-3 ${
              activeSoalUjian?.soal?.kjPg === "D" ||
              activeSoalUjian?.pgKj === "D"
                ? "bg-soft-success border-success-ss"
                : "border-light-secondary-ss"
            }`}
          >
            <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">D</h6>
            <div className="konten-list-jawaban-soal">
              <p
                className="mb-0 dangerous-html"
                dangerouslySetInnerHTML={{
                  __html:
                    activeSoalUjian?.soal?.jawabanD || activeSoalUjian?.pgD,
                }}
              />
            </div>
          </div>
        )}
        {(activeSoalUjian?.soal?.jawabanE || activeSoalUjian?.pgE) && (
          <div
            className={`list-jawaban-soal rounded-ss border px-4 py-3 d-flex align-items-center mb-3 ${
              activeSoalUjian?.soal?.kjPg === "E" ||
              activeSoalUjian?.pgKj === "E"
                ? "bg-soft-success border-success-ss"
                : "border-light-secondary-ss"
            }`}
          >
            <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">E</h6>
            <div className="konten-list-jawaban-soal">
              <p
                className="mb-0 dangerous-html"
                dangerouslySetInnerHTML={{
                  __html:
                    activeSoalUjian?.soal?.jawabanE || activeSoalUjian?.pgE,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <h6 className="fs-18-ss fw-bold color-dark me-4 mb-4">Pembahasan</h6>
      <div className="konten-pembahasan-soal mb-2">
        <p
          className="mb-0 dangerous-html"
          dangerouslySetInnerHTML={{
            __html:
              activeSoalUjian?.soal?.pembahasan || activeSoalUjian?.pembahasan,
          }}
        />
      </div>
      <p className="color-dark fw-bold mb-0">
        Jadi Jawaban yang tepat adalah{" "}
        {activeSoalUjian?.soal?.kjPg || activeSoalUjian?.pgKj}
      </p>
    </div>
  );
};

export default SoalPg;
