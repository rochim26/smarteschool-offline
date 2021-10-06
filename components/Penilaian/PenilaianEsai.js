import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { editJawabanUjianSiswa } from "../../client/PesertaUjianClient";
import useUser from "../../hooks/useUser";
import Lightbox from "react-image-lightbox";

const PenilaianEsai = ({
  jawaban,
  pesertaUjian,
  idx,
  getDetailPesertaUjian,
}) => {
  const [imagesEsaiIndex, setImagesEsaiIndex] = useState(0);
  const [imagesEsai, setImageEsai] = useState([]);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);

  const firstRender = useRef(true);
  const { user } = useUser();

  let poinTotal = JSON.parse(jawaban?.jawabanRubrikEsai || "[]")
    .filter((item) => item.benar)
    .reduce((a, b) => a + parseInt(b.poin), 0);

  const [rubrik, setRubrik] = useState(
    JSON.parse(jawaban?.jawabanRubrikEsai || "[]").length !=
      JSON.parse(jawaban?.soal?.rubrikKj || "[]").length
      ? JSON.parse(jawaban?.soal?.rubrikKj || "[]").map((item) => {
          return { ...item, benar: false };
        })
      : JSON.parse(jawaban?.jawabanRubrikEsai || "[]")
  );

  const [checkedSalah, setCheckedSalah] = useState(false);

  const checkPropertyBenar = () => {
    const jawabanBenar = rubrik?.filter((data) => data.benar === true) || [];

    setCheckedSalah(jawabanBenar.length === 0);
  };

  const handleChangeRubrik = (e, tipe, index) => {
    const copyRubrik = [...rubrik];
    const currentRubrik = copyRubrik[index];

    if (tipe === "benar") {
      currentRubrik["benar"] = e.target.checked;
    }

    setRubrik(copyRubrik);
  };

  const handleChangeJawabanSalah = (e) => {
    setCheckedSalah(e.target.checked);

    let newRubrik = [];
    const copyRubrik = [...rubrik];

    copyRubrik?.map((rubrik) => {
      newRubrik.push({
        ...rubrik,
        benar: false,
      });
    });

    setRubrik(newRubrik);
  };

  const updatePenilaianEsai = async () => {
    const { data } = await editJawabanUjianSiswa(
      { jawabanRubrikEsai: rubrik },
      jawaban?.id
    );
    if (data) {
      toast.success(data.message);
      getDetailPesertaUjian();
    }
  };

  const onClickJawabanEsai = (e) => {
    if (e.target.nodeName === "IMG") {
      const index = imagesEsai?.findIndex(
        (image) => image === e.target.currentSrc
      );
      setImagesEsaiIndex(index);
      setIsLightBoxOpen(true);
    }
  };

  const getImageSource = () => {
    const jawabanString = jawaban?.jawabanEsai;

    let element = document.createElement("div");
    element.innerHTML = jawabanString;

    const images = element.getElementsByTagName("img");
    let imageSrc = [];

    for (var i = 0; i < images.length; i++) {
      imageSrc.push(images[i].src);
    }

    setImageEsai(imageSrc);
  };

  useEffect(() => {
    getImageSource();
    checkPropertyBenar();
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      updatePenilaianEsai();
    }
  }, [rubrik]);

  return (
    <>
      {/* Detail Jawaban Items Esai Belum Dinilai Start */}
      <div className="detail-jawaban-peserta-pg card card-ss bg-white rounded-ss mb-4">
        <div className="card-header card-header-ss p-4 border-bottom border-light-secondary-ss">
          <span
            className={`label-ss px-4 fw-bold ${
              poinTotal > 0
                ? "bg-soft-success color-success"
                : !jawaban?.dinilai
                ? "bg-soft-secondary color-secondary"
                : "bg-soft-danger color-danger"
            } rounded-pill`}
          >
            {poinTotal > 0
              ? "Benar"
              : !jawaban?.dinilai
              ? "Belum dinilai"
              : "Salah"}
          </span>
        </div>
        <div className="card-body p-4">
          {/* Info Soal Start */}

          <div className="d-flex align-items-md-center justify-content-between flex-md-row flex-column mb-4">
            <div className="d-flex align-items-center justify-content-md-start justify-content-between">
              <h6 className="fs-18-ss fw-bold color-dark me-4 mb-0">
                Soal {idx + 1} / {pesertaUjian?.jawabanSiswa?.length}
              </h6>
              <span className="label-ss rounded-pill bg-light-primary color-primary fs-12-ss fw-bold">
                {jawaban?.durasi}
              </span>
            </div>
            <hr className="d-md-none hr-ss" />
            <div className="d-flex justify-content-center align-items-center justify-content-md-start justify-content-between">
              <span
                className="outline-primary-ss rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "75px",
                  height: "25px",
                }}
              >
                KD {jawaban?.soal?.kd}
              </span>
              <span
                className="outline-primary-ss rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center me-md-3 me-auto text-uppercase"
                style={{
                  width: "75px",
                  height: "25px",
                }}
              >
                {jawaban?.soal?.levelKognitif}
              </span>
              <span
                className={`${
                  jawaban?.dinilai ? "bg-primary" : "bg-danger"
                } text-white rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center`}
                style={{
                  width: "75px",
                  height: "25px",
                }}
              >
                {poinTotal > 0 ? `${poinTotal} Poin` : `0 Poin`}
              </span>
            </div>
          </div>
          {/* Info Soal End */}

          {/* Konten Soal Start */}
          <div className="mb-4">
            <p
              className="m-0 dangerous-html"
              dangerouslySetInnerHTML={{
                __html: jawaban?.soal?.pertanyaan,
              }}
            ></p>
          </div>
          {/* Konten Soal End */}

          {/* Jawaban Soal Start */}
          <div className="mb-4">
            <h6 className="fs-18-ss fw-bold color-dark me-4 mb-4">Jawaban</h6>
            <div className="konten-pembahasan-soal mb-2">
              <p
                className="mb-0 dangerous-html"
                dangerouslySetInnerHTML={{
                  __html: jawaban?.jawabanEsai,
                }}
                onClick={onClickJawabanEsai}
              ></p>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="fs-18-ss fw-bold color-dark me-4 mb-4">
              Jawaban Foto
            </h6>
            {jawaban?.jawabanFoto?.map((d) => {
              return (
                <a href={d}>
                  <img src={d} style={{ maxWidth: 300 }} />
                </a>
              );
            })}
          </div>

          {/* Jawaban Soal End */}

          {/* Pembahasan Soal Start */}
          <div className="mb-4">
            <h6 className="fs-18-ss fw-bold color-dark me-4 mb-4">
              Pembahasan
            </h6>
            <div className="konten-pembahasan-soal">
              <p
                className="mb-0 dangerous-html"
                dangerouslySetInnerHTML={{
                  __html: jawaban?.soal?.pembahasan,
                }}
              ></p>
            </div>
          </div>
          {/* Pembahasan Soal End */}
          {/* Pembahasan Soal Start */}
          <h6 className="fs-18-ss fw-bold color-dark me-4 mb-4">Rubrik</h6>
          <div className="rubrik-container">
            <div className="rubrik-items form-check-ss d-flex mb-3">
              <input
                className={`form-check-input form-check-input-salah  me-3 p-2 ${
                  user?.role === "siswa" ? "d-none" : ""
                }`}
                type="checkbox"
                value=""
                id={`rubrikSalah-${idx + 1}`}
                style={{
                  width: "24px",
                  height: "24px",
                }}
                checked={checkedSalah}
                disabled={
                  rubrik?.filter((data) => data.benar === true).length > 0
                }
                onChange={(e) => handleChangeJawabanSalah(e, "salah")}
              />
              {user?.role === "guru" ? (
                <label
                  className={`
                      form-check form-check-label form-check-label-salah p-4 rounded-ss border border-light-secondary-ss w-100
                      ${
                        rubrik?.findIndex((data) => data.benar) >= 0
                          ? "no-drop"
                          : ""
                      }
                    `}
                  htmlFor={
                    user?.role === "siswa" ? "" : `rubrikSalah-${idx + 1}`
                  }
                >
                  <span
                    className="bg-danger text-white rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: "75px",
                      height: "25px",
                    }}
                  >
                    0 Poin
                  </span>
                  <p className="mb-0">Jawaban Salah</p>
                </label>
              ) : (
                <div
                  className={`
                      form-check form-check-label form-check-label-salah p-4 rounded-ss border border-light-secondary-ss w-100
                      ${
                        rubrik?.findIndex((data) => data.benar) >= 0
                          ? "no-drop"
                          : ""
                      }
                    `}
                >
                  <span
                    className="bg-danger text-white rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: "75px",
                      height: "25px",
                    }}
                  >
                    0 Poin
                  </span>
                  <p className="mb-0">Jawaban Salah</p>
                </div>
              )}
            </div>
            {JSON.parse(jawaban?.soal?.rubrikKj)?.map((d, index) => {
              return (
                <div className="rubrik-items form-check-ss d-flex mb-3">
                  <input
                    className={`form-check-input me-3 p-2 ${
                      user?.role === "siswa" ? "d-none" : ""
                    }`}
                    type="checkbox"
                    value=""
                    id={`rubrik-${index}-${idx}`}
                    style={{
                      width: "24px",
                      height: "24px",
                    }}
                    onChange={(e) => handleChangeRubrik(e, "benar", index)}
                    disabled={checkedSalah}
                    defaultChecked={rubrik?.[index]?.benar}
                  />
                  {user?.role === "guru" ? (
                    <label
                      className={`
                            form-check-label p-4 rounded-ss border border-light-secondary-ss w-100
                            ${checkedSalah ? "no-drop" : ""}
                          `}
                      htmlFor={
                        user?.role === "siswa" ? "" : `rubrik-${index}-${idx}`
                      }
                    >
                      <span
                        className="bg-primary text-white rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center mb-3"
                        style={{
                          width: "75px",
                          height: "25px",
                        }}
                      >
                        {d.poin} Poin
                      </span>
                      <p className="mb-0">{d.indikator}</p>
                    </label>
                  ) : (
                    <div
                      className={`
                            form-check-label p-4 rounded-ss border border-light-secondary-ss w-100
                            ${checkedSalah ? "no-drop" : ""}
                          `}
                    >
                      <span
                        className="bg-primary text-white rounded-pill fs-14-ss fw-bold d-flex align-items-center justify-content-center mb-3"
                        style={{
                          width: "75px",
                          height: "25px",
                        }}
                      >
                        {d.poin} Poin
                      </span>
                      <p className="mb-0">{d.indikator}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* Pembahasan Soal End */}
        </div>
        {isLightBoxOpen && (
          <Lightbox
            mainSrc={imagesEsai[imagesEsaiIndex]}
            nextSrc={imagesEsai[(imagesEsaiIndex + 1) % imagesEsai.length]}
            prevSrc={
              imagesEsai[
                (imagesEsaiIndex + imagesEsai.length - 1) % imagesEsai.length
              ]
            }
            onCloseRequest={() => {
              setIsLightBoxOpen(false), setImagesEsaiIndex(0);
            }}
            onMovePrevRequest={() =>
              setImagesEsaiIndex(
                (imagesEsaiIndex + imagesEsai.length - 1) % imagesEsai.length
              )
            }
            onMoveNextRequest={() =>
              setImagesEsaiIndex((imagesEsaiIndex + 1) % imagesEsai.length)
            }
          />
        )}
      </div>
      {/* Detail Jawaban Items Esai Belum Dinilai End */}
    </>
  );
};

export default PenilaianEsai;
