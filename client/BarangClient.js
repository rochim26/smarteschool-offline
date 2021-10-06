import client from "./ApiClient";

export const getBarang = (params) => {
  return client("barang", { params });
};

export const getBarangDetail = (id) => {
  return client(`barang/${id}`);
};

export const postBarang = (payload) => {
  return client("barang", {
    method: "POST",
    body: payload,
  });
};

export const updateBarang = (id, payload) => {
  return client(`barang/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteBarang = (id) => {
  return client(`barang/${id}`, {
    method: "DELETE",
  });
};

export const dowloadBarang = () => {
  return client("barang/download", {
    method: "POST"
  });
}