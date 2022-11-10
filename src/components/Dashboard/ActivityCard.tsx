import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

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

// const requestEditActivity = () => {
//   alert("clicked edit");
// }

const requestDeleteActivity = () => {
  alert("clicked delete");
}


export default function ActivityCard(props: {activityDetail:Activity}) { //Activity
  const { t } = useTranslation('translation');

  const activityDetail = props.activityDetail

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const currentUser = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const isParticipant = ((activityDetail.participants !== undefined) && (currentUser.studentId !== undefined) && activityDetail.participants.indexOf(currentUser.studentId) > -1)
  const isOwner = (activityDetail.ownerID === currentUser.studentId)

  // console.log(activityDetail)
  // console.log(isParticipant)
  
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
          <Card.Title><Link to={`/activity/${activityDetail.id}`}>Event : {activityDetail.name}</Link></Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {/* <ListGroup.Item>{`Date : ${(new Date(date)).toUTCString()}`}</ListGroup.Item> */}
          <ListGroup.Item>{`${t("Date")} : ${activityDetail.date}`}</ListGroup.Item>
          <ListGroup.Item>{t("Description")} : {activityDetail.desc}</ListGroup.Item>
        </ListGroup>
        <Card.Footer>
          <div>
            {/* check if current user is owner? */}
            {!isOwner? <Button
              variant="success"
              className="activity-card-btn join-activity-button"
              onClick={requestAttendActivity}
              disabled={!(isLoggedIn && !isParticipant)}
            > {isParticipant? t("Joined") : t("Join")}
            </Button> : null}

            {(!isOwner 
              && activityDetail.ownerID !== currentUser.studentId 
              && isParticipant)? <Button
              variant="danger"
              className="activity-card-btn leave-activity-button"
              onClick={requestLeaveActivity}
              disabled={!(isLoggedIn && isParticipant)}
            > {t("Leave")}
            </Button> : null}

            {isOwner? <Button
              variant="outline-info"
              className="activity-card-btn edit-activity-button"
              //onClick={requestEditActivity}
              as={Link as any}
              to={`/myactivities/${activityDetail.id}`}
              disabled={!isLoggedIn}
            > {t("Edit")}
            </Button> : null}

            {isOwner? <Button
              variant="danger"
              className="activity-card-btn delete-activity-button"
              onClick={requestDeleteActivity}
              disabled={!isLoggedIn}
            > {t("Delete")}
            </Button> : null}

          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
