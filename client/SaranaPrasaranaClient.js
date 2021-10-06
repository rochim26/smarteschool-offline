import client from "./ApiClient";

export const getSarana = (params) => {
  return client("lokasi", { params });
};

export const getSaranaDetail = (id) => {
  return client(`lokasi/${id}`);
};

export const postSarana = (payload) => {
  return client("lokasi", {
    method: "POST",
    body: payload,
  });
};

export const updateSarana = (id, payload) => {
  return client(`lokasi/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteSarana = (id) => {
  return client(`lokasi/${id}`, {
    method: "DELETE",
  });
};

export const dowloadSarana = () => {
  return client("lokasi/download", {
    method: "POST"
  });
}