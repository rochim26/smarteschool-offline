import client from "./ApiClient";

export const getPerpus = (params) => {
  return client("perpus", { params });
};

export const detailPerpus = (id, params) => {
  return client(`perpus/${id}`, { params });
};

export const postPerpus = (body) => {
  return client("perpus", {
    body,
    method: "POST",
  });
};

export const postPerpusAktivitas = (body) => {
  return client("perpus-aktivitas", {
    body,
    method: "POST",
  });
};

export const putPerpus = (id, body) => {
  return client(`perpus/${id}`, {
    method: "PUT",
    body,
  });
};

export const deletePerpus = (id) => {
  return client(`perpus/${id}`, {
    method: "DELETE",
  });
};

export const perpusKomen = (body) => {
  return client("perpus-komen", {
    body,
    method: "POST",
  });
}

export const deletePerpusKomen = (id) => {
  return client(`perpus-komen/${id}`, {
    method: "DELETE",
  });
};