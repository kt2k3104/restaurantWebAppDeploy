import React from "react";
import styles from "./Restaurants.module.css";
import classNames from "classnames/bind";
import Restaurant from "../../components/Restaurant/Restaurant";
import { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RestaurantContext from "../../contexts/restaurantContext";

export default function Restaurants() {
  const cx = classNames.bind(styles);

  const restCtx = useContext(RestaurantContext);

  const setting = {
    // dots: true,
    // className: "center",
    // centerMode: true,
    // infinite: true,
    // centerPadding: "60px",
    // slidesToShow: 3,
    // speed: 500,
    rows: 2,
    // slidesPerRow: 1,
    // draggable: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          // infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={cx("restaurants-container")}>
      <Slider {...setting}>
        {restCtx.restaurants.map((val, index) => {
          return (
            <div key={index} className={cx("res")}>
              <Restaurant rest={val} ShowEdit />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
