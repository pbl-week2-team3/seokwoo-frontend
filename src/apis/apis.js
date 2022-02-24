import axios from "axios";
import { history } from "../redux/configureStore";


const api = axios.create({
  baseUrl: "http://onlyonep.shop",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["X-AUTH-TOKEN"] = `${accessToken}`;
  return config;
});

export const apis = {
  // post
  // posts: () => api.get("/api/posts.json"),
  // post: (postId) => api.get(`/api/post/${postId}.json`),
  // add: (userId, contents, img_url) => api.post("/api/post.json", {userId, contents, img_url}),
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
  signup: (data) => 
    api
      .post("/api/register", 
        data
      )
      .then((result) => {
        console.log("fin");
        console.log("res : ", result);
        history.push("/");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
      }),
  login: (id, password) => api.get("/api/login.json", { id, password }),
  getLoginUserInfo: () => api.get("/api/loginUser.json"),
};
