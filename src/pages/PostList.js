// PostList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import InfinityScroll from "../shared/InfinityScroll";
import { Grid } from "../elements";
import { history } from "../redux/configureStore";
import { apis } from "../apis/apis";
import { postState } from "../recoil/post";
import { loginState } from "../recoil/users";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { last } from "lodash";

const PostList = (props) => {
  const dispatch = useDispatch();
  const setPostState = useSetRecoilState(postState);
  const user_info = useSelector((state) => state.user.user);
  const post_list = useRecoilValue(postState);

  // const paging = useSelector((state) => state.post.paging);
  const is_login = useRecoilValue(loginState);

  const [stateList, setStateList] = React.useState(post_list);
  const [number, setNumber] = React.useState(4);

  console.log("starting post_list : ", post_list);
  console.log("starting stateList : ", stateList);


  React.useEffect(() => {
    apis
      .post(0, number)
      .then((result) => {
        console.log("res : ", result);

        setPostState(result.data.posts);
        setStateList([...stateList, ...result.data.posts])
        history.push("/");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log("error catch : ", errorCode, errorMessage);
      });
  }, [is_login]);

  console.log("postList : ", post_list, localStorage.getItem("userId"));
  console.log("stateList : ", stateList);


  return (
    <React.Fragment>
      <Grid center margin="0px auto" padding="" width="1200px">
        {/* <Post/> */}
        <InfinityScroll
        
          callNext={(lastId) => {
            //dispatch(postActions.getPostFB(paging.next));
            
            //setLastPost(lastpost+4)
            
            console.log("in callNext : ",stateList ,stateList[stateList.length-1])
            
            apis
              .post(lastId, number)
              .then((result) => {
                
                setPostState([...post_list, ...result.data.posts]);
                setStateList([...stateList, ...result.data.posts]);
                console.log("after append : ", result.data.posts);

                history.push("/");
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log("error catch : ", errorCode, errorMessage);
              });
          }}
          is_next={true}
          loading={false}
          post_list = {stateList}

        >
          {stateList.map((p) => {
            if (p.nickname === user_info?.uid) {
              let like_status = false;
              if (p.like_check) {
                like_status = true;
              }

              return (
                <Grid bg="#ffffff" key={p.id}>
                  <Post is_list {...p} like_status={like_status} />
                </Grid>
              );
            } else {
              return (
                <Grid key={p.id} bg="#ffffff">
                  <Post is_list {...p} />
                </Grid>
              );
            }
          })}
        </InfinityScroll>
      </Grid>
    </React.Fragment>
  );
};

export default PostList;
