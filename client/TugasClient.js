import client from "./ApiClient";

export const getTugas = (params) => {
  return client("tugas", { params });
};

export const getDetailTugas = (id) => {
  return client(`tugas/${id}`);
};

export const postTugas = (body) => {
  return client("tugas", {
    body,
    method: "POST",
  });
};

export const editTugas = (body, id) => {
  return client(`tugas/${id}`, {
    method: "PUT",
    body,
  });
};

export const deleteTugas = (id) => {
  return client(`tugas/${id}`, {
    method: "DELETE",
  });
};
