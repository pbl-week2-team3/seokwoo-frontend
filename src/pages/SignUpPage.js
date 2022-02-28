import SignUp from "../components/organism/SignUp";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";


const SignUpPage = (props) => {

    if (getCookie("token")){
        window.alert("이미 로그인한 유저입니다.");
        history.push("/")
    }

    return (
        <div>
            <SignUp/>
        </div>
    );
};

export default SignUpPage;