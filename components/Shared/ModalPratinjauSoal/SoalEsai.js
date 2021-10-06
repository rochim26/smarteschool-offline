import AudioPlayer from "../AudioPlayer/AudioPlayer"

const SoalEsai = ({ activeSoalUjian }) => {

  const rubrikData = JSON.parse(activeSoalUjian?.soal?.rubrikKj || activeSoalUjian?.rubrikKj || "{}")

  return (
    <div>

      {
        activeSoalUjian?.soal?.audio && (
          <div>
            <AudioPlayer src={activeSoalUjian?.soal?.audio} />
          </div>
        )
      }

      <div className="content-soal mb-4" dangerouslySetInnerHTML={{ __html: activeSoalUjian?.soal?.pertanyaan || activeSoalUjian?.pertanyaan }} />

      <div className="mb-4">
        <h6 className="fs-18-ss fw-bold color-dark me-4 mb-4">
          Pembahasan
        </h6>
        <div className="konten-pembahasan-soal" dangerouslySetInnerHTML={{ __html: activeSoalUjian?.soal?.pembahasan || activeSoalUjian?.pembahasan }} />
      </div>

      <h6 className="fs-18-ss fw-bold color-dark me-4 mb-4">
        Rubrik
      </h6>
      <div className="rubrik-container">
        {
          Array.isArray(rubrikData) && rubrikData?.map(rubrik => (
            <div className="rubrik-items form-check-ss d-flex mb-3">
              <label
                className="form-check-label p-4 rounded-ss border border-light-secondary-ss w-100"
                htmlFor="rubrik1"
              >
                <span
                  className="bg-primary text-white rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "75px",
                    height: "25px",
                  }}
                >
                  {rubrik?.poin} Poin
                </span>
                <p className="mb-0">{rubrik?.indikator}</p>
              </label>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SoalEsai 