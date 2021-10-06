import { db } from "../config/config";

const jadwalUjianRef = db.collection("jadwal-ujian");

export const getDetailJadwalUjianRef = async (id, setState) => {
  jadwalUjianRef
    .where("tk_jadwal_ujian_id", "==", parseInt(id))
    .onSnapshot((snapshot) => {
      if (snapshot.size) {
        const snapshotData = [];
        snapshot.forEach((doc) => {
          snapshotData.push({ ...doc.data() });
        });
        setState(snapshotData);
      } else {
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
        }
        if (change.type === "modified") {
        }
        if (change.type === "removed") {
        }
      });
    });
};

export const putJadwalUjianRef = async (payload) => {
  await jadwalUjianRef.doc(`${payload.docId}`).set(
    {
      tk_jadwal_ujian_id: payload.tkJadwalUjianId,
      user_id: payload.userId,
      progress: payload.progress,
    },
    { merge: true }
  );
};
