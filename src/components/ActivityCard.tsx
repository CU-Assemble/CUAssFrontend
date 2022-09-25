import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../app/hooks";

import { CardPropsType } from "../types/Types";

// props = {
//   name
//   data
//   desc
// }

// type CardPropsType 

export default function ActivityCard() { //CardPropsType

  //call store
  
  return (
    <div>
      <p>Activity Card</p>
      {/* <p>Name : {props.name}</p>
      <p>Date : {props.date}</p>
      <p>Desciprtion : {props.desc}</p> */}
    </div>
  );
}
