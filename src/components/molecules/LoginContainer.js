import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { useRecoilValue } from "recoil";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import Text from "../../elements/Text";
import { loginState, useUserActions } from "../../recoil/users";
import { emailCheck } from "../../shared/common";
import LoginBox from "../atoms/LoginBox";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        HANGHAE99_PBL_2WEEK_TEAM3
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginContainer(props) {

  const isLogin = useRecoilValue(loginState);
  const userActions = useUserActions();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const login = () => {
    console.log(id);

    if (id === "" || pwd === "") {
      window.alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요!");
      return;
    }

    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    //redux
    //dispatch(userActions.loginFB(id, pwd));
  
    userActions.login(id,pwd)
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>

            <Text size="32px" bold>
              SignIn
            </Text>

            <Grid padding="16px 0px">
              <Input
                label="아이디"
                placeholder="아이디를 입력해주세요."
                _onChange={(e) => {
                  setId(e.target.value);
                }}
              />
            </Grid>

            <Grid padding="16px 0px">
              <Input
                label="패스워드"
                placeholder="패스워드 입력해주세요."
                type="password"
                _onChange={(e) => {
                  setPwd(e.target.value);
                }}
                value={pwd}
                is_submit
                onSubmit={login}
              />
            </Grid>

            <Button _onClick={login}>SignIn</Button>
            <LoginBox></LoginBox>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
