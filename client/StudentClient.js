import client from "./ApiClient";

export const getStudent = (params) => {
  return client("siswa", { params });
};

export const postStudent = (payload) => {
  return client("siswa", {
    method: "POST",
    body: payload,
  });
};

export const editStudent = (id, payload) => {
  return client(`siswa/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const editStudentFoto = (id, payload) => {
  return client(`avatar-siswa/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteStudent = (id, payload) => {
  return client(`siswa/${id}`, {
    method: "DELETE",
    body: payload,
  });
};
