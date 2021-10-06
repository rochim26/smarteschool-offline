import React, { useEffect, useState } from "react";
import ReactiveButton from "reactive-button";
import AudioPlayer from "../Shared/AudioPlayer/AudioPlayer";
import Editor from "../Shared/Editor/Editor";

const SoalEsai = ({
  soalSiswa,
  handlePutJawabanSiswa,
  isLoadingUpdateJawaban,
}) => {
  // const [jawaban, setJawaban] = useState(soalSiswa?.jawabanEsai);
  // const [value] = useDebounce(jawaban, 600);
  // const [jawabanFoto, setJawabanFoto] = useState(soalSiswa?.jawabanFoto || []);

  const [buttonState, setButtonState] = useState("idle");

  const onClickSave = () => {
    const jawaban = window.$(`#editorJawabanEsai`).summernote("code");
    handlePutJawabanSiswa({ jawabanEsai: jawaban });
  };

  // useEffect(() => {
  //   setJawaban(soalSiswa?.jawabanEsai || "");
  // }, [soalSiswa?.jawabanEsai]);

  useEffect(() => {
    // Dikomen karena kalo pake ini ntah kenapa pas upload file ga nge hit endpoint firebase
    // window.$(`#editorJawabanEsai`).summernote("reset");
    // window.$(`#editorJawabanEsai`).summernote("code", soalSiswa?.jawabanEsai);
  }, [soalSiswa]);

  // useEffect(() => {
  //   setJawaban(soalSiswa?.jawabanFoto || []);
  // }, [soalSiswa?.jawabanFoto]);

  // const handleChangeForm = (e, value) => {
  //   setJawabanFoto(value);
  // };

  return (
    <div
      className="container ujian-content-container py-md-4 py-3"
      style={{ marginTop: "83px" }}
    >
      <div className="row">
        <div className="col-md-12 mb-5">
          <div className="card card-ss p-4 mb-5">
            {/* Konten Soal Start */}
            <div className="mb-4">
              {soalSiswa?.soal?.audio && (
                <div>
                  <AudioPlayer src={soalSiswa?.soal?.audio} />
                </div>
              )}
              <p
                className="m-0 dangerous-html"
                dangerouslySetInnerHTML={{
                  __html: soalSiswa?.soal?.pertanyaan?.replace("b&", "..."),
                }}
              />
            </div>
            {/* Konten Soal End */}

            {/* <UploadPhoto
              name="jawabanFoto"
              id="jawabanFoto"
              label="Foto"
              listPhoto={jawabanFoto}
              onUpload={(onUpload) =>
                setButtonState(onUpload ? "loading" : "idle")
              }
              onChange={(e, uploadedFile) => handleChangeForm(e, uploadedFile)}
            /> */}

            {/* Jawaban Soal Start */}

            <div className="mb-4">
              {/* <TextareaAutosize
                className="form-control"
                autoComplete="off"
                style={{
                  resize: "none",
                  width: "100%",
                }}
                placeholder="Tuliskan jawabanmu disini"
                minRows={4}
                onChange={(e) => setJawaban(e.target.value)}
                value={jawaban}
                onPaste={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
              /> */}
              <Editor id="editorJawabanEsai" defaultValue={soalSiswa?.jawabanEsai} />
            </div>

            <ReactiveButton
              buttonState={isLoadingUpdateJawaban}
              color={"primary"}
              idleText={"Simpan"}
              loadingText={"Diproses"}
              successText={"Berhasil"}
              errorText={"Gagal"}
              type={"button"}
              data-bs-dismiss="modal"
              className={"btn btn-primary"}
              onClick={onClickSave}
            />
            {/* Jawaban Soal End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoalEsai;
