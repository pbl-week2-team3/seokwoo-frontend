import React from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Grid, Text } from "../elements";
//import NotiBadge from "./NotiBadge";
import { loginState, useUserActions } from "../recoil/users";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";


const Header = (props) => {
  const userActions = useUserActions();
  const setLoginState = useSetRecoilState(loginState);
  const is_login = useRecoilValue(loginState);
  const pathname = useLocation().pathname;
  let token = null
  
  React.useEffect(() => {

    //cookie에서 token 있으면, is_login = true 넣기
    token = getCookie("token")
    console.log("header, token : ", token)
    if(token){
      setLoginState(true)
    }

  }, []);
  

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

            {/* <NotiBadge
              _onClick={() => {
                history.push("/noti");
              }}
            /> */}

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
