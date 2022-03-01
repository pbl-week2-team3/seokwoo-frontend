// import { createAction, handleActions } from "redux-actions";
// import { produce } from "immer";
// import { firestore, storage, firebase } from "../../shared/firebase";
// import "moment";
// import moment from "moment";

// import { actionCreators as imageActions } from "./image";
// import { CloseOutlined } from "@material-ui/icons";

// const SET_POST = "SET_POST";
// const ADD_POST = "ADD_POST";
// const EDIT_POST = "EDIT_POST";
// const LOADING = "LOADING";
// const DELETE_POST = "DELETE_POST";
// const LIKE_POST = "LIKE_POST";

// const setPost = createAction(SET_POST, (post_list, paging) => ({
//   post_list,
//   paging,
// }));
// const addPost = createAction(ADD_POST, (post) => ({ post }));
// const editPost = createAction(EDIT_POST, (post_id, post) => ({
//   post_id,
//   post,
// }));
// const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
// const likePost = createAction(LIKE_POST, (post_id,_user_id, like_status) => ({
//   post_id,
//   _user_id,
//   like_status,
// }));
// const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// const initialState = {
//   list: [],
//   paging: { start: null, next: null, size: 3 },
//   is_loading: false,
// };

// const initialPost = {
//   // id: 0,
//   // user_info: {
//   //   user_name: "mean0",
//   //   user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
//   // },
//   image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
//   contents: "",
//   comment_cnt: 0,
//   insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
//   like: [],
//   like_cnt: 0,
// };

// const likePostFB = (post_id = null, like_status = false) => {
//   return function (dispatch, getState, { history }) {
//     const _user = getState().user.user;

//     const postDBRef = firestore.collection("post").doc(post_id);

//     if (!like_status) {
//       const increment = firebase.firestore.FieldValue.increment(1);

//       postDBRef
//         .update({
//           like: firebase.firestore.FieldValue.arrayUnion(_user.uid),
//           like_cnt: increment,
//         })
//         .then((doc) => {
//           dispatch(likePost(post_id,_user.uid ,true));
//           history.replace("/");
//         });
//     } else {
//       const increment = firebase.firestore.FieldValue.increment(-1);

//       postDBRef
//         .update({
//           like: firebase.firestore.FieldValue.arrayRemove(_user.uid),
//           like_cnt: increment,
//         })
//         .then((doc) => {
//           dispatch(likePost(post_id, _user.uid, false));
//           history.replace("/");
//         });
//     }

//     return;
//   };
// };

// const editPostFB = (post_id = null, post = {}) => {
//   return function (dispatch, getState, { history }) {
//     if (!post_id) {
//       console.log("게시물 정보가 없어요!");
//       return;
//     }

//     const _image = getState().image.preview;

//     const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
//     const _post = getState().post.list[_post_idx];

//     console.log(_post);

//     const postDB = firestore.collection("post");

//     if (_image === _post.image_url) {
//       postDB
//         .doc(post_id)
//         .update(post)
//         .then((doc) => {
//           dispatch(editPost(post_id, { ...post }));
//           history.replace("/");
//         });

//       return;
//     } else {
//       const user_id = getState().user.user.uid;
//       const _upload = storage
//         .ref(`images/${user_id}_${new Date().getTime()}`)
//         .putString(_image, "data_url");

//       _upload.then((snapshot) => {
//         snapshot.ref
//           .getDownloadURL()
//           .then((url) => {
//             console.log(url);

//             return url;
//           })
//           .then((url) => {
//             postDB
//               .doc(post_id)
//               .update({ ...post, image_url: url })
//               .then((doc) => {
//                 dispatch(editPost(post_id, { ...post, image_url: url }));
//                 history.replace("/");
//               });
//           })
//           .catch((err) => {
//             window.alert("앗! 이미지 업로드에 문제가 있어요!");
//             console.log("앗! 이미지 업로드에 문제가 있어요!", err);
//           });
//       });
//     }
//   };
// };

// const addPostFB = (contents = "", type_num = "1") => {
//   return function (dispatch, getState, { history }) {
//     const postDB = firestore.collection("post");

//     const _user = getState().user.user;

//     const user_info = {
//       user_name: _user.user_name,
//       user_id: _user.uid,
//       user_profile: _user.user_profile,
//     };

//     const _post = {
//       ...initialPost,
//       contents: contents,
//       type_num: type_num,
//       insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
//     };

//     const _image = getState().image.preview;

//     console.log(_image);
//     console.log(typeof _image);

//     const _upload = storage
//       .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
//       .putString(_image, "data_url");

//     console.log("_upload : /", _upload);

//     _upload.then((snapshot) => {
//       snapshot.ref
//         .getDownloadURL()
//         .then((url) => {
//           console.log(url);

//           return url;
//         })
//         .then((url) => {
//           postDB
//             .add({ ...user_info, ..._post, image_url: url })
//             .then((doc) => {
//               let post = { user_info, ..._post, id: doc.id, image_url: url };
//               dispatch(addPost(post));
//               history.replace("/");

