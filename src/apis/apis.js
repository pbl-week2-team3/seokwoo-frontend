import axios from "axios";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie"

const api = axios.create({
  baseURL: "http://52.78.200.34"
});

// 민수님 : http://onlyonep.shop

// 정용님 : http://xpecter.shop

// 승민님 : http://52.78.200.34

// Alter defaults after instance has been created
//api.defaults.headers.common['Authorization'] = AUTH_TOKEN;

api.interceptors.request.use(function (config) {
  const accessToken = getCookie("token");
  config.headers.common["token"] = `${accessToken}`;
  //config.headers.common["authorization"] = `Bearer ${accessToken}`;
  return config;
});

export const apis = {

  // post
  post: (lastpost, number) => api.get(`/api/post?lastpost=${lastpost}&number=${number}`),
  postDetail: (postId) => api.get(`/api/post/${postId}`),
  add: (data) => api.post("/api/post", data),
  delete: (postId) => api.delete(`/api/post/${postId}`),
  edit: (postId, data) => api.put(`/api/post/${postId}`, data),

  // comment
  // alarm: () => api.get("/api/alarm"),
  // addComment: (postId, text) => api.post(`/api/comment/${postId}`, {text}),
  // editComment: (postId, commentId, text) => api.put(`/api/comment/${postId}/${commentId}`, {text}),
  // deleteComment: (postId, commentId) => api.put(`/api/comment/${postId}/${commentId}`),

  // like
  addLike: (postId) => api.post(`/api/post/${postId}/like`),
  cancelLike: (postId) => api.delete(`/api/post/${postId}/like`),

  // user
  signup: (data) => api.post("/api/register", data),
  login: (data) => api.post("/api/login", data ),
  getLoginUserInfo: () => api.get("/api/loginUser.json"),
};
