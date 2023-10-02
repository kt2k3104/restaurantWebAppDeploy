import React from "react";
import classes from "./About.module.css";

export default function About() {
  return (
    <div className={classes.wrapper}>
      <h2>Restaurant Referral Web App</h2>
      <h2>Feature:</h2>
      <ul className={classes["feature-list"]}>
        <li className={classes["feature-item"]}>
          Thêm, xóa, sửa, xem chi tiết nhà hàng
        </li>
        <li className={classes["feature-item"]}>Login, signup, logout user</li>
        <li className={classes["feature-item"]}>Phân quyền</li>
      </ul>
      <h2>Công nghệ sử dụng:</h2>
      <h3>Frontend</h3>
      <ul className={classes["feature-list"]}>
        <li className={classes["feature-item"]}>Library: React</li>
        <li className={classes["feature-item"]}>Hook</li>
        <li className={classes["feature-item"]}>React-router-dom</li>
      </ul>
      <h3>Backend</h3>
      <ul className={classes["feature-list"]}>
        <li className={classes["feature-item"]}>
          Authentication: Authentication Firebase
        </li>
        <li className={classes["feature-item"]}>
          Database: Realtime Database Firebase
        </li>
        <li className={classes["feature-item"]}>
          Endpoint design: CRUD firebase
        </li>
      </ul>
      <h5>Trần Đức Khải - D21 - PTIT</h5>
    </div>
  );
}
