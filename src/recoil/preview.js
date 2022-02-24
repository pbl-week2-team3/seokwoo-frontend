import { atom, useSetRecoilState, useRecoilState } from "recoil";


// atoms
export const preview = atom({
	key: "preview",
	default: "",
});

//selector

export function UseImagePreview(url) {

	const setPreview = useSetRecoilState(preview);

	setPreview(url)

}