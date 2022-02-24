import {
  atom,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { history } from "../redux/configureStore";
import { apis } from "../apis/apis";
import { setCookie, deleteCookie, getCookie } from "../shared/Cookie";
import axios from "axios";

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const loginUserState = atom({
  key: "loginUserState",
  default: {
    userId: "",
    nickName: "",
    profileImgUrl: "",
  },
});

// action hooks
// login, logout, signup
export function useUserActions() {
  const setLoginState = useSetRecoilState(loginState);

  async function login(id, password) {
    if ((id, password)) {
      var data = {
        id: id,
        password: password,
      };

      axios
        .post("http://onlyonep.shop/api/login", data)
        .then((res) => {
          if (res) {
            localStorage.setItem("userId", id);
			      setCookie("token", res.data.token, 1);
            setLoginState(true);
            // const temp=useRecoilValue(loginState);
            // console.log("check : ",temp)
            history.push("/");
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      //   await apis
      //     .login(id, password)
      //     .then((res) => {
      //       if (res.data[0].success) {
      //         localStorage.setItem("userId", id);
      //         setCookie("token", res.data[0].token, 1);
      //         setCookie("userPwd", password, 1);
      //         setLoginState(true);
      //         history.push("/");
      //       }
      //     })
      //     .catch((e) => {
      //       window.alert("잘못된 로그인 요청입니다.");
      //     });
    }
  }

  function logout() {

	axios
	.post("http://onlyonep.shop/api/logout")
	.then(function (response) {
	  console.log(response);
	})
	.catch(function (error) {
	  console.log(error);
	});

    localStorage.setItem("userId", null);
    deleteCookie("token");
    deleteCookie("userPwd");
    setLoginState(false);
    history.push("/login");
  }

  async function signup(
    id,
    nickname,
    password,
    confirmPassword,
    profileImgUrl
  ) {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (
      id === "" ||
      nickname === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      window.alert("모든 항목들을 기입해주세요");
    } else {
      if (!emailRegex.test(id)) {
        window.alert("아이디는 이메일 형식으로 기입해주세요");
      } else {
        if (password !== confirmPassword) {
          window.alert("비밀번호와 확인 비밀번호가 일치하지 않습니다");
        } else {

            var data = {
            	"id": id,
            	"nickname": nickname,
            	"password": password,
            	"confirmPassword": confirmPassword,
            	"profile_img_url": " "
          };

             apis
            	.signup(data)
            	.then((result)=>{
            		console.log("fin")
            		console.log("res : ",result)
            		history.push("/")
            	}).catch((error) => {
            		var errorCode = error.code;
            		var errorMessage = error.message;

            		console.log("error catch : ",errorCode, errorMessage);
            	});
        }
      }
    }
  }
  return {
    login, logout,
    signup,
  };
}
