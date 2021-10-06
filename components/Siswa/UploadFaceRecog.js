import * as faceapi from "face-api.js";
import firebase from "firebase/app";
import "firebase/firestore";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { uploadFile } from "../../client/uploadFileClient";
import LoadingProgress from "../Shared/LoadingProgress/LoadingProgress";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAeIMzWUV3w1A39AZcV8NxICLlUh5SJLj4",
    authDomain: "smart-school-300211.firebaseapp.com",
    projectId: "smart-school-300211",
    storageBucket: "smart-school-300211.appspot.com",
    messagingSenderId: "429403777394",
    appId: "1:429403777394:web:de06e0f5e50868a38d95eb",
    measurementId: "G-V07WNQQYZQ",
  });
} else {
  firebase.app();
}

const db = firebase.firestore();

const lables = [
  "fotoDepan1",
  "fotoDepan2",
  "fotoDepan3",
  "fotoKiri1",
  "fotoKiri2",
  "fotoKiri3",
  "fotoKanan1",
  "fotoKanan2",
  "fotoKanan3",
];

const UploadFaceRecog = ({
  labelFor,
  imgSource,
  footer,
  onChange,
  hasPhoto,
  userId,
}) => {
  const [progress, setProgress] = useState(0);
  const [loadModels, setLoadModels] = useState(1);
  const index = lables.indexOf(labelFor);

  const checkProgress = (uploadProgress) => {
    if (uploadProgress <= 100) {
      return setProgress(uploadProgress);
    }

    setTimeout(() => {
      setProgress(0);
    }, 500);
  };

  const getFileUrl = (fileUrl, e) => {
    if (fileUrl) {
      onChange(e, fileUrl);
    }
  };

  const deleteFileUrl = async (fileUrl, e) => {
    const userRef = db.collection("faces").doc(`${userId}`);
    const faceData = await userRef.get();
    const descriptors = faceData.data();
    delete descriptors.descriptors[index];
    const data = {
      userId: userId,
      descriptors: { ...descriptors.descriptors },
    };
    const res = await userRef.update(data);
    // console.log(data);
    let event = {
      target: {
        name: e,
      },
    };
    onChange(event, fileUrl);
  };

  const checkFace = async (e) => {
    const img = await faceapi.bufferToImage(e.target.files[0]);
    const detections = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();
    // console.log(detections);
    if (detections) {
      const data = {
        userId: userId,
        descriptors: { [index]: Array.from(detections.descriptor) },
      };
      const res = await db
        .collection("faces")
        .doc(`${userId}`)
        .set(data, { merge: true });
      uploadFileToServer(e);
    } else {
      // console.log("muka tidak ditemukan");
    }
  };
  const uploadFileToServer = async (e) => {
    await uploadFile(e.target.files[0], checkProgress, (fileUrl) =>
      getFileUrl(fileUrl, e)
    );
  };

  useEffect(() => {
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    ]).then(setLoadModels(0));
  }, []);

  return (
    <>
      <LoadingProgress progress={progress} />
      <div className="text-center">
        {hasPhoto ? (
          <>
            <div className="card border-0 pointer">
              <img
                src={imgSource}
                alt={labelFor}
                className="w-100 img-fit-cover"
                style={{
                  height: "225px",
                  borderRadius: "10px 10px 0 0",
                }}
              />
            </div>
            <div
              className="card-footer card-footer-ss bg-danger p-2 fw-bold text-white text-center pointer"
              onClick={() => deleteFileUrl("", labelFor)}
            >
              <FaTrashAlt className="me-2" />
              Hapus Foto
            </div>
          </>
        ) : (
          <label htmlFor={labelFor}>
            <div className="card border-0 pointer">
              <img
                src={imgSource}
                alt={labelFor}
                className="w-100 img-fit-cover"
                style={{
                  height: "225px",
                  borderRadius: "10px 10px 0 0",
                }}
              />
              <div className="card-footer card-footer-ss bg-primary p-2 fw-bold text-white text-center">
                <img
                  src="/img/upload-file-white.svg"
                  alt="upload-file-white"
                  className="me-2"
                />
                Unggah Foto
              </div>
            </div>
          </label>
        )}
        <h6 className="fs-14-ss fw-bold color-secondary mt-3">{footer}</h6>
        <input
          type="file"
          disabled={loadModels}
          name={labelFor}
          id={labelFor}
          accept="image/jpeg, image/jpg, img/png"
          className="d-none"
          onChange={checkFace}
        />
      </div>
    </>
  );
};

export default UploadFaceRecog;
