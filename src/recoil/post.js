import { atom, selector, selectorFamily } from "recoil";
import { apis } from "../apis/apis";
import { history } from "../redux/configureStore";
import { useRecoilValue } from "recoil"
import { preview } from "./preview"
import { storage } from "../shared/firebase";
import { loginUserState } from "./users";

// atoms
export const postState = atom({
	key: "postState",
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
		const { data } = await apis.post(postId);
		return data;
	}
});


// action hooks
// createPost, editPost, deletsPost
export function usePostActions() {

	const image = useRecoilValue(preview)
	const user = useRecoilValue(loginUserState)
	const userId = localStorage.getItem("userId")

	async function createPost(text, imgUrl) {

		// 이미지 url 추출 부분 수정 필요 (firestorage에 이미지 업로드하는 방향으로 임시 구현)
		// let imgUrl = "";
		// const imgRef = storage.ref().child(`images/${v4()}`);
		// imgRef.put(file);
		// const response = await imgRef.putString(previewImage,"data_url");
		// imgUrl = await response.ref.getDownloadURL();

		// apis
		// 	.add(user.nickName, text, imgUrl)
		// 	.then((result)=>{
		// 		console.log("res : ",result)
		// 		history.push("/")
		// 	}).catch((error) => {
		// 		var errorCode = error.code;
		// 		var errorMessage = error.message;

		// 		console.log("error catch : ",errorCode, errorMessage);
		// 	});

		// const _upload = storage.ref(`images/${image.name}`).put(image);

		// _upload.then((snapshot) => {
		//   console.log(snapshot);
		   
		//   snapshot.ref.getDownloadURL().then((url) => {
		// 	//업로드 api 구현부

		// 	console.log(url);
		//   });
		// });

		//이미지 firebase 업로드
		console.log("image : ", image)

		const _upload = storage
		.ref(`images/${userId}_${new Date().getTime()}`)
		.putString(image, "data_url");
  
	  	console.log("_upload : /", _upload);

		const url = await (await _upload).ref.getDownloadURL()

		console.log("image URL from firebase : ",url)
		
		const data = {
			user_id: userId,
			contents: text,
			img_url: url,
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


		//console.log("image URL from firebase : ",url)

		//URL 가져오기
		// _upload.then((snapshot) => {
		// 	snapshot.ref
		// 	  .getDownloadURL()
		// 	  .then((url) => {
		// 		console.log(url);
	  
		// 		return url;
		// 	  })
		// 	  .then((url) => {

		// 		apis
		// 			.add(userId, text, url)
		// 			.then((result)=>{
		// 				console.log("res : ",result)
		// 				history.push("/")
		// 			}).catch((error) => {
		// 				var errorCode = error.code;
		// 				var errorMessage = error.message;
	
		// 				console.log("error catch : ",errorCode, errorMessage);
		// 			});

		// 	  })
		// 	  .catch((err) => {
		// 		window.alert("앗! 이미지 업로드에 문제가 있어요!");
		// 		console.log("앗! 이미지 업로드에 문제가 있어요!", err);
		// 	  });
		//   });



	}

	async function editPost(postId, contents, ImgUrl) {
		// 이미지 url 추출 부분 수정 필요 (firestorage에 이미지 업로드하는 방향으로 임시 구현)
		// let imgUrl = "";
		// const imgRef = storage.ref().child(`images/${v4()}`);
		// imgRef.put(file);
		// const response = await imgRef.putString(previewImage,"data_url");
		// imgUrl = await response.ref.getDownloadURL();

		await apis.edit(postId, contents, ImgUrl);
		history.push("/");
	}

	async function deletePost(postId) {
		await apis.delete(postId);
		history.push("/");
	}

	return { createPost, editPost, deletePost };
}
