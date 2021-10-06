import client from "./ApiClient";

export const getSurel = (params) => {
  return client("surel", { params });
};

export const detailSurel = (id) => {
  return client(`surel/${id}`);
};

export const postSurel = (payload) => {
  return client("surel", {
    method: "POST",
    body: payload,
  });
};

export const editSurel = (id, payload) => {
  return client(`surel/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const editSurelDibaca = (payload) => {
  return client(`surel-dibaca`, {
    method: "PUT",
    body: payload,
  });
};

export const postSurelDiarsip = (payload) => {
  return client(`surel-arsip`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteSurel = (payload) => {
  return client(`surel-tipe`, {
    method: "DELETE",
    body: payload,
  });
};

export const editPinArsip = (id) => {
  return client(`surel-arsip/pin/${id}`, {
    method: "PUT",
  });
};

export const deleteArsip = (id) => {
  return client(`surel-arsip/${id}`, {
    method: "DELETE",
  });
};

export const postArsip = (payload) => {
  return client("surel-arsip", {
    method: "POST",
    body: payload,
  });
};

export const editArsip = (id, payload) => {
  return client(`surel-arsip/${id}`, {
    method: "PUT",
    body: payload,
  });
};
