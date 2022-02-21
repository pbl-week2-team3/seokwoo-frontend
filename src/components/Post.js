import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import styled from 'styled-components';
import { none_like, like } from '../images/like'


const Post = (props) => {

  const dispatch = useDispatch();

  const non_like_url = "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-thumb-10.png&r=171&g=171&b=171"

  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && (
              <><Button
                width="auto"
                margin="4px"
                padding="4px"
                _onClick={() => {
                  history.push(`/write/${props.id}`);
                } }
              >
                수정
              </Button><Button
                width="auto"
                margin="4px"
                padding="4px"
                _onClick={() => {
                  //삭제 dispatch
                  dispatch(postActions.deletePostFB(props.id));
                } }
              >
                  삭제
                </Button></>
            )}
          </Grid>
        </Grid>
        <Grid
          padding="16px"
          _onClick={() => {
            history.push(`/post/${props.id}`);
          }}
        >
        <Text>{props.contents}</Text>
        </Grid>
        <Grid
          _onClick={() => {
            history.push(`/post/${props.id}`);
          }}
        >
          <Image shape="rectangle" src={props.image_url} />
        </Grid>
        <Grid padding="16px">
          <Text margin="0px" bold>
            댓글 {props.comment_cnt}개
          </Text>
          <div>
          <LikeImg/>
          <Text margin="0px" bold>
            좋아요 {props.comment_cnt}개
          </Text>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "mean0",
    user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  },
  image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  contents: "고양이네요!",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
  none_like : 'https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-thumb-10.png&r=171&g=171&b=171',
  like : 'https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-thumb-10.png&r=171&g=53&b=53'
};

const LikeImg = styled.div`
  --size: 30px;
  width: var(--size);
  height: var(--size);
  background-image: url("${none_like}");
  background-size: cover;
`;

export default Post;
