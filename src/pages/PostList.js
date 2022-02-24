// PostList.js
import React from "react";
import {useSelector, useDispatch} from "react-redux";

import Post from "../components/Post";
import {actionCreators as postActions} from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";
import {Grid} from "../elements";
import { history } from "../redux/configureStore";
import { apis } from "../apis/apis";
import { postState } from "../recoil/post"
import { useSetRecoilState, useRecoilValue } from "recoil"

const PostList = (props) => {
    const dispatch = useDispatch();
    const setPostState = useSetRecoilState(postState);
    const user_info = useSelector((state) => state.user.user);
    // const is_loading = useSelector((state) => state.post.is_loading);
    // const paging = useSelector((state) => state.post.paging);
    const post_list = useRecoilValue(postState)
    console.log("post_list : ", post_list)
    
    React.useEffect(() => {

        // redux
        // if(post_list.length <= 1){
        //      dispatch(postActions.getPostFB());
        // }

        apis
        .post()
        .then((result)=>{
          console.log("res : ",result)

          setPostState(result.data.post)

          history.push("/")
        }).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log("error catch : ",errorCode, errorMessage);
        });
       
    }, []);

    return (
      <React.Fragment>
        <Grid
        center
        margin="0px auto"
        padding=""
        width="1200px">
          {/* <Post/> */}
          {/* <InfinityScroll
            callNext={() => {
              dispatch(postActions.getPostFB(paging.next));
            }}
            is_next={paging.next ? true : false}
            loading={is_loading}
          > */}
            {post_list.map((p, idx) => {
              
              if (p.nickname === user_info?.uid) {
                let like_status = false;
                if (p.like_check){
                  like_status = true;
                }

                return (    
                  <Grid
                    bg="#ffffff"
                    key={p.id}
                  >
                    <Post {...p} like_status={like_status}/>
                  </Grid>
                );
              } else {
                return (
                  <Grid
                    key={p.id}
                    bg="#ffffff"
                  >
                    <Post {...p} />
                  </Grid>
                );
              }
            })}
          {/* </InfinityScroll> */}
        </Grid>
      </React.Fragment>
    );
}

export default PostList;

