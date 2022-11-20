import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { Activity, MyActivityResponseType } from "../../models/activityTypes";


import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./ActivityCard.css";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { selectIsLoggedIn, selectUser } from "../../features/user/userSlice";
import { joinActivityAsync, leaveActivityAsync, resetStatusState, selectJoinActivityMessage, selectLeaveActivityMessage } from "../../features/activityPost/activitySlice";
import { deleteMatchingAsync, selectDeleteMatchingAsyncMessage } from "../../features/matching/matchingSlice";

// interface CardPropsObj {
//   cardProps: Activity;
// }

// const requestAttendActivity = () => {
//   alert("clicked join");
// }

// const requestLeaveActivity = () => {
//   alert("clicked leave");
// }

// // const requestEditActivity = () => {
// //   alert("clicked edit");
// // }

// const requestDeleteActivity = () => {
//   alert("clicked delete");
// }


export default function ActivityCard(props: {activityDetail:Activity, activityInfo:MyActivityResponseType|undefined}) { //Activity
  const { t } = useTranslation('translation');
  const navigate = useNavigate();

  const activityDetail = props.activityDetail
  const activityInfo = props.activityInfo

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const currentUser = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const isOwner = (activityInfo !== undefined) && (activityDetail.ownerID === currentUser.studentId) //be careful
  const isParticipant = ((activityInfo !== undefined) && (!isOwner))
  // console.log(currentUser.studentId, activityDetail.ownerID)
  // console.log(isParticipant)
  // console.log(activityDetail)
  // console.log(activityInfo)

  // const refreshPage = () => {window.location.reload(false);}

  const joinActivityMessage = useAppSelector(selectJoinActivityMessage)
  const leaveActivityMessage = useAppSelector(selectLeaveActivityMessage)
  const deleteMatchingAsyncMessage = useAppSelector(selectDeleteMatchingAsyncMessage)
  
  useEffect(() => {
    console.log(joinActivityMessage, leaveActivityMessage, deleteMatchingAsyncMessage)
    if (joinActivityMessage === "success") {
        console.log("join success!!!")
        dispatch(resetStatusState());
        navigate(`/activity/${activityDetail.id}`)
    }
    if ((leaveActivityMessage === "success") || (deleteMatchingAsyncMessage === "success")) {
        dispatch(resetStatusState());
        navigate(`/myactivities`)
    }
  }, [joinActivityMessage, leaveActivityMessage, deleteMatchingAsyncMessage]);

  const requestAttendActivity = (e:React.FormEvent, aid:string) => {
    // alert("clicked join");
    e.preventDefault()
    if (currentUser.studentId != undefined) {
        dispatch(joinActivityAsync({
            aid: aid, 
            sid: currentUser.studentId}
        ));
    } else {
        console.log("request attend no userid")
    }
}

const requestLeaveActivity = (e:React.FormEvent, aid: string) => {
    // alert("clicked leave");
    e.preventDefault()
    if (currentUser.studentId != undefined) {
        dispatch(leaveActivityAsync({
            aid: aid, 
            sid: currentUser.studentId}
        ));
    } else {
        console.log("request leave no userid")
    }
}

const requestDeleteActivity = (e:React.FormEvent, mid: string) => {
    // alert("clicked delete");
    e.preventDefault()
    dispatch(deleteMatchingAsync(mid));
    dispatch(resetStatusState());
    navigate(`/myactivities`)
}
  
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
          <ListGroup.Item>{`${t("Date")} : ${activityDetail.date?.replace("T", " ")}`}</ListGroup.Item>
          <ListGroup.Item>{t("Description")} : {activityDetail.desc}</ListGroup.Item>
        </ListGroup>
        <Card.Footer>
          <div>
            {/* check if current user is owner? */}
            {!isOwner? <Button
              variant="success"
              className="activity-card-btn join-activity-button"
              onClick={(e : React.FormEvent)=>{requestAttendActivity(e,activityDetail.id)}}
              disabled={!(isLoggedIn && !isParticipant)}
            > {isParticipant? t("Joined") : t("Join")}
            </Button> : null}

            {(!isOwner 
              && activityDetail.ownerID !== currentUser.studentId 
              && isParticipant)? <Button
              variant="danger"
              className="activity-card-btn leave-activity-button"
              onClick={(e : React.FormEvent)=>{requestLeaveActivity(e,activityDetail.id)}}
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
              onClick={(e : React.FormEvent)=>{requestDeleteActivity(e,activityInfo.MatchingId)}}
              disabled={!isLoggedIn}
            > {t("Delete")}
            </Button> : null}

          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
