import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../app/hooks";

import { CardPropsType } from "../types/Types";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import "./ActivityCard.css"


interface CardPropsObj  {
  cardProps : CardPropsType
}

export default function ActivityCard({name, date, desc} : CardPropsType) { //CardPropsType

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
          <Button variant="success">Join</Button>
        </div>
      </Card.Body>
    </Card>
    </div>
  );
}
