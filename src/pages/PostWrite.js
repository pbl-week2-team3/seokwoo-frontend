import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";
import { preview } from "../recoil/preview";
import { loginState } from "../recoil/users";
import { usePostActions, postState } from "../recoil/post";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { useSelector, useDispatch } from "react-redux";
//import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";
import { getCookie } from "../shared/Cookie";
import { history } from "../redux/configureStore"

const PostWrite = (props) => {

  const dispatch = useDispatch();
  const is_login = useRecoilState(loginState);

  const postActions = usePostActions();
  const post_list = useRecoilValue(postState);
  const post_id = props.match.params.id;
  //routing url에 get방식으로 받은 변수 가져오기
  const is_edit = post_id ? true : false;

  let _post = is_edit ? post_list.find((p) => p.id == post_id) : null;
  
  const setPreview = useSetRecoilState(preview);

  const _preview = useRecoilState(preview);

  React.useEffect(() => {

    if (!getCookie("token")){
      window.alert("로그인 후 글 작성이 가능합니다.")
      history.push("/login")
    }

    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();
      return;
    }

    if (is_edit) {
      //redux
      //dispatch(imageActions.setPreview(_post.image_url));
      setPreview(_post.img_url);

    }
  }, []);


  const [type_num, setType] = React.useState("2");
  const { history } = props;
  const [contents, setContents] = React.useState(_post ? _post.contents : "");

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addPost = () => {
    //id값??
    console.log("image : ", _preview[0])

    postActions.createPost(contents, type_num);

    //redux
    //dispatch(postActions.addPostFB(contents, type_num));
  };

  const editPost = () => {
    postActions.editPost(post_id, contents);

    //redux
    //dispatch(postActions.editPostFB(post_id, contents));
  };

  const checkType = (e) => {
    if (e.target.value == "1") {
      setType("1");
    } else if (e.target.value == "2") {
      setType("2");
    } else if (e.target.value == "3") {
      setType("3");
    }
  };

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace("/");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>
        <Upload />
      </Grid>
      {!is_edit && (
        <Grid>
          <input
            name="radio"
            type="radio"
            id="type1"
            value="1"
            checked={type_num == "1"}
            onChange={checkType}
          />
          <label htmlFor="1">Type1</label>
          <br />
          <input
            name="radio"
            type="radio"
            id="type2"
            value="2"
            checked={type_num == "2"}
            onChange={checkType}
          />
          <label htmlFor="2">Type2</label>
          <br />
          <input
            name="radio"
            type="radio"
            id="type3"
            value="3"
            checked={type_num == "3"}
            onChange={checkType}
          />
          <label htmlFor="3">Type3</label>
        </Grid>
      )}

      {type_num === "1" && (
        <Grid>
          <Grid padding="16px">
            <Text margin="0px" size="24px" bold>
              미리보기
            </Text>
          </Grid>

          <Image
            shape="rectangle"
            src={_preview[0] ? _preview[0] : "http://via.placeholder.com/400x300"}
          />
        </Grid>
      )}

      {type_num === "2" && (
        <Grid is_flex>
          <Grid padding="16px">
            <Text margin="0px" size="24px" bold>
              미리보기
            </Text>
          </Grid>

          <Image
            shape="rectangle"
            src={_preview[0] ? _preview[0] : "http://via.placeholder.com/400x300"}
          />
        </Grid>
      )}

      {type_num === "3" && (
        <Grid is_flex>
          <Image
            shape="rectangle"
            src={_preview[0] ? _preview[0] : "http://via.placeholder.com/400x300"}
          />

          <Grid padding="16px">
            <Text margin="0px" size="24px" bold>
              미리보기
            </Text>
          </Grid>
        </Grid>
      )}

      <Grid padding="16px">
        <Input
          value={contents}
          _onChange={changeContents}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiLine
        />
      </Grid>

      <Grid padding="16px">
        {is_edit ? (
          <Button text="게시글 수정" _onClick={editPost} disabled={!(_preview[0] && contents)}></Button>
        ) : (
          <Button text="게시글 작성" _onClick={addPost} disabled={!(_preview[0] && contents)}></Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
