import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";

const Temp = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  //routing url에 get방식으로 받은 변수 가져오기
  const post_id = 1;
  const is_edit = post_id ? true : false;
  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

  const [contents, setContents] = React.useState(_post ? _post.contents : "");

  return (
    //1번 타입의 post, 텍스트 왼쪽, 이미지 오른쪽
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>
        <Upload />
      </Grid>
      <Grid>
        <Grid padding="16px"></Grid>
        <Grid is_flex center>
          <Input
            value={contents}
            label="게시글 내용"
            placeholder="게시글 작성"
            multiLine
          />

          <Grid>
            <Text margin="0px" size="24px" bold>
              미리보기
            </Text>
            <Image
              size="20"
              shape="rectangle"
              src={preview ? preview : "http://via.placeholder.com/400x300"}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid padding="16px">
        {is_edit ? (
          <Button text="게시글 수정"></Button>
        ) : (
          <Button text="게시글 작성"></Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

const textLImageR = styled.div`
  display: flex;
  align-items: center;
`;

const Temp2 = styled.div`
  margin: auto;
`;

export default Temp;
