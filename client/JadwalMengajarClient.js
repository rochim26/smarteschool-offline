import client from "./ApiClient";

export const getJadwalMengajar = (params) => {
  return client("jadwal-mengajar", { params });
};

export const getJadwalMengajarPertemuan = (params) => {
  return client("jadwal-mengajar/pertemuan", { params });
};

export const editJadwalMengajar = (id, body) => {
  return client(`jadwal-mengajar/${id}`, {
    method: "PUT",
    body,
  });
};

export const downloadMonev = (body) => {
  return client(`download/monev`, {
    method: "POST",
    body,
  });
};
