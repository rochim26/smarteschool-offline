import client from "./ApiClient";

export const getBlog = (params) => {
  return client("blog", { params });
};

export const getPost = (params) => {
  return client("post", { params });
};

export const getDetailBlog = (id) => {
  return client(`blog/${id}`);
};

export const getDetailPost = (id) => {
  return client(`post/${id}`);
};

export const postPost = (body) => {
  return client("post", {
    body,
    method: "POST",
  });
};

export const editPost = (body, id) => {
  return client(`post/${id}`, {
    method: "PUT",
    body,
  });
};

export const deletePost = (id) => {
  return client(`post/${id}`, {
    method: "DELETE",
  });
};
