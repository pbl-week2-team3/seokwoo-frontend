import { atom, selector, useSetRecoilState } from "recoil";
import { apis } from "../apis/apis";
import { postState } from "../recoil/post";

// atoms
export const likeState = atom({
  key: "likeState",
  default: [],
});

// selectors
export const whoLikeListSelector = selector({
  key: "get/getLikeCount",
  get: async () => {},
});

// action hooks
export function useLikeActions() {
  const setPostState = useSetRecoilState(postState);

  async function increaseLikeCount(postId) {
    await apis
      .addLike(postId)
      .then((res) => {
        console.log("addLike res : ", res);
        apis
          .post(0, 4)
          .then((result) => {
            console.log("res : ", result);

            setPostState(result.data.posts);

          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log("error catch : ", errorCode, errorMessage);
          });
      })
      .catch((err) => {
        console.log("addLike err : ", err);
      });
  }

  async function decreaseLikeCount(postId) {
    await apis
      .cancelLike(postId)
      .then((res) => {
        console.log("cancelLike res : ", res);
        apis
          .post(0, 4)
          .then((result) => {
            console.log("res : ", result);

            setPostState(result.data.posts);

          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log("error catch : ", errorCode, errorMessage);
          });
      })
      .catch((err) => {
        console.log("cancelLike err : ", err);
      });
  }

  return { increaseLikeCount, decreaseLikeCount };
}
