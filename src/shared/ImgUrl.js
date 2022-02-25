import React from "react";
import { storage } from "../shared/firebase";


export async function getImgUrlFB(userId, image){

    //이미지 firebase 업로드
		console.log("image : ", image)

		const _upload = storage
		.ref(`images/${userId}_${new Date().getTime()}`)
		.putString(image, "data_url");
  
	  	console.log("_upload : /", _upload);

		const url = await (await _upload).ref.getDownloadURL()

		console.log("image URL from firebase : ",url)
		
        return url
}