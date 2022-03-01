import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Button, Grid, Image, Text } from "../elements";
import { like, none_like } from "../images/like";
import { useLikeActions } from "../recoil/likes";
import { postSelected, usePostActions } from "../recoil/post";
import { loginState } from "../recoil/users";
import { history } from "../redux/configureStore";

const Post = (props) => {
  
  //recoil
  const postActions = usePostActions();
  const likeActions = useLikeActions();
  
  const setPostSelected = useSetRecoilState(postSelected);
  const is_login = useRecoilValue(loginState);
  const _post_selected = useRecoilValue(postSelected);
  console.log("props : ", props);

  //좋아요, 메인 리스트에서 누를시와 상세페이지에서 누를시 구분 
  //- state로 둘 다 구현시 반영되지 않는 부분이 있어 상세페이지는 recoil데이터를 이용하고, 
  //메인리스트는 그냥 state를 이용함
  const [likeCount, setLikeCount] = React.useState(props.like_count);
  let like_view = null

  let cnt = -99;
  if (props.is_list) {
    cnt = likeCount;
    like_view = props.like_check ? true : false;
  } else {
    cnt = _post_selected.like_count;
    console.log("cnt : ", cnt);
    like_view = _post_selected.like_check ? true : false;
    console.log("like_view : detail , ", like_view, _post_selected.like_check)
  }

  const [likeStatus, setLikeStatus] = React.useState(like_view);
  console.log("likeStatus : ", likeStatus)

  React.useEffect(() => {
    //setLikeNumber(props.like_count);
    
  }, []);

  //좋아요 토글 함수 구현부
  const likeToggle = () => {
    if (!is_login){
      window.alert("로그인 후 사용이 가능합니다.")
       return
     }

    if (!likeStatus) {
      likeActions.increaseLikeCount(props.id);
      console.log("in toggle : ", likeCount);
      if(props.is_detail){
      setPostSelected({ ..._post_selected, like_count: props.like_count + 1 });
      }else{
        setLikeCount(cnt+1)
      }
    } else {
      likeActions.decreaseLikeCount(props.id);
      console.log("in toggle : ", likeCount);
      if(props.is_detail){
      setPostSelected({ ..._post_selected, like_count: props.like_count - 1 });
      }else{
        setLikeCount(cnt-1)
      }
    }

    setLikeStatus(!likeStatus);
  };

  console.log("post me : ", props.me, props.id);

  return (
    <React.Fragment>
      <Grid
        bg="#F5F5F5"
        margin="0px auto"
        border="1"
        padding="20px 0px 20px 80px"
      >
        <Grid border="1" is_flex padding="20px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.profile_img_url} />
            <Text bold>작성자 : {props.nickname}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.createdAt}</Text>
            {props.byMe && (
              <>
                <Button
                  width="auto"
                  margin="4px"
                  padding="4px"
                  _onClick={() => {
                    history.push(`/write/${props.id}`);
                  }}
                >
                  수정
                </Button>
                <Button
                  width="auto"
                  margin="4px"
                  padding="4px"
                  _onClick={() => {
                    //삭제 dispatch
                    postActions.deletePost(props.id);
                  }}
                >
                  삭제
                </Button>
              </>
            )}
          </Grid>
        </Grid>

        {props.type == "1" && (
          <Grid
            border="1"
            padding="16px"
            _onClick={() => {
              if (props.is_list) {
                history.push(`/post/${props.id}`);
              }
            }}
          >
            <Grid>
              <Text minHeight="300">{props.content}</Text>

              <Image margin="0px auto" shape="rectangle" src={props.img_url} />
            </Grid>
          </Grid>
        )}
        {/* type_num 미적용시 2번으로만 되도록 설정 */}
        {props.type == "2" && (
          <Grid
            border="1"
            is_flex
            padding="16px"
            _onClick={() => {
              if (props.is_list) {
                history.push(`/post/${props.id}`);
              }
            }}
          >
            <Grid>
              <Text minHeight="300">{props.content}</Text>
            </Grid>
            <Grid>
              <Image shape="rectangle" src={props.img_url} />
            </Grid>
          </Grid>
        )}

        {props.type_num == "3" && (
          <Grid
            border="1"
            is_flex
            padding="16px"
            _onClick={() => {
              if (props.is_list) {
                history.push(`/post/${props.id}`);
              }
            }}
          >
            <Grid>
              <Image shape="rectangle" src={props.img_url} />
            </Grid>
            <Grid>
              <Text minHeight="300">{props.content}</Text>
            </Grid>
          </Grid>
        )}

        <Grid padding="16px">
          <LikeReplyBox>
            {/* <Text margin="0px" bold>
            댓글 {props.comment_cnt}개
          </Text> */}
            <LikeBox>
              <LikeImg ls={likeStatus} onClick={likeToggle}></LikeImg>
              <Text margin="0px" bold>
                좋아요 {cnt}개
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
  like_count : false,
  like_check : false,
  none_like:
    "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-thumb-10.png&r=171&g=171&b=171",
  like: "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-thumb-10.png&r=171&g=53&b=53",
};

const LikeImg = styled.div`
  --size: 20px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => (props.ls ? like : none_like)}");
  background-size: cover;
  margin: 10px;
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
