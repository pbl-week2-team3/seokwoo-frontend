import { atom, selector, selectorFamily } from "recoil";
import { apis } from "../apis/apis";
import { history } from "../redux/configureStore";
import { useRecoilValue, useSetRecoilState } from "recoil"
import { preview } from "./preview"
import { storage } from "../shared/firebase";
import { loginUserState } from "./users";

// atoms
export const postState = atom({
	key: "postState",
	default: [],
});

export const postSelected = atom({
	key: "postSelected",
	default: [],
});

// selectors
export const postSelector = selector({
	key: "postSelector",
	get: async () => {
		const { data } = await apis.posts();
		return data;
	},
	set: ({ set }, newPost) => {
		set(postState, (prevState) => ({
			...prevState,
			newPost,
		}));
	},
});

export const singlePostSelector = selectorFamily({
	key: "singlePostSelector",
	get: (postId) => async () => {
		const data = await apis.post(postId);
		return data;
	}
});


// action hooks
// createPost, editPost, deletsPost
export function usePostActions() {

	const image = useRecoilValue(preview)
	const user = useRecoilValue(loginUserState)
	const userId = localStorage.getItem("userId")
	const setPostSelected = useSetRecoilState(postSelected);

	async function createPost(text, type_num) {

		
		//이미지 firebase 업로드
		console.log("image : ", image)

		const _upload = storage
		.ref(`images/${userId}_${new Date().getTime()}`)
		.putString(image, "data_url");
  
	  	console.log("_upload : /", _upload);

		const url = await (await _upload).ref.getDownloadURL()

		console.log("image URL from firebase : ",url)
		
		const data = {
			//user_id : userId,
			content : text,
			img_url : url,
			type : type_num
		}

		apis
			.add(data)
			.then((result)=>{
				console.log("res : ",result)
				history.push("/")
			}).catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;

				console.log("error catch : ",errorCode, errorMessage);
			});


	}

	async function editPost(postId, contents) {

		//이미지 firebase 업로드
		console.log("image : ", image)

		const _upload = storage
		.ref(`images/${userId}_${new Date().getTime()}`)
		.putString(image, "data_url");
  
	  	console.log("_upload : /", _upload);

		const url = await (await _upload).ref.getDownloadURL()

		console.log("image URL from firebase : ",url)
		
		const data = {
			contents: contents,
			img_url: url,
		}

		apis
			.edit(postId, data)
			.then((result)=>{
				console.log("res : ",result)
				history.push("/")
			}).catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;

				console.log("error catch : ",errorCode, errorMessage);
			});

		history.push("/");
	}

	async function deletePost(postId) {
		await apis
				.delete(postId)
				.then((result)=>{
					console.log("delete post res : ",result)
					window.location.reload()
					history.push("/")
				}).catch((error) => {
					var errorCode = error.code;
					var errorMessage = error.message;
	
					console.log("delete post error catch : ",errorCode, errorMessage);
				});

	}

	async function getDetailPost(postId) {

		await apis
				.postDetail(postId)
				.then((result)=>{
					setPostSelected(result.data.post)
				}).catch((error)=>{
					console.log("err from getDetail : ",error)
				});

	}

	return { createPost, editPost, deletePost, getDetailPost };
}
