import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import style from "./Signup.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../contexts/authContext";

const cx = classNames.bind(style);
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigation = useNavigate();
  const authCtx = useContext(AuthContext);
  const onSubmit = (data) => {
    authCtx.signupHandle(data.name, data.email, data.password, () => {
      reset();
      navigation("/login");
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) => {
        console.log(err);
      })}
    >
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Your Name"
        {...register("name", {
          required: true,
        })}
      />
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
      <label htmlFor="confirmpassword">Confirm Password</label>
      <input
        type="password"
        name="confirmpassword"
        id="confirmpassword"
        placeholder="Your confirm-password"
        {...register("confirmpassword", {})}
      />
      {errors.confirmpassword?.type === "required" && (
        <li>Mật khẩu nhập lại không chính xác</li>
      )}
      <div>
        <button className={cx("button-signup")}>Signup</button>
        <NavLink to={"/login"}>Quay lại đăng nhập</NavLink>
      </div>
    </form>
  );
};

export default Signup;
