import React from "react";
import { Grid, Text, Button } from "../elements";
import { getCookie, deleteCookie } from "../shared/Cookie";

import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";

import NotiBadge from "./NotiBadge";

const Header = (props) => {

  const dispatch = useDispatch();
  const user_info = useSelector((state)=> state.user)
  const is_login = useSelector((state) => state.user.is_login);

  const pathname = useLocation().pathname;

  console.log("pathname : ", pathname)
  
  if(pathname === "/login" || pathname === "/signUp") {
    return null;
  }

  let user_name = "dummy"

  if (user_info.user){
    user_name = user_info.user.user_name
  }

  //const user_name = useSelector((state) => state.user.user.user_name);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

  const is_session = sessionStorage.getItem(_session_key)? true : false;
  
  console.log(is_session);

  if (is_login && is_session) {
    return (
      <React.Fragment>
        <Grid 
        bg="#87CEFA"
        margin="0px auto"
        is_flex 
        padding="50px 10px 50px 10px">
          <Grid>
            <Text margin="0px" size="24px" bold>
              {user_name}님 안녕하세요😊
            </Text>
          </Grid>

          <Grid>
            <Button 
            width="100px"
            text="내정보"></Button>
            
            <NotiBadge 
            
            _onClick={() => {
              history.push("/noti");
            }}
            />

            <Button
              width="100px"
              text="로그아웃"
              _onClick={() => {
                dispatch(userActions.logoutFB());
              }}
            ></Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid>
          <Text margin="0px" size="24px" bold>
            헬로
          </Text>
        </Grid>

        <Grid is_flex>
          <Button
            text="로그인"
            _onClick={() => {
              
              history.push("/login");
            }}
          ></Button>
          <Button
            text="회원가입"
            _onClick={() => {
              history.push("/signup");
            }}
          ></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
