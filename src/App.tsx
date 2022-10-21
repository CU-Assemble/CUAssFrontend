import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import "./App.css";
import ActivityCard from "./components/Dashboard/ActivityCard";
import { Routes, Route, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import NavigationBar from "./components/Layout/NavigationBar";
import LoginForm from "./components/User/LoginForm";
import RegisterForm from "./components/User/RegisterForm";
import EditForm from "./components/User/EditForm";
import Dashboard from "./components/Dashboard/Dashboard";
import ActivityPage from "./components/Activity/ActivityPage";
import LandingPage from "./components/LandingPage/LandingPage";
import CreateActivityForm from "./components/Activity/CreateActivityForm";
import EditActivityForm from "./components/Activity/EditActivityForm";
import "bootstrap/dist/css/bootstrap.min.css";

import mockUpAct from "./components/mockUpActivity";

import {
  selectIsLoggedIn,
  setIsLoggedIn,
  setJwt,
  updateUser,
} from "./features/user/userSlice";

import { Activity } from "./models/activityTypes"; //tmp
import MyActivity from "./components/MyActivityPage/MyActivity";

function App() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      dispatch(setJwt(jwtToken));
      dispatch(setIsLoggedIn(true));
      try {
        const decodedData: any = jwt_decode(jwtToken);
        const studentId = decodedData["StudentId"];
        dispatch(updateUser({ studentId }));
      } catch (e) {}
    }
  }, []);

  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginForm /> : <Navigate to={"/"} replace />}
        />
        <Route
          path="/createprofile"
          element={
            !isLoggedIn ? <RegisterForm /> : <Navigate to={"/"} replace />
          }
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <EditForm /> : <Navigate to={"/"} replace />}
        />
        <Route
          path="/createactivity"
          element={
            isLoggedIn ? <CreateActivityForm /> : <Navigate to={"/"} replace />
          }
        />
        <Route path="activity/:id" element={<ActivityPage />} />
        <Route
          path="myactivities/:id"
          element={
            isLoggedIn ? <EditActivityForm /> : <Navigate to={"/"} replace />
          }
        />
        <Route
          path="/myactivities"
          element={
            <MyActivity/>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
