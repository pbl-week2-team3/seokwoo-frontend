import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import styled from 'styled-components';
import { none_like, like } from '../images/like'
import { usePostActions } from "../recoil/post"
import { useLikeActions } from "../recoil/likes"

const Post = (props) => {

  const dispatch = useDispatch();
  const postActions = usePostActions();
  const likeActions = useLikeActions();
  const is_login = useSelector((state) => state.user.is_login);

  const like_view = props.like_status ? props.like_status : false;

  const [likeStatus, setLikeStatus] = React.useState(like_view);

  const likeToggle = () => {

    if (!is_login){
      return
    }

    setLikeStatus(!likeStatus)
    //redux
    //dispatch(postActions.likePostFB(props.id, likeStatus))
    if(likeStatus){
      likeActions.increaseLikeCount(props.id)
    }else{
      likeActions.decreaseLikeCount(props.id)
    }


    }

  return (
    <React.Fragment>
      <Grid
      bg = "#F5F5F5"
      margin = "0px auto"
      border = "1"
      padding = "20px 0px 20px 80px"
      >
        <Grid border="1" is_flex padding="20px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>작성자 : {props.user_info.user_name}</Text>
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
                  //redux
                  //dispatch(postActions.deletePostFB(props.id));
                  postActions.deletePost(props.id)
                } }
              >
                  삭제
                </Button></>
            )}
          </Grid>
        </Grid>

        
        {props.type_num === "1" &&
        <Grid
          border="1"
          padding="16px"
          _onClick={() => {
            history.push(`/post/${props.id}`);
          }}
        >
          <Grid>
          
          <Text minHeight="300">{props.contents}</Text>
          
          <Image margin="0px auto" shape="rectangle" src={props.image_url} />
       
          </Grid>
        </Grid>
        }

        {props.type_num === "2" &&
        <Grid
          border="1"
          is_flex
          padding="16px"
          _onClick={() => {
            history.push(`/post/${props.id}`);
          }}
        >
          <Grid>
          <Text minHeight="300">{props.contents}</Text>
          </Grid>
          <Grid>
          <Image shape="rectangle" src={props.image_url} />
          </Grid>
        </Grid>
        }

        {props.type_num === "3" &&
        <Grid
          border="1"
          is_flex
          padding="16px"
          _onClick={() => {
            history.push(`/post/${props.id}`);
          }}
        >
          <Grid>
          <Image shape="rectangle" src={props.image_url} />
          </Grid>
          <Grid>
          <Text minHeight="300">{props.contents}</Text>
          </Grid>
        </Grid>
        }

        
        <Grid padding="16px">
          <LikeReplyBox>
          <Text margin="0px" bold>
            댓글 {props.comment_cnt}개
          </Text>
          <LikeBox>
          <LikeImg ls = {likeStatus} onClick={likeToggle}>
          </LikeImg>
          <Text margin="0px" bold>
            좋아요 {props.like_cnt}개
          </Text>
          </LikeBox>
          </LikeReplyBox>
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
  --size: 20px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.ls ? like : none_like}");
  background-size: cover;
  margin : 10px
`;

const LikeBox = styled.div`
display: flex;
align-items: center;
`;

const LikeReplyBox = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;

export default Post;
