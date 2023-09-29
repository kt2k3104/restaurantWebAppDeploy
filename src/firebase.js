import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDU2LuCpt6pxxht8a4kdPgoj9p82Kfu0U0",
  authDomain: "fir-crud-16-4.firebaseapp.com",
  databaseURL:
    "https://fir-crud-16-4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-crud-16-4",
  storageBucket: "fir-crud-16-4.appspot.com",
  messagingSenderId: "170877011373",
  appId: "1:170877011373:web:47f97b4e16b2bf09fa8d24",
};

const app = initializeApp(firebaseConfig);

const firebase = {
  auth: getAuth(app),
  database: getDatabase(app),
  storage: getStorage(app),
};

export default firebase;
