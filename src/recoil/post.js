import { atom, selector, selectorFamily } from "recoil";

export const postState = atom({
    key : "postState",
    default : [],
});