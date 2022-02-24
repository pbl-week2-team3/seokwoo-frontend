import React from "react";
import { Grid, Text, Button } from "../elements";
import { getCookie, deleteCookie } from "../shared/Cookie";

import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";

import NotiBadge from "./NotiBadge";

import { loginState, useUserActions } from "../recoil/users";
import { useRecoilValue } from "recoil";

const Header = (props) => {
  const dispatch = useDispatch();
  const userActions = useUserActions();

  const is_login = useRecoilValue(loginState);
  console.log("is_login : ",is_login)
  const pathname = useLocation().pathname;

  if (pathname === "/login" || pathname === "/signUp") {
    return null;
  }

  let user_name = "dummy";

  if (is_login) {
    return (
      <React.Fragment>
        <Grid
          bg="#87CEFA"
          margin="0px auto"
          is_flex
          padding="50px 10px 50px 10px"
        >
          <Grid>
            <Text margin="0px" size="24px" bold>
              {user_name}님 안녕하세요😊
            </Text>
          </Grid>

          <Grid>
            <Button width="100px" text="내정보"></Button>

            <NotiBadge
              _onClick={() => {
                history.push("/noti");
              }}
            />

            <Button
              width="100px"
              text="로그아웃"
              _onClick={() => {
                //redux
                //dispatch(userActions.logoutFB());

                //recoil
                userActions.logout();
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
