import client from "./ApiClient";

export const getKegiatan = (params) => {
  return client("kegiatan", { params });
};

export const getKegiatanGaleri = (params) => {
  return client("kegiatan-galeri", { params });
}

export const getDetailKegiatanGaleri = (id, params) => {
  return client(`kegiatan-galeri/${id}`, { params });
}

export const postKegiatanGaleri = (payload) => {
  return client(`kegiatan-galeri`, {
    method: "POST",
    body: payload,
  });
};

export const updateKegiatanGaleri = (id, payload) => {
  return client(`kegiatan-galeri/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteKegiatanGaleri = (id) => {
  return client(`kegiatan-galeri/${id}`, {
    method: "DELETE",
  });
};


export const postKegiatan = (payload) => {
  return client(`kegiatan`, {
    method: "POST",
    body: payload,
  });
};

export const updateKegiatan = (id, payload) => {
  return client(`kegiatan/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteKegiatan = (id) => {
  return client(`kegiatan/${id}`, {
    method: "DELETE",
  });
};
