import React, { useState, useEffect } from "react";
// import axios from "axios";
import * as database from "firebase/database";
import * as storage from "firebase/storage";
import { v4 } from "uuid";

const RestaurantContext = React.createContext({
  restaurants: [],
  // savedARestaurant: () => {},
  // updateARestaurant: () => {},
  // deleteARestaurant: () => {},
  // fetchAllRest: () => {},
  saveDataFirebase: () => {},
  getDataFirebase: () => {},
  uploadFile: () => {},
  deleteRestaurant: () => {},
  updateDataFirebase: () => {},
});

export const RestaurantContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);

  const saveDataFirebase = async (restaurant) => {
    const db = database.getDatabase();
    const restRef = database.ref(db, "restaurants");
    const newRestRef = database.push(restRef);
    await database.set(newRestRef, { ...restaurant });
  };

  const getDataFirebase = async () => {
    const list = [];
    try {
      const db = database.getDatabase();
      const dbRef = database.ref(db);
      const snapshot = await database.get(database.child(dbRef, "restaurants"));
      if (snapshot) {
        snapshot.forEach((item) => {
          list.push({
            ...item.val(),
            restId: item.key,
          });
        });
      }
      setRestaurants(list);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadFile = async (imageFile) => {
    const filename = `${v4()}-${imageFile[0].name}`;
    try {
      const st = storage.getStorage();
      const imgRef = storage.ref(st, "/images/" + filename);
      await storage.uploadBytes(imgRef, imageFile[0]);
      const imgUrl = await storage.getDownloadURL(imgRef);

      return { imgUrl, filename };
    } catch (error) {
      console.log(error);
    }
  };
  const updateDataFirebase = async (filenameRef, restId, newRestaurant) => {
    try {
      if (filenameRef !== newRestaurant.filenameRef) {
        const imgRef = storage.ref(
          storage.getStorage(),
          "/images/" + filenameRef
        );
        storage.deleteObject(imgRef);
      }
      const db = database.getDatabase();
      const updates = {};
      updates[`/restaurants/${restId}`] = newRestaurant;
      await database.update(database.ref(db), updates);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteRestaurant = async (restId, filenameRef) => {
    try {
      const db = database.getDatabase();
      const removeRestRef = database.ref(db, `restaurants/${restId}`);
      await database.remove(removeRestRef);
      const imgRef = storage.ref(
        storage.getStorage(),
        "/images/" + filenameRef
      );
      storage.deleteObject(imgRef);
      getDataFirebase();
    } catch (error) {
      console.log(error);
    }
  };

  /* BE */
  // const savedARestaurant = (restaurant) => {
  //   restaurant.image = restaurant.image[0];

  //   const token = localStorage.getItem("token");
  //   try {
  //     return axios.post(
  //       "http://localhost:8080/api/v1/restaurants",
  //       restaurant,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const updateARestaurant = (restaurant, id) => {
  //   restaurant.image = restaurant.image[0];

  //   const token = localStorage.getItem("token");
  //   try {
  //     return axios.put(
  //       `http://localhost:8080/api/v1/restaurants/${id}`,
  //       restaurant,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const deleteARestaurant = (id) => {
  //   const token = localStorage.getItem("token");
  //   try {
  //     return axios.delete(
  //       `http://localhost:8080/api/v1/restaurants/${id}`,

  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // async function fetchAllRest() {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8080/api/v1/restaurants?page=1"
  //     );

  //     if (response) {
  //       setRestaurants(response.data.result);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  useEffect(() => {
    getDataFirebase();
    // fetchAllRest();
  }, []);

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        // savedARestaurant,
        // fetchAllRest,
        // deleteARestaurant,
        // updateARestaurant,
        getDataFirebase,
        saveDataFirebase,
        uploadFile,
        deleteRestaurant,
        updateDataFirebase,
      }}
    >
      {props.children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContext;
