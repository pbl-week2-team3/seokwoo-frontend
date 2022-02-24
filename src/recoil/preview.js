import { atom, useSetRecoilState, useRecoilState } from "recoil";


// atoms
export const preview = atom({
	key: "preview",
	default: "",
});

//selector

export function UseImagePreview(url) {

	const [_preview, _setPreview] = useRecoilState(preview);

	const setPreview = useSetRecoilState(preview);

	setPreview(url)

}