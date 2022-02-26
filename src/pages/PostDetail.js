import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import Permit from "../shared/Permit";
import { useRecoilValue } from "recoil"
import { loginState } from "../recoil/users";

import { usePostActions, postSelected } from "../recoil/post";

const PostDetail = (props) => {
  const postActions = usePostActions();
  const id = props.match.params.id;
  const is_login = useRecoilValue(loginState);
  const user_info = localStorage.getItem("userId");

  const post = useRecoilValue(postSelected);

  React.useEffect(() => {

    postActions.getDetailPost(id);
  }, []);

  return (
    <React.Fragment>
      {post.length!=0 && (
        <Post is_detail {...post} likeCnt={post.like_count}/>
      )}
      <Permit>
        <CommentWrite post_id={id} />
      </Permit>
      <CommentList post_id={id} />
    </React.Fragment>
  );
};

export default PostDetail;
