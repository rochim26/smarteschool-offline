import { Fragment, useState } from "react";
import Tabs from "../../Shared/Tabs/Tabs";
import { FaPen, FaPlus, FaTrash, FaTrashAlt } from "react-icons/fa";
import swal from "sweetalert";
import { deleteKuis } from "../../../client/KuisClient";
import ReactiveButton from "reactive-button";
import { toast } from "react-toastify";
import { editTopik } from "../../../client/TopikClient";
import TextareaAutosize from "react-textarea-autosize";
import { momentPackage } from "../../../utilities/HelperUtils";
import { editMateriKesimpulan } from "../../../client/MateriClient";

const ContentTab = ({
  soalKuis,
  tab,
  handleEditState,
  handleDeleteKuis,
  user,
}) => {
  const filteredPilihanGanda = soalKuis?.filter((val) => val.esai === 0);
  const filteredEsai = soalKuis?.filter((val) => val.esai === 1);
  const data = tab === "pilihan-ganda" ? filteredPilihanGanda : filteredEsai;

  return (
    <Fragment>
      {/* Card Kuis Card Start */}

      <div className="kuis-component">
        {data?.map((data, index) => (
          <div
            key={index}
            className="kuis-card rounded-ss mt-3 d-flex align-items-md-center border border-secondary border-light-secondary-ss p-3 flex-lg-nowrap flex-md-row flex-column flex-wrap"
          >
            <div
              className="rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fw-extrabold color-dark me-3 p-3"
              style={{
                width: "40px",
                height: "40px",
              }}
            >
              {index + 1}
            </div>
            <div className="d-flex justify-content-sm-between align-items-sm-center flex-column flex-sm-row flex-grow-1">
              <div className="soal-content fs-14-ss p-md-1 p-0 m-md-0 my-3">
                <p
                  dangerouslySetInnerHTML={{ __html: data?.pertanyaan }}
                  className="mb-0 color-secondary"
                ></p>
              </div>
              {user?.role == "guru" && (
                <div className="d-flex flex-lg-row flex-sm-column flex-row justify-content-between">
                  <div
                    data-bs-toggle="modal"
                    data-bs-target={`#${
                      tab === "pilihan-ganda"
                        ? "modalPilihanGanda"
                        : "modalAddQuiz"
                    }`}
                    className="rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fs-6 me-lg-2 mb-2 pointer"
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                    onClick={() => handleEditState(data)}
                  >
                    <FaPen className="color-secondary" />
                  </div>
                  <div className="d-flex flex-lg-row flex-sm-column flex-row justify-content-between">
                    <div
                      className="btn btn-link rounded-circle bg-soft-primary d-flex justify-content-center align-items-center fs-6 pointer"
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                      onClick={() => handleDeleteKuis(data?.id)}
                    >
                      <FaTrashAlt className="color-secondary" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Card Kuis Card End */}
    </Fragment>
  );
};

const KuisComponent = ({
  soalKuis,
  setRubrikKj,
  setEditId,
  setFormPilihanGanda,
  getDetailTopikData,
  setShowEditor,
  formData,
  topikId,
  user,
  setListOpsiJawaban,
}) => {
  const listPg = ["pgA", "pgB", "pgC", "pgD", "pgE"];
  const [buttonKesimpulanState, setButtonKesimpulanState] = useState("idle");
  const [kesimpulan, setKesimpulan] = useState(
    formData?.materiKesimpulan?.kesimpulan
  );

  const handleEditState = async (data) => {
    // setShowEditor(false)
    // let opsi = []
    // const promises = Object.keys(data).map(objKey => {
    //   if (objKey && listPg.includes(objKey)) {
    //     data[objKey] && opsi.push(objKey.replace("pg", ""))
    //   }
    // })

    // await Promise.all(promises)
    // setListOpsiJawaban([...opsi])

    setEditId(data?.id);
    setFormPilihanGanda(data);
    setRubrikKj(JSON.parse(data?.rubrikKj));
    window
      .$(`#editorPertanyaanEsai`)
      .summernote("code", data?.pertanyaan || "");
    window
      .$(`#editorPembahasanEsai`)
      .summernote("code", data?.pembahasan || "");
    window
      .$(`#editorPertanyaanPilihanGanda`)
      .summernote("code", data?.pertanyaan || ""),
      window
        .$(`#editorJawabanPilihanGanda-A`)
        .summernote("code", data?.pgA || "");
    window
      .$(`#editorJawabanPilihanGanda-B`)
      .summernote("code", data?.pgB || "");
    window
      .$(`#editorJawabanPilihanGanda-C`)
      .summernote("code", data?.pgC || "");
    window
      .$(`#editorJawabanPilihanGanda-D`)
      .summernote("code", data?.pgD || "");
    window
      .$(`#editorJawabanPilihanGanda-E`)
      .summernote("code", data?.pgE || "");
    window
      .$(`#editorPembahasanPilihanGanda`)
      .summernote("code", data?.pembahasan || "");
    // setShowEditor(true)
  };

  const onClickBuatSoal = () => {
    window.$(`#editorPertanyaanEsai`).summernote("code", "");
    window.$(`#editorPembahasanEsai`).summernote("code", "");

    window.$(`#editorPertanyaanPilihanGanda`).summernote("code", ""),
      window.$(`#editorJawabanPilihanGanda-A`).summernote("code", "");
    window.$(`#editorJawabanPilihanGanda-B`).summernote("code", "");
    window.$(`#editorJawabanPilihanGanda-C`).summernote("code", "");
    window.$(`#editorJawabanPilihanGanda-D`).summernote("code", "");
    window.$(`#editorJawabanPilihanGanda-E`).summernote("code", "");
    window.$(`#editorPembahasanPilihanGanda`).summernote("code", "");
    setEditId(null);
    setFormPilihanGanda({});
    setRubrikKj([
      {
        poin: "",
        indikator: "",
        id: Math.random(),
      },
    ]);
    setListOpsiJawaban(["A", "B", "C", "D", "E"]);
  };

  const handleDeleteKuis = (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deleteKuis(id);
        if (data) {
          toast.success(data?.message);
          getDetailTopikData();
        } else {
          toast.error(error?.message);
        }
      }
    });
  };

  const [buttonState, setButtonState] = useState("idle");

  const handlePutTopikData = async () => {
    setButtonState("loading");
    const payload = {
      ...formData,
    };
    const { data } = await editTopik(payload, topikId);
    if (data) {
      toast.success(data?.message);
      setButtonState("success");
    } else {
      setButtonState("error");
    }
  };

  const handlePutMateriKesimpulanData = async () => {
    setButtonKesimpulanState("loading");
    const payload = {
      mTopikId: topikId,
      kesimpulan: kesimpulan,
      waktuSelesai: momentPackage().format("YYYY-MM-DD HH:mm:ss"),
    };
    const data = await editMateriKesimpulan(payload, topikId);
    if (data) {
      toast.success("Data berhasil disimpan!");
      setButtonKesimpulanState("success");
    } else {
      setButtonKesimpulanState("error");
    }
  };

  const navItems = [
    {
      id: "pilihan-ganda",
      nav: "Pilihan Ganda",
      active: true,
      content: (
        <ContentTab
          soalKuis={soalKuis}
          tab="pilihan-ganda"
          handleEditState={handleEditState}
          handleDeleteKuis={handleDeleteKuis}
          setListOpsiJawaban={setListOpsiJawaban}
          user={user}
        />
      ),
    },
    {
      id: "esai",
      nav: "Esai",
      active: false,
      content: (
        <ContentTab
          soalKuis={soalKuis}
          tab="esai"
          handleEditState={handleEditState}
          handleDeleteKuis={handleDeleteKuis}
          setListOpsiJawaban={setListOpsiJawaban}
          user={user}
        />
      ),
    },
  ];

  return (
    <div className="kuis-component">
      <div className="d-flex justify-content-between align-items-sm-center flex-sm-row flex-column">
        <h6 className="color-dark fw-bold fs-18-ss mb-sm-0 mb-3">Soal</h6>
        <div className="d-flex align-items-sm-center flex-sm-row flex-column">
          {user?.role == "guru" && (
            <button
              type="button"
              className="btn btn-ss btn-outline-secondary btn-outline-secondary-ss rounded-pill fw-bold me-2 fs-12-ss mb-sm-0 mb-3 btn-pratinjau-kuis"
              data-bs-toggle="modal"
              data-bs-target="#modalPratinjauSoalKuis"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11.25"
                height="15"
                viewBox="0 0 11.25 15"
                className="me-2"
              >
                <g
                  id="icon-pratinjau-soal"
                  transform="translate(793.618 -34.513)"
                >
                  <path
                    id="Path_200"
                    data-name="Path 200"
                    d="M-534.082,37.582l-2.861-2.864a.7.7,0,0,0-.5-.2h-.178v3.741h3.741v-.178A.7.7,0,0,0-534.082,37.582Z"
                    transform="translate(-248.491)"
                    fill="#80849c"
                  />
                  <circle
                    id="Ellipse_78"
                    data-name="Ellipse 78"
                    cx="1.85"
                    cy="1.85"
                    r="1.85"
                    transform="translate(-790.539 41.783)"
                    fill="#80849c"
                  />
                  <path
                    id="Path_201"
                    data-name="Path 201"
                    d="M-787.055,38.5V34.513h-5.859a.7.7,0,0,0-.7.7V48.81a.7.7,0,0,0,.7.7h9.844a.7.7,0,0,0,.7-.7V39.2h-3.984A.705.705,0,0,1-787.055,38.5Zm.979,6.989a.347.347,0,0,1,.246.1l1.445,1.444a.349.349,0,0,1,0,.493l-.41.41a.346.346,0,0,1-.491,0l-1.444-1.444a.347.347,0,0,1-.1-.246v-.236a3,3,0,0,1-1.854.637,3.013,3.013,0,0,1-3.013-3.013,3.013,3.013,0,0,1,3.013-3.013,3.013,3.013,0,0,1,3.013,3.013,3,3,0,0,1-.638,1.854Z"
                    transform="translate(0)"
                    fill="#80849c"
                  />
                </g>
              </svg>
              Pratinjau Soal
            </button>
          )}

          <div className="dropdown dropdown-ss d-flex align-items-sm-center flex-sm-row flex-column mb-sm-0 mb-3">
            {user?.role == "guru" && (
              <button
                className="btn btn-ss btn-primary btn-primary-ss rounded-pill shadow-primary-ss fs-12-ss fw-bold"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaPlus className="me-2" />
                Buat Soal
              </button>
            )}
            <ul
              className="dropdown-menu dropdown-menu-ss my-1"
              aria-labelledby="dropdownMenuLink"
            >
              <li onClick={() => onClickBuatSoal()}>
                <a
                  className="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#modalPilihanGanda"
                >
                  Pilihan Ganda
                </a>
              </li>
              <li onClick={() => onClickBuatSoal()}>
                <a
                  className="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#modalAddQuiz"
                >
                  Esai
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <Tabs navItems={navItems} />
      </div>

      <div className="d-flex justify-content-end mt-4">
        {user?.role == "guru" && (
          <ReactiveButton
            buttonState={buttonState}
            onClick={handlePutTopikData}
            color={"primary"}
            idleText={"Simpan"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            className={
              "btn btn-primary rounded-pill fs-14-ss fw-bolder py-2 px-4 d-flex align-items-center bg-gradient-primary"
            }
          />
        )}
      </div>
      {user?.role == "siswa" && (
        <div>
          <p className="fs-18-ss fw-bold mt-4">
            {/* Kesimpulan {kesimpulanSuccess && `(${kesimpulanSuccess})`} */}
          </p>
          <TextareaAutosize
            className="form-control"
            autoComplete="off"
            name="kesimpulan"
            style={{
              resize: "none",
              width: "100%",
            }}
            placeholder="Tuliskan kesimpulan Quiz.."
            minRows={3}
            onChange={({ target }) => setKesimpulan(target.value)}
            value={kesimpulan}
            onPaste={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
          />
        </div>
      )}
      {user?.role == "siswa" && (
        <div className="d-flex justify-content-end mt-4">
          <ReactiveButton
            buttonState={buttonKesimpulanState}
            onClick={handlePutMateriKesimpulanData}
            color={"primary"}
            idleText={"Simpan"}
            loadingText={"Diproses"}
            successText={"Berhasil"}
            errorText={"Gagal"}
            type={"button"}
            className={
              "btn btn-primary rounded-pill fs-14-ss fw-bolder py-2 px-4 d-flex align-items-center bg-gradient-primary"
            }
          />
        </div>
      )}
    </div>
  );
};

export default KuisComponent;
