import React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Grid, Text, Input, Button } from "../../elements";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
import { emailCheck } from "../../shared/common";

const SignUpBox = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [user_name, setUserName] = React.useState("");

  const signup = () => {
    if (id === "" || pwd === "" || user_name === "") {
      window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요!");
      return;
    }

    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    dispatch(userActions.signupFB(id, pwd, user_name));
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={props.handleSubmit}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={10}>
        <Grid item xs={10}>
          <Input
            required
            fullWidth
            id="Nick Name"
            label="Nick Name"
            name="Nick Name"
            autoComplete="Nick Name"
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
      <Button _onClick={signup}>Sign Up</Button>
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
