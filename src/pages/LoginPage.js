import LoginContainer from "../components/molecules/LoginContainer";
import { getCookie } from "../shared/Cookie";
import { history } from "../redux/configureStore";

const LoginPage = (props) => {

    if (getCookie("token")){
        window.alert("이미 로그인한 유저입니다.");
        history.push("/")
    }


    return (
        <div>
            <LoginContainer/>
        </div>
    );
};

export default LoginPage;