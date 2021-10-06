const SoalPgKompleks = () => {
  return (
    <div>
      <div className="content-soal mb-4">
        <p className="m-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Illum maiores natus, officiis, fugiat, officia
          asperiores ratione adipisci aliquam delectus
          exercitationem assumenda accusamus molestiae. Voluptatum
          quos animi deserunt quisquam! Modi, a?
        </p>
      </div>
      <div className="jawaban-soal mb-4">
        <div className="list-jawaban-soal rounded-ss bg-soft-success border border-success-ss px-4 py-3 d-flex align-items-center mb-3">
          <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">
            A
          </h6>
          <div className="konten-list-jawaban-soal">
            <p className="mb-0">Jawaban A</p>
          </div>
        </div>
        <div className="list-jawaban-soal rounded-ss border border-light-secondary-ss px-4 py-3 d-flex align-items-center mb-3">
          <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">
            B
          </h6>
          <div className="konten-list-jawaban-soal">
            <p className="mb-0">Jawaban B</p>
          </div>
        </div>
        <div className="list-jawaban-soal rounded-ss bg-soft-success border border-success-ss px-4 py-3 d-flex align-items-center mb-3">
          <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">
            C
          </h6>
          <div className="konten-list-jawaban-soal">
            <p className="mb-0">Jawaban C</p>
          </div>
        </div>
        <div className="list-jawaban-soal rounded-ss border border-light-secondary-ss px-4 py-3 d-flex align-items-center mb-3">
          <h6 className="fs-18-ss fw-bold color-dark mb-0 me-4">
            D
          </h6>
          <div className="konten-list-jawaban-soal">
            <p className="mb-0">Jawaban D</p>
          </div>
        </div>
      </div>
      <h6 className="fs-18-ss fw-bold color-dark me-4 mb-4">
        Pembahasan
      </h6>
      <div className="konten-pembahasan-soal mb-2">
        <p className="mb-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Minima optio maxime explicabo magni ullam cumque! Cum
          nam quibusdam aspernatur laborum facilis nostrum officia
          autem sequi deserunt quos, consectetur molestiae beatae.
        </p>
      </div>
      <p className="color-dark fw-bold mb-0">
        Jadi Jawaban yang tepat adalah A dan C
      </p>
    </div>
  )
}

export default SoalPgKompleks