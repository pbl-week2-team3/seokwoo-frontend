import { atom, selector} from "recoil";
import { apis } from "../apis/apis";

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

	async function increaseLikeCount(postId) {
		await apis.addLike(postId)
					.then((res)=>{
						console.log("addLike res : ",res)
					})
					.catch((err)=>{
						console.log("addLike err : ",err)
					});
	}

	async function decreaseLikeCount(postId) {
		await apis.cancelLike(postId)
					.then((res)=>{
						console.log("cancelLike res : ",res)
					})
					.catch((err)=>{
						console.log("cancelLike err : ",err)
					});
	}

	return {increaseLikeCount, decreaseLikeCount};
}