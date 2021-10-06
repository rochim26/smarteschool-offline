import client from "./ApiClient";

export const getProvince = (params) => {
  return client("province", { params });
};

export const getRegency = (params) => {
  return client(`regency`, { params });
};

export const getDistrict = (params) => {
  return client(`district`, { params });
};

export const getVillage = (params) => {
  return client(`village`, { params });
};
