import React from "react";

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Grid, Text, Input, Button, Image } from "../../elements";

import { useDispatch } from "react-redux";
//import { actionCreators as userActions } from "../../redux/modules/user";
import { emailCheck } from "../../shared/common";
import { getImgUrlFB } from "../../shared/ImgUrl"

import { useRecoilValue } from "recoil";
import { loginState, useUserActions, profilePreview } from "../../recoil/users";
import { Upload } from "../../shared/Upload";

const SignUpBox = (props) => {
  const dispatch = useDispatch();
  const userActions = useUserActions();
  const isLogin = useRecoilValue(loginState);
  const _profilePreview = useRecoilValue(profilePreview);

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [user_name, setUserName] = React.useState("");

  console.log("profilePreview : ", profilePreview);

  const signup = async (e) => {
    e.preventDefault();

    if (id === "" || pwd === "" || user_name === "") {
      window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요!");
      return;
    }

    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    //recoil & apis
    //img url FB
    
    const imgUrl = await getImgUrlFB(id, _profilePreview)

    userActions.signup(id, user_name, pwd, pwd, imgUrl);

  };

  return (
    <Box component="form" noValidate onSubmit={signup} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Grid is_flex>
            <Grid padding="16px">
              <Upload is_profile />
            </Grid>

            <Image
              shape="circle"
              src={
                _profilePreview
                  ? _profilePreview
                  : "http://via.placeholder.com/400x300"
              }
            />
          </Grid>
          <Input
            autoComplete="given-name"
            name="UserName"
            required
            fullWidth
            id="UserName"
            label="User Name"
            autoFocus
            _onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      <Button _onClick={signup} disabled={!(emailCheck(id) && (pwd.length > 5) && _profilePreview && user_name)}>Sign Up</Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="#" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpBox;
