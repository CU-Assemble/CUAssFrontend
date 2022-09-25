import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import ActivityCard from "./components/ActivityCard";
import { CardPropsType } from "./types/Types";


let date: Date = new Date();  

const sampleCardData: CardPropsType[] = [
  {
    name: "Badminton",
    date: Date.now(),
    desc: "Badminton_desc",
  },
  {
    name: "Basketball",
    date: Date.now(),
    desc: "Basketball_desc",
  },
];

function App() {
  return (
    <div className="App">
      {sampleCardData.map(x => <ActivityCard/>)}
    </div>
  );
}

export default App;
