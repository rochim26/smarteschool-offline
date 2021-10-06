import client from "./ApiClient";

export const getGuruJurusan = () => {
  return client("guru-jurusan");
};

export const postGuruJurusan = (payload) => {
  return client("guru-jurusan", {
    method: "POST",
    body: payload,
  });
};

export const editGuruJurusan = (id, payload) => {
  return client(`guru-jurusan/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteGuruJurusan = (id) => {
  return client(`guru-jurusan/${id}`, {
    method: "DELETE",
  });
};
