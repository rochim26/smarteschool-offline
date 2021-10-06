import client from "./ApiClient";

export const getBukuTamu = (params) => {
  return client("buku-tamu", { params });
};

export const getDetailBukuTamu = (id) => {
  return client(`buku-tamu/${id}`);
};

export const postBukuTamu = (body) => {
  return client("buku-tamu", {
    body,
    method: "POST",
  });
};

export const deleteBukuTamu = (id) => {
  return client(`buku-tamu/${id}`, {
    method: "DELETE",
  });
};
