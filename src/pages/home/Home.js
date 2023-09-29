import React, { useContext } from "react";
import "./Home.css";
import Restaurant from "../../components/Restaurant/Restaurant";
import RestaurantContext from "../../contexts/restaurantContext";

export default function Home() {
  const restCtx = useContext(RestaurantContext);

  return (
    <div className="homeContainer">
      <div className="listRes">
        {restCtx.restaurants.map((val, index) => {
          return (
            <div key={index} className="ress">
              <Restaurant rest={val} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
