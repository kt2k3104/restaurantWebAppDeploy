import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../contexts/authContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigation = useNavigate();
  const authCtx = useContext(AuthContext);

  const cx = classNames.bind(style);
  const onSubmit = (data) => {
    authCtx.loginHandle(data.email, data.password, () => {
      reset();
      navigation("/");
    });
  };

  const handleSignup = () => {
    navigation("/signup");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) => {
        console.log(err);
      })}
    >
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Your Email"
        {...register("email", {
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address",
          },
        })}
      />
      {errors.email?.type === "required" && <li>Vui lòng nhập email</li>}
      {errors.email?.type === "pattern" && <li>Vui lòng nhập đúng email</li>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Your Password"
        {...register("password", { required: true, minLength: 4 })}
      />
      {errors.password?.type === "required" && <li>Vui lòng nhập password</li>}
      {errors.password?.type === "minLength" && (
        <li>Mật khẩu cần tối thiểu 4 ký tự</li>
      )}
      <button className={cx("button-login")}>Login</button>

      <h4 className={cx("signup")}>
        Do not have an account?
        <div className={cx("button-signup")} onClick={handleSignup}>
          Signup
        </div>
      </h4>
    </form>
  );
};

export default Login;
