import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { Activity } from "../../models/activityTypes";


import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./ActivityCard.css";
import { ListGroup, ListGroupItem } from "react-bootstrap";

interface CardPropsObj {
  cardProps: Activity;
}

const requestJoinActivity = () => {
  alert("clicked join");
}

export default function ActivityCard({ name, date, desc, url }: Activity) { //Activity
  
  return (
    <div>
      <Card className="activityPostCard" style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={
            url
              ? url
              : "https://png.pngtree.com/thumb_back/fh260/background/20210902/pngtree-beautiful-sports-girls-beautiful-competition-photography-map-with-pictures-image_787591.jpg"
          }
        />
        <Card.Body>
          <Card.Title><a href="https://www.google.com">Event : {name}</a></Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {/* <ListGroup.Item>{`Date : ${(new Date(date)).toUTCString()}`}</ListGroup.Item> */}
          <ListGroup.Item>{`Date : ${new Date(
            date
          ).toLocaleString()}`}</ListGroup.Item>
          <ListGroup.Item>Description : {desc}</ListGroup.Item>
        </ListGroup>
        <Card.Footer>
          <div>
            <Button
              variant="success"
              className="join-activity-button"
              onClick={requestJoinActivity}
            >
              Join
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
