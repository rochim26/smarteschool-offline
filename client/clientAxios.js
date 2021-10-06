import axios from "axios";

export const baseURL = "http://localhost:8080";
// export const baseURL = "http://localhost:8080";

// ROOT URL
export const ssURL = "/smartschool";
export const webURL = "/web";
export const adminURL = "/admin";
export const bkkURL = "/bkk";
export const ppdbURL = "/ppdb";
export const btURL = "/buku-tamu";

export const postTagRpp = (id) =>
  `https://ayoguruberbagi.kemdikbud.go.id/wp-json/wp/v2/post-tag?post=${id}`;
export const rppMapelRpp = (id) =>
  `https://ayoguruberbagi.kemdikbud.go.id/wp-json/wp/v2/rpp-mapel?post=${id}`;
export const userRpp = (id) =>
  `https://ayoguruberbagi.kemdikbud.go.id/wp-json/wp/v2/users/${id}`;

export const axiosInstance = axios.create({
  baseURL,
  timeout: 0,
});
