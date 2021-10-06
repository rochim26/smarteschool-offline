import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import ReactiveButton from "reactive-button";
import swal from "sweetalert";
import {
  deleteCamera,
  getCamera,
  postCamera,
  putCamera,
} from "../../client/CameraClient";
import {
  getBelumSinkron,
  getLogData,
  getLogPhoto,
  postLogData,
} from "../../client/SinkronClient";
import Layout from "../../components/Layout/Layout";
import AnimatePage from "../../components/Shared/AnimatePage/AnimatePage";
import NewModal from "../../components/Shared/NewModal/NewModal";
import { hideModal } from "../../utilities/ModalUtils";

const index = () => {
  const initialState = {
    nama: "",
    address: "",
    m_sekolah_id: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [edit, setEdit] = useState(0);
  const [formButton, setFormButton] = useState("idle");
  const [cameraData, setCameraData] = useState([]);
  const [cameraStatus, setCameraStatus] = useState([]);
  const [belumSinkron, setBelumSinkron] = useState([]);
  const [progress, setProgress] = useState(0);
  // console.log(belumSinkron);

  const _getCamera = async () => {
    const { data, error } = await getCamera();

    if (data) {
      setCameraData(data.camera);
      data.camera?.map((cam) => {
        _getDataBelumSinkron(cam);
      });
      // setCameraStatus([]);
    }
  };

  const _getDataBelumSinkron = async (cam) => {
    const { data, error } = await getBelumSinkron(cam);

    if (data) {
      setBelumSinkron([
        ...belumSinkron.filter((item) => item.id != cam.id),
        {
          id: cam.id,
          jumlah: data.data.FaceRecognition.RecognitionRecordCount,
        },
      ]);
      if (data.data.FaceRecognition.RecognitionRecordCount > 0) {
        _getLogData(cam, data.data.FaceRecognition.RecognitionRecordCount);
      }
      return;
    }
  };

  const _getLogData = async (cam, totalBelumSinkron) => {
    // const totalBelumSinkron = belumSinkron.find(
    //   (d) => d?.id == cam?.id
    // )?.jumlah;
    if (!(totalBelumSinkron > 0)) {
      // toast.info("Camera Sudah Tersinkron");
      return;
    }
    const { data, error } = await getLogData(cam, totalBelumSinkron);

    if (data) {
      const logData =
        data?.data?.RecognitionRecordList?.RecognitionRecord.length > 0
          ? [
              ...data?.data?.RecognitionRecordList?.RecognitionRecord?.reverse().map(
                (item) => {
                  return {
                    masker: item.FaceMask,
                    suhu: item.FaceTemperature.Temperature,
                    nama: item.PeopleName,
                    SnapshotPath: item.SnapshotPath,
                    Time: moment(item.Time).format("YYYY-MM-DD HH:mm:ss"),
                  };
                }
              ),
            ]
          : [
              {
                masker:
                  data?.data?.RecognitionRecordList?.RecognitionRecord.FaceMask,
                suhu: data?.data?.RecognitionRecordList?.RecognitionRecord
                  .FaceTemperature.Temperature,
                nama: data?.data?.RecognitionRecordList?.RecognitionRecord
                  .PeopleName,
                SnapshotPath:
                  data?.data?.RecognitionRecordList?.RecognitionRecord
                    .SnapshotPath,
                Time: moment(
                  data?.data?.RecognitionRecordList?.RecognitionRecord.Time
                ).format("YYYY-MM-DD HH:mm:ss"),
              },
            ];
      // const log = [];
      let progressSinkron = 0;
      await Promise.all(
        logData.map(async (item, idx) => {
          const { data: photo } = await getLogPhoto(cam, item);
          if (photo) {
            // log.push({ ...item, foto: photo?.data });
            document.getElementById("cam-img" + cam?.id)
              ? (document.getElementById("cam-img" + cam?.id).src =
                  "data:image/jpeg;base64," + photo?.data)
              : null;
            const { data: status } = await postLogData({
              foto: photo?.data,
              waktu: moment(item.Time).format("YYYY-MM-DD HH:mm:ss"),
              masker: item.masker == "no" ? 0 : 1,
              suhu: item.suhu,
              nama: item.nama,
            });
            if (status) {
              setProgress((((idx + 1) / logData.length) * 100).toFixed(2));
              progressSinkron = (((idx + 1) / logData.length) * 100).toFixed(2);
              return;
            }
          }
        })
      );

      const { data: updateStatus } = await putCamera(cam.id, { sinkron: 1 });

      if (updateStatus) {
        toast.success("camera tersinkron");
        _getCamera();
      }
    }
  };

  const _postCamera = async () => {
    if (!formData.address.includes("http://")) {
      toast.error("format Alamat salah");
      return;
    }

    const { data, error } = await postCamera({ ...formData });

    if (data) {
      toast.success(data.message);
      hideModal("modalTambahKamera");
      _getCamera();
    } else {
      toast.error(error?.[0]?.message);
    }
  };

  const _putCamera = async () => {
    if (!formData.address.includes("http://")) {
      toast.error("format Alamat salah");
      return;
    }

    const { data, error } = await putCamera(edit, { ...formData });

    if (data) {
      toast.success(data.message);
      hideModal("modalTambahKamera");
      _getCamera();
    } else {
      toast.error(error?.[0]?.message);
    }
  };

  const _deleteCamera = (id) => {
    swal({
      title: "Yakin ingin dihapus?",
      text: "Kontak CS Smartschool jika sengaja terhapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data, error } = await deleteCamera(id);
        if (data) {
          toast.success(data?.message);
          _getCamera();
        } else {
          toast.error(error?.message);
        }
      }
    });
  };

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setInterval(() => {
      _getCamera();
    }, 3000);
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     cameraStatus
  //       .filter((item) => item.online)
  //       .forEach((item) => {
  //         _getDataBelumSinkron(cameraData.find((d) => d.id == item.id));
  //       });
  //   }, 3000);
  // }, [cameraStatus]);
  return (
    <Layout
      modalWrapper={
        <NewModal
          modalId="modalTambahKamera"
          title={
            <>
              <h4 className="mb-1 fw-extrabold">Kamera</h4>
              <span className="fs-6 fw-normal">
                Dibawah ini adalah keterangan Kamera
              </span>
            </>
          }
          content={
            <>
              <div className="mb-4">
                <label className="form-label">Nama Kamera</label>
                <input
                  className="form-control"
                  autoComplete="off"
                  placeholder="Tuliskan Nama Kamera"
                  type="text"
                  name="nama"
                  value={formData?.nama}
                  onChange={handleChangeForm}
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Alamat Kamera</label>
                <input
                  className="form-control"
                  autoComplete="off"
                  placeholder="Contoh: http://192.168.137.29"
                  type="text"
                  name="address"
                  value={formData?.address}
                  onChange={handleChangeForm}
                />
              </div>
            </>
          }
          submitButton={
            <ReactiveButton
              buttonState={formButton}
              color={"primary"}
              idleText={edit ? "Edit" : "Buat"}
              loadingText={"Diproses"}
              successText={"Berhasil"}
              errorText={"Gagal"}
              type={"button"}
              data-bs-dismiss="modal"
              className={"btn btn-primary"}
              onClick={() => (edit ? _putCamera() : _postCamera())}
            />
          }
        />
      }
    >
      <AnimatePage>
        <>
          <div className="mb-4">
            <div>Sinkronisasi</div>
            <button
              data-bs-toggle="modal"
              data-bs-target="#modalTambahKamera"
              onClick={() => {
                setFormData(initialState);
                setEdit(0);
              }}
            >
              Tambah Camera
            </button>
            <p>{progress}</p>
          </div>
          <div className="mb-4">
            <h4>List Camera</h4>
            <ul>
              {cameraData?.map((item) => {
                // console.log(item.address.split("//"));
                return (
                  <li>
                    <div className="">
                      <h5>{item.nama} </h5>
                      <span>
                        {cameraStatus.find((d) => d.id == item.id)?.online
                          ? "online"
                          : "offline"}
                      </span>
                      <p>
                        {belumSinkron.find((d) => d?.id == item.id)?.jumlah ||
                          0}{" "}
                        data belum sinkron
                      </p>
                    </div>
                    <div className="d-flex">
                      <div className="me-2">
                        <FaEdit
                          size={20}
                          data-bs-toggle="modal"
                          data-bs-target="#modalTambahKamera"
                          onClick={() => {
                            setFormData({
                              nama: item.nama,
                              address: item.address,
                            });
                            setEdit(item.id);
                          }}
                        />
                      </div>
                      <div className="me-2">
                        <FaTrash
                          size={20}
                          onClick={() => _deleteCamera(item.id)}
                        />
                      </div>
                      <div className="me-2">
                        <button
                          disabled={
                            !cameraStatus.find((d) => d.id == item.id)
                              ?.online ||
                            !(
                              belumSinkron.find((d) => d?.id == item.id)
                                ?.jumlah > 0
                            )
                          }
                          onClick={() => _getLogData(item)}
                        >
                          Sinkron
                        </button>
                      </div>
                    </div>
                    <div className="">
                      {cameraStatus.find((d) => d.id == item.id)?.online ==
                        null ||
                      cameraStatus.find((d) => d.id == item.id)?.online == 1 ? (
                        <img
                          id={`cam-${item.id}`}
                          onLoad={() =>
                            setCameraStatus([
                              ...cameraStatus.filter(
                                (cam) => cam.id != item.id
                              ),
                              { id: item.id, online: 1 },
                            ])
                          }
                          onError={() =>
                            setCameraStatus([
                              ...cameraStatus.filter(
                                (cam) => cam.id != item.id
                              ),
                              { id: item.id, online: 0 },
                            ])
                          }
                          src={`${item.address}/Streams/1/4/ReceiveData`}
                          alt="Offline"
                          height={200}
                          width={200}
                        />
                      ) : (
                        <img
                          src="/img/empty-state-buku.png"
                          width={200}
                          height={200}
                        />
                      )}
                    </div>
                    <img
                      id={"cam-img" + item.id}
                      width={200}
                      height={200}
                      style={{ border: "none" }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      </AnimatePage>
    </Layout>
  );
};

export default index;
