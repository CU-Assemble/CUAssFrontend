import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { Activity } from "../../models/activityTypes";


import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./ActivityCard.css";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { selectIsLoggedIn, selectUser } from "../../features/user/userSlice";

// interface CardPropsObj {
//   cardProps: Activity;
// }

const requestAttendActivity = () => {
  alert("clicked join");
}

const requestLeaveActivity = () => {
  alert("clicked leave");
}

const requestEditActivity = () => {
  alert("clicked edit");
}

const requestDeleteActivity = () => {
  alert("clicked delete");
}


export default function ActivityCard(props: {activityDetail:Activity}) { //Activity

  const activityDetail = props.activityDetail

  // const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isLoggedIn = true
  // const currentUser = useAppSelector(selectUser);
  const currentUser = {
    "studentId": "6230524921",
    "CreatedAt": "2022-10-10T02:52:40.245071+07:00",
    "UpdatedAt": "2022-10-10T02:55:50.508777+07:00",
    "DeletedAt": null,
    "Name": "Phet",
    "Nickname": "tt",
    "Faculty": "Engineer",
    "Tel": "112",
    "Email": "scfscsd@sdcfs.cds",
    "Password": "$2a$14$myaVhVH8rl4BJriXa2pm6ePeGrOoykUtpl0JKpWE/yZFfYJn4/.g2"
   }
  const dispatch = useAppDispatch();

  const isParticipant = ((activityDetail.participants !== undefined) && activityDetail.participants.indexOf(currentUser.studentId) > -1)
  const isOwner = (activityDetail.ownerID === currentUser.studentId)

  console.log(activityDetail)
  
  return (
    <div>
      <Card className="activityPostCard" style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={
            activityDetail.url
              ? activityDetail.url
              : "https://png.pngtree.com/thumb_back/fh260/background/20210902/pngtree-beautiful-sports-girls-beautiful-competition-photography-map-with-pictures-image_787591.jpg"
          }
        />
        <Card.Body>
          <Card.Title><a href={`/activity/${activityDetail.id}`}>Event : {activityDetail.name}</a></Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {/* <ListGroup.Item>{`Date : ${(new Date(date)).toUTCString()}`}</ListGroup.Item> */}
          <ListGroup.Item>{`Date : ${activityDetail.date}`}</ListGroup.Item>
          <ListGroup.Item>Description : {activityDetail.desc}</ListGroup.Item>
        </ListGroup>
        <Card.Footer>
          <div>
            {/* check if current user is owner? */}
            {!isOwner? <Button
              variant="success"
              className="activity-card-btn join-activity-button"
              onClick={requestAttendActivity}
              disabled={!(isLoggedIn && !isParticipant)}
            > {isParticipant? "Joined" : "Join"}
            </Button> : null}

            {(!isOwner 
              && activityDetail.ownerID !== currentUser.studentId 
              && isParticipant)? <Button
              variant="danger"
              className="activity-card-btn leave-activity-button"
              onClick={requestLeaveActivity}
              disabled={!(isLoggedIn && isParticipant)}
            > Leave
            </Button> : null}

            {isOwner? <Button
              variant="outline-info"
              className="activity-card-btn edit-activity-button"
              onClick={requestEditActivity}
              disabled={!isLoggedIn}
            > Edit
            </Button> : null}

            {isOwner? <Button
              variant="danger"
              className="activity-card-btn delete-activity-button"
              onClick={requestDeleteActivity}
              disabled={!isLoggedIn}
            > Delete
            </Button> : null}

          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
