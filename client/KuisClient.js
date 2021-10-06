import client from "./ApiClient";

export const getKuis = (params) => {
  return client("soal-kuis", { params });
};

export const postKuis = (body) => {
  return client("soal-kuis", {
    body,
    method: "POST",
  });
};

export const editKuis = (body, id) => {
  return client(`soal-kuis/${id}`, {
    method: "PUT",
    body,
  });
};

export const deleteKuis = (id) => {
  return client(`soal-kuis/${id}`, {
    method: "DELETE",
  });
};
