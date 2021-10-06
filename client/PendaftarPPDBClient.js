import client from "./ApiClient";

export const getPendaftarPPDB = () => {
  return client("pendaftar-ppdb");
};

export const detailPendaftarPPDB = (id) => {
  return client(`pendaftar-ppdb/${id}`);
};

export const postPendaftarPPDB = (payload) => {
  return client("pendaftar-ppdb", {
    method: "POST",
    body: payload,
  });
};

export const editPendaftarPPDB = (id, payload) => {
  return client(`pendaftar-ppdb/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const konfirmasiPendaftarPPDB = (id, payload) => {
  return client(`pendaftar-ppdb/${id}/konfirmasi`, {
    method: "PUT",
    body: payload,
  });
};

export const deletePendaftarPPDB = (id) => {
  return client(`pendaftar-ppdb/${id}`, {
    method: "DELETE",
  });
};
