import client from "./ApiClient";

export const getSlider = () => {
  return client("slider");
};

export const postSlider = (payload) => {
  return client("slider", {
    method: "POST",
    body: payload,
  });
};

export const editSlider = (id, payload) => {
  return client(`slider/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteSlider = (id) => {
  return client(`slider/${id}`, {
    method: "DELETE",
  });
};
