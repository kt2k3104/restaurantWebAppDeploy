import React, { useState } from "react";
// import axios from "axios";
// import showToastMessage from "../helpers/toastMessaage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import firebase from "../firebase";
import showToastMessage from "../helpers/toastMessaage";

const AuthContext = React.createContext({
  isLoggined: false,
  // userName: "",
  userName: {},
  currentUser: {},
  loginHandle: (email, password) => {},
  signupHandle: (email, password) => {},
  logoutHandle: (email, password) => {},
  checkIsLoginHandle: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggined, setIsLoggined] = useState(false);
  // const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");

  /* Firebase */
  const [currentUser, setCurrentUser] = useState(null);
  const signupHandle = async (name, email, password, cb) => {
    try {
      const user = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );
      console.log(user);
      if (user.user) {
        await updateProfile(firebase.auth.currentUser, { displayName: name });
        cb();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loginHandle = async (email, password, cb) => {
    try {
      const user = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );
      // .then((userCredentail) => userCredentail.user.accessToken)
      // .then((accessToken) => {
      //   localStorage.setItem("accessToken", accessToken);
      // });
      if (user) {
        console.log(user);
        setIsLoggined(true);
        setCurrentUser(firebase.auth.currentUser);
        setUserName(firebase.auth.currentUser.displayName);
        localStorage.setItem("accessToken", user._tokenResponse.idToken);
        cb();
        showToastMessage("Đăng nhập thành công", "success");
      }
    } catch (error) {
      setIsLoggined(false);

      showToastMessage("Sai tài khoản hoặc mật khẩu!", "error");
      console.log(error);
      // switch (error.code) {
      //   case AuthErrorCodes.INVALID_PASSWORD:
      //     showToastMessage("Sai mật khẩu!", "error");
      //     break;
      //   case AuthErrorCodes.USER_DELETED:
      //     showToastMessage("Không tìm thấy email!", "error");
      //     break;
      //   default:
      //     showToastMessage("Có lỗi xảy ra!", "error");
      //     break;
      // }
    }
  };
  const checkIsLoginHandle = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      firebase.auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          console.log(currentUser);
          setIsLoggined(true);
        } else {
          localStorage.removeItem("accessToken");
          setIsLoggined(false);
        }
      });
    } else {
      setIsLoggined(false);
    }
  };

  const logoutHandle = async () => {
    signOut(firebase.auth)
      .then(() => {
        setIsLoggined(false);
        setCurrentUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* BE */
  // useEffect(() => {
  //   const tokenLS = localStorage.getItem("token");
  //   const usernameLS = localStorage.getItem("username");

  //   if (tokenLS) {
  //     setIsLoggined(true);
  //     setUserName(usernameLS);
  //     setToken(tokenLS);
  //   }
  // }, []);

  // const signupHandle = async (name, email, password, cb) => {
  //   try {
  //     const response = await axios.put(
  //       "http://localhost:8080/api/v1/auth/signup",
  //       {
  //         name,
  //         email,
  //         password,
  //       }
  //     );
  //     cb();
  //   } catch (err) {
  //     showToastMessage(err.response.data.message, "error");
  //   }
  // };
  // const loginHandle = async (email, password, cb) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/api/v1/auth/login",
  //       {
  //         email,
  //         password,
  //       }
  //     );

  //     setUserName(response.data.userName);
  //     setToken(response.data.token);
  //     localStorage.setItem("username", response.data.userName);
  //     localStorage.setItem("token", response.data.token);

  //     setIsLoggined(true);
  //     cb();
  //   } catch (err) {
  //     showToastMessage(err.response.data.message, "error");
  //   }
  // };

  // const logoutHandle = async () => {
  //   setUserName("");
  //   setToken("");
  //   setIsLoggined(false);
  // };

  return (
    <AuthContext.Provider
      value={{
        isLoggined,
        userName,
        currentUser,
        loginHandle,
        logoutHandle,
        signupHandle,
        checkIsLoginHandle,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
