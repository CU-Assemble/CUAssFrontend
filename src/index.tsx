import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import NavigationBar from "./components/Layout/NavigationBar";

import LoginForm from "./components/User/LoginForm";
import EditForm from "./components/User/EditForm";
import Dashboard from "./components/Dashboard/Dashboard";
import ActivityPage from './components/ActivityPage';

import reportWebVitals from "./reportWebVitals";
import "./index.css";

//main css for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Activity } from './models/activityTypes'; //tmp

import mockUpAct from "./components/mockUpActivity";


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NavigationBar/>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/createprofile" element={<EditForm />} />
          <Route path="/activity/:id" element={<ActivityPage/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
