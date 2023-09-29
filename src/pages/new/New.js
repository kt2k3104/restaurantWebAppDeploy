import React, { useContext, useEffect, useState } from "react";
import styles from "./New.module.css";
import classNames from "classnames/bind";

import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import RestaurantContext from "../../contexts/restaurantContext";
import showToastMessage from "../../helpers/toastMessaage";
import AuthContext from "../../contexts/authContext";

function New() {
  const location = useLocation();
  const [rest, setRest] = useState(undefined);

  const navigation = useNavigate();
  const cx = classNames.bind(styles);

  const restCtx = useContext(RestaurantContext);
  const userName = useContext(AuthContext).userName;

  useEffect(() => {
    setRest(location.state?.rest);
  }, [location.state]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    clearErrors,
  } = useForm();

  useEffect(() => {
    reset();
    if (rest) {
      setValue("name", rest.name);
      setValue("address", rest.address);
      setValue("introduction", rest.introduction);
    }
  }, [rest, reset, setValue, clearErrors]);
  const onSubmitAddRestaurant = async (data) => {
    const response = await restCtx.uploadFile(data.image);
    await restCtx.saveDataFirebase({
      address: data.address,
      introduction: data.introduction,
      name: data.name,
      imageUrl: response.imgUrl,
      filenameRef: response.filename,
      userName: userName,
    });
    reset();
    restCtx.getDataFirebase();
    showToastMessage("them thanh cong", "success");
    navigation("/");
  };
  const onSubmitUpdateRestaurant = async (data) => {
    let response = undefined;
    console.log(data.image);
    if (data.image.length !== 0)
      response = await restCtx.uploadFile(data.image);
    await restCtx.updateDataFirebase(rest.filenameRef, rest.restId, {
      ...rest,
      address: data.address,
      introduction: data.introduction,
      name: data.name,
      imageUrl: data.image.length !== 0 ? response.imgUrl : rest.imageUrl,
      filenameRef:
        data.image.length !== 0 ? response.filename : rest.filenameRef,
      userName: rest.userName,
    });
    reset();
    restCtx.getDataFirebase();
    showToastMessage("sua thanh cong", "success");
    navigation("/");
  };

  /* BE */
  // if (!rest) {
  //   try {
  //     const response = await restCtx.savedARestaurant(data);

  //     if (response) {
  //       console.log(response.data);
  //       reset();
  //       restCtx.fetchAllRest();
  //       showToastMessage("them thanh cong", "success");
  //       navigation("/");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // } else {
  //   try {
  //     const response = await restCtx.updateARestaurant(data, rest.id);

  //     if (response) {
  //       console.log(response.data);
  //       reset();
  //       restCtx.fetchAllRest();
  //       showToastMessage("update thanh cong", "success");
  //       navigation("/");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <>
      {!rest ? (
        <form onSubmit={handleSubmit(onSubmitAddRestaurant)}>
          <h1>New restaurant</h1>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && <li>Vui lòng nhập tên</li>}

          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Your Address"
            {...register("address", { required: true, onBlur: () => {} })}
          />
          {errors.address?.type === "required" && (
            <li>Vui lòng nhập address</li>
          )}

          <label htmlFor="introduction">introduction</label>
          <textarea
            name="introduction"
            id="introduction"
            {...register("introduction", {
              required: true,
            })}
          />
          {errors.introduction?.type === "required" && (
            <li>Vui lòng nhập restaurantInfo</li>
          )}

          <label htmlFor="image">Ảnh</label>
          <input
            type="file"
            name="image"
            id="image"
            {...register("image", {
              required: true,
              validate: (value) => {
                if (
                  value[0].type === "image/jpeg" ||
                  value[0].type === "image/jpg" ||
                  value[0].type === "image/png"
                )
                  return true;
                return false;
              },
            })}
          />
          {errors.image?.type === "required" && <li>Vui lòng chọn ảnh</li>}
          {errors.image?.type === "validate" && (
            <li>Vui lòng chọn đúng file ảnh</li>
          )}
          <button className={cx("button-submit")} type="submit">
            Add Restaurant
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmitUpdateRestaurant)}>
          <h1>Update restaurant</h1>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && <li>Vui lòng nhập tên</li>}

          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Your Address"
            {...register("address", { required: true, onBlur: () => {} })}
          />
          {errors.address?.type === "required" && (
            <li>Vui lòng nhập address</li>
          )}

          <label htmlFor="introduction">introduction</label>
          <textarea
            name="introduction"
            id="introduction"
            {...register("introduction", {
              required: true,
            })}
          />
          {errors.introduction?.type === "required" && (
            <li>Vui lòng nhập restaurantInfo</li>
          )}

          <label htmlFor="image">Ảnh</label>
          <input type="file" name="image" id="image" {...register("image")} />
          <button className={cx("button-submit")} type="submit">
            Update Restaurant
          </button>
        </form>
      )}
    </>
  );
}

export default New;