//               dispatch(imageActions.setPreview(null));
//             })
//             .catch((err) => {
//               window.alert("앗! 포스트 작성에 문제가 있어요!");
//               console.log("post 작성에 실패했어요!", err);
//             });
//         })
//         .catch((err) => {
//           window.alert("앗! 이미지 업로드에 문제가 있어요!");
//           console.log("앗! 이미지 업로드에 문제가 있어요!", err);
//         });
//     });
//   };
// };

// const getPostFB = (start = null, size = 3) => {
//   return function (dispatch, getState, { history }) {
//     let _paging = getState().post.paging;

//     //next가 없을 때, 마지막일 때
//     if (_paging.start && !_paging.next) {
//       return;
//     }

//     dispatch(loading(true));
//     const postDB = firestore.collection("post");

//     let query = postDB.orderBy("insert_dt", "desc");

//     if (start) {
//       query = query.startAt(start);
//     }

//     query
//       .limit(size + 1)
//       .get()
//       .then((docs) => {
//         let post_list = [];

//         let paging = {
//           start: docs.docs[0],
//           //paging 인피니티 스크롤 부분, paging에 필요한 갯수보다 1개 더 많은 post를 가져오고 갯수가 모자랄 경우 마지막페이지로 간주
//           next:
//             docs.docs.length === size + 1
//               ? docs.docs[docs.docs.length - 1]
//               : null,
//           size: size,
//         };

//         docs.forEach((doc) => {
//           let _post = doc.data();

//           // ['commenct_cnt', 'contents', ..]
//           let post = Object.keys(_post).reduce(
//             (acc, cur) => {
//               if (cur.indexOf("user_") !== -1) {
//                 return {
//                   ...acc,
//                   user_info: { ...acc.user_info, [cur]: _post[cur] },
//                 };
//               }
//               return { ...acc, [cur]: _post[cur] };
//             },
//             { id: doc.id, user_info: {} }
//           );

//           post_list.push(post);
//         });
//         //이유가 뭐였더라?
//         post_list.pop();

//         console.log("getPostDB : ", post_list);

//         dispatch(setPost(post_list, paging));
//       });
//   };
// };

// const getOnePostFB = (id) => {
//   return function (dispatch, getState, { history }) {
//     const postDB = firestore.collection("post");
//     postDB
//       .doc(id)
//       .get()
//       .then((doc) => {
//         console.log(doc);
//         console.log(doc.data());

//         let _post = doc.data();
//         let post = Object.keys(_post).reduce(
//           (acc, cur) => {
//             if (cur.indexOf("user_") !== -1) {
//               return {
//                 ...acc,
//                 user_info: { ...acc.user_info, [cur]: _post[cur] },
//               };
//             }
//             return { ...acc, [cur]: _post[cur] };
//           },
//           { id: doc.id, user_info: {} }
//         );

//         dispatch(setPost([post]));
//       });
//   };
// };

// const deletePostFB = (id) => {
//   return function (dispatch, getState, { history }) {
//     const postDB = firestore.collection("post");
//     postDB
//       .doc(id)
//       .delete()
//       .then((result) => {
//         console.log("deletePostFB : ", result);
//         dispatch(deletePost(id));
//       });

//     history.replace("/");
//   };
// };

// export default handleActions(
//   {
//     [SET_POST]: (state, action) =>
//       produce(state, (draft) => {
//         draft.list.push(...action.payload.post_list);

//         draft.list = draft.list.reduce((acc, cur) => {
//           if (acc.findIndex((a) => a.id === cur.id) === -1) {
//             return [...acc, cur];
//           } else {
//             acc[acc.findIndex((a) => a.id === cur.id)] = cur;
//             return acc;
//           }
//         }, []);

//         if (action.payload.paging) {
//           draft.paging = action.payload.paging;
//         }

//         draft.is_loading = false;
//       }),

//     [ADD_POST]: (state, action) =>
//       produce(state, (draft) => {
//         draft.list.unshift(action.payload.post);
//       }),
//     [EDIT_POST]: (state, action) =>
//       produce(state, (draft) => {
//         let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

//         draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
//       }),
//     [LOADING]: (state, action) =>
//       produce(state, (draft) => {
//         draft.is_loading = action.payload.is_loading;
//       }),

//     [DELETE_POST]: (state, action) =>
//       produce(state, (draft) => {
//         console.log("before Delete");

//         draft.list = draft.list.filter((l, idx) => {
//           console.log("Deletion : ", l.id, action.payload.post_id);
//           return action.payload.post_id !== l.id;
//         });

//         console.log("after Delete");
//       }),

//     [LIKE_POST]: (state, action) =>
//       produce(state, (draft) => {

//         const _user_id = action.payload._user_id;

//         let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

//         if (!action.payload.like_status){
          
//           draft.list[idx].like.filter((x,idx) => {
//             return x.id !== _user_id
//           })
//           draft.list[idx].like_cnt-=1
          
//         }else {

//           draft.list[idx].like.push(_user_id)
//           draft.list[idx].like_cnt+=1

//         }

//         console.log("after likePost", !action.payload.like_status);
//       }),
//   },
//   initialState
// );

// const actionCreators = {
//   setPost,
//   addPost,
//   editPost,
//   getPostFB,
//   addPostFB,
//   editPostFB,
//   getOnePostFB,
//   deletePostFB,
//   likePostFB,
// };

// export { actionCreators };
