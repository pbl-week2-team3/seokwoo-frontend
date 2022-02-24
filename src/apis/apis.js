import axios from "axios";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie"

const api = axios.create({
  baseURL: "http://onlyonep.shop"
});

// Alter defaults after instance has been created
//api.defaults.headers.common['Authorization'] = AUTH_TOKEN;

api.interceptors.request.use(function (config) {
  const accessToken = getCookie("token");
  config.headers.common["token"] = `${accessToken}`;
  return config;
});

export const apis = {
  // post
  post: () => api.get("/api/post"),
  // post: (postId) => api.get(`/api/post/${postId}.json`),
   add: (data) => api.post("/api/post", data),
  // delete: (postId) => api.delete(`/api/post/${postId}.json`),
  // edit: (postId, contents, imgUrl) => api.put(`/api/post/${postId}.json`, {contents, imgUrl}),

  // comment
  // alarm: () => api.get("/api/alarm"),
  // addComment: (postId, text) => api.post(`/api/comment/${postId}`, {text}),
  // editComment: (postId, commentId, text) => api.put(`/api/comment/${postId}/${commentId}`, {text}),
  // deleteComment: (postId, commentId) => api.put(`/api/comment/${postId}/${commentId}`),

  // like
  // addLike: (postId) => api.post(`/api/post/${postId}/like`),
  // cancelLike: (postId) => api.delete(`/api/post/${postId}/like`),

  // user
  signup: (data) => api.post("/api/register", data).then((res)=>{console.log("res : ",res)}),
  login: (data) => api.post("/api/login", data ),
  getLoginUserInfo: () => api.get("/api/loginUser.json"),
};
