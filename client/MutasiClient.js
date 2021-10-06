import client from "./ApiClient";

export const getMutasi = (params) => {
  return client("mutasi", { params });
};

export const postMutasi = (body) => {
  return client("mutasi", {
    body,
    method: "POST",
  });
};

export const downloadMutasi = (body) => {
  return client("mutasi/download-mutasi", {
    body,
    method: "POST",
  });
};

export const editMutasi = (body, id) => {
  return client(`mutasi/${id}`, {
    body,
    method: "PUT",
  });
};

export const deleteMutasi = (id) => {
  return client(`mutasi/${id}`, {
    method: "DELETE",
  });
};
