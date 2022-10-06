import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

//main css for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from './components/Dashboard';
import ActivityPage from './components/ActivityPage';

import { Activity } from './models/activityTypes'; //tmp


const mockUpAct : Activity = {
  name: "mockupAct",
  date: Date.now(),
  desc: "mockupDESC",
  url: "https://i.pinimg.com/originals/f7/c2/77/f7c277d2794b25f98970d96d07e45048.jpg"
}

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>} />
          <Route path="dashboard" element={<App />} />
          <Route path="activity/:id" element={<ActivityPage name={mockUpAct.name} date={mockUpAct.date} desc={mockUpAct.desc} url={mockUpAct.url}/>} />
        </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
