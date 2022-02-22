// PostList.js
import React from "react";
import {useSelector, useDispatch} from "react-redux";

import Post from "../components/Post";
import {actionCreators as postActions} from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";
import {Grid} from "../elements";
import { history } from "../redux/configureStore";


const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const user_info = useSelector((state) => state.user.user);
    const is_loading = useSelector((state) => state.post.is_loading);
    const paging = useSelector((state) => state.post.paging);
    
    React.useEffect(() => {

        if(post_list.length <= 1){
             dispatch(postActions.getPostFB());
        }
       
    }, []);

    return (
      <React.Fragment>
        <Grid
        center
        margin="0px auto"
        padding=""
        width="1200px">
          {/* <Post/> */}
          <InfinityScroll
            callNext={() => {
              dispatch(postActions.getPostFB(paging.next));
            }}
            is_next={paging.next ? true : false}
            loading={is_loading}
          >
            {post_list.map((p, idx) => {

              if (p.user_info.user_id === user_info?.uid) {
                let like_status = false;
                if (p.like.indexOf(p.user_info.user_id)!=-1){
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
          </InfinityScroll>
        </Grid>
      </React.Fragment>
    );
}

export default PostList;

