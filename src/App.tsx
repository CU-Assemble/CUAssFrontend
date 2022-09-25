import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import ActivityCard from "./components/ActivityCard";
import { Activity } from "./models/activityTypes";

import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/User/LoginForm";


function App() {
  return (
    <div className="App">
      <LoginForm/>
    </div>
  );
}

export default App;
