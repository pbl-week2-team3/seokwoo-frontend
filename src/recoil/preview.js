import { atom, useSetRecoilState } from "recoil";


// atoms
export const preview = atom({
	key: "preview",
	default: "",
});

export function setImagePreview(url) {

	const setPreview = useSetRecoilState(preview);

	setPreview(url)

}