import client from "./ApiClient";

export const getAbsen = (params) => {
  return client("absen", { params });
};

export const getDetailAbsen = (id, params) => {
  return client(`absen/${id}`, { params });
};

export const detailAbsen = (params) => {
  return client("absen/me", { params });
};

export const postAbsen = (payload) => {
  return client("absen", {
    method: "POST",
    body: payload,
  });
};

export const downloadAbsen = (payload) => {
  return client("absen/download-absen", {
    method: "POST",
    body: payload,
  });
};

export const downloadAbsenRombel = (payload) => {
  return client("absen/rombel", {
    method: "POST",
    body: payload,
  });
};

export const editAbsen = (id, payload) => {
  return client(`absen/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteAbsen = (id) => {
  return client(`absen/${id}`, {
    method: "DELETE",
  });
};
