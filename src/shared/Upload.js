import React from "react";

import {Button} from "../elements";
import {storage} from "./firebase";
import {preview, UseImagePreview} from "../recoil/preview";
import { useSetRecoilState } from "recoil"

import {useDispatch, useSelector} from "react-redux";
import {actionCreators as imageActions} from "../redux/modules/image";

const Upload = (props) => {
    const dispatch = useDispatch();
    const is_uploading = useSelector(state => state.image.uploading);
    const fileInput = React.useRef();
    const setPreview = useSetRecoilState(preview)

    const selectFile = (e) => {
        console.log(e);
        console.log(e.target);
        console.log(e.target.files[0]);

        console.log(fileInput.current.files[0]);

        const useReader = new FileReader();
        const file = fileInput.current.files[0];

        useReader.readAsDataURL(file);


        useReader.onloadend = () => {
            console.log(useReader.result);

            setPreview(useReader.result)

            //UseImagePreview(useReader.result)
            //redux
            //dispatch(imageActions.setPreview(reader.result));
        }

    }

    const uploadFB = () => {
        let image = fileInput.current.files[0];
        dispatch(imageActions.uploadImageFB(image));
    }

    return (
        <React.Fragment>
            <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading}/>
            <Button _onClick={uploadFB}>업로드하기</Button>
        </React.Fragment>
    )
}

export default Upload;