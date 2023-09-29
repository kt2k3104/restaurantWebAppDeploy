import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import { RestaurantContextProvider } from "./contexts/restaurantContext";
import { AuthContextProvider } from "./contexts/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalStyles>
    <AuthContextProvider>
      <BrowserRouter>
        <RestaurantContextProvider>
          <App />
        </RestaurantContextProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </GlobalStyles>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
