import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

import Permit from "../shared/Permit";

//import { useDispatch, useSelector } from "react-redux";
import { useRecoilState } from "recoil"

import { usePostActions, postSelected } from "../recoil/post";

const PostDetail = (props) => {
  const postActions = usePostActions();
  const id = props.match.params.id;

  const user_info = localStorage.getItem("userId");

  //const post_list = useSelector((store) => store.post.list);

  //const post_idx = post_list.findIndex((p) => p.id === id);
  //const post = post_list[post_idx];
  const post = useRecoilState(postSelected);

  React.useEffect(() => {
    // if (post) {
    //   return;
    // }
    
    //redux
    //dispatch(postActions.getOnePostFB(id));
    //recoil
    postActions.getDetailPost(id);
  }, []);

  return (
    <React.Fragment>
      {post[0] && (
        <Post {...post[0]} />
      )}
      <Permit>
        <CommentWrite post_id={id} />
      </Permit>
      <CommentList post_id={id} />
    </React.Fragment>
  );
};

export default PostDetail;
