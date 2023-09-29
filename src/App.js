import "./App.css";
import Nav from "./components/nav/Nav";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Restaurants from "./pages/restaurants/Restaurants";
import About from "./pages/about/About";
import New from "./pages/new/New";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import { useContext, useEffect } from "react";
import AuthContext from "./contexts/authContext";

function App() {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    authCtx.checkIsLoginHandle();
  }, [authCtx]);

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/new" element={<New />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
