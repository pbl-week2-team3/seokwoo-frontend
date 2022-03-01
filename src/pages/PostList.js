// PostList.js
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { apis } from "../apis/apis";
import Post from "../components/Post";
import { Grid } from "../elements";
import { postState } from "../recoil/post";
import { loginState } from "../recoil/users";
import InfinityScroll from "../shared/InfinityScroll";


const PostList = (props) => {
  const setPostState = useSetRecoilState(postState);
  const post_list = useRecoilValue(postState);

  // const paging = useSelector((state) => state.post.paging);
  const is_login = useRecoilValue(loginState);

  const [stateList, setStateList] = React.useState(post_list);
  const [is_last, setIsLast] = React.useState(false);
  const [is_loading, setIsLoading] = React.useState(false);
  const [number, setNumber] = React.useState(4);

  console.log("starting post_list : ", post_list);
  console.log("starting stateList : ", stateList);


  React.useEffect(() => {

    setIsLoading(true)
    apis
      .post(0, number)
      .then((result) => {
        console.log("res : ", result);

        setPostState(result.data.posts);
        setIsLast(result.data.isLast);
        setStateList([...stateList, ...result.data.posts]);

        setIsLoading(false);
        
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
            setIsLoading(true);
            apis
              .post(lastId, number)
              .then((result) => {
                
                setPostState([...post_list, ...result.data.posts]);
                setStateList([...stateList, ...result.data.posts]);
                setIsLast(result.data.isLast);
                console.log("after append : ", result.data.posts);
                setIsLoading(false);
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log("error catch : ", errorCode, errorMessage);
              });
          }}
          is_next={is_last}
          loading={is_loading}
          post_list = {stateList}

        >
          {stateList.map((p) => {
            if (true) {
              let like_status = false;
              if (p.like_check) {
                like_status = true;
              }

              return (
                <Grid bg="#ffffff" key={p.id}>
                  <Post is_list {...p} like_status={like_status} />
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
