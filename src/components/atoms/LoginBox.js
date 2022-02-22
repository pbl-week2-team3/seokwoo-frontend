import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useHistory } from "react-router-dom";

const LoginBox = (props) => {
  const history = useHistory();

  const goSignUp = () => {
    history.push("/signUp");
  };

  return (
    <Grid container>
      <Grid item xs>
        <Link href="#" variant="body2">
          Forgot password?
        </Link>
      </Grid>
      <Grid item>
        <Link href="#" variant="body2" onClick={goSignUp}>
          {"Don't have an account? Sign Up"}
        </Link>
      </Grid>
    </Grid>
  );
};

export default LoginBox;
