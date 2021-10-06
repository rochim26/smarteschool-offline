import client from "./ApiClient";

export const getBabPeraturan = () => {
  return client("tatatertib/peraturan");
}

export const getDetailBabPeraturan = (id) => {
  return client("tatatertib/peraturan/" + id);
}

export const postBabPeraturan = (payload) => {
  return client("tatatertib/peraturan", {
    method: "POST",
    body: payload,
  });
};

export const updateBabPeraturan = (payload, id) => {
  return client("tatatertib/peraturan/" + id, {
    method: "PUT",
    body: payload,
  });
};

export const deleteBabPeraturan = (id) => {
  return client(`tatatertib/peraturan/${id}`, {
    method: "DELETE",
  });
};

export const postPasalPeraturan = (payload, id) => {
  return client("tatatertib/peraturan/" + id, {
    method: "POST",
    body: payload,
  });
};

export const updatePasalPeraturan = (payload, id) => {
  return client("tatatertib/pasal/" + id, {
    method: "PUT",
    body: payload,
  });
};

export const postPenghargaan = (payload) => {
  return client("tatatertib/penghargaan", {
    method: "POST",
    body: payload,
  });
};

export const getPenghargaan = () => {
  return client("prestasi1");
}

export const updatePenghargaan = (payload, id) => {
  return client("tatatertib/penghargaan/" + id, {
    method: "PUT",
    body: payload,
  });
};

export const deletePenghargaan = (id) => {
  return client("tatatertib/penghargaan/" + id, {
    method: "DELETE",
  });
};

export const postKategoriPelanggaran = (payload) => {
  return client("tatatertib/kategori", {
    method: "POST",
    body: payload,
  });
};

export const updateKategoriPelanggaran = (payload, id) => {
  return client("tatatertib/kategori/" + id, {
    method: "PUT",
    body: payload,
  });
};

export const getKategoriPelanggaran = () => {
  return client("tatatertib");
}

export const deleteKategoriPelanggaran = (id) => {
  return client("tatatertib/kategori/" + id, {
    method: "DELETE",
  });
};

export const getDetailPelanggaran = (id) => {
  return client("tatatertib/kategori/" + id);
}

export const postBentukPelanggaran = (payload, id) => {
  return client("tatatertib/pelanggaran/" + id, {
    method: "POST",
    body: payload,
  });
};

export const updateBentukPelanggaran = (payload, id) => {
  return client("tatatertib/pelanggaran/" + id, {
    method: "PUT",
    body: payload,
  });
};

export const deleteBentukPelanggaran = (id) => {
  return client("tatatertib/pelanggaran/" + id, {
    method: "DELETE",
  });
};

export const postSanksiPelanggaran = (payload) => {
  return client("tatatertib/sanksi", {
    method: "POST",
    body: payload,
  });
};

export const getSanksiPelanggaran = () => {
  return client("tatatertib/sanksi");
}

export const updateSanksiPelanggaran = (payload, id) => {
  return client("tatatertib/sanksi/" + id, {
    method: "PUT",
    body: payload,
  });
};

export const deleteSanksiPelanggaran = (id) => {
  return client("tatatertib/sanksi/" + id, {
    method: "DELETE",
  });
};

export const getRombel = (params) => {
  return client("tatatertib/rombel", { params });
}

export const getDetailRombel = (id) => {
  return client("tatatertib/rombel/" + id);
}

export const getDetailSiswa = (id) => {
  return client("tatatertib/siswa/" + id);
}

export const postPelanggaranSiswa = (id, payload) => {
  return client("tatatertib/siswa/" + id, {
    method: "POST",
    body: payload,
  });
}

export const editPelanggaranSiswa = (id, payload) => {
  return client("tatatertib/siswa/pelanggaran/" + id, {
    method: "PUT",
    body: payload,
  });
}

export const deletePelanggaranSiswa = (id) => {
  return client("tatatertib/siswa/pelanggaran/" + id, {
    method: "DELETE",
  });
};

export const postSanksiSiswa = (id, payload) => {
  return client("tatatertib/siswa/sanksi/" + id, {
    method: "POST",
    body: payload,
  });
}

export const postPenghargaanSiswa = (payload) => {
  return client("tatatertib/siswa/prestasi", {
    method: "POST",
    body: payload,
  });
}

export const deletePenghargaanSiswa = (prestasiId) => {
  return client(`tatatertib/siswa/prestasi/${prestasiId}`, {
    method: "DELETE"
  });
}

export const updatePenghargaanSiswa = (payload, prestasiId) => {
  return client(`tatatertib/siswa/prestasi/${prestasiId}`, {
    method: "PUT",
    body: payload,
  });
}

export const postBuktiPelaksanaanSanksi = (payload, userId) => {
  return client(`tatatertib/siswa/bukti-sanksi/${userId}`, {
    method: "POST",
    body: payload,
  });
}

export const updateBuktiPelaksanaanSanksi = (payload, buktiId) => {
  return client(`tatatertib/siswa/bukti-sanksi/${buktiId}`, {
    method: "PUT",
    body: payload,
  });
}
