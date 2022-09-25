import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../app/hooks";

import { Activity } from "../models/activityTypes";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import "./ActivityCard.css"


interface CardPropsObj  {
  cardProps : Activity
}

export default function ActivityCard({name, date, desc} : Activity) { //Activity

  //call store
  
  return (
    <div>
    <Card className="activityPostCard" style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://png.pngtree.com/thumb_back/fh260/background/20210902/pngtree-beautiful-sports-girls-beautiful-competition-photography-map-with-pictures-image_787591.jpg" />
      <Card.Body>
        <Card.Title>Event : {name}</Card.Title>
        <Card.Text>
          Description : {desc}
        </Card.Text>
        <div>
          <Button variant="success" onClick={()=>{alert("clicked")}}>Join</Button>
        </div>
      </Card.Body>
    </Card>
    </div>
  );
}
