import client from "./ApiClient";

export const getMateri = (params) => {
  return client("materi", { params });
};

export const getDetailMateri = (id) => {
  return client(`materi/${id}`);
};

export const postMateri = (body) => {
  return client("materi", {
    body,
    method: "POST",
  });
};

export const editMateri = (body, id) => {
  return client(`materi/${id}`, {
    method: "PUT",
    body,
  });
};

export const postMateriKesimpulan = (body) => {
  return client(`materi-kesimpulan`, {
    method: "POST",
    body,
  });
};

export const editMateriKesimpulan = (body, id) => {
  return client(`materi-kesimpulan/${id}`, {
    method: "PUT",
    body,
  });
};

export const deleteMateri = (id) => {
  return client(`materi/${id}`, {
    method: "DELETE",
  });
};
